import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PROMPT = `
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
`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Return generic error message - AI is disabled
    return new Response(
      JSON.stringify({ 
        error: 'AI is disabled, please contact project owner' 
      }), 
      {
        status: 503,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in check-answer function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'AI is disabled, please contact project owner'
      }), 
      {
        status: 503,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
