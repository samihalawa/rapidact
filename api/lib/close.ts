type CloseEmail = { email?: string };
type CloseContactSearchResult = {
  id?: string;
  lead_id?: string;
  emails?: CloseEmail[];
};

type CloseSearchResponse = {
  data?: CloseContactSearchResult[];
};

export type CloseSyncResult = "synced" | "skipped";

type SyncLeadOptions = {
  email: string;
  url?: string;
  source: string;
  apiKey?: string;
  fetchImpl?: typeof fetch;
};

const CLOSE_API = "https://api.close.com/api/v1";

function authorization(apiKey: string) {
  return `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`;
}

function websiteName(url?: string) {
  if (!url) return "Website";
  try {
    return new URL(/^https?:\/\//i.test(url) ? url : `https://${url}`).hostname;
  } catch {
    return url.slice(0, 120);
  }
}

async function closeRequest<T>(
  path: string,
  apiKey: string,
  body: unknown,
  fetchImpl: typeof fetch
) {
  const response = await fetchImpl(`${CLOSE_API}${path}`, {
    method: "POST",
    headers: {
      Authorization: authorization(apiKey),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Close request failed with ${response.status}`);
  }
  return (await response.json()) as T;
}

export async function syncScannerLeadToClose({
  email,
  url,
  source,
  apiKey = process.env.CLOSE_API_KEY,
  fetchImpl = fetch,
}: SyncLeadOptions): Promise<CloseSyncResult> {
  if (!apiKey) return "skipped";

  const normalizedEmail = email.trim().toLowerCase();
  const search = await closeRequest<CloseSearchResponse>(
    "/data/search/",
    apiKey,
    {
      query: {
        type: "and",
        queries: [
          { type: "object_type", object_type: "contact" },
          { type: "text", mode: "full_words", value: normalizedEmail },
        ],
      },
      _fields: { contact: ["id", "lead_id", "emails"] },
      results_limit: 10,
    },
    fetchImpl
  );

  const existingContact = (search.data ?? []).find(contact =>
    (contact.emails ?? []).some(
      candidate => candidate.email?.trim().toLowerCase() === normalizedEmail
    )
  );

  const detail = [
    "RapidAct scanner lead",
    `Source: ${source}`,
    url ? `Website: ${url}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  if (existingContact?.lead_id) {
    await closeRequest(
      "/activity/note/",
      apiKey,
      {
        lead_id: existingContact.lead_id,
        note: detail,
      },
      fetchImpl
    );
    return "synced";
  }

  await closeRequest(
    "/lead/",
    apiKey,
    {
      name: `RapidAct Scanner — ${websiteName(url)}`,
      url,
      description: detail,
      contacts: [
        {
          name: normalizedEmail.split("@")[0],
          emails: [{ email: normalizedEmail, type: "office" }],
        },
      ],
    },
    fetchImpl
  );
  return "synced";
}
