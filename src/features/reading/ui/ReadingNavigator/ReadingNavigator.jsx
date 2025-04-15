import { useReadingContext } from "@features/reading/context/ReadingContext";
import { Badge, Button } from "antd";
import { FlagFilled, FlagOutlined } from "@ant-design/icons";

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
    <div className="mt-4 rounded-md border bg-white">
      <div className="grid grid-cols-5 gap-2.5">
        {allQuestions.map((question, index) => {
          const isMarked = markedQuestions.includes(question.ID);
          const isDone = doneQuestionsID.includes(question.ID);
          const isActive = currentQuestion?.ID === question.ID;

          return (
            <Badge
              className="!w-11 !h-11"
              count={
                isMarked ? (
                  <FlagFilled className=" p-1 rounded-full text-[#EA7300] font-bold" />
                ) : null
              }
              key={index}
            >
              <Button
                key={question.ID}
                onClick={() => handleNavigate(index)}
                className={`w-11 h-11 rounded-xl text-sm font-medium flex items-center justify-center border-1 hover:!border-gray-300 ${
                  isActive
                    ? "bg-[#E1E8FF] hover:!bg-[#d6e0ff] !border-[#4C6AFA] !text-[#4C6AFA]"
                    : "bg-gray-50 text-gray-900 hover:bg-gray-100"
                }`}
              >
                {index + 1}
                <div
                  className={`${isDone ? "!bg-green-500 " : ""} absolute w-11 h-3  -bottom-1 rounded-b-lg `}
                ></div>
              </Button>
            </Badge>
          );
        })}
      </div>
    </div>
  );
};

export default ReadingQuestionNavigator;
