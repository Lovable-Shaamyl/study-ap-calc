import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { AnswerSheet, AnswerSheetHandle } from "./AnswerSheet";
import { MathQuestion } from "./MathQuestion";
import { MathQuestion2 } from "./MathQuestion2";
import { MathQuestion3 } from "./MathQuestion3";
import { MathQuestion4 } from "./MathQuestion4";
import { MathQuestion5 } from "./MathQuestion5";
import { MathQuestion6 } from "./MathQuestion6";
import { MathQuestion7 } from "./MathQuestion7";
import { MathQuestion8 } from "./MathQuestion8";
import { Button } from "./ui/button";
import { Loader2, Send, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { checkAnswerWithAI, AIFeedback } from "@/services/openai";

interface QuestionAndAnswerProps {
  questionNumber: number;
}

export const QuestionAndAnswer = ({ questionNumber }: QuestionAndAnswerProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<AIFeedback | null>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const answerSheetRef = useRef<AnswerSheetHandle>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setFeedback(null);
    
    try {
      if (!componentRef.current) {
        throw new Error("Component reference not found");
      }

      // Capture the component as an image
      const canvas = await html2canvas(componentRef.current, {
        useCORS: true,
        allowTaint: true,
      });

      // Convert to data URL
      const imageDataUrl = canvas.toDataURL('image/png');

      // Extract text from answer sheet
      const answerText = answerSheetRef.current?.getAllText() || "";
      
      // Send to OpenAI for analysis with both image and text
      const aiResponse = await checkAnswerWithAI(imageDataUrl, answerText);
      setFeedback(aiResponse);
      
    } catch (error) {
      console.error("Error submitting answer:", error);
      setFeedback({
        correct: 'no',
        correctPart: '',
        incorrectPart: 'An error occurred while submitting your answer.',
        correctApproach: 'Please try again.',
        suggestions: 'Check your internet connection and try submitting again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderQuestion = () => {
    switch (questionNumber) {
      case 1:
        return <MathQuestion />;
      case 2:
        return <MathQuestion2 />;
      case 3:
        return <MathQuestion3 />;
      case 4:
        return <MathQuestion4 />;
      case 5:
        return <MathQuestion5 />;
      case 6:
        return <MathQuestion6 />;
      case 7:
        return <MathQuestion7 />;
      case 8:
        return <MathQuestion8 />;
      default:
        return <MathQuestion />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Question and Answer Container */}
      <div ref={componentRef} className="space-y-6 bg-background p-4 rounded-lg">
        {/* Math Question */}
        {renderQuestion()}

        {/* Answer Sheet */}
        <div>
          <h2 className="text-sm font-medium text-muted-foreground mb-2 px-1">
            Click anywhere on the answer sheet to add your work:
          </h2>
          <AnswerSheet ref={answerSheetRef} questionNumber={questionNumber} />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <Button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Checking Answer...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Submit Answer
            </>
          )}
        </Button>
      </div>

      {/* Enhanced Feedback Display */}
      {feedback && <FeedbackDisplay feedback={feedback} />}
    </div>
  );
};

interface FeedbackDisplayProps {
  feedback: AIFeedback;
}

const FeedbackDisplay = ({ feedback }: FeedbackDisplayProps) => {
  const getStatusConfig = (correct: string) => {
    switch (correct.toLowerCase()) {
      case 'yes':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          title: 'Excellent Work!',
          titleColor: 'text-green-800'
        };
      case 'partially':
        return {
          icon: AlertCircle,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          title: 'Good Progress!',
          titleColor: 'text-yellow-800'
        };
      case 'no':
      default:
        return {
          icon: XCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          title: 'Keep Learning!',
          titleColor: 'text-red-800'
        };
    }
  };

  const config = getStatusConfig(feedback.correct);
  const StatusIcon = config.icon;

  return (
    <div className={`p-6 rounded-lg border-2 ${config.bgColor} ${config.borderColor} transition-all duration-300 animate-in slide-in-from-top-5`}>
      {/* Header with Status */}
      <div className="flex items-center gap-3 mb-6">
        <StatusIcon className={`h-7 w-7 ${config.color} animate-pulse`} />
        <h3 className={`text-2xl font-bold ${config.titleColor}`}>
          {config.title}
        </h3>
      </div>

      {/* Feedback Sections */}
      <div className="space-y-6">
        {feedback.correctPart && (
          <div className="bg-green-50 p-4 rounded-md border border-green-200">
            <h4 className="font-semibold text-green-700 flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5" />
              What You Got Right
            </h4>
            <p className="text-sm leading-relaxed text-green-800">
              {feedback.correctPart}
            </p>
          </div>
        )}

        {feedback.incorrectPart && (
          <div className="bg-red-50 p-4 rounded-md border border-red-200">
            <h4 className="font-semibold text-red-700 flex items-center gap-2 mb-2">
              <XCircle className="h-5 w-5" />
              Areas for Improvement
            </h4>
            <p className="text-sm leading-relaxed text-red-800">
              {feedback.incorrectPart}
            </p>
          </div>
        )}

        {feedback.correctApproach && (
          <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
            <h4 className="font-semibold text-blue-700 flex items-center gap-2 mb-2">
              <AlertCircle className="h-5 w-5" />
              Correct Approach
            </h4>
            <p className="text-sm leading-relaxed text-blue-800">
              {feedback.correctApproach}
            </p>
          </div>
        )}

        {feedback.suggestions && (
          <div className="bg-purple-50 p-4 rounded-md border border-purple-200">
            <h4 className="font-semibold text-purple-700 flex items-center gap-2 mb-2">
              <Send className="h-5 w-5" />
              Suggestions for Next Time
            </h4>
            <p className="text-sm leading-relaxed text-purple-800">
              {feedback.suggestions}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};