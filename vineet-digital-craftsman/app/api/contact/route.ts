import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().min(1).max(80),
  message: z.string().trim().min(10).max(4000),
  website: z.string().optional(),
});

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Check the form fields and try again.' }, { status: 400 });
  // Quietly accept honeypot submissions without delivering email.
  if (parsed.data.website) return NextResponse.json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_TO_EMAIL;
  const sender = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !recipient || !sender) {
    return NextResponse.json({ error: 'Contact delivery is not configured yet. Please email hello@vineet.dev.' }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const { name, email, subject, message } = parsed.data;
  const { error } = await resend.emails.send({
    from: sender,
    to: recipient,
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });
  if (error) return NextResponse.json({ error: 'The message could not be delivered. Please email hello@vineet.dev.' }, { status: 502 });
  return NextResponse.json({ ok: true });
}
