export const MathQuestion4 = () => {
  return (
    <div className="bg-paper rounded-sm shadow-md p-8">
      <div className="space-y-6">
        {/* Problem Text */}
        <div className="space-y-4 text-foreground">
          <p className="leading-relaxed pl-6">
            <span className="font-semibold">(d)</span> For 20 ≤ <span className="italic">t</span> ≤ 25, the function <span className="italic">W</span> that models the water temperature has first derivative given by{" "}
            <span className="italic">W′(t)</span> = 0.4<span className="inline-flex items-baseline">
              <span className="text-lg">√</span>
              <span className="italic text-sm relative">t</span>
            </span> cos(0.06<span className="italic">t</span>). Based on the model, what is the temperature of the water at time <span className="italic">t</span> = 25?
          </p>
        </div>
      </div>
    </div>
  );
};