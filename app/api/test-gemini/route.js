import { NextResponse } from 'next/server';
import { generateTextWithGemini } from '../../../lib/gemini';

export async function POST(request) {
  try {
    const { prompt } = await request.json();
    
    if (!prompt) {
      return NextResponse.json(
        { error: 'No prompt provided' },
        { status: 400 }
      );
    }
    
    // Test Gemini with a simple prompt
    const result = await generateTextWithGemini(prompt, { 
      temperature: 0.7,
      maxTokens: 500
    });
    
    return NextResponse.json({
      success: true,
      result: result
    });
  } catch (error) {
    console.error('Gemini Test Error:', error);
    return NextResponse.json(
      { 
        error: 'An error occurred while testing Gemini',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Simple test prompt
    const testPrompt = "Hello! Please respond with 'Gemini is working correctly' if you can see this message.";
    
    const result = await generateTextWithGemini(testPrompt, { 
      temperature: 0.3,
      maxTokens: 100
    });
    
    return NextResponse.json({
      success: true,
      result: result,
      message: "Gemini API is working"
    });
  } catch (error) {
    console.error('Gemini Test Error:', error);
    return NextResponse.json(
      { 
        error: 'An error occurred while testing Gemini',
        details: error.message 
      },
      { status: 500 }
    );
  }
} 