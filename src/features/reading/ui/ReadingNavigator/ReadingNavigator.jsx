import { FaStar } from "react-icons/fa"; // Import icon sao
import { useReading } from "@features/reading/hooks/useReading"; // Import hook đã tạo

const ReadingQuestionNavigator = () => {
  const {
    totalQuestions,
    currentQuestionIndex,
    markedQuestions,
    handleNavigate,
  } = useReading();

  return (
    <div className="mt-4 rounded-md border bg-white ">
      <div className="mt-2 flex flex-wrap gap-2">
        {Array.from({ length: totalQuestions }, (_, index) => {
          const isMarked = markedQuestions.includes(index);
          const isActive = index === currentQuestionIndex;

          return (
            <button
              key={index}
              onClick={() => handleNavigate(index)}
              className={`relative flex h-10 w-10 items-center justify-center rounded-md border text-sm font-medium
                ${isActive ? "bg-blue-100 text-blue-600 border-blue-500" : "bg-gray-100 text-gray-700"}
              `}
            >
              {String(index + 1).padStart(2, "0")}
              {isMarked && (
                <FaStar
                  className="absolute -top-1 -right-1 text-orange-500"
                  size={12}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ReadingQuestionNavigator;
