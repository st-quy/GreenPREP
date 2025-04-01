import { FaStar } from "react-icons/fa";
import { useReadingContext } from "@features/reading/context/ReadingContext";

const ReadingQuestionNavigator = () => {
  const {
    exams,
    markedQuestions,
    doneQuestionsID,
    handleNavigate,
    currentPartIndex,
    currentQuestionIndex,
  } = useReadingContext();

  const allQuestions = exams.Parts.flatMap((part) => part.Questions);
  const currentQuestion =
    exams.Parts[currentPartIndex].Questions[currentQuestionIndex];

  return (
    <div className="mt-4 rounded-md border bg-white p-2">
      <div className="flex flex-wrap gap-2">
        {allQuestions.map((question, index) => {
          const isMarked = markedQuestions.includes(question.ID);
          const isDone = doneQuestionsID.includes(question.ID);
          const isActive = currentQuestion?.ID === question.ID;

          return (
            <button
              key={question.ID}
              onClick={() => handleNavigate(index)}
              className="relative flex h-10 w-10 items-center justify-center rounded-md border text-sm font-medium transition bg-gray-100 overflow-hidden"
            >
              {String(index + 1).padStart(2, "0")}

              <div className="absolute inset-0 mix-blend-multiply">
                {isActive && (
                  <div className="absolute inset-0 bg-blue-500 opacity-80"></div>
                )}
                {isDone && (
                  <div
                    className={`absolute inset-0 bg-green-500 ${isActive ? "opacity-40" : "opacity-90"} `}
                  ></div>
                )}
              </div>
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
