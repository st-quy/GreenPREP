import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFullScreen } from "../hooks/useFullScreen";
import { Button, Card, Typography, Space, Alert } from "antd";

const { Title, Text } = Typography;

export const EnterTest = () => {
  const [loading, setLoading] = useState(false);
  const { startTestInFullScreen, browserInfo } = useFullScreen();
  const navigate = useNavigate();

  const handleEnterTest = () => {
    setLoading(true);

    // Try to enter fullscreen mode
    const requestSuccess = startTestInFullScreen();

    // If the request was successful
    if (requestSuccess) {
      // Wait a short time to see if fullscreen is actually entered
      setTimeout(() => {
        // Navigate to test page
        navigate("/test");
        setLoading(false);
      }, 500);
    } else {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto m-4">
      <Space direction="vertical" className="w-full">
        <Title level={2}>Fullscreen Test Demo</Title>

        <Text>
          This demo shows how the fullscreen hook prevents users from exiting
          fullscreen mode and using keyboard shortcuts during a test.
        </Text>

        <Text>
          When you click "Enter Test", the application will switch to
          full-screen mode.
        </Text>

        <Text type="secondary">
          The test page will have input fields where you can try using Ctrl+C,
          Ctrl+V, Ctrl+Tab, and other restricted keyboard shortcuts.
        </Text>

        <div className="mt-4">
          <Button
            type="primary"
            size="large"
            onClick={handleEnterTest}
            loading={loading}
            disabled={!browserInfo?.supportsFullScreen}
            block
          >
            Enter Test
          </Button>
        </div>
      </Space>
    </Card>
  );
};
