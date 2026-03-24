import { NextResponse } from "next/server";

/**
 * PATCH /api/chat/like
 * Server-side proxy to the FastAPI backend to update the like/dislike status.
 */
export async function PATCH(request) {
  try {
    const { id, is_liked } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    const apiUrl = `${backendUrl}/chat/${id}/like`;

    const upstream = await fetch(apiUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_liked }),
    });

    if (!upstream.ok) {
      const text = await upstream.text();
      console.error(`[chat/like] upstream error ${upstream.status}: ${text}`);
      return NextResponse.json(
        { error: "Failed to update like status." },
        { status: upstream.status }
      );
    }

    const data = await upstream.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("[chat/like] unexpected error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
