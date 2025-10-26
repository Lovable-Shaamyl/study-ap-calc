import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { LandingPage } from "@/components/LandingPage";
import { LoginPage } from "@/components/LoginPage";
import { ExamSelectionPage } from "@/components/ExamSelectionPage";
import { MainApp } from "@/components/MainApp";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { currentUser, loading } = useAuth();
  const [hasEnteredApp, setHasEnteredApp] = useState(false);
  const [selectedExam, setSelectedExam] = useState<string | null>(null);

  // Reset selected exam when user authentication state changes
  useEffect(() => {
    if (!currentUser) {
      setSelectedExam(null);
      setHasEnteredApp(false);
    }
  }, [currentUser]);

  const handleEnterApp = () => {
    setHasEnteredApp(true);
  };

  const handleExamSelect = (examId: string) => {
    setSelectedExam(examId);
  };

  const handleBackToExams = () => {
    setSelectedExam(null);
  };

  // Show landing page first
  if (!hasEnteredApp) {
    return <LandingPage onEnterApp={handleEnterApp} />;
  }

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // Show login page if user is not authenticated
  if (!currentUser) {
    return <LoginPage />;
  }

  // Show exam selection if user is authenticated but hasn't selected an exam
  if (!selectedExam) {
    return <ExamSelectionPage onExamSelect={handleExamSelect} />;
  }

  // Show main app if user is authenticated and has selected an exam
  return <MainApp onBackToExams={handleBackToExams} />;
};

export default Index;
