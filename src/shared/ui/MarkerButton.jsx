import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";

const MarkerButton = ({ onClick = () => {}, marked = false }) => {
  const [isMarked, setIsMarked] = useState(marked);
  const handleMark = async () => {
    try {
      await onClick();
      setIsMarked(!isMarked);
    } catch (err) {
      console.error("Failed to mark/unmark. Please try again.");
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
        minWidth: "110px",
        textAlign: "center",
      }}
    >
      {isMarked ? "Marked" : " Mark  "}
    </Button>
  );
};

export default MarkerButton;
