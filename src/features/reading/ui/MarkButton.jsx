import { useMarkContext } from "../context/markContext";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Button } from "antd";

const MarkButton = ({ questionId }) => {
  const { markedQuestions, toggleMark } = useMarkContext();
  const isMarked = markedQuestions.includes(questionId);

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
      onClick={() => toggleMark(questionId)}
      style={{
        borderColor: "#f26f21",
        color: isMarked ? "white" : "#f26f21",
        fontWeight: "bold",
        backgroundColor: isMarked ? "#f26f21" : "transparent",
        minWidth: "110px",
        textAlign: "center",
      }}
    >
      {isMarked ? "Marked" : "Mark"}
    </Button>
  );
};

export default MarkButton;
