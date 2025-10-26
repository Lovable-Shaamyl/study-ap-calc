import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Brain, Target, Zap } from "lucide-react";

interface LandingPageProps {
  onEnterApp: () => void;
}

const benefits = [
  {
    icon: Brain,
    title: "AI-Powered Solutions",
    description: "Get instant, detailed explanations for complex calculus problems"
  },
  {
    icon: Target,
    title: "Exam-Focused",
    description: "Practice with real AP Calculus exam-style questions"
  },
  {
    icon: Zap,
    title: "Quick Feedback",
    description: "Immediate responses to help you learn faster"
  },
  {
    icon: BookOpen,
    title: "Step-by-Step Learning",
    description: "Understand every step of the problem-solving process"
  }
];

export const LandingPage = ({ onEnterApp }: LandingPageProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-accent/5 animate-pulse" style={{ animationDuration: "4s" }} />
      
      <div className="text-center space-y-12 px-4 max-w-5xl w-full relative z-10">
        <div className="space-y-4 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">
            Welcome to AP Calc Buddy
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your intelligent companion for mastering AP Calculus and acing your exams
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="hover-scale border-primary/20 hover:border-primary/40 transition-all duration-300 bg-card/80 backdrop-blur-sm"
            >
              <CardContent className="pt-6 space-y-3">
                <div className="flex justify-center">
                  <div className="p-3 rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary/20">
                    <benefit.icon className="w-6 h-6 text-primary transition-transform duration-300 hover:scale-110" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <Button 
            onClick={onEnterApp}
            size="lg"
            className="text-lg px-8 py-6 hover-scale transition-all duration-300"
          >
            Start Learning
          </Button>
        </div>
      </div>
    </div>
  );
};
