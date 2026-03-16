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
    port: Number(process.env.POSTGRES_PORT ?? 5432),
    database: process.env.POSTGRES_DB,
    ssl: { rejectUnauthorized: false }, // required for NeonDB
    max: 5,
    idleTimeoutMillis: 30_000,
  });
}

const pool = globalForPg._pgPool;

/**
 * GET /api/chat/history
 *
 * Returns the 20 most-recent rows from `n8n_chat_histories`
 * in descending order (newest first).
 *
 * Response shape:
 * {
 *   success: true,
 *   count: number,
 *   history: [
 *     { id, session_id, message, created_at, ... }
 *   ]
 * }
 */
export async function GET() {
  try {
    const { rows } = await pool.query(
      `SELECT *
       FROM   n8n_chat_histories
       ORDER  BY id DESC
       LIMIT  20`,
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
