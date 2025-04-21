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
      ghost
      onClick={handleMark}
      icon={<FlagOutlined />}
      className={`ml-4 px-3 py-1 text-sm font-medium rounded-xl border ${
        isMarked
          ? "!bg-yellow-600 !text-white !border-0 hover:!bg-yellow-700"
          : "!text-primaryColor !border-primaryColor hover:!bg-primaryColor hover:!text-white"
      }`}
    >
      {isMarked ? "Marked" : "Mark"}
    </Button>
  );
};

export default ReadingMarkButton;
