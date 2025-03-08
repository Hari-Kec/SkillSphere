import { Platform } from 'react-native';

const GROQ_API_KEY = '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';
const GROQ_API_URL = 'https://api.groq.com/v1/chat/completions';

interface GroqResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function analyzeEnglishSpeech(text: string): Promise<{
  pronunciation: number;
  fluency: number;
  clarity: number;
  feedback: string;
}> {
  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{
          role: 'system',
          content: 'You are an English language assessment expert. Analyze the following speech for pronunciation, fluency, and clarity. Provide scores out of 10 and specific feedback.'
        }, {
          role: 'user',
          content: text
        }],
        model: 'mixtral-8x7b-32768',
        temperature: 0.7,
      }),
    });

    const data: GroqResponse = await response.json();
    const analysis = JSON.parse(data.choices[0].message.content);
    
    return {
      pronunciation: analysis.pronunciation,
      fluency: analysis.fluency,
      clarity: analysis.clarity,
      feedback: analysis.feedback,
    };
  } catch (error) {
    console.error('Error analyzing speech:', error);
    throw new Error('Failed to analyze speech');
  }
}

export async function evaluateCode(code: string, language: string, testCases: string[]): Promise<{
  passed: boolean;
  feedback: string;
  testResults: Array<{
    passed: boolean;
    input: string;
    expected: string;
    actual: string;
  }>;
}> {
  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{
          role: 'system',
          content: `You are a code evaluation expert. Evaluate the following ${language} code against the provided test cases. Return detailed feedback and test results.`
        }, {
          role: 'user',
          content: JSON.stringify({
            code,
            testCases,
          })
        }],
        model: 'mixtral-8x7b-32768',
        temperature: 0.3,
      }),
    });

    const data: GroqResponse = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.error('Error evaluating code:', error);
    throw new Error('Failed to evaluate code');
  }
}