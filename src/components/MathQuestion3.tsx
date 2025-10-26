export const MathQuestion3 = () => {
  return (
    <div className="bg-paper rounded-sm shadow-md p-8">
      <div className="space-y-6">
        {/* Problem Text */}
        <div className="space-y-4 text-foreground">
          <p className="leading-relaxed pl-6">
            <span className="font-semibold">(c)</span> For 0 ≤ <span className="italic">t</span> ≤ 20, the average temperature of the water in the tub is{" "}
            <span className="inline-flex items-baseline">
              <span className="text-base">(1</span>
              <span className="text-sm mx-1">/</span>
              <span className="text-base">20)</span>
              <span className="text-2xl leading-none ml-1">∫</span>
              <span className="text-xs relative -top-3 -left-1 pl-2">20</span>
              <span className="text-xs relative top-1 -left-2">0</span>
              <span className="italic ml-1">W(t)</span>
              <span className="ml-1">dt</span>
            </span>
            . Use a left Riemann sum with the four subintervals indicated by the data in the table to approximate{" "}
            <span className="inline-flex items-baseline">
              <span className="text-base">(1</span>
              <span className="text-sm mx-1">/</span>
              <span className="text-base">20)</span>
              <span className="text-2xl leading-none ml-1">∫</span>
              <span className="text-xs relative -top-3 -left-1 pl-2">20</span>
              <span className="text-xs relative top-1 -left-2">0</span>
              <span className="italic ml-1">W(t)</span>
              <span className="ml-1">dt</span>
            </span>
            . Does this approximation overestimate or underestimate the average temperature of the water over these 20 minutes? Explain your reasoning.
          </p>
        </div>
      </div>
    </div>
  );
};