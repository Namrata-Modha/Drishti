// Vercel serverless function — proxies requests to Gemini
// Uses CommonJS (module.exports) — required because package.json has no "type":"module"
// GEMINI_API_KEY must be set in Vercel Dashboard > Settings > Environment Variables

module.exports = async function handler(req, res) {
  // CORS headers — needed if you ever call from a different domain
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages, systemPrompt } = req.body || {};
  if (!messages || !systemPrompt) {
    return res.status(400).json({ error: 'Missing messages or systemPrompt in request body' });
  }

  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return res.status(500).json({
      error: 'GEMINI_API_KEY not set on server.',
      hint: 'Add it in Vercel Dashboard → Your Project → Settings → Environment Variables, then redeploy.'
    });
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;

  try {
    const geminiRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemPrompt }],
        },
        contents: messages.map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        })),
        generationConfig: {
          maxOutputTokens: 2048,   // was 1024 — was cutting off mid-sentence
          temperature: 0.72,
        },
      }),
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error('Gemini API error:', geminiRes.status, errText.slice(0, 300));
      return res.status(502).json({
        error: `Gemini returned ${geminiRes.status}`,
        detail: errText.slice(0, 300)
      });
    }

    const data = await geminiRes.json();

    // Log finish reason so we can debug truncation
    const finishReason = data.candidates?.[0]?.finishReason;
    if (finishReason && finishReason !== 'STOP') {
      console.warn('Gemini finish reason:', finishReason);
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? 'No response generated.';
    return res.status(200).json({ text });

  } catch (err) {
    console.error('Handler error:', err.message);
    return res.status(500).json({ error: 'Internal server error', detail: err.message });
  }
};