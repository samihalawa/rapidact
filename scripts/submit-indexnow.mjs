import fs from "node:fs/promises";
import { BASE_URL, getSeoRoutes } from "./seo-routes.mjs";

const endpoint =
  process.env.INDEXNOW_ENDPOINT || "https://www.bing.com/indexnow";
const key = "4cd1c6fc3884b1b9ae20575112ef166f";
const keyFile = new URL(`../public/${key}.txt`, import.meta.url);
const keyContents = (await fs.readFile(keyFile, "utf8")).trim();

if (keyContents !== key) {
  throw new Error("IndexNow key file does not match the submission key");
}

const urlList = getSeoRoutes().map(route => `${BASE_URL}${route.path}`);
const payload = {
  host: new URL(BASE_URL).host,
  key,
  keyLocation: `${BASE_URL}/${key}.txt`,
  urlList,
};

if (process.env.INDEXNOW_DRY_RUN === "1") {
  console.log(
    `IndexNow dry run: ${urlList.length} canonical URLs for ${payload.host}; key file ${payload.keyLocation}`
  );
  process.exit(0);
}

const response = await fetch(endpoint, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(payload),
});
const responseBody = await response.text();

if (![200, 202].includes(response.status)) {
  throw new Error(
    `IndexNow rejected ${urlList.length} URLs with HTTP ${response.status}: ${responseBody || "empty response"}`
  );
}

console.log(
  `IndexNow accepted ${urlList.length} canonical URLs with HTTP ${response.status}`
);
