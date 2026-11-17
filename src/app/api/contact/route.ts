import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { checkRateLimit } from "@/lib/rate-limit";

interface ContactPayload {
  name?: string;
  email?: string;
  intent?: string;
  message?: string;
  companyWebsite?: string;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const rate = checkRateLimit(ip);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          ok: false,
          error: `Too many requests. Please wait ${Math.ceil(
            rate.retryAfterSeconds / 60
          )} minute(s) before trying again.`,
        },
        { status: 429 }
      );
    }

    const body = (await request.json()) as ContactPayload;

    // Honeypot check: silently succeed without sending email
    if (body.companyWebsite && body.companyWebsite.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const intent =
      body.intent === "profile"
        ? "Profile request"
        : body.intent === "briefing"
          ? "Briefing request"
          : "General enquiry";
    const message = (body.message || "").trim();

    if (name.length < 2 || name.length > 120) {
      return NextResponse.json(
        { ok: false, error: "Please provide a valid name." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) {
      return NextResponse.json(
        { ok: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (message.length < 10 || message.length > 5000) {
      return NextResponse.json(
        {
          ok: false,
          error: "Please include a message of at least 10 characters.",
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL ||
      "Website Contact <onboarding@resend.dev>";

    if (!apiKey || !toEmail) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Email delivery is not configured yet. Please reach out via LinkedIn in the meantime.",
        },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `[${intent}] Message from ${name}`,
      text: [
        `Enquiry type: ${intent}`,
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    if (error) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Unable to deliver your message right now. Please try again later.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request payload." },
      { status: 400 }
    );
  }
}
