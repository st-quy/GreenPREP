import { FaStar } from "react-icons/fa"; // Import star icon

const RQuestionNavigator = ({
  totalQuestions,
  onNavigate,
  markedQuestions,
}) => {
  return (
    <div className="mt-4 rounded-md border bg-white p-4">
      <h6 className="mb-4 text-[16px] font-semibold">Question Navigation</h6>
      <div className="mt-2 flex flex-wrap gap-2">
        {Array.from({ length: totalQuestions }, (_, index) => {
          const isMarked = markedQuestions.includes(index);
          return (
            <button
              key={index}
              onClick={() => onNavigate(index)}
              className={`relative flex h-10 w-10 items-center justify-center rounded-full ${
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
