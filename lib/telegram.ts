// lib/telegram.ts
export async function sendTelegramMessage(text: string): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  console.log('🔍 Token existe?:', !!botToken);
  console.log('🔍 Chat ID existe?:', !!chatId);
  console.log('🔍 Chat ID valor:', chatId);
  console.log('🔍 Token (primeros 10 chars):', botToken?.substring(0, 10) + '...');
  
  if (!botToken || !chatId) {
    console.error('❌ Faltan credenciales de Telegram en .env.local');
    return false;
  }

  const message = `
💌 <b>¡Nuevo mensaje de San Valentín!</b>

━━━━━━━━━━━━━━━━
📝 <b>Mensaje:</b>
<code>${text}</code>
━━━━━━━━━━━━━━━━

👤 <b>Enviado por:</b> Visitante
📅 <b>Fecha:</b> ${new Date().toLocaleString('es-MX')}
  `;

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    const data = await res.json();
    return data.ok;
  } catch (error) {
    console.error('Error enviando a Telegram:', error);
    return false;
  }
}