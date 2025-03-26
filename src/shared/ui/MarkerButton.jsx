import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Button } from "antd";

const MarkerButton = ({ onClick = () => {}, marked = false }) => {
  return (
    <Button
      type="default"
      shape="round"
      icon={marked ? (
        <StarFilled className="text-[#FFFFFF]" />
      ) : (
        <StarOutlined className="text-[#E1580E]" />
      )}
        onClick={onClick}
        className={`border text-center font-bold min-w-[110px] ${
          marked
            ? "border-[#E1580E] text-[#FFFFFF] bg-[#E1580E] text-[#E1580E] hover:!text-[#E1580E] hover:!border-[#E1580E]"
            : "border-[#E1580E] text-[#E1580E] bg-transparent text-[#E1580E] hover:!text-[#E1580E] hover:!border-[#E1580E]"
        }`}
      >
      {marked ? "Marked" : "Mark"}
    </Button>
  );
};

export default MarkerButton;

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

