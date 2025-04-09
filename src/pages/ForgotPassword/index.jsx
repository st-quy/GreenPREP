import { Form, Input, Button, Card, Row, Col, Typography } from "antd";
import { yupSync } from "@shared/lib/utils";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { ForgotPasswordImg } from "@assets/images";
import { forgotPasswordSchema } from "./schema";
import { useForgotPassword } from "@features/auth/hooks";

const { Title, Text } = Typography;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { mutate: forgotPasswordFunc, isPending } = useForgotPassword();
  const onFinish = (values) => {
    forgotPasswordFunc({ ...values, host: window.location.origin });
  };
  return (
    <Row className="min-h-screen bg-[#f3f4f6]">
      <Col xs={24} sm={24} md={24} lg={12} xxl={12} className="flex items-center justify-center px-4 py-6 lg:px-8">
        <Card className="w-full max-w-[550px] shadow-lg pt-[83px] pb-[133px] px-6 lg:px-8">
          <div
            className="mb-8 flex items-center cursor-pointer gap-2 text-[#003087] hover:text-[#003087]/90"
            onClick={() => navigate("/login")}
          >
            <LeftOutlined />
            <span>Back to login</span>
          </div>
          <div className="mb-8">
            <Title level={1} className="!text-[32px] !text-gray-900 !mb-3">
              Forgot password?
            </Title>
            <Text className="text-gray-500 text-lg">
              Don't worry! Enter your email below to recover your password
            </Text>
          </div>

          <Form layout="vertical" onFinish={onFinish} className="space-y-6">
            <div className="mb-8"></div>
            <Form.Item
              name="email"
              rules={[yupSync(forgotPasswordSchema)]}
            >
              <Input 
                placeholder="Email *" 
                size="large" 
                className="h-11 text-base rounded-lg"
              />
            </Form.Item>

            <Form.Item className="mb-6 flex justify-center">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="!w-[250px] !h-[50px] text-base font-medium !bg-[#003087] hover:!bg-[#003087]/90 rounded-full"
                loading={isPending}
              >
                Reset password
              </Button>
            </Form.Item>
            <div className="mb-24"></div>
          </Form>
        </Card>
      </Col>

      <Col xs={0} sm={0} md={0} lg={12} xxl={12} className="flex items-center justify-center px-4 lg:px-8">
        <img
          src={ForgotPasswordImg}
          alt="ForgotPassword"
          className="w-full max-w-[600px] h-auto object-contain"
        />
      </Col>
    </Row>
  );
};
export default ForgotPassword;
