import { portfolio } from "@/app/data/portfolio";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readField(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ message: "Please submit a valid message." }, { status: 400 });
  }

  const name = readField(payload.name);
  const email = readField(payload.email);
  const message = readField(payload.message);
  const website = readField(payload.website);

  if (website) {
    return Response.json({ message: "Message sent." });
  }

  if (!name || name.length > 80 || !emailPattern.test(email) || email.length > 254) {
    return Response.json({ message: "Please enter a valid name and email address." }, { status: 400 });
  }

  if (!message || message.length > 5000) {
    return Response.json({ message: "Please enter a message under 5,000 characters." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json(
      { message: "Email delivery is not configured yet. Please use the email link below." },
      { status: 503 },
    );
  }

  const safeName = name.replace(/[\r\n]+/g, " ");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
      to: [portfolio.email],
      reply_to: email,
      subject: `Portfolio message from ${safeName}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });

  if (!response.ok) {
    console.error("Contact email delivery failed", response.status, await response.text());
    return Response.json(
      { message: "Your message could not be delivered. Please try the email link below." },
      { status: 502 },
    );
  }

  return Response.json({ message: "Message sent." });
}
