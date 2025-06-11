// lib/authMiddleware.ts
import type { NextApiRequest } from "next";
import { createClient } from "./server";

export async function requireUser(req: NextApiRequest) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) return { user: null, error: "No token" };

  const supabaseAdmin = await createClient();
  const {
    data: { user },
    error,
  } = await supabaseAdmin.auth.getUser(token);
  if (error || !user) return { user: null, error: "Invalid token" };

  return { user, error: null };
}
