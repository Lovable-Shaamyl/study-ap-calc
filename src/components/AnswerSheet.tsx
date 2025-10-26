import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

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

  const handleDeleteBox = (id: string) => {
    setTextBoxes(textBoxes.filter((box) => box.id !== id));
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
          onDelete={() => handleDeleteBox(box.id)}
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
  onDelete: () => void;
  calculateWidth: (text: string) => number;
  sheetWidth: number;
}

const TextBoxInput = ({ box, onChange, onDelete, calculateWidth, sheetWidth }: TextBoxInputProps) => {
  const [width, setWidth] = useState(box.width);
  const [isAtMaxWidth, setIsAtMaxWidth] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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
    const constrainedWidth = Math.min(newWidth, maxWidth);
    setWidth(constrainedWidth);
    setIsAtMaxWidth(newWidth >= maxWidth);
  }, [box.text, box.x, sheetWidth, calculateWidth]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    const newWidth = calculateWidth(newText);
    const maxWidth = sheetWidth - box.x - 20;
    
    // Only allow change if new text fits within max width
    if (newWidth <= maxWidth) {
      onChange(newText);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow backspace, delete, arrow keys, etc. even at max width
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Tab'];
    if (allowedKeys.includes(e.key)) {
      return;
    }
    
    // Prevent new characters if at max width
    if (isAtMaxWidth && e.key.length === 1) {
      e.preventDefault();
    }
  };

  return (
    <div
      className="absolute group"
      style={{
        left: `${box.x - 5}px`,
        top: `${box.y - 8}px`,
        width: `${width + 10}px`,
        paddingTop: "8px",
        paddingLeft: "5px",
        paddingRight: "5px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <input
        ref={inputRef}
        type="text"
        value={box.text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="w-full bg-transparent text-foreground focus:outline-none transition-colors px-1 overflow-hidden"
        style={{
          fontSize: "16px",
          fontFamily: "inherit",
        }}
      />
      
      {/* Delete button - shows on hover */}
      {isHovered && (
        <button
          onClick={onDelete}
          className="absolute top-0 right-0 w-4 h-4 rounded-full bg-destructive hover:bg-destructive/80 text-destructive-foreground flex items-center justify-center transition-all shadow-sm hover:shadow-md z-10"
          aria-label="Delete text box"
        >
          <X size={10} strokeWidth={3} />
        </button>
      )}
    </div>
  );
};
