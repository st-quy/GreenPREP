import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Typography, Space, Input, Alert, Divider } from "antd";
import { InfoCircleOutlined, LockOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

export const TestPage = () => {
  const navigate = useNavigate();

  // Check if test is active using sessionStorage directly
  useEffect(() => {
    const testActive = sessionStorage.getItem("testStarted") === "true";
    if (!testActive) {
      navigate("/");
    }
  }, [navigate]);

  const handleFinishTest = () => {
    navigate("/exit-test");
  };

  return (
    <Card className="max-w-2xl mx-auto m-4">
      <Space direction="vertical" className="w-full">
        <Title level={2}>Test Page</Title>

        <Paragraph>
          <InfoCircleOutlined className="mr-2" />
          Try using keyboard shortcuts in the fields below. The following
          actions are blocked:
        </Paragraph>

        <ul className="list-disc pl-8 mb-4">
          <li>Ctrl+C (copy)</li>
          <li>Ctrl+V (paste)</li>
          <li>Ctrl+Tab (switch tabs)</li>
          <li>Right-click menu</li>
          <li>Escape key (exit fullscreen)</li>
          <li>Alt+Tab (switch tabs)</li>
          <li> Alt+Left/Right (browser back/forward navigation)</li>
          <li>F11 key (fullscreen toggle)</li>
          <li>Ctrl+Tab and Ctrl+Shift+Tab (switch between tabs)</li>
          <li>Ctrl+1 through Ctrl+9 (switch to specific tabs)</li>
          <li>Ctrl+T (new tab)</li>
          <li>Ctrl+N (new window)</li>
          <li>Alt+F4 (close window)</li>
          <li>Ctrl+W (close tab)</li>
        </ul>

        <Divider />

        <div className="mb-4">
          <Text strong>Test Field 1: Single-line Input</Text>
          <Input
            placeholder="Try typing and using keyboard shortcuts here..."
            className="mt-2"
            prefix={<LockOutlined />}
          />
        </div>

        <div className="mb-4">
          <Text strong>Test Field 2: Multi-line Input</Text>
          <TextArea
            rows={4}
            placeholder="Try copying and pasting text here..."
            className="mt-2"
          />
        </div>

        <Paragraph type="secondary" className="mt-4">
          You should not be able to copy text from these fields or paste text
          into them using keyboard shortcuts. The right-click menu should also
          be disabled.
        </Paragraph>

        <div className="mt-4 text-center">
          <Button type="primary" size="large" onClick={handleFinishTest}>
            Finish Test
          </Button>
        </div>
      </Space>
    </Card>
  );
};
