import { NextResponse, NextRequest } from "next/server";
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

export async function POST(req: NextRequest) {
  try {
    const accept = req.headers.get("accept") || "";
    const isDocumentPost = accept.includes("text/html");

    if (isDocumentPost) {
      const form = await req.formData();
      const data = Object.fromEntries(form.entries());
      const parsed = schema.parse({
        firstName: String(data.firstName || ""),
        lastName: String(data.lastName || ""),
        address1: String(data.address1 || ""),
        city: String(data.city || ""),
        state: String(data.state || ""),
        postalCode: String(data.postalCode || ""),
        dateOfBirth: String(data.dateOfBirth || ""),
        ssn: String(data.ssn || ""),
        email: String(data.email || ""),
        password: String(data.password || ""),
      });

      await signUp(parsed); // ставит cookie
      return;
    }

    const json = await req.json();
    const parsed = schema.parse(json);
    const user = await signUp(parsed);
    return NextResponse.json({ ok: true, user });
  } catch (err: any) {
    console.error("sign-up error", err);
    const message = err?.message ?? "Failed to sign up";
    return NextResponse.json({ ok: false, error: message }, {
      status: 400,
    } as any);
  }
}
