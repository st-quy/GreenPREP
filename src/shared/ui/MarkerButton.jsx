import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Button } from "antd";

const MarkerButton = ({ onClick = () => {}, marked = false }) => {
  return (
    <Button
      type="default"
      shape="round"
      icon={marked ? (
        <StarFilled style={{ color: "white" }} />
      ) : (
        <StarOutlined style={{ color: "#f26f21" }} />
      )}
      onClick={onClick} 
      style={{
        borderColor: "#f26f21",
        color: marked ? "white" : "#f26f21",
        fontWeight: "bold",
        backgroundColor: marked ? "#f26f21" : "transparent",
        minWidth: "110px",
        textAlign: "center",
      }}
    >
      {marked ? "Marked" : "Mark"}
    </Button>
  );
};

export default MarkerButton;
