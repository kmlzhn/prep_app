import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generate text using Gemini AI
 * @param {string} prompt - The prompt to generate text from
 * @param {Object} options - Additional options
 * @returns {Promise<string>} - The generated text
 */
export async function generateTextWithGemini(prompt, options = {}) {
  try {
    console.log('Generating text with Gemini, prompt length:', prompt.length);
    
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }
    
    const model = genAI.getGenerativeModel({ 
      model: options.model || "gemini-1.5-pro", // Using Pro model for better analysis
      generationConfig: {
        maxOutputTokens: options.maxTokens || 2048,
        temperature: options.temperature || 0.7,
        topP: options.topP || 0.9,
      },
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('Gemini response generated successfully, length:', text.length);
    return text;
  } catch (error) {
    console.error('Error generating text with Gemini:', error);
    throw error;
  }
}

/**
 * Analyze IELTS speaking response using Gemini
 * @param {string} question - The question asked
 * @param {string} response - The transcribed response
 * @returns {Promise<Object>} - Analysis of the response
 */
export async function analyzeIELTSSpeakingWithGemini(question, response) {
  console.log('Analyzing IELTS response with Gemini');
  console.log('Question:', question);
  console.log('Response:', response);
  
  // If response is empty or too short, return basic feedback
  if (!response || response.trim().length < 5) {
    console.log('Response is too short for analysis');
    return {
      score: 4.0,
      criteria: {
        fluency: 4.0,
        pronunciation: 4.0,
        lexicalResource: 4.0,
        grammar: 4.0
      },
      feedback: {
        positive: ["You attempted to answer the question"],
        improvements: [
          "Provide a more detailed response",
          "Try to speak more clearly",
          "Use more vocabulary related to the topic"
        ]
      },
      detailedAnalysis: {
        wordsPerMinute: 0,
        pauseCount: 0,
        repetitions: 0,
        incorrectPronunciations: []
      },
      nextSteps: [
        "Practice speaking for longer periods",
        "Build your vocabulary on this topic",
        "Record yourself and listen to improve clarity"
      ]
    };
  }
  
  const prompt = `
You are an expert IELTS examiner with years of experience in evaluating speaking tests. Your task is to analyze the following speaking response to a question and provide a detailed, accurate assessment.

Question: "${question}"
Response: "${response}"

Carefully analyze the response considering:
1. Fluency and coherence - How smoothly the candidate speaks, use of connectives, hesitations
2. Lexical resource - Vocabulary range and accuracy
3. Grammatical range and accuracy - Sentence structures, tenses, errors
4. Pronunciation - Clarity, intonation, stress patterns

Provide a detailed analysis and return ONLY a valid JSON object with this exact structure:

{
  "score": 7.5,
  "criteria": {
    "fluency": 7.0,
    "pronunciation": 7.5,
    "lexicalResource": 8.0,
    "grammar": 7.0
  },
  "feedback": {
    "positive": [
      "Good use of vocabulary",
      "Clear pronunciation",
      "Natural speaking pace"
    ],
    "improvements": [
      "Work on grammar accuracy",
      "Reduce hesitations",
      "Use more complex structures"
    ]
  },
  "detailedAnalysis": {
    "wordsPerMinute": 140,
    "pauseCount": 3,
    "repetitions": 1,
    "incorrectPronunciations": [
      {
        "word": "comfortable",
        "yourPronunciation": "/ˈkʌmfərtəbl/",
        "correctPronunciation": "/ˈkʌmftəbl/"
      }
    ]
  },
  "nextSteps": [
    "Practice similar questions",
    "Record yourself again",
    "Study useful phrases"
  ]
}

IMPORTANT: 
- Return ONLY the JSON object, no additional text
- All numbers must be numeric values (not strings)
- Scores should be realistic (between 4.0 and 9.0) based on official IELTS band descriptors
- Base your analysis on the actual response content, not assumptions
- If the response is very short or unclear, give lower scores (4-5 range)
- If the response is detailed and well-structured, give higher scores (6-8 range)
- Only give scores of 8.5-9.0 for truly exceptional responses with near-native fluency
- Be honest but constructive in your feedback
- For incorrectPronunciations, only include actual pronunciation issues if you can identify them
- If there are no clear pronunciation issues, leave the array empty
`;

  try {
    // Count words in response to estimate speaking rate
    const wordCount = response.split(/\s+/).filter(word => word.length > 0).length;
    const estimatedWordsPerMinute = Math.round(wordCount * (60 / 30)); // Assuming ~30 seconds for response
    
    console.log(`Response word count: ${wordCount}, estimated WPM: ${estimatedWordsPerMinute}`);
    
    // Make API call to Gemini
    const result = await generateTextWithGemini(prompt, { 
      model: "gemini-1.5-pro", // Explicitly use Pro model for better analysis
      temperature: 0.1, // Very low temperature for consistent results
      maxTokens: 2048 // Enough tokens for detailed analysis
    });
    
    console.log('Raw Gemini response length:', result.length);
    console.log('First 200 chars of response:', result.substring(0, 200));
    
    // Try to extract JSON from the response
    let jsonMatch = result.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('No JSON found in response');
      throw new Error('Failed to extract JSON from response');
    }
    
    try {
      const jsonStr = jsonMatch[0];
      console.log('Extracted JSON string length:', jsonStr.length);
      
      // Parse the JSON
      const parsed = JSON.parse(jsonStr);
      console.log('Successfully parsed JSON');
      
      // Validate the parsed data
      if (typeof parsed.score !== 'number') {
        console.error('Invalid score:', parsed.score);
        throw new Error('Invalid score in analysis');
      }
      
      if (!parsed.criteria || !parsed.feedback || !parsed.detailedAnalysis) {
        console.error('Missing required fields in analysis');
        throw new Error('Missing required fields in analysis');
      }
      
      // Ensure wordsPerMinute is reasonable
      if (!parsed.detailedAnalysis.wordsPerMinute || parsed.detailedAnalysis.wordsPerMinute < 10) {
        parsed.detailedAnalysis.wordsPerMinute = estimatedWordsPerMinute;
      }
      
      // Ensure incorrectPronunciations is an array
      if (!Array.isArray(parsed.detailedAnalysis.incorrectPronunciations)) {
        parsed.detailedAnalysis.incorrectPronunciations = [];
      }
      
      console.log('Analysis validation completed');
      return parsed;
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      console.error('JSON string that failed to parse:', jsonMatch[0]);
      throw new Error('Failed to parse JSON from response');
    }
  } catch (error) {
    console.error('Error analyzing IELTS speaking with Gemini:', error);
    console.error('Error details:', error.message);
    
    // Create a custom analysis based on the response length and content
    const wordCount = response.split(/\s+/).filter(word => word.length > 0).length;
    let baseScore = 5.0;
    
    // Adjust score based on response length
    if (wordCount > 50) baseScore += 1.0;
    if (wordCount > 100) baseScore += 0.5;
    if (wordCount < 20) baseScore -= 1.0;
    
    // Look for grammar indicators
    const hasComplexSentences = response.includes(',') && (response.includes(' because ') || 
                                                          response.includes(' however ') || 
                                                          response.includes(' although '));
    if (hasComplexSentences) baseScore += 0.5;
    
    // Look for vocabulary indicators
    const uniqueWords = new Set(response.toLowerCase().split(/\s+/)).size;
    const vocabularyRatio = uniqueWords / wordCount;
    if (vocabularyRatio > 0.7) baseScore += 0.5;
    
    console.log('Generated custom analysis with base score:', baseScore);
    
    return {
      score: parseFloat(baseScore.toFixed(1)),
      criteria: {
        fluency: parseFloat((baseScore - 0.2).toFixed(1)),
        pronunciation: parseFloat((baseScore).toFixed(1)),
        lexicalResource: parseFloat((baseScore + (vocabularyRatio > 0.7 ? 0.3 : -0.2)).toFixed(1)),
        grammar: parseFloat((baseScore + (hasComplexSentences ? 0.3 : -0.3)).toFixed(1))
      },
      feedback: {
        positive: [
          wordCount > 50 ? "Good amount of content in your response" : "You attempted to answer the question",
          hasComplexSentences ? "Some use of complex sentence structures" : "Basic communication of ideas",
          vocabularyRatio > 0.6 ? "Decent variety of vocabulary" : "You used some relevant vocabulary"
        ],
        improvements: [
          wordCount < 70 ? "Try to expand your answer with more details" : "Continue developing your ideas more fully",
          hasComplexSentences ? "Continue practicing complex grammatical structures" : "Work on using more complex sentence structures",
          vocabularyRatio < 0.7 ? "Expand your vocabulary on this topic" : "Try to use more specialized vocabulary"
        ]
      },
      detailedAnalysis: {
        wordsPerMinute: Math.round(wordCount * (60 / 30)), // Assuming ~30 seconds for response
        pauseCount: Math.round(response.split('.').length - 1),
        repetitions: 0,
        incorrectPronunciations: []
      },
      nextSteps: [
        "Practice answering similar questions with more detail",
        "Record yourself speaking and listen for areas to improve",
        "Study vocabulary related to this topic"
      ]
    };
  }
}

