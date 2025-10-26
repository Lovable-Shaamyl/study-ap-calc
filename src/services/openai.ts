import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true // Note: In production, you should use a backend API
});

const PROMPT = 

`

You are an exam checker for AP calculus exams. Your task is to analyze student answers to calculus problems and
provide helpful and encouraging feedback.

Be very friendly and detailed in your explanation.

For correct key, respond with either yes, no, or partially. If the answer will get full marks, yes. If no marks then no, otherwise partially.

For correct part, provide a detailed explanation of what part of the student's answer is correct which contributed to marks.

For incorrect part, provide a detailed explanation of what part of the student's answer is incorrect which lost marks. if the student gets full credit, leave this blank.

For correct approach, if the student is incorrect, explain what the correct approach to solving the problem is. Otherwise leave it blank.

For suggestions, provide specific suggestions for improvement to help the student do better next time, learn the topic, and specific techniques to solve the problem better.

CRITICAL: dont add any text in your response other than the specified format.

Please respond in the following JSON format::
{
  "correct": <yes/no/partially>,
  "correctPart": "<detailed explanation of what part is correct if any",
  "incorrectPart": "<detailed explanation of what part is incorrect if any>",
  "correctApproach": "<if the student is incorrect, what is the correct approach to solving the problem is>",
  "suggestions": "<specific suggestions for improvement>"
}

`

export interface AIFeedback {
  correct: 'yes' | 'no' | 'partially';
  correctPart: string;
  incorrectPart: string;
  correctApproach: string;
  suggestions: string;
}

export const checkAnswerWithAI = async (imageDataUrl: string, answerText?: string): Promise<AIFeedback> => {
  try {
    // Build the prompt text
    let promptText = "Please check this answer to the calculus problem. Provide detailed feedback on the mathematical work shown, including any errors, correct approaches, and suggestions for improvement." + PROMPT;
    
    // Add text content if provided
    if (answerText && answerText.trim()) {
      promptText += `\n\nStudent's answer in text: ${answerText.trim()}`;
    }

    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: promptText
            },
            {
              type: "image_url",
              image_url: {
                url: imageDataUrl
              }
            }
          ]
        }
      ],
    });

    const responseContent = response.choices[0]?.message?.content;
    if (!responseContent) {
      throw new Error("No response content received");
    }

    try {
      // Parse the JSON response
      const parsedFeedback: AIFeedback = JSON.parse(responseContent);
      return parsedFeedback;
    } catch (parseError) {
      console.error('Error parsing AI response as JSON:', parseError);
      // Fallback to a structured error response
      return {
        correct: 'no',
        correctPart: '',
        incorrectPart: 'Unable to parse AI response',
        correctApproach: 'Please try submitting again',
        suggestions: 'There was an issue processing your answer. Please try again.'
      };
    }
  } catch (error) {
    console.error('Error checking answer with AI:', error);
    throw new Error('Failed to get AI feedback. Please try again.');
  }
};