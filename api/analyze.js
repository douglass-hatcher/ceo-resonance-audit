import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT, buildUserPrompt, parseAnalysisResponse } from '../src/lib/analyzeCore.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { auditType, visibilityData, clarityData } = req.body;

  if (!auditType) {
    return res.status(400).json({ error: 'auditType is required' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY environment variable is not set' });
  }

  try {
    const client = new Anthropic({ apiKey });
    const userPrompt = buildUserPrompt(auditType, visibilityData, clarityData);

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const result = parseAnalysisResponse(message.content[0].text);
    return res.status(200).json(result);
  } catch (err) {
    console.error('[analyze] Error:', err);
    return res.status(500).json({ error: err.message || 'Analysis failed' });
  }
}
