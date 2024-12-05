import { NextResponse } from 'next/server';
import { Ollama } from 'ollama'
import * as fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file = data.get('image');

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: 'No image data provided' }, { status: 400 });
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `scan_${timestamp}.jpg`;
    const filepath = path.join(uploadsDir, filename);

    // Convert Blob to Buffer and save
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filepath, buffer);

    // Use the saved image file with Ollama
    // If running in Docker, use the Docker host to access Ollama
    const ollamaHost = process.env.NODE_ENV === 'production' ? 'host.docker.internal' : 'localhost';
    const ollama = new Ollama({ host: 'http://' + ollamaHost + ':11434' })
    const res = await ollama.chat({
      model: 'llama3.2-vision',
      messages: [{
        role: 'user',
        content: 'What text is displayed in this image. I am looking for text that followed a format of 4 digit charecters followed by two text charecters like HF',
        images: [filepath]
      }]
    });


    const text = res.message?.content || '';
    const regex = /\d{4}[a-z]{2}/i;
    const match = text.match(regex)
    const code = match?.[0];

    // Clean up - delete the temporary image file
    fs.unlinkSync(filepath);

    if (!code) {
      return NextResponse.json({ error: 'Failed to find code in image' }, { status: 404 });
    }

    return NextResponse.json({ code });
  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json(
      { error: 'Error processing image' },
      { status: 500 }
    );
  }
}
