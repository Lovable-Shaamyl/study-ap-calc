export const MathQuestion2 = () => {
  return (
    <div className="bg-paper rounded-sm shadow-md p-8">
      <div className="space-y-6">
        {/* Problem Text */}
        <div className="space-y-4 text-foreground">
          <p className="leading-relaxed pl-6">
            <span className="font-semibold">(b)</span> Use the data in the table to evaluate{" "}
            <span className="inline-flex items-baseline">
              <span className="text-2xl leading-none">∫</span>
              <span className="text-xs relative -top-3 -left-1 pl-2">20</span>
              <span className="text-xs relative top-1 -left-2">0</span>
              <span className="italic ml-1">W′(t)</span>
              <span className="ml-1">dt</span>
            </span>
            . Using correct units, interpret the meaning of{" "}
            <span className="inline-flex items-baseline">
              <span className="text-2xl leading-none">∫</span>
              <span className="text-xs relative -top-3 -left-1 pl-2">20</span>
              <span className="text-xs relative top-1 -left-2">0</span>
              <span className="italic ml-1">W′(t)</span>
              <span className="ml-1">dt</span>
            </span>
            {" "}in the context of this problem.
          </p>
        </div>
      </div>
    </div>
  );
};