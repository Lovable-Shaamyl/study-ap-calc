export const MathQuestion5 = () => {
  return (
    <div className="bg-paper rounded-sm shadow-md p-8">
      <div className="space-y-6">
        {/* Problem Text */}
        <div className="space-y-4 text-foreground">
          <p className="leading-relaxed">
            <span className="font-semibold">2.</span> For <span className="italic">t</span> ≥ 0, a particle is moving along a curve so that its position at time <span className="italic">t</span> is (<span className="italic">x(t)</span>, <span className="italic">y(t)</span>). At time <span className="italic">t</span> = 2, the particle is at position (1, 5). It is known that{" "}
            <span className="inline-flex items-baseline">
              <span className="italic">dx</span>
              <span className="mx-1">/</span>
              <span className="italic">dt</span>
            </span>
            {" "}={" "}
            <span className="inline-flex items-center">
              <span className="inline-flex items-baseline">
                <span className="text-lg leading-none pr-1">√</span>
                <span className="text-sm italic relative -left-1">(t + 2)</span>
              </span>
              <span className="mx-2">/</span>
              <span className="italic">e<sup className="text-xs">t</sup></span>
            </span>
            {" "}and{" "}
            <span className="inline-flex items-baseline">
              <span className="italic">dy</span>
              <span className="mx-1">/</span>
              <span className="italic">dt</span>
            </span>
            {" "}= sin²{" "}
            <span className="italic">t</span>.
          </p>

          <p className="leading-relaxed pl-6">
            <span className="font-semibold">(a)</span> Is the horizontal movement of the particle to the left or to the right at time <span className="italic">t</span> = 2? Explain your answer. Find the slope of the path of the particle at time <span className="italic">t</span> = 2.
          </p>
        </div>
      </div>
    </div>
  );
};