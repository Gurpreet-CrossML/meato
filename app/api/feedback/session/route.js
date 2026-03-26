import { NextResponse } from "next/server";

/**
 * POST /api/feedback/session
 * Server-side proxy to the FastAPI backend to submit session feedback.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { session_id, session_rating, comment } = body;

    if (!session_id) {
      return NextResponse.json(
        { error: "session_id is required" },
        { status: 400 },
      );
    }

    if (!session_rating) {
      return NextResponse.json(
        { error: "session_rating is required" },
        { status: 400 },
      );
    }

    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    const apiUrl = `${backendUrl}/feedback/session`;

    const upstream = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ session_id, session_rating, comment }),
    });

    if (!upstream.ok) {
      const text = await upstream.text();
      console.error(
        `[feedback/session] upstream error ${upstream.status}: ${text}`,
      );
      return NextResponse.json(
        { error: "Failed to submit feedback." },
        { status: upstream.status },
      );
    }

    const data = await upstream.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("[feedback/session] unexpected error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
