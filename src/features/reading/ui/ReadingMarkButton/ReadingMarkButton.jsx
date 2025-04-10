import { FlagOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useReadingContext } from "@features/reading/context/ReadingContext";

const ReadingMarkButton = ({ questionId }) => {
  const { markedQuestions, toggleMark } = useReadingContext();
  const isMarked = markedQuestions.includes(questionId);

  const handleMark = () => {
    toggleMark(questionId);
  };

  return (
    <Button
      type="primary"
      onClick={handleMark}
      icon={<FlagOutlined />}
      className={`ml-4 px-3 py-1 text-sm font-medium rounded-xl transition-all duration-200 border-0 ${
        isMarked
          ? "bg-yellow-500 !text-white hover:!bg-yellow-600"
          : "bg-gray-200 !text-black hover:!bg-gray-300"
      }`}
    >
      {isMarked ? "Marked" : "Mark"}
    </Button>
  );
};

export default ReadingMarkButton;