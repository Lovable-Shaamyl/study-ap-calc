import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { X } from "lucide-react";

interface TextBox {
  id: string;
  x: number;
  y: number;
  text: string;
  width: number;
}

interface AnswerSheetProps {
  questionNumber: number;
  ref?: React.Ref<AnswerSheetHandle>;
}

export interface AnswerSheetHandle {
  getAllText: () => string;
}

export const AnswerSheet = forwardRef<AnswerSheetHandle, AnswerSheetProps>(({ questionNumber }, ref) => {
  const [textBoxes, setTextBoxes] = useState<TextBox[]>([]);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Expose getAllText method to parent components
  useImperativeHandle(ref, () => ({
    getAllText: () => {
      return textBoxes
        .filter(box => box.text.trim()) // Only include non-empty text boxes
        .map(box => box.text.trim()) // Trim whitespace
        .join(" "); // Join with space separator
    }
  }), [textBoxes]);

  // Utility function to clear all saved answer sheets (for development/reset purposes)
  // Uncomment and call this function if you need to clear all saved data
  // const clearAllAnswerSheets = () => {
  //   for (let i = 1; i <= 8; i++) {
  //     localStorage.removeItem(`answerSheet-question-${i}`);
  //   }
  //   setTextBoxes([]);
  // };

  // Load textBoxes from localStorage when component mounts or question changes
  useEffect(() => {
    const savedData = localStorage.getItem(`answerSheet-question-${questionNumber}`);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setTextBoxes(parsedData);
      } catch (error) {
        console.error('Error parsing saved answer sheet data:', error);
        setTextBoxes([]);
      }
    } else {
      setTextBoxes([]);
    }
  }, [questionNumber]);

  // Save textBoxes to localStorage whenever they change
  useEffect(() => {
    if (textBoxes.length > 0 || localStorage.getItem(`answerSheet-question-${questionNumber}`)) {
      localStorage.setItem(`answerSheet-question-${questionNumber}`, JSON.stringify(textBoxes));
    }
  }, [textBoxes, questionNumber]);

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
    if (!text) return 20; // Minimum width for empty text
    
    // Create a canvas to measure text width accurately
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return Math.max(20, text.length * 8 + 40); // Fallback
    
    // Match the font style used in the textarea
    context.font = '16px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    
    // Measure the actual text width
    const textWidth = context.measureText(text).width;
    
    // Add padding for the textarea (padding + some extra space)
    return Math.max(60, textWidth + 20);
  };

  return (
    <div
      ref={sheetRef}
      onClick={handleSheetClick}
      className="relative w-full h-[842px] bg-paper rounded-sm shadow-lg cursor-text overflow-hidden resize-none"
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
});

AnswerSheet.displayName = 'AnswerSheet';

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
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Auto-focus new text boxes
    if (box.text === "" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [box.text]);

  useEffect(() => {
    const newWidth = calculateWidth(box.text);
    const maxWidth = sheetWidth - box.x - 20; // 20px padding from right edge
    const constrainedWidth = Math.min(newWidth, maxWidth);
    setWidth(constrainedWidth);
    setIsAtMaxWidth(newWidth >= maxWidth);
  }, [box.text, box.x, sheetWidth, calculateWidth]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    const newWidth = calculateWidth(newText);
    const maxWidth = sheetWidth - box.x - 20;
    
    // Only allow change if new text fits within max width
    if (newWidth <= maxWidth) {
      onChange(newText);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle Enter key - prevent new line and lose focus
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputRef.current) {
        inputRef.current.blur();
      }
      return;
    }
    
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
      <textarea
        ref={inputRef}
        value={box.text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="w-full bg-transparent text-foreground focus:outline-none transition-colors px-1 overflow-hidden resize-none"
        style={{
          fontSize: "16px",
          fontFamily: "inherit",
          whiteSpace: "nowrap",
          lineHeight: "1.2",
          height: "1.2em",
        }}
        rows={1}
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
