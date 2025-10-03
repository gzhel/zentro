import { NextResponse } from "next/server";
import { z } from "zod";
import { signIn } from "@/lib/actions/user.actions";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { email, password } = schema.parse(json);

    const user = await signIn({ email, password });

    return NextResponse.json({ ok: true, user });
  } catch (err: any) {
    console.error("sign-in error", err);
    const message = err?.message ?? "Failed to sign in";
    return NextResponse.json({ ok: false, error: message }, {
      status: 400,
    } as any);
  }
}
