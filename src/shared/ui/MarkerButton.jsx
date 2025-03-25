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
