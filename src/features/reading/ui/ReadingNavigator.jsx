import { useMarkContext } from "../context/markContext";
import { FaStar } from "react-icons/fa"; // Import star icon

const RQuestionNavigator = ({
  totalQuestions,
  onNavigate,
  markedQuestions,
}) => {
  return (
    <div className="mt-4 p-4 bg-white border rounded-md">
      <h6 className="font-bold">Question Navigation</h6>
      <div className="flex flex-wrap gap-2 mt-2">
        {Array.from({ length: totalQuestions }, (_, index) => {
          const isMarked = markedQuestions.includes(index);
          return (
            <button
              key={index}
              onClick={() => onNavigate(index)}
              className={`relative w-10 h-10 rounded-full flex items-center justify-center ${
                isMarked ? "bg-orange-500 text-white" : "bg-gray-200"
              }`}
            >
              {index + 1}
              {isMarked && (
                <FaStar className="absolute -top-1 -right-1 text-yellow-400" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RQuestionNavigator;
