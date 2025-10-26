export const MathQuestion = () => {
  return (
    <div className="bg-paper rounded-sm shadow-md p-8">
      <div className="space-y-6">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-foreground/20">
            <thead>
              <tr>
                <th className="border border-foreground/20 px-4 py-3 text-center">
                  <span className="italic">t</span> (minutes)
                </th>
                <th className="border border-foreground/20 px-4 py-3">0</th>
                <th className="border border-foreground/20 px-4 py-3">4</th>
                <th className="border border-foreground/20 px-4 py-3">9</th>
                <th className="border border-foreground/20 px-4 py-3">15</th>
                <th className="border border-foreground/20 px-4 py-3">20</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-foreground/20 px-4 py-3 text-center">
                  <span className="italic">W(t)</span> (degrees Fahrenheit)
                </td>
                <td className="border border-foreground/20 px-4 py-3 text-center">55.0</td>
                <td className="border border-foreground/20 px-4 py-3 text-center">57.1</td>
                <td className="border border-foreground/20 px-4 py-3 text-center">61.8</td>
                <td className="border border-foreground/20 px-4 py-3 text-center">67.9</td>
                <td className="border border-foreground/20 px-4 py-3 text-center">71.0</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Problem Text */}
        <div className="space-y-4 text-foreground">
          <p className="leading-relaxed">
            <span className="font-semibold">1.</span> The temperature of water in a tub at time{" "}
            <span className="italic">t</span> is modeled by a strictly increasing, twice-differentiable
            function <span className="italic">W</span>, where <span className="italic">W(t)</span> is
            measured in degrees Fahrenheit and <span className="italic">t</span> is measured in minutes.
            At time <span className="italic">t</span> = 0, the temperature of the water is 55°F. The water
            is heated for 30 minutes, beginning at time <span className="italic">t</span> = 0. Values of{" "}
            <span className="italic">W(t)</span> at selected times <span className="italic">t</span> for
            the first 20 minutes are given in the table above.
          </p>

          <p className="leading-relaxed pl-6">
            <span className="font-semibold">(a)</span> Use the data in the table to estimate{" "}
            <span className="italic">W'</span>(12). Show the computations that lead to your answer. Using
            correct units, interpret the meaning of your answer in the context of this problem.
          </p>
        </div>
      </div>
    </div>
  );
};
