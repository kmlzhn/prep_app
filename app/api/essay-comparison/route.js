import { NextResponse } from 'next/server';
import { compareIELTSEssays } from '../../../lib/gemini';

export async function POST(request) {
  try {
    const { essay1, essay2, taskType, question } = await request.json();
    
    if (!essay1 || !essay2 || essay1.trim().length === 0 || essay2.trim().length === 0) {
      return NextResponse.json(
        { error: 'Both essays are required' },
        { status: 400 }
      );
    }
    
    console.log('Received essays for comparison');
    console.log('Task type:', taskType);
    console.log('Question:', question);
    console.log('Essay 1 length:', essay1.length, 'characters');
    console.log('Essay 2 length:', essay2.length, 'characters');
    
    // Compare the essays with Gemini
    const comparison = await compareIELTSEssays(essay1, essay2, taskType, question);
    
    console.log('Comparison completed successfully');
    return NextResponse.json(comparison);
  } catch (error) {
    console.error('Essay Comparison Error:', error);
    console.error('Error details:', error.message);
    
    return NextResponse.json(
      { 
        error: 'An error occurred while comparing the essays',
        details: error.message 
      },
      { status: 500 }
    );
  }
} 