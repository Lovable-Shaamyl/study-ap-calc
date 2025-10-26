import { supabase } from "@/integrations/supabase/client";

export interface AIFeedback {
  correct: 'yes' | 'no' | 'partially';
  correctPart: string;
  incorrectPart: string;
  correctApproach: string;
  suggestions: string;
}

export const checkAnswerWithAI = async (imageDataUrl: string, answerText?: string): Promise<AIFeedback> => {
  try {
    const { data, error } = await supabase.functions.invoke('check-answer', {
      body: {
        imageDataUrl,
        answerText
      }
    });

    if (error) {
      console.error('Error calling check-answer function:', error);
      throw new Error('Failed to get AI feedback. Please try again.');
    }

    if (!data) {
      throw new Error('No response data received');
    }

    // If there's an error in the response data
    if (data.error) {
      throw new Error(data.error);
    }

    return data as AIFeedback;
  } catch (error) {
    console.error('Error checking answer with AI:', error);
    throw new Error('Failed to get AI feedback. Please try again.');
  }
};