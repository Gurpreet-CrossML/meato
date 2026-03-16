import { NextResponse } from "next/server";

/**
 * POST /api/chat
 * Server-side proxy to the n8n webhook.
 * The webhook URL lives in .env and is NEVER exposed to the browser.
 */
export async function POST(request) {
  try {
    const { query, id } = await request.json();

    if (!query || typeof query !== "string" || !query.trim()) {
      return NextResponse.json({ error: "query is required" }, { status: 400 });
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("[chat/route] N8N_WEBHOOK_URL is not set in .env");
      return NextResponse.json(
        { error: "Server misconfiguration: webhook URL missing." },
        { status: 500 },
      );
    }

    // Add a 30-second timeout so ETIMEDOUT is handled gracefully
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30_000);

    let upstream;
    try {
      upstream = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query.trim(), id }),

        signal: controller.signal,
      });
    } catch (fetchErr) {
      clearTimeout(timeoutId);
      const isTimeout =
        fetchErr.name === "AbortError" || fetchErr?.cause?.code === "ETIMEDOUT";
      console.error("[chat/route] fetch failed:", fetchErr);
      return NextResponse.json(
        {
          error: isTimeout
            ? "The AI service timed out. Please try again."
            : "Could not reach the AI service.",
        },
        { status: 504 },
      );
    }
    clearTimeout(timeoutId);

    if (!upstream.ok) {
      const text = await upstream.text();
      console.error(`[chat/route] upstream error ${upstream.status}: ${text}`);
      return NextResponse.json(
        { error: "Upstream service error. Please try again." },
        { status: 502 },
      );
    }

    // Read as text first — n8n can return an empty body with HTTP 200
    const rawText = await upstream.text();
    if (!rawText || !rawText.trim()) {
      // n8n occasionally returns an empty body on webhook test runs;
      // treat it as an empty assistant message instead of a hard error.
      console.warn("[chat/route] upstream returned an empty body — treating as empty reply");
      return NextResponse.json({ message: "", isTicketRequired: false, userNotification: "" });
    }

    let data;
    try {
      data = JSON.parse(rawText);
    } catch (parseErr) {
      console.error("[chat/route] failed to parse upstream JSON:", rawText);
      return NextResponse.json(
        { error: "The AI service returned an invalid response." },
        { status: 502 },
      );
    }

    // n8n returns an array; take the first element
    const result = Array.isArray(data) ? data[0] : data;

    return NextResponse.json({
      message: result?.message ?? "",
      isTicketRequired: result?.isTicketRequired ?? false,
      userNotification: result?.userNotification ?? "",
    });
  } catch (err) {
    console.error("[chat/route] unexpected error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
