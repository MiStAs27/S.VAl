import { NextRequest, NextResponse } from 'next/server';
import { sendNtfyMessage } from '@/lib/ntfy';

export async function POST(request: NextRequest) {
  const { text } = await request.json();
  if (!text) return NextResponse.json({ error: 'No text' }, { status: 400 });
  await sendNtfyMessage(text);
  return NextResponse.json({ success: true });
}