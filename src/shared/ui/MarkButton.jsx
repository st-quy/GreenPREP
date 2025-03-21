import { Button } from "antd";
import { useState } from "react";

const MarkButton = ({ onClick, marked = false }) => {
  const [isMarked, setIsMarked] = useState(marked);
  const [error, setError] = useState(null);

  const handleMark = () => {
    try {
      const newStatus = !isMarked;
      setIsMarked(newStatus);
      onClick();
    } catch (err) {
      setError("Failed to mark/unmark. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Button
        onClick={handleMark}
        className={`px-4 py-2 font-semibold rounded-3xl transition-all
          ${isMarked ? "bg-blue-600 text-white" : "bg-gray-300 text-black"}
          hover:opacity-80`}
      >
        {isMarked ? "Marked" : "Not Mark"}
      </Button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default MarkButton;
