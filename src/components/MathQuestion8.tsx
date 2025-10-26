export const MathQuestion8 = () => {
  return (
    <div className="bg-paper rounded-sm shadow-md p-8">
      <div className="space-y-6">
        {/* Problem Context */}
        <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded">
          <p>
            <strong>Problem 2 Context:</strong> Particle at position (<span className="italic">x(t)</span>, <span className="italic">y(t)</span>) with{" "}
            <span className="italic">dx/dt</span> = √(<span className="italic">t</span> + 2)/<span className="italic">e<sup className="text-xs">t</sup></span> and{" "}
            <span className="italic">dy/dt</span> = sin²<span className="italic">t</span>. At <span className="italic">t</span> = 2, position is (1, 5).
          </p>
        </div>

        {/* Problem Text */}
        <div className="space-y-4 text-foreground">
          <p className="leading-relaxed pl-6">
            <span className="font-semibold">(d)</span> Find the distance traveled by the particle from time <span className="italic">t</span> = 2 to <span className="italic">t</span> = 4.
          </p>
          
     
        </div>
      </div>
    </div>
  );
};