/**
 * Analyze IELTS writing essay using Gemini
 * @param {string} essay - The essay text
 * @param {string} taskType - Task 1 or Task 2
 * @param {string} question - The original question/prompt
 * @returns {Promise<Object>} - Analysis of the essay
 */
export async function analyzeIELTSWriting(essay, taskType, question) {
  console.log('Analyzing IELTS writing with Gemini');
  console.log('Task type:', taskType);
  console.log('Question:', question);
  console.log('Essay length:', essay.length, 'characters');
  
  const prompt = `
You are an expert IELTS examiner. Analyze this IELTS ${taskType} essay and provide feedback.

Question: "${question}"
Essay: "${essay}"

Analyze the essay and return ONLY a JSON object with this structure:

{
  "overallScore": 7.5,
  "scores": {
    "taskResponse": 7.0,
    "coherenceCohesion": 7.5,
    "lexicalResource": 8.0,
    "grammarAccuracy": 7.0
  },
  "feedback": {
    "strengths": [
      "Good structure with clear introduction and conclusion",
      "Effective use of academic vocabulary",
      "Logical flow of ideas"
    ],
    "improvements": [
      "Add more specific examples and details",
      "Improve paragraph transitions",
      "Check for grammatical accuracy"
    ],
    "specificErrors": [
      {
        "sentence": "This is example sentence with error",
        "error": "Article",
        "correction": "This is an example sentence with error",
        "explanation": "Article 'an' is needed before 'example'"
      }
    ]
  },
  "suggestions": [
    "Use more formal academic vocabulary",
    "Add transitional phrases between paragraphs",
    "Check verb tense consistency"
  ],
  "estimatedTime": "15 minutes to improve"
}

Return ONLY the JSON object, no additional text. Scores should be between 4.0 and 9.0.
`;

  try {
    const result = await generateTextWithGemini(prompt, { 
      model: "gemini-1.5-pro",
      temperature: 0.1,
      maxTokens: 2048
    });
    
    console.log('Raw Gemini response length:', result.length);
    
    // Extract JSON from response
    let jsonMatch = result.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to extract JSON from response');
    }
    
    const parsed = JSON.parse(jsonMatch[0]);
    console.log('Successfully parsed analysis');
    return parsed;
  } catch (error) {
    console.error('Error analyzing IELTS writing with Gemini:', error);
    
    // If quota exceeded, return basic feedback
    if (error.message.includes('429') || error.message.includes('quota')) {
      console.log('Gemini quota exceeded, returning smart fallback feedback');
      
      // Analyze essay locally
      const wordCount = essay.split(/\s+/).filter(word => word.length > 0).length;
      const hasIntroduction = essay.toLowerCase().includes('graph') || essay.toLowerCase().includes('shows') || essay.toLowerCase().includes('illustrates');
      const hasConclusion = essay.toLowerCase().includes('overall') || essay.toLowerCase().includes('in conclusion') || essay.toLowerCase().includes('to sum up');
      const hasComparisons = essay.toLowerCase().includes('however') || essay.toLowerCase().includes('while') || essay.toLowerCase().includes('meanwhile') || essay.toLowerCase().includes('in contrast');
      const hasSpecificData = essay.match(/\d+%/g) || essay.match(/\d+ in \d+/g);
      
      let baseScore = 5.0;
      let strengths = [];
      let improvements = [];
      
      // Adjust score based on content
      if (wordCount > 150) {
        baseScore += 0.5;
        strengths.push("Good length for the task");
      } else {
        improvements.push("Write a longer essay (minimum 150 words)");
      }
      
      if (hasIntroduction) {
        baseScore += 0.5;
        strengths.push("Clear introduction of the topic");
      } else {
        improvements.push("Add a clear introduction");
      }
      
      if (hasConclusion) {
        baseScore += 0.5;
        strengths.push("Good conclusion with overall summary");
      } else {
        improvements.push("Add a conclusion with overall summary");
      }
      
      if (hasComparisons) {
        baseScore += 0.5;
        strengths.push("Good use of comparison language");
      } else {
        improvements.push("Add more comparisons between data points");
      }
      
      if (hasSpecificData && hasSpecificData.length > 3) {
        baseScore += 0.5;
        strengths.push("Good use of specific data and percentages");
      } else {
        improvements.push("Include more specific data and percentages");
      }
      
      // Default strengths if none identified
      if (strengths.length === 0) {
        strengths = ["You attempted to address the task", "Basic structure present"];
      }
      
      // Default improvements if none identified
      if (improvements.length === 0) {
        improvements = ["Add more specific details", "Improve paragraph structure", "Check grammar accuracy"];
      }
      
      return {
        overallScore: parseFloat(baseScore.toFixed(1)),
        scores: {
          taskResponse: parseFloat((baseScore - 0.2).toFixed(1)),
          coherenceCohesion: parseFloat((baseScore + (hasIntroduction && hasConclusion ? 0.3 : -0.2)).toFixed(1)),
          lexicalResource: parseFloat((baseScore + 0.1).toFixed(1)),
          grammarAccuracy: parseFloat((baseScore - 0.1).toFixed(1))
        },
        feedback: {
          strengths: strengths,
          improvements: improvements,
          specificErrors: []
        },
        suggestions: [
          "Practice writing longer essays with more detail",
          "Study vocabulary for describing graphs and trends",
          "Review grammar rules for academic writing"
        ],
        estimatedTime: "20 minutes to improve"
      };
    }
    
    throw error;
  }
}

