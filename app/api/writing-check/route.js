import { NextResponse } from 'next/server';
import { analyzeIELTSWriting } from '../../../lib/gemini';

export async function POST(request) {
  try {
    const { essay, taskType, question } = await request.json();
    
    if (!essay || essay.trim().length === 0) {
      return NextResponse.json(
        { error: 'No essay provided' },
        { status: 400 }
      );
    }
    
    console.log('Received essay for analysis');
    console.log('Task type:', taskType);
    console.log('Question:', question);
    console.log('Essay length:', essay.length, 'characters');
    
    // Analyze the essay with Gemini
    const analysis = await analyzeIELTSWriting(essay, taskType, question);
    
    console.log('Analysis completed successfully');
    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Writing Check Error:', error);
    console.error('Error details:', error.message);
    
    return NextResponse.json(
      { 
        error: 'An error occurred while analyzing the essay',
        details: error.message 
      },
      { status: 500 }
    );
  }
} 