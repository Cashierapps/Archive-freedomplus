// /api/sendToTelegram.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const botToken = "8342680845:AAHiU111qStqmtMw_gx0LVoD2XyKn0kA_u0";
  const chatId = "7538641361"; // Your Telegram user ID

  const body = req.body;

  // 🧩 Build a readable message dynamically
  let text = "📩 *New Form Submission*\n\n";
  for (const key in body) {
    text += `*${key}:* ${body[key]}\n`;
  }

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: "Markdown"
      })
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Telegram send error:", error);
    return res.status(500).json({ error: "Failed to send message to Telegram" });
  }
}
