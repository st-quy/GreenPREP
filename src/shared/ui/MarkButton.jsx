import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";

const MarkButton = ({ onClick, marked = false }) => {
  const [isMarked, setIsMarked] = useState(marked);
  const [error, setError] = useState(null);

  const handleMark = () => {
    try {
      const newStatus = !isMarked;
      setIsMarked(newStatus);
      onClick();
    } catch (err) {
      setError("Failed to mark/unmark. Please try again.");
    }
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
      onClick={handleMark}
      style={{
        borderColor: "#f26f21",
        color: isMarked ? "white" : "#f26f21",
        fontWeight: "bold",
        backgroundColor: isMarked ? "#f26f21" : "transparent",
      }}
    >
      Mark
    </Button>
  );
};

export default MarkButton;
