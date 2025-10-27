export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const BOT_TOKEN = "8342680845:AAHiU111qStqmtMw_gx0LVoD2XyKn0kA_u0";
  const CHAT_ID = "7538641361";

  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Missing text" });
    }

    const telegramResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "Markdown"
      })
    });

    if (!telegramResponse.ok) {
      const errText = await telegramResponse.text();
      console.error("Telegram error:", errText);
      return res.status(500).json({ message: "Telegram API error", errText });
    }

    return res.status(200).json({ message: "Sent to Telegram successfully" });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}
