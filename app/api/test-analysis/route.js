import { NextResponse } from 'next/server';
import { analyzeIELTSSpeakingWithGemini } from '../../../lib/gemini';

export async function POST(request) {
  try {
    const { question, response } = await request.json();
    
    if (!question || !response) {
      return NextResponse.json(
        { error: 'Question and response are required' },
        { status: 400 }
      );
    }
    
    console.log('Testing analysis with:');
    console.log('Question:', question);
    console.log('Response:', response);
    
    // Test the analysis function directly
    const analysis = await analyzeIELTSSpeakingWithGemini(question, response);
    
    return NextResponse.json({
      success: true,
      analysis: analysis
    });
  } catch (error) {
    console.error('Test Analysis Error:', error);
    return NextResponse.json(
      { 
        error: 'An error occurred while testing analysis',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Test with a simple example
    const testQuestion = "Tell me about your hometown.";
    const testResponse = "I live in a small city called Manchester. It's located in the north of England and has about 500,000 people. I really like it because there are many parks and good restaurants. The weather is usually rainy but the people are very friendly.";
    
    const analysis = await analyzeIELTSSpeakingWithGemini(testQuestion, testResponse);
    
    return NextResponse.json({
      success: true,
      testQuestion: testQuestion,
      testResponse: testResponse,
      analysis: analysis
    });
  } catch (error) {
    console.error('Test Analysis Error:', error);
    return NextResponse.json(
      { 
        error: 'An error occurred while testing analysis',
        details: error.message 
      },
      { status: 500 }
    );
  }
} 