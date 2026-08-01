import { BASE_URL, getSeoRoutes } from "./seo-routes.mjs";

const base = (process.env.SEO_BASE_URL || "http://127.0.0.1:4173").replace(
  /\/$/,
  ""
);
const routes = getSeoRoutes();
const indexNowKey = "4cd1c6fc3884b1b9ae20575112ef166f";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function attribute(html, tag, name) {
  const tagMatch = html.match(tag);
  if (!tagMatch) return null;
  return (
    tagMatch[0].match(new RegExp(`${name}=(["'])(.*?)\\1`, "i"))?.[2] ?? null
  );
}

function canonicalLinks(html) {
  return [...html.matchAll(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi)].map(
    match => attribute(match[0], /<link\b[^>]*>/i, "href")
  );
}

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

async function verifyRoute(route) {
  const response = await fetch(`${base}${route.path}`, {
    headers: {
      "User-Agent": "Googlebot/2.1 (+http://www.google.com/bot.html)",
    },
    redirect: "manual",
  });
  const html = await response.text();
  assert(
    response.status === 200,
    `${route.path}: expected 200, received ${response.status}`
  );
  const titles = [...html.matchAll(/<title>([^<]+)<\/title>/gi)];
  const descriptions = [
    ...html.matchAll(/<meta\s+name=["']description["'][^>]+>/gi),
  ];
  assert(
    titles.length === 1,
    `${route.path}: expected one title, found ${titles.length}`
  );
  assert(
    descriptions.length === 1,
    `${route.path}: expected one description, found ${descriptions.length}`
  );
  const title = decodeHtml(titles[0][1]);
  const description = decodeHtml(
    attribute(descriptions[0][0], /<meta\b[^>]*>/i, "content") ?? ""
  );
  assert(
    title.length >= 25 && title.length <= 65,
    `${route.path}: title length ${title.length}`
  );
  assert(
    description.length >= 50 && description.length <= 165,
    `${route.path}: description length ${description.length}`
  );
  assert(
    /<meta\s+name=["']robots["'][^>]+index/i.test(html),
    `${route.path}: not explicitly indexable`
  );
  assert(
    /<div id=["']root["']>\s*(?!<\/div>)[\s\S]+<\/div>/i.test(html),
    `${route.path}: empty rendered root`
  );
  assert(/<h1\b[^>]*>/i.test(html), `${route.path}: missing rendered H1`);
  const canonicals = canonicalLinks(html);
  assert(
    canonicals.length === 1,
    `${route.path}: expected one canonical, found ${canonicals.length}`
  );
  assert(
    canonicals[0] === `${BASE_URL}${route.path}`,
    `${route.path}: wrong canonical ${canonicals[0]}`
  );
  assert(
    !/noindex/i.test(
      attribute(html, /<meta\s+name=["']robots["'][^>]*>/i, "content") ?? ""
    ),
    `${route.path}: contains noindex`
  );
  const alternateTags = [
    ...html.matchAll(/<link\b[^>]*rel=["']alternate["'][^>]*>/gi),
  ];
  assert(
    alternateTags.length ===
      route.alternates.length + (route.alternates.length ? 1 : 0),
    `${route.path}: unexpected hreflang link count ${alternateTags.length}`
  );
  const alternateHrefs = new Set(
    alternateTags.map(match => attribute(match[0], /<link\b[^>]*>/i, "href"))
  );
  for (const alternate of route.alternates) {
    assert(
      alternateHrefs.has(`${BASE_URL}${alternate.path}`),
      `${route.path}: missing ${alternate.lang} alternate ${alternate.path}`
    );
  }
  if (route.path === "/") {
    const structuredData = [
      ...html.matchAll(
        /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
      ),
    ];
    assert(structuredData.length >= 1, "home: missing JSON-LD structured data");
    for (const block of structuredData) JSON.parse(block[1]);
  }
  return true;
}

const concurrency = 16;
let nextIndex = 0;
await Promise.all(
  Array.from({ length: concurrency }, async () => {
    while (nextIndex < routes.length) {
      const route = routes[nextIndex++];
      await verifyRoute(route);
    }
  })
);

const missing = await fetch(`${base}/definitely-not-a-rapidact-page`, {
  headers: { "User-Agent": "Googlebot/2.1 (+http://www.google.com/bot.html)" },
  redirect: "manual",
});
const missingHtml = await missing.text();
assert(
  missing.status === 404,
  `unknown route: expected 404, received ${missing.status}`
);
assert(
  missing.headers.get("cache-control") === "no-store",
  "unknown route: must not be cached"
);
assert(
  missing.headers.get("x-robots-tag")?.includes("noindex"),
  "unknown route: missing X-Robots-Tag noindex"
);
assert(
  /<meta\s+name=["']robots["'][^>]+noindex/i.test(missingHtml),
  "unknown route: missing HTML noindex"
);
assert(
  canonicalLinks(missingHtml).length === 0,
  "unknown route: must not have a canonical"
);

for (const [source, expectedPath] of [
  ["/en", "/"],
  ["/report/", "/report"],
  ["/start?ref=seo-proof", "/report?ref=seo-proof"],
  ["/es/privacy", "/privacy"],
]) {
  const response = await fetch(`${base}${source}`, { redirect: "manual" });
  const location = response.headers.get("location");
  assert(
    response.status === 308,
    `${source}: expected 308, received ${response.status}`
  );
  assert(
    new URL(location).pathname + new URL(location).search === expectedPath,
    `${source}: wrong redirect ${location}`
  );
}

const sitemapResponse = await fetch(`${base}/sitemap.xml`);
const sitemap = await sitemapResponse.text();
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  match => match[1]
);
assert(
  sitemapResponse.status === 200,
  `sitemap: expected 200, received ${sitemapResponse.status}`
);
assert(
  sitemapUrls.length === routes.length,
  `sitemap: expected ${routes.length} URLs, found ${sitemapUrls.length}`
);
assert(
  new Set(sitemapUrls).size === sitemapUrls.length,
  "sitemap: duplicate URLs found"
);

const robotsResponse = await fetch(`${base}/robots.txt`);
const robots = await robotsResponse.text();
assert(
  robotsResponse.status === 200,
  `robots: expected 200, received ${robotsResponse.status}`
);
assert(
  /Content-Signal:\s*search=yes,\s*ai-input=yes,\s*ai-train=yes,\s*use=full/i.test(
    robots
  ),
  "robots: permissive content signals missing"
);
assert(
  !/^Disallow:\s*\/$/im.test(robots),
  "robots: a crawler is blocked from the whole site"
);
assert(
  robots.includes(`Sitemap: ${BASE_URL}/sitemap.xml`),
  "robots: sitemap declaration missing"
);

const indexNowKeyResponse = await fetch(`${base}/${indexNowKey}.txt`);
const indexNowKeyBody = (await indexNowKeyResponse.text()).trim();
assert(
  indexNowKeyResponse.status === 200,
  `IndexNow key: expected 200, received ${indexNowKeyResponse.status}`
);
assert(indexNowKeyBody === indexNowKey, "IndexNow key: content mismatch");

const crawlerUserAgents = [
  ["Googlebot", "Googlebot/2.1 (+http://www.google.com/bot.html)"],
  ["GoogleOther", "GoogleOther"],
  [
    "Bingbot",
    "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
  ],
  ["DuckDuckBot", "DuckDuckBot/1.0; (+http://duckduckgo.com/duckduckbot.html)"],
  [
    "Applebot",
    "Mozilla/5.0 (compatible; Applebot/0.3; +http://www.apple.com/go/applebot)",
  ],
  [
    "YandexBot",
    "Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)",
  ],
  [
    "Baiduspider",
    "Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)",
  ],
  ["OAI-SearchBot", "OAI-SearchBot/1.0; +https://openai.com/searchbot"],
  ["GPTBot", "GPTBot/1.2; +https://openai.com/gptbot"],
  ["ChatGPT-User", "ChatGPT-User/1.0; +https://openai.com/bot"],
  ["ClaudeBot", "ClaudeBot/1.0; +https://www.anthropic.com/bot"],
  ["anthropic-ai", "anthropic-ai/1.0"],
  ["PerplexityBot", "PerplexityBot/1.0; +https://perplexity.ai/perplexitybot"],
  ["CCBot", "CCBot/2.0; +https://commoncrawl.org/faq/"],
  ["Bytespider", "Bytespider"],
  [
    "PetalBot",
    "Mozilla/5.0 (compatible; PetalBot; +https://aspiegel.com/petalbot)",
  ],
  [
    "facebookexternalhit",
    "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
  ],
  ["LinkedInBot", "LinkedInBot/1.0"],
  ["Slackbot", "Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)"],
  ["Twitterbot", "Twitterbot/1.0"],
];
const crawlerProbePath = "/es/answers/ai-act-deadline-2026";
const expectedCrawlerCanonical = `${BASE_URL}${crawlerProbePath}`;
await Promise.all(
  crawlerUserAgents.map(async ([name, userAgent]) => {
    const [pageResponse, crawlerRobotsResponse] = await Promise.all([
      fetch(`${base}${crawlerProbePath}`, {
        headers: { "User-Agent": userAgent },
        redirect: "manual",
      }),
      fetch(`${base}/robots.txt`, {
        headers: { "User-Agent": userAgent },
        redirect: "manual",
      }),
    ]);
    const [html, crawlerRobots] = await Promise.all([
      pageResponse.text(),
      crawlerRobotsResponse.text(),
    ]);
    assert(
      pageResponse.status === 200,
      `${name}: crawler page received ${pageResponse.status}`
    );
    assert(
      crawlerRobotsResponse.status === 200,
      `${name}: robots received ${crawlerRobotsResponse.status}`
    );
    assert(
      canonicalLinks(html)[0] === expectedCrawlerCanonical,
      `${name}: crawler page has the wrong canonical`
    );
    assert(
      /<h1\b[^>]*>/i.test(html),
      `${name}: crawler page is missing rendered content`
    );
    assert(
      !/(cf-chl-|challenge-platform|just a moment\.\.\.)/i.test(html),
      `${name}: crawler page contains a Cloudflare challenge`
    );
    assert(
      crawlerRobots === robots,
      `${name}: crawler received a different robots policy`
    );
  })
);

console.log(
  `SEO verification passed: ${routes.length} rendered canonical routes, true 404/noindex, canonical redirects, sitemap, IndexNow ownership, and ${crawlerUserAgents.length} unrestricted crawler identities at ${base}`
);
