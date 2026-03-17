import { NextResponse } from "next/server";
import { Pool } from "pg";

/**
 * Reuse a single connection pool for the lifetime of the server process.
 * Next.js hot-reloads in dev, so we store the pool on the global object
 * to avoid creating a new pool on every file change.
 */
const globalForPg = globalThis;
if (!globalForPg._pgPool) {
  globalForPg._pgPool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DB,
    ssl: { rejectUnauthorized: false },
    max: 5,
    idleTimeoutMillis: 30_000,
  });
}

const pool = globalForPg._pgPool;

/**
 * GET /api/chat/history
 *
 * Returns the 20 most-recent rows from `n8n_chat_histories`
 * in descending order (newest first / last inserted row on top).
 *
 * Response shape:
 * {
 *   success: true,
 *   count: number,
 *   history: [
 *     { session_id, role, message, id, created_at }
 *   ]
 * }
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: "Missing session_id" },
        { status: 400 },
      );
    }

    const { rows } = await pool.query(
      `SELECT * FROM (
         SELECT session_id, role, message, id, created_at
         FROM   chat_messages
         WHERE  session_id = $1
         ORDER  BY created_at DESC
         LIMIT  20
       ) sub
       ORDER  BY created_at ASC`,
      [sessionId],
    );

    return NextResponse.json({
      success: true,
      count: rows.length,
      history: rows,
    });
  } catch (err) {
    console.error("[chat/history] DB error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch chat history." },
      { status: 500 },
    );
  }
}
