import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, FileText, Star, ChevronRight, LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface ExamSelectionPageProps {
  onExamSelect: (examId: string) => void;
}

export const ExamSelectionPage = ({ onExamSelect }: ExamSelectionPageProps) => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const availableExams = [
    {
      id: "ap-calc-2012",
      title: "AP Calc 2012 Practice Paper",
      description: "Complete practice exam with 8 comprehensive calculus problems covering derivatives, integrals, and applications.",
      questions: 8,
      difficulty: "Advanced",
      estimatedTime: "3 hours",
      available: true,
      tags: ["Derivatives", "Integrals", "Applications", "Free Response"]
    }
  ];

  const comingSoonExams = [
    {
      title: "AP Calc AB 2023 Practice",
      description: "Latest practice problems with updated curriculum standards",
      questions: 10,
      difficulty: "Advanced"
    },
    {
      title: "AP Calc BC 2022 Mock Exam",
      description: "Full BC curriculum coverage including series and parametric equations",
      questions: 12,
      difficulty: "Expert"
    },
    {
      title: "Calculus Fundamentals Review",
      description: "Essential concepts and problem-solving strategies for beginners",
      questions: 15,
      difficulty: "Intermediate"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Left side - App branding */}
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

          {/* Right side - User info and logout */}
          <div className="flex items-center gap-4">
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
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Page header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Available Exams
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our collection of AP Calculus practice exams. Each exam includes AI-powered feedback and detailed explanations.
            </p>
          </div>

          {/* Available exams */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              <Star className="h-6 w-6 text-yellow-500" />
              Ready to Practice
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {availableExams.map((exam) => (
                <Card key={exam.id} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-xl text-gray-900 leading-tight">
                          {exam.title}
                        </CardTitle>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {exam.questions} Questions
                          </Badge>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            {exam.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {exam.description}
                    </CardDescription>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{exam.estimatedTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        <span>{exam.questions} problems</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {exam.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button 
                      onClick={() => onExamSelect(exam.id)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Start Practice
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Coming soon section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              <Clock className="h-6 w-6 text-gray-400" />
              More Coming Soon
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {comingSoonExams.map((exam, index) => (
                <Card key={index} className="opacity-75 bg-gray-50/80 backdrop-blur-sm border-dashed border-2 border-gray-300">
                  <CardHeader className="pb-4">
                    <div className="space-y-2">
                      <CardTitle className="text-xl text-gray-700 leading-tight">
                        {exam.title}
                      </CardTitle>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-gray-200 text-gray-600">
                          {exam.questions} Questions
                        </Badge>
                        <Badge variant="secondary" className="bg-gray-200 text-gray-600">
                          {exam.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <CardDescription className="text-gray-500 leading-relaxed">
                      {exam.description}
                    </CardDescription>
                    
                    <Button disabled className="w-full" variant="outline">
                      Coming Soon
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Footer message */}
          <div className="text-center py-8">
            <p className="text-gray-500">
              More practice exams and study materials are being added regularly. Stay tuned! 🚀
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};