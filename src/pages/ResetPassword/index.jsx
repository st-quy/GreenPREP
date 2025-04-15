import { Form, Input, Button, Card, Row, Col, Typography, message } from "antd";
import { yupSync } from "@shared/lib/utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { ForgotPasswordImg } from "@assets/images";
import { useResetPassword } from "@features/auth/hooks";
import { ResetPasswordSchema } from "./schema";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const { Title, Text } = Typography;

const ResetPassword = () => {
  const navigate = useNavigate();
  const { mutate: resetPasswordFunc, isPending } = useResetPassword();
  const [searchParams, setSearchParams] = useSearchParams();

  const onFinish = (values) => {
    if (searchParams.get("token")) {
      resetPasswordFunc({
        token: searchParams.get("token"),
        newPassword: values.password,
      });
    }
  };

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      message.error("Token not found, please try again");
      navigate("/login");
    }

    const tokenExpiration = jwtDecode(token)?.exp;
    const currentTime = Math.floor(Date.now() / 1000);
    const isTokenExpired = tokenExpiration < currentTime;

    if (!token || isTokenExpired) {
      message.error("Token expired, please try again");
      navigate("/login");
    }
  }, [searchParams.get("token"), navigate]);

  return (
    <Row className="bg-[#f3f4f6] !gap-0 ">
      <Col xs={24} sm={24} md={24} lg={12} xxl={12} className="flex items-center lg:items-start lg:justify-end justify-center px-4 py-6 lg:py-8 lg:pr-8">
        <Card className="w-full max-w-[550px] lg:max-w-[600px] shadow-lg pt-[16px] pb-[120px] px-6 lg:pt-[16px] lg:pb-[160px] lg:px-8">
          <div
            className="mb-4 flex items-center cursor-pointer gap-2 text-[#003087] hover:text-[#003087]/90"
            onClick={() => navigate("/login")}
          >
            <LeftOutlined />
            <span>Back to login</span>
          </div>
          <div className="mb-6">
            <Title level={1} className="!text-[48px] !leading-[1.2] lg:!text-[46px] md:!text-[40px] sm:!text-[36px] !text-gray-900 !mb-3 !font-['Inter']">
              Create new password
            </Title>
            <Text className="text-gray-500 text-lg">
              Your previous password has been reset. Please set a new password for your account.
            </Text>
          </div>

          <Form layout="vertical" onFinish={onFinish} className="space-y-8">
            <div className="mb-8"></div>
            <Form.Item
              name="password"
              label={<span className="text-gray-900">New password <span className="text-red-500">*</span></span>}
              rules={[yupSync(ResetPasswordSchema)]}
            >
              <Input.Password 
                placeholder="********" 
                size="large"
                className="h-11 text-base rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="passwordConfirmation"
              label={<span className="text-gray-900">Confirm new password <span className="text-red-500">*</span></span>}
              dependencies={["password"]}
              required={false}
              rules={[
                {
                  required: true,
                  message: "Password confirmation is required",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords must match"));
                  },
                }),
              ]}
            >
              <Input.Password 
                placeholder="********" 
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
                Submit
              </Button>
            </Form.Item>
            <div className="mb-32"></div>
          </Form>
        </Card>
      </Col>

      <Col xs={24} sm={24} md={24} lg={12} xxl={12} className="flex items-center lg:justify-start justify-center px-4 lg:pt-2 lg:pl-8 mt-8 lg:mt-0">
        <img
          src={ForgotPasswordImg}
          alt="ResetPassword"
          className="w-full max-w-[500px] lg:max-w-[600px] h-auto object-contain"
        />
      </Col>
    </Row>
  );
};

export default ResetPassword;
