export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {

        const TOKEN = process.env.TELEGRAM_TOKEN;
        const CHAT_ID = process.env.CHAT_ID;

        const { name, answer, comment, created } = req.body;

        const text = `🎉 Новый ответ на приглашение

👤 Имя: ${name}
✅ Ответ: ${answer}
💬 Комментарий: ${comment || "нет"}
🕒 ${created}`;

        const telegram = await fetch(
            `https://api.telegram.org/bot${TOKEN}/sendMessage`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text
                })
            }
        );

        const result = await telegram.json();

        return res.status(200).json(result);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: error.message
        });

    }

}
