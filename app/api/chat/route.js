import { NextResponse } from "next/server";
import axios from "axios";

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

    let upstreamRes;
    try {
      upstreamRes = await axios.post(
        webhookUrl,
        { query: query.trim(), id },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 30000, // 30 seconds timeout
        },
      );
    } catch (axiosErr) {
      console.error(
        "[chat/route] axios failed:",
        axiosErr.message,
        axiosErr.code,
      );

      // Axios handles HTTP errors (status >= 400) inside this catch block
      if (axiosErr.response) {
        console.error(
          `[chat/route] upstream error ${axiosErr.response.status}:`,
          axiosErr.response.data,
        );
        return NextResponse.json(
          { error: "Upstream service error. Please try again." },
          { status: 502 },
        );
      }

      const isTimeout =
        axiosErr.code === "ECONNABORTED" || axiosErr.code === "ETIMEDOUT";
      return NextResponse.json(
        {
          error: isTimeout
            ? "The AI service timed out. Please try again."
            : "Could not reach the AI service.",
        },
        { status: 504 },
      );
    }

    // Read as text or object — axios automatically parses JSON if present
    const rawData = upstreamRes.data;
    if (!rawData || (typeof rawData === "string" && !rawData.trim())) {
      // n8n occasionally returns an empty body on webhook test runs;
      // treat it as an empty assistant message instead of a hard error.
      console.warn(
        "[chat/route] upstream returned an empty body — treating as empty reply",
      );
      return NextResponse.json({
        message: "",
        isTicketRequired: false,
        userNotification: "",
        is_leaving: "",
      });
    }

    let data;
    if (typeof rawData === "string") {
      try {
        data = JSON.parse(rawData);
      } catch (parseErr) {
        console.error("[chat/route] failed to parse upstream JSON:", rawData);
        return NextResponse.json(
          { error: "The AI service returned an invalid response." },
          { status: 502 },
        );
      }
    } else {
      data = rawData;
    }

    // n8n returns an array; take the first element
    const result = Array.isArray(data) ? data[0] : data;

    return NextResponse.json({
      message: result?.message ?? "",
      isTicketRequired: result?.isTicketRequired ?? false,
      userNotification: result?.userNotification ?? "",
      id: result?.id,
      session_id: result?.session_id,
      is_leaving: result?.is_leaving,
      role: result?.role,
      created_at: result?.created_at,
    });
  } catch (err) {
    console.error("[chat/route] unexpected error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
