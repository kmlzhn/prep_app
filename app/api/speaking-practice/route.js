import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';
import ffmpegPath from 'ffmpeg-static';
import { analyzeIELTSSpeakingWithGemini } from '../../../lib/gemini';

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

// Mock feedback generator for when API is unavailable
function generateMockFeedback(transcription = "This is a mock transcription for testing purposes.") {
  const baseScore = 6.0 + Math.random() * 1.5;
  
  return {
    transcription: transcription,
    score: parseFloat(baseScore.toFixed(1)),
    criteria: {
      fluency: parseFloat((baseScore - 0.5 + Math.random()).toFixed(1)),
      pronunciation: parseFloat((baseScore - 0.3 + Math.random()).toFixed(1)),
      lexicalResource: parseFloat((baseScore - 0.2 + Math.random()).toFixed(1)),
      grammar: parseFloat((baseScore - 0.4 + Math.random()).toFixed(1))
    },
    feedback: {
      positive: [
        "Good pronunciation of most words",
        "Natural speaking pace",
        "Use of varied vocabulary"
      ],
      improvements: [
        "Reduce pauses and repetitions",
        "Work on intonation in question sentences",
        "Use more complex grammatical structures"
      ]
    },
    detailedAnalysis: {
      wordsPerMinute: Math.floor(120 + Math.random() * 50),
      pauseCount: Math.floor(5 + Math.random() * 8),
      repetitions: Math.floor(2 + Math.random() * 5),
      incorrectPronunciations: [
        {
          word: "comfortable",
          yourPronunciation: "/ˈkʌmfərtəbl/",
          correctPronunciation: "/ˈkʌmftəbl/"
        }
      ]
    },
    nextSteps: [
      "Practice answering similar questions",
      "Record yourself again and compare with this result",
      "Study useful phrases for this type of question"
    ]
  };
}

// This would be replaced with actual LLM API calls in production
async function generateQuestionWithLLM(part) {
  // Simulate LLM response time
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Questions database organized by part
  const questionsByPart = {
    1: [
      {
        part: 1,
        topic: "Work and Education",
        question: "Tell me about your work or studies. What do you enjoy most about it?"
      },
      {
        part: 1,
        topic: "Hobbies and Interests",
        question: "What hobbies do you have? How long have you been doing them?"
      },
      {
        part: 1,
        topic: "Hometown",
        question: "Tell me about the city where you grew up. What do you like or dislike about it?"
      },
      {
        part: 1,
        topic: "Travel",
        question: "Do you enjoy traveling? What's your favorite place to visit?"
      }
    ],
    2: [
      {
        part: 2,
        topic: "Describing a Place",
        question: "Describe a place where you like to spend time. Explain why you like it.",
        points: ["Where this place is", "How often you go there", "What you do there", "Why it's special to you"]
      },
      {
        part: 2,
        topic: "Important Event",
        question: "Describe an important event in your life. Explain why it was significant to you.",
        points: ["What the event was", "When and where it happened", "Who was involved", "Why it was important to you"]
      },
      {
        part: 2,
        topic: "Interesting Book",
        question: "Talk about an interesting book you've read recently.",
        points: ["What the book is", "What it's about", "Why you read it", "Why you found it interesting"]
      }
    ],
    3: [
      {
        part: 3,
        topic: "Technology",
        question: "How has technology changed the way people communicate?"
      },
      {
        part: 3,
        topic: "Education",
        question: "Do you think the education system will change in the future? If so, how?"
      },
      {
        part: 3,
        topic: "Environment",
        question: "What environmental issues are most important in your country? How can they be solved?"
      },
      {
        part: 3,
        topic: "Culture",
        question: "How does globalization affect cultural identity in different countries?"
      }
    ]
  };
  
  // Get questions for the specified part
  const questions = questionsByPart[part] || questionsByPart[1];
  
  // Return a random question from the appropriate part
  return questions[Math.floor(Math.random() * questions.length)];
}

