import { describe, expect, it, vi } from "vitest";
import { syncScannerLeadToClose } from "./lib/close";

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("RapidAct scanner lead sync", () => {
  it("skips Close when the server key is not configured", async () => {
    const fetchImpl = vi.fn();
    await expect(
      syncScannerLeadToClose({
        email: "person@example.com",
        url: "https://example.com",
        source: "scanner-gate",
        apiKey: "",
        fetchImpl: fetchImpl as unknown as typeof fetch,
      })
    ).resolves.toBe("skipped");
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("creates a lead with a nested contact when the email is new", async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ data: [], cursor: null }))
      .mockResolvedValueOnce(jsonResponse({ id: "lead_123" }));

    await expect(
      syncScannerLeadToClose({
        email: "Person@Example.com",
        url: "https://example.com",
        source: "scanner-gate",
        apiKey: "test-key",
        fetchImpl: fetchImpl as unknown as typeof fetch,
      })
    ).resolves.toBe("synced");

    expect(fetchImpl).toHaveBeenCalledTimes(2);
    expect(fetchImpl.mock.calls[0][0]).toBe(
      "https://api.close.com/api/v1/data/search/"
    );
    expect(fetchImpl.mock.calls[1][0]).toBe(
      "https://api.close.com/api/v1/lead/"
    );
    const createBody = JSON.parse(fetchImpl.mock.calls[1][1].body as string);
    expect(createBody.name).toBe("RapidAct Scanner — example.com");
    expect(createBody.contacts[0].emails[0].email).toBe("person@example.com");
  });

  it("adds a note to the exact existing contact instead of duplicating it", async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(
        jsonResponse({
          data: [
            {
              id: "cont_123",
              lead_id: "lead_existing",
              emails: [{ email: "person@example.com" }],
            },
          ],
        })
      )
      .mockResolvedValueOnce(jsonResponse({ id: "acti_123" }));

    await syncScannerLeadToClose({
      email: "person@example.com",
      url: "https://example.com/pricing",
      source: "scanner-gate",
      apiKey: "test-key",
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });

    expect(fetchImpl.mock.calls[1][0]).toBe(
      "https://api.close.com/api/v1/activity/note/"
    );
    const noteBody = JSON.parse(fetchImpl.mock.calls[1][1].body as string);
    expect(noteBody.lead_id).toBe("lead_existing");
    expect(noteBody.note).toContain("https://example.com/pricing");
  });

  it("creates a company assessment lead with the full intake context", async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ data: [], cursor: null }))
      .mockResolvedValueOnce(jsonResponse({ id: "lead_report" }));

    await syncScannerLeadToClose({
      email: "buyer@example.com",
      url: "https://buyer.example",
      source: "report-intake",
      company: "Buyer Ltd",
      contactName: "Buyer Ltd",
      details: ["Reference: RAPID1", "AI systems: chatbot, content"],
      apiKey: "test-key",
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });

    const createBody = JSON.parse(fetchImpl.mock.calls[1][1].body as string);
    expect(createBody.name).toBe("RapidAct Assessment — Buyer Ltd");
    expect(createBody.description).toContain("Reference: RAPID1");
    expect(createBody.description).toContain("AI systems: chatbot, content");
    expect(createBody.contacts[0].name).toBe("Buyer Ltd");
  });
});
