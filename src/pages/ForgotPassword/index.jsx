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
    <Row className=" bg-[#f3f4f6] !gap-0">
      <Col xs={24} sm={24} md={24} lg={12} xxl={12} className="flex items-center lg:items-start lg:justify-end justify-center px-4 py-8 lg:py-16 lg:pt-24 lg:pr-12">
        <Card className="w-full max-w-[550px] lg:max-w-[600px] shadow-lg pt-[20px] pb-[150px] px-6 lg:pt-[20px] lg:pb-[210px] lg:px-10">
          <div
            className="mb-4 flex items-center cursor-pointer gap-2 text-[#003087] hover:text-[#003087]/90"
            onClick={() => navigate("/login")}
          >
            <LeftOutlined />
            <span>Back to login</span>
          </div>
          <div className="mb-6">
            <Title level={1} className="!text-[48px] !text-gray-900 !mb-3 !font-['Inter']">
              Forgot password?
            </Title>
            <Text className="text-gray-500 text-lg">
              Don't worry! Enter your email below to recover your password
            </Text>
          </div>

          <Form layout="vertical" onFinish={onFinish} className="space-y-8">
            <div className="mb-8"></div>
            <Form.Item
              name="email"
              label={<span className="text-base">Email <span className="text-red-500">*</span></span>}
              rules={[yupSync(forgotPasswordSchema)]}
            >
              
              <Input 
                placeholder="Enter your email here" 
                size="large" 
                className="h-11 text-base rounded-lg"
              />
            </Form.Item>

            <Form.Item className="mb-8 flex justify-center">
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
            <div className="mb-32"></div>
          </Form>
        </Card>
      </Col>

      <Col xs={24} sm={24} md={24} lg={12} xxl={12} className="flex items-center lg:justify-start justify-center px-4 lg:pt-8 lg:pl-12 mt-8 lg:-mt-6">
        <img
          src={ForgotPasswordImg}
          alt="ForgotPassword"
          className="w-full max-w-[500px] lg:max-w-[600px] h-auto object-contain"
        />
      </Col>
    </Row>
  );
};
export default ForgotPassword;
