import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';
import ffmpegPath from 'ffmpeg-static';

const execPromise = util.promisify(exec);

// Initialize OpenAI client only if API key is available
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

// Function to trim silence from audio file using ffmpeg
async function trimSilence(inputPath, outputPath) {
  try {
    // Use ffmpeg-static path instead of system ffmpeg
    const command = `"${ffmpegPath}" -i "${inputPath}" -af silenceremove=stop_periods=-1:stop_duration=1:stop_threshold=-50dB "${outputPath}"`;
    await execPromise(command);
    return true;
  } catch (error) {
    console.error('Error trimming audio:', error);
    return false;
  }
}

export async function POST(request) {
  try {
    // Parse the multipart form data
    const formData = await request.formData();
    const audioFile = formData.get('audio');
    const language = formData.get('language') || 'en'; // Default to English
    
    if (!audioFile) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Convert blob to buffer and save the file
    const buffer = Buffer.from(await audioFile.arrayBuffer());
    const filename = `audio_${Date.now()}_${Math.round(Math.random() * 100000)}.webm`;
    const filepath = path.join(uploadsDir, filename);
    fs.writeFileSync(filepath, buffer);

    // Trim silence from audio file
    const trimmedFilename = `trimmed_${filename}`;
    const trimmedFilepath = path.join(uploadsDir, trimmedFilename);
    const trimSuccess = await trimSilence(filepath, trimmedFilepath);
    
    const fileToTranscribe = trimSuccess ? trimmedFilepath : filepath;

    // Check if file exists and has content
    const stats = fs.statSync(fileToTranscribe);
    if (stats.size < 1000) { // Minimum file size check (1KB)
      return NextResponse.json({ error: 'Audio file is too small or empty' }, { status: 400 });
    }

    // Check if OpenAI client is available
    if (!openai) {
      return NextResponse.json({ 
        error: 'OpenAI API key not configured',
        text: 'Mock transcription (OpenAI not configured)'
      }, { status: 500 });
    }

    // Send to OpenAI Whisper API
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(fileToTranscribe),
      model: 'whisper-1',
      language: language,
      response_format: 'json',
    });

    // Clean up files
    try {
      fs.unlinkSync(filepath);
      if (trimSuccess) fs.unlinkSync(trimmedFilepath);
    } catch (error) {
      console.error('Error cleaning up files:', error);
    }

    return NextResponse.json({
      text: transcription.text,
      language: language,
    });
  } catch (error) {
    console.error('Speech to text error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred during speech to text conversion' },
      { status: 500 }
    );
  }
} 