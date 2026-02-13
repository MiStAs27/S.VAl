// lib/ntfy.ts
export async function sendNtfyMessage(text: string): Promise<boolean> {
  const topic = 'sanvalentin_herlan'; // Cámbialo si quieres otro nombre
  const url = `https://ntfy.sh`;

  const payload = {
    topic: topic,
    title: '💖 Nuevo mensaje de San Valentín',
    message: `“${text}”`,
    priority: 4, // Alta
    tags: ['heart'],
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch (error) {
    console.error('❌ Error enviando a ntfy:', error);
    return false;
  }
}