import OpenAI from 'openai';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { prompt, language = 'en' } = req.body || {};
    if (!process.env.OPENAI_API_KEY) return res.status(500).json({ error: 'OPENAI_API_KEY missing' });
    if (!prompt) return res.status(400).json({ error: 'Missing prompt' });

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const sys = `You are an education content generator. Create a short, culturally relevant lesson (250-400 words) and a 3-question multiple-choice quiz. Output JSON with keys lessonTitle, lessonContent, quiz[{question, answers[4], correctIndex}]. Use the requested locale strictly; if the language code is 'yo' (Yoruba), 'ha' (Hausa), 'ig' (Igbo), 'sw' (Swahili), or 'tw' (Twi), generate in that language. Language code: ${language}.`;
    const user = `Topic: ${prompt}. Language: ${language}. Keep it concise for low bandwidth.`;

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: sys },
        { role: 'user', content: user }
      ],
      temperature: 0.7,
    });

    const text = completion.choices?.[0]?.message?.content || '';
    let json;
    try { json = JSON.parse(text); } catch {
      // attempt to extract json block
      const match = text.match(/\{[\s\S]*\}/);
      if (match) json = JSON.parse(match[0]);
    }
    if (!json) return res.status(500).json({ error: 'Malformed AI output' });
    return res.status(200).json(json);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
