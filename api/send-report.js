import { Resend } from 'resend';
import { buildEmailHtml } from '../src/lib/emailTemplate.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, results, auditType } = req.body;

  if (!email || !results) {
    return res.status(400).json({ error: 'email and results are required' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'RESEND_API_KEY is not set' });
  }

  try {
    const resend = new Resend(apiKey);
    const html = buildEmailHtml({ results, auditType });

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Your CEO Resonance Audit Results',
      html,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('[send-report] Error:', err);
    return res.status(500).json({ error: err.message || 'Failed to send email' });
  }
}