// Analyze response using Whisper for transcription and Gemini for analysis
async function analyzeResponseWithLLM(audioData, question, part) {
  try {
    console.log('Starting analysis with audio data length:', audioData.length);
    
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Save the audio data to a file
    const filename = `audio_${Date.now()}_${Math.round(Math.random() * 100000)}.webm`;
    const filepath = path.join(uploadsDir, filename);
    
    // Convert base64 to buffer and save
    const buffer = Buffer.from(audioData, 'base64');
    fs.writeFileSync(filepath, buffer);
    console.log('Audio file saved:', filepath, 'Size:', buffer.length);

    let transcription = { text: "" };
    let transcriptionSource = "OpenAI Whisper";
    
    try {
      // Trim silence from audio file
      const trimmedFilename = `trimmed_${filename}`;
      const trimmedFilepath = path.join(uploadsDir, trimmedFilename);
      const trimSuccess = await trimSilence(filepath, trimmedFilepath);
      
      const fileToTranscribe = trimSuccess ? trimmedFilepath : filepath;
      console.log('File to transcribe:', fileToTranscribe);

      // Check if file exists and has content
      const stats = fs.statSync(fileToTranscribe);
      console.log('File stats:', stats);
      if (stats.size < 1000) { // Minimum file size check (1KB)
        throw new Error('Audio file is too small or empty');
      }

      // Step 1: Transcribe with OpenAI Whisper
      console.log('Starting transcription with OpenAI Whisper...');
      
      // Check if OpenAI client is available
      if (!openai) {
        console.log('OpenAI client not available, using mock transcription');
        transcription = { text: "Mock transcription for testing purposes" };
        transcriptionSource = "Mock (OpenAI not configured)";
      } else {
        transcription = await openai.audio.transcriptions.create({
          file: fs.createReadStream(fileToTranscribe),
          model: 'whisper-1',
          language: 'en', // Default to English, can be made dynamic
        });
        console.log('Transcription completed:', transcription.text);
      }

      // Clean up files
      try {
        fs.unlinkSync(filepath);
        if (trimSuccess && fs.existsSync(trimmedFilepath)) {
          fs.unlinkSync(trimmedFilepath);
        }
        console.log('Files cleaned up successfully');
      } catch (error) {
        console.error('Error cleaning up files:', error);
      }
    } catch (error) {
      console.error('Error in transcription:', error);
      
      // Clean up the original file if it exists
      try {
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
      } catch (cleanupError) {
        console.error('Error cleaning up files after transcription error:', cleanupError);
      }
      
      // If there's an API error, return mock feedback
      if (error.status === 429 || error.code === 'insufficient_quota') {
        console.log('Using mock feedback due to API quota limitations');
        return generateMockFeedback();
      }
      
      throw error;
    }

    // Check if transcription is empty or too short
    if (!transcription.text || transcription.text.trim().length < 3) {
      console.error('Transcription is empty or too short:', transcription.text);
      return {
        transcription: transcription.text || "",
        transcriptionSource: transcriptionSource,
        score: 4.0,
        criteria: {
          fluency: 4.0,
          pronunciation: 4.0,
          lexicalResource: 4.0,
          grammar: 4.0
        },
        feedback: {
          positive: [
            "You attempted to answer the question"
          ],
          improvements: [
            "Speak more clearly and loudly",
            "Try to provide a more detailed response",
            "Make sure your microphone is working properly"
          ]
        },
        detailedAnalysis: {
          wordsPerMinute: 0,
          pauseCount: 0,
          repetitions: 0,
          incorrectPronunciations: []
        },
        nextSteps: [
          "Check your microphone settings",
          "Try recording in a quieter environment",
          "Practice speaking more clearly and loudly"
        ],
        error: "The audio recording was too short or unclear to analyze properly"
      };
    }

    try {
      // Step 2: Analyze the transcription with Gemini
      console.log('Starting analysis with Gemini...');
      console.log('Question for analysis:', question);
      console.log('Transcribed text for analysis:', transcription.text);
      
      // Clean up the transcription text if needed
      const cleanedText = transcription.text.trim();
      
      const analysis = await analyzeIELTSSpeakingWithGemini(question, cleanedText);
      console.log('Analysis completed successfully');
      console.log('Analysis result:', JSON.stringify(analysis, null, 2));
      
      // Add the transcribed text to the analysis
      analysis.transcription = cleanedText;
      
      // Add info about which service was used for transcription
      analysis.transcriptionSource = transcriptionSource;
      
      return analysis;
    } catch (error) {
      console.error('Error in IELTS analysis with Gemini:', error);
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);
      
      // If there's an API error, return mock feedback with the real transcription
      console.log('Falling back to mock feedback');
      return generateMockFeedback(transcription.text);
    }
  } catch (error) {
    console.error('Error analyzing response:', error);
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
    throw error;
  }
}

export async function POST(request) {
  try {
    const { audioData, question, part } = await request.json();
    
    if (!audioData) {
      return NextResponse.json(
        { error: 'No audio recording provided' },
        { status: 400 }
      );
    }
    
    console.log('Received request with question:', question, 'part:', part);
    console.log('Audio data length:', audioData.length);
    
    // Process the audio with Whisper and analyze with Gemini
    const analysis = await analyzeResponseWithLLM(audioData, question, part);
    
    console.log('Final analysis result:', JSON.stringify(analysis, null, 2));
    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Speaking Practice Error:', error);
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
    
    return NextResponse.json(
      { 
        error: 'An error occurred while analyzing the speech',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    // Get the part parameter from the URL
    const { searchParams } = new URL(request.url);
    const part = parseInt(searchParams.get('part') || '1');
    
    // Generate a question using the LLM
    const question = await generateQuestionWithLLM(part);
    
    return NextResponse.json({
      question,
      timeLimit: question.part === 2 ? 120 : 60 // 2 minutes for Part 2, 1 minute for others
    });
  } catch (error) {
    console.error('Speaking Practice Error:', error);
    return NextResponse.json(
      { error: 'An error occurred while getting the question' },
      { status: 500 }
    );
  }
} 