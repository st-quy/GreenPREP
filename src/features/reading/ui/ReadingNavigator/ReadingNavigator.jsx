import { FaStar } from "react-icons/fa"; // Import icon sao
import { useReadingContext } from "@features/reading/context/ReadingContext";

const ReadingQuestionNavigator = () => {
  const {
    exams,
    markedQuestions,
    handleNavigate,
    currentPartIndex,
    currentQuestionIndex,
  } = useReadingContext();

  // Tạo danh sách tất cả câu hỏi với index đúng
  const allQuestions = exams.Parts.flatMap((part) => part.Questions);

  // Lấy câu hỏi hiện tại
  const currentQuestion =
    exams.Parts[currentPartIndex].Questions[currentQuestionIndex];

  return (
    <div className="mt-4 rounded-md border bg-white ">
      <div className="flex flex-wrap gap-2">
        {allQuestions.map((question, index) => {
          const isMarked = markedQuestions.includes(question.ID);
          const isActive = currentQuestion?.ID === question.ID; // Check câu hiện tại đúng

          return (
            <button
              key={question.ID}
              onClick={() => handleNavigate(index)}
              className={`relative flex h-10 w-10 items-center justify-center rounded-md border text-sm font-medium transition
                ${isActive ? "bg-[#E1E8FF] text-[#3758F9] border-blue-500" : "bg-gray-100 text-gray-700"}
                hover:bg-gray-200
              `}
            >
              {String(index + 1).padStart(2, "0")}
              {isMarked && (
                <FaStar
                  className="absolute top-[2px] right-[2px] text-orange-500"
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
