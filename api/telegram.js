export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method Not Allowed"
        });
    }

    try {
        const {
            name,
            answer,
            message
        } = req.body;

        if (!name || !answer) {
            return res.status(400).json({
                success: false,
                message: "Не заполнены обязательные поля"
            });
        }

        const telegramMessage = `
🎉 НОВЫЙ ОТВЕТ НА ПРИГЛАШЕНИЕ

👤 Имя: ${name}

📋 Ответ: ${answer}

💬 Сообщение:
${message || "Гость ничего не написал"}
        `;

        const telegramResponse = await fetch(
            `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    chat_id: process.env.CHAT_ID,
                    text: telegramMessage
                })
            }
        );

        const telegramData =
            await telegramResponse.json();

        if (!telegramResponse.ok) {
            console.error(
                "Telegram error:",
                telegramData
            );

            return res.status(500).json({
                success: false,
                message: "Ошибка отправки в Telegram"
            });
        }

        return res.status(200).json({
            success: true
        });

    } catch (error) {

        console.error(
            "Server error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Ошибка сервера"
        });
    }
}
