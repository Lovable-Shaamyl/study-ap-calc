import { Button } from "@/components/ui/button";

interface LandingPageProps {
  onEnterApp: () => void;
}

export const LandingPage = ({ onEnterApp }: LandingPageProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
      <div className="text-center space-y-8 px-4 max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground">
          Welcome to Ap Calc Buddy
        </h1>
        <p className="text-xl text-muted-foreground">
          Your intelligent companion for exam preparation and practice
        </p>
        <Button 
          onClick={onEnterApp}
          size="lg"
          className="text-lg px-8 py-6"
        >
          Enter App
        </Button>
      </div>
    </div>
  );
};
