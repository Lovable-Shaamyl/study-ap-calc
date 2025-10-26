import { useState, useRef, useEffect } from "react";

interface TextBox {
  id: string;
  x: number;
  y: number;
  text: string;
  width: number;
}

export const AnswerSheet = () => {
  const [textBoxes, setTextBoxes] = useState<TextBox[]>([]);
  const sheetRef = useRef<HTMLDivElement>(null);

  const handleSheetClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only create text box if clicking directly on the sheet (not on existing text boxes)
    if (e.target === e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newTextBox: TextBox = {
        id: `textbox-${Date.now()}`,
        x,
        y,
        text: "",
        width: 200, // Initial width
      };

      setTextBoxes([...textBoxes, newTextBox]);
    }
  };

  const handleTextChange = (id: string, text: string) => {
    setTextBoxes(
      textBoxes.map((box) =>
        box.id === id ? { ...box, text } : box
      )
    );
  };

  const calculateWidth = (text: string) => {
    // Rough estimation: 8px per character, with min 200px and bounded by sheet width
    const estimatedWidth = Math.max(200, text.length * 8 + 40);
    return estimatedWidth;
  };

  return (
    <div
      ref={sheetRef}
      onClick={handleSheetClick}
      className="relative w-full h-[842px] bg-paper rounded-sm shadow-lg cursor-text overflow-hidden"
      style={{
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
      }}
    >
      {/* Subtle paper texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,hsl(var(--border))_2px,hsl(var(--border))_3px)]" />
      
      {textBoxes.map((box) => (
        <TextBoxInput
          key={box.id}
          box={box}
          onChange={(text) => handleTextChange(box.id, text)}
          calculateWidth={calculateWidth}
          sheetWidth={sheetRef.current?.offsetWidth || 0}
        />
      ))}
    </div>
  );
};

interface TextBoxInputProps {
  box: TextBox;
  onChange: (text: string) => void;
  calculateWidth: (text: string) => number;
  sheetWidth: number;
}

const TextBoxInput = ({ box, onChange, calculateWidth, sheetWidth }: TextBoxInputProps) => {
  const [width, setWidth] = useState(box.width);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus new text boxes
    if (box.text === "" && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const newWidth = calculateWidth(box.text);
    const maxWidth = sheetWidth - box.x - 20; // 20px padding from right edge
    setWidth(Math.min(newWidth, maxWidth));
  }, [box.text, box.x, sheetWidth, calculateWidth]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      ref={inputRef}
      type="text"
      value={box.text}
      onChange={handleChange}
      className="absolute border-b border-primary/20 bg-transparent text-foreground focus:outline-none focus:border-primary transition-colors px-1"
      style={{
        left: `${box.x}px`,
        top: `${box.y}px`,
        width: `${width}px`,
        fontSize: "16px",
        fontFamily: "inherit",
      }}
      placeholder="Type here..."
    />
  );
};
