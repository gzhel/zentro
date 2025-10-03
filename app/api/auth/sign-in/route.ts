import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";
import { signIn } from "@/lib/actions/user.actions";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: NextRequest) {
  try {
    const accept = req.headers.get("accept") || "";
    const isDocumentPost = accept.includes("text/html");

    if (isDocumentPost) {
      const form = await req.formData();
      const email = String(form.get("email") || "");
      const password = String(form.get("password") || "");
      schema.parse({ email, password });

      await signIn({ email, password });
      return NextResponse.redirect(new URL("/", req.url));
    }

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
