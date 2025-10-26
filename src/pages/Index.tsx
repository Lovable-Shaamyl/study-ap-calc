import { AnswerSheet } from "@/components/AnswerSheet";
import { MathQuestion } from "@/components/MathQuestion";

const Index = () => {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-[794px] mx-auto space-y-6">
        {/* Math Question */}
        <MathQuestion />

        {/* Answer Sheet */}
        <div>
          <h2 className="text-sm font-medium text-muted-foreground mb-2 px-1">
            Click anywhere on the answer sheet to add your work:
          </h2>
          <AnswerSheet />
        </div>
      </div>
    </div>
  );
};

export default Index;
