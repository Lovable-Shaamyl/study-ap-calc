import { useState } from "react";
import { QuestionAndAnswer } from "@/components/QuestionAndAnswer";
import { ChevronLeft, ChevronRight, LogOut, User, BookOpen, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

interface MainAppProps {
  onBackToExams?: () => void;
}

export const MainApp = ({ onBackToExams }: MainAppProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const totalQuestions = 8;
  const { currentUser, logout } = useAuth();

  const goToNextQuestion = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with branding, user info and logout */}
      <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[794px] mx-auto px-4 py-3 flex items-center justify-between">
          {/* Left side - App branding */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg shadow-sm">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ApCalcBuddy
                </h1>
                <p className="text-xs text-muted-foreground">
                  Your AI Calculus Companion
                </p>
              </div>
            </div>
          </div>

          {/* Right side - User info and logout */}
          <div className="flex items-center gap-4">
            {onBackToExams && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBackToExams}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Exams</span>
              </Button>
            )}
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium">
                  {currentUser?.displayName || 'Student'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {currentUser?.email}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="py-8 px-4">
        <div className="max-w-[794px] mx-auto space-y-6">
          {/* Exam Title */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">AP Calc 2012 Practice Paper</h1>
            <p className="text-sm text-muted-foreground">Complete practice exam with AI feedback</p>
          </div>

          {/* Navigation Header */}
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={goToPreviousQuestion}
              disabled={currentQuestion === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft size={16} />
              Previous
            </Button>
            
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion} of {totalQuestions}
            </span>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={goToNextQuestion}
              disabled={currentQuestion === totalQuestions}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight size={16} />
            </Button>
          </div>

          {/* Question and Answer */}
          <QuestionAndAnswer 
            questionNumber={currentQuestion} 
          />
        </div>
      </main>
    </div>
  );
};