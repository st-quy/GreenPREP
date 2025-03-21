import { useNavigate } from "react-router-dom";
import { Button, Card, Typography, Result } from "antd";
import { useFullScreenContext } from "../context/FullScreenContext";

const { Text } = Typography;

export const ExitTest = () => {
  const { endTest, isFullScreen } = useFullScreenContext();
  const navigate = useNavigate();

  const handleReturnHome = () => {
    endTest();
    navigate("/homepage");
  };

  return (
    <Card className="max-w-md mx-auto m-4">
      <Result
        status="success"
        title="Test Completed"
        subTitle="You have successfully completed the fullscreen test demo."
        extra={[
          <Button
            type="primary"
            key="home"
            size="large"
            onClick={handleReturnHome}
          >
            Return to Home
          </Button>,
        ]}
      >
        <div className="text-center mt-4">
          <Text>
            {isFullScreen
              ? "You may now exit fullscreen mode using the browser controls."
              : "You have exited fullscreen mode."}
          </Text>
        </div>
      </Result>
    </Card>
  );
};