/**
 * Compare two IELTS essays using Gemini
 * @param {string} essay1 - The first essay text
 * @param {string} essay2 - The second essay text
 * @param {string} taskType - Task 1 or Task 2
 * @param {string} question - The original question/prompt
 * @returns {Promise<Object>} - Comparison analysis of the essays
 */
export async function compareIELTSEssays(essay1, essay2, taskType, question) {
  console.log('Comparing two IELTS essays with Gemini');
  console.log('Task type:', taskType);
  console.log('Question:', question);
  console.log('Essay 1 length:', essay1.length, 'characters');
  console.log('Essay 2 length:', essay2.length, 'characters');
  
  const prompt = `
You are an expert IELTS examiner. Compare these two IELTS ${taskType} essays and provide detailed feedback.

Question: "${question}"

Essay 1: "${essay1}"

Essay 2: "${essay2}"

Compare the essays and return ONLY a JSON object with this structure:

{
  "essay1": {
    "overallScore": 7.5,
    "scores": {
      "taskResponse": 7.0,
      "coherenceCohesion": 7.5,
      "lexicalResource": 8.0,
      "grammarAccuracy": 7.0
    },
    "feedback": {
      "strengths": [
        "Good structure with clear introduction and conclusion",
        "Effective use of academic vocabulary",
        "Logical flow of ideas"
      ],
      "improvements": [
        "Add more specific examples and details",
        "Improve paragraph transitions",
        "Check for grammatical accuracy"
      ]
    }
  },
  "essay2": {
    "overallScore": 6.5,
    "scores": {
      "taskResponse": 6.0,
      "coherenceCohesion": 6.5,
      "lexicalResource": 7.0,
      "grammarAccuracy": 6.5
    },
    "feedback": {
      "strengths": [
        "Clear main points",
        "Good attempt at the task"
      ],
      "improvements": [
        "Expand vocabulary range",
        "Add more complex sentence structures",
        "Improve overall coherence"
      ]
    }
  },
  "comparison": {
    "betterEssay": "essay1",
    "keyDifferences": [
      "Essay 1 has better vocabulary range",
      "Essay 2 needs more specific examples",
      "Essay 1 shows better task response"
    ],
    "recommendations": [
      "Focus on expanding vocabulary in Essay 2",
      "Add more specific details and examples",
      "Practice complex sentence structures"
    ]
  }
}

Return ONLY the JSON object, no additional text. Scores should be between 4.0 and 9.0.
`;

  try {
    const result = await generateTextWithGemini(prompt, { 
      model: "gemini-1.5-pro",
      temperature: 0.1,
      maxTokens: 2048
    });
    
    console.log('Raw Gemini response length:', result.length);
    
    // Extract JSON from response
    let jsonMatch = result.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to extract JSON from response');
    }
    
    const parsed = JSON.parse(jsonMatch[0]);
    console.log('Successfully parsed comparison analysis');
    return parsed;
  } catch (error) {
    console.error('Error comparing IELTS essays with Gemini:', error);
    
    // If quota exceeded, return basic comparison
    if (error.message.includes('429') || error.message.includes('quota')) {
      console.log('Gemini quota exceeded, returning basic comparison');
      
      // Analyze essays locally
      const wordCount1 = essay1.split(/\s+/).filter(word => word.length > 0).length;
      const wordCount2 = essay2.split(/\s+/).filter(word => word.length > 0).length;
      
      const score1 = wordCount1 > 150 ? 6.5 : 5.0;
      const score2 = wordCount2 > 150 ? 6.0 : 5.0;
      
      return {
        essay1: {
          overallScore: score1,
          scores: {
            taskResponse: score1 - 0.5,
            coherenceCohesion: score1,
            lexicalResource: score1 + 0.2,
            grammarAccuracy: score1 - 0.3
          },
          feedback: {
            strengths: [
              wordCount1 > 150 ? "Good length for the task" : "You attempted to address the task",
              "Basic structure present"
            ],
            improvements: [
              wordCount1 < 200 ? "Expand your essay with more details" : "Continue developing your ideas",
              "Add more specific examples",
              "Improve paragraph structure"
            ]
          }
        },
        essay2: {
          overallScore: score2,
          scores: {
            taskResponse: score2 - 0.5,
            coherenceCohesion: score2,
            lexicalResource: score2 + 0.2,
            grammarAccuracy: score2 - 0.3
          },
          feedback: {
            strengths: [
              wordCount2 > 150 ? "Good length for the task" : "You attempted to address the task",
              "Basic structure present"
            ],
            improvements: [
              wordCount2 < 200 ? "Expand your essay with more details" : "Continue developing your ideas",
              "Add more specific examples",
              "Improve paragraph structure"
            ]
          }
        },
        comparison: {
          betterEssay: score1 > score2 ? "essay1" : "essay2",
          keyDifferences: [
            `Essay 1 has ${wordCount1} words, Essay 2 has ${wordCount2} words`,
            "Both essays need more specific examples",
            "Both essays could improve vocabulary range"
          ],
          recommendations: [
            "Practice writing longer essays with more detail",
            "Study vocabulary for this topic",
            "Review grammar rules for academic writing"
          ]
        }
      };
    }
    
    throw error;
  }
}

/**
 * Generate mock feedback for when API is unavailable
 * @param {string} transcription - The transcribed text
 * @returns {Object} - Mock feedback
 */
function generateMockFeedback(transcription = "This is a mock transcription for testing purposes.") {
  console.log('Generating mock feedback for transcription:', transcription);
  
  // Base score on transcription length and quality
  let baseScore = 6.0;
  if (transcription.length > 50) baseScore += 1.0;
  if (transcription.length > 100) baseScore += 0.5;
  if (transcription.length < 20) baseScore -= 1.0;
  
  return {
    transcription: transcription,
    score: parseFloat(baseScore.toFixed(1)),
    criteria: {
      fluency: parseFloat((baseScore - 0.5 + Math.random() * 0.5).toFixed(1)),
      pronunciation: parseFloat((baseScore - 0.3 + Math.random() * 0.5).toFixed(1)),
      lexicalResource: parseFloat((baseScore - 0.2 + Math.random() * 0.5).toFixed(1)),
      grammar: parseFloat((baseScore - 0.4 + Math.random() * 0.5).toFixed(1))
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