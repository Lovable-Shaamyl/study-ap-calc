import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Loader2, Mail, BookOpen, Brain, Target, TrendingUp, Zap, CheckCircle, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await login();
    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: <Brain className="h-5 w-5 text-purple-600" />,
      title: "AI-Powered Feedback",
      description: "Get instant, detailed feedback on your calculus solutions with personalized suggestions for improvement."
    },
    {
      icon: <Target className="h-5 w-5 text-green-600" />,
      title: "Practice Tracking",
      description: "Save your work automatically and track your progress across many comprehensive AP Calculus practice problems."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-gradient-to-br from-indigo-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left side - Hero content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full">
                <Sparkles className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">ApCalcBuddy</span>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
                  Your AI Calculus Companion
                </h1>
                <p className="text-xl text-gray-600 max-w-lg mx-auto lg:mx-0">
                  Master AP Calculus with ApCalcBuddy's AI-powered feedback, practice problems, and personalized learning experience.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  100+ Practice Problems
                </Badge>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                  <Zap className="h-3 w-3 mr-1" />
                  Instant AI Feedback
                </Badge>
                <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Progress Tracking
                </Badge>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4 max-w-lg mx-auto lg:mx-0">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex-shrink-0 p-2 bg-gray-50 rounded-xl">
                    {feature.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Login card */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl shadow-lg">
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Sparkles className="h-3 w-3 text-yellow-800" />
                    </div>
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Welcome to ApCalcBuddy!</CardTitle>
                <CardDescription className="text-gray-600">
                  Sign in to start your journey with your AI calculus companion and access personalized practice problems.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {error && (
                  <Alert variant="destructive" className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-800">{error}</AlertDescription>
                  </Alert>
                )}
                
                <Button
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Signing you in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5" />
                      <span>Continue with Google</span>
                    </div>
                  )}
                </Button>

                <div className="text-center space-y-2">
                  <div className="text-xs text-gray-500">
                    By signing in, you agree to our terms of service and privacy policy.
                  </div>
                  <div className="text-sm text-gray-600">
                    🎓 <span className="font-medium">Ready to ace your AP Calculus exam with ApCalcBuddy?</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};