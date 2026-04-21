import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const email = String(form.get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Please use a valid email." }, { status: 400 });
    }

    // TODO: forward to Buttondown / Beehiiv / Mailchimp once configured.
    // For now, log and accept so the form completes during dev.
    console.log("[subscribe]", email);

    // Optional: notify the team via Resend.
    const key = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL ?? "hello@birchbankgolf.com";
    if (key) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify({
          from: "Birchbank Website <hello@birchbankgolf.com>",
          to: [to],
          subject: "New newsletter signup",
          text: email,
        }),
      }).catch(() => {});
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[subscribe]", e);
    return NextResponse.json({ ok: false, error: "Unexpected error." }, { status: 500 });
  }
}
