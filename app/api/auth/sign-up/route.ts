import { NextResponse } from "next/server";
import { z } from "zod";
import { signUp } from "@/lib/actions/user.actions";

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  address1: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  postalCode: z.string().min(1),
  dateOfBirth: z.string().min(1),
  ssn: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = schema.parse(json);

    const newUser = await signUp(data);

    return NextResponse.json({ ok: true, user: newUser });
  } catch (err: any) {
    console.error("sign-up error", err);
    const message = err?.message ?? "Failed to sign up";
    return NextResponse.json({ ok: false, error: message }, {
      status: 400,
    } as any);
  }
}
