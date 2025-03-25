import { useMarkContext } from "@features/reading/context/markContext";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Button } from "antd";

const ReadingMarkButton = ({ questionId }) => {
  const { markedQuestions, toggleMark } = useMarkContext();
  const isMarked = markedQuestions.includes(questionId);

  const handleMark = () => {
    toggleMark(questionId);
  };

  return (
    <Button
      type="default"
      shape="round"
      icon={
        isMarked ? (
          <StarFilled style={{ color: "white" }} />
        ) : (
          <StarOutlined style={{ color: "#f26f21" }} />
        )
      }
      onClick={handleMark} // Sử dụng handleMark thay vì lỗi undefined
      style={{
        borderColor: "#f26f21",
        color: isMarked ? "white" : "#f26f21",
        backgroundColor: isMarked ? "#f26f21" : "transparent",
        minWidth: "110px",
        textAlign: "center",
      }}
      className="font-[500] lg:text-[16px]"
    >
      {isMarked ? "Marked" : "Mark"}
    </Button>
  );
};

export default ReadingMarkButton;
