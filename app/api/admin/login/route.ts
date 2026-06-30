import { NextResponse } from "next/server";
import { authenticateAdmin, createSession } from "@/lib/auth";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid credentials." },
      { status: 400 },
    );
  }

  const email = parsed.data.email.toLowerCase();
  const valid = await authenticateAdmin(email, parsed.data.password);

  if (!valid) {
    return NextResponse.json(
      { error: "Invalid email or password. Please try again." },
      { status: 401 },
    );
  }

  await createSession(email);
  return NextResponse.json({ success: true });
}
