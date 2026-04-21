import { NextResponse } from "next/server";

export const runtime = "nodejs";

const BAD_REQUEST = (msg: string) =>
  NextResponse.json({ ok: false, error: msg }, { status: 400 });

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const topic = String(form.get("topic") ?? "General");
    const message = String(form.get("message") ?? "").trim();
    const honeypot = String(form.get("company") ?? "");

    if (honeypot) return NextResponse.json({ ok: true }); // silent drop
    if (!name || !email || !message) return BAD_REQUEST("Please fill in every field.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return BAD_REQUEST("That email looks off.");
    if (message.length > 5000) return BAD_REQUEST("Message is too long.");

    const key = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL ?? "hello@birchbankgolf.com";

    if (!key) {
      // Not configured yet — log locally, return success so dev flows don't break.
      console.log("[contact]", { name, email, topic, message });
      return NextResponse.json({ ok: true, delivered: false });
    }

    const body = {
      from: "Birchbank Website <hello@birchbankgolf.com>",
      to: [to],
      reply_to: email,
      subject: `Website · ${topic} · ${name}`,
      text: `${name} <${email}>\nTopic: ${topic}\n\n${message}`,
    };

    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify(body),
    });

    if (!r.ok) {
      const text = await r.text();
      console.error("[contact] Resend failed", r.status, text);
      return NextResponse.json({ ok: false, error: "Delivery failed." }, { status: 502 });
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (e) {
    console.error("[contact]", e);
    return NextResponse.json({ ok: false, error: "Unexpected error." }, { status: 500 });
  }
}
