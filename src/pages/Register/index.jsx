import React from "react";
import { Form, Input, Button, Card, Row, Col, Typography } from "antd";
import { yupSync } from "@shared/lib/utils";
import { registerSchema } from "./schema";
import { RegisterAccount } from "@assets/images";
import { useRegister } from "@features/auth/hooks";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const Register = () => {
  const navigate = useNavigate();
  const { mutate: registerFunc, isPending } = useRegister();
  const onFinish = (values) => {
    registerFunc(values);
  };

  return (
    <Row className="!gap-0 ">
      <Col
        xs={24}
        sm={24}
        md={24}
        lg={12}
        xxl={12}
        className="flex items-start lg:justify-end justify-center px-4 py-6 lg:py-8 lg:pr-8"
      >
        <Card className="w-full max-w-[600px] shadow-lg pt-[16px] pb-6 px-6 lg:pb-12 lg:px-8">
          <div className="mb-6">
            <Title
              level={1}
              className="!text-[48px] !text-gray-900 !mb-3 !font-['Inter']"
            >
              Create an account
            </Title>
            <Text className="text-gray-500 text-lg">
              Create an account to continue.
            </Text>
          </div>

          <Form layout="vertical" onFinish={onFinish}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Form.Item name="firstName" rules={[yupSync(registerSchema)]}>
                <Input
                  placeholder="First name *"
                  size="large"
                  className="h-11 text-base rounded-lg"
                />
              </Form.Item>
              <Form.Item name="lastName" rules={[yupSync(registerSchema)]}>
                <Input
                  placeholder="Last name *"
                  size="large"
                  className="h-11 text-base rounded-lg"
                />
              </Form.Item>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Form.Item name="email" rules={[yupSync(registerSchema)]}>
                <Input
                  placeholder="Email *"
                  size="large"
                  className="h-11 text-base rounded-lg"
                />
              </Form.Item>
              <Form.Item name="phone" rules={[yupSync(registerSchema)]}>
                <Input
                  placeholder="Phone number"
                  size="large"
                  className="h-11 text-base rounded-lg"
                />
              </Form.Item>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Form.Item name="class" rules={[yupSync(registerSchema)]}>
                <Input
                  placeholder="Class name *"
                  size="large"
                  className="h-11 text-base rounded-lg"
                />
              </Form.Item>
              <Form.Item name="studentCode" rules={[yupSync(registerSchema)]}>
                <Input
                  placeholder="Student ID *"
                  size="large"
                  className="h-11 text-base rounded-lg"
                />
              </Form.Item>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Form.Item name="password" rules={[yupSync(registerSchema)]}>
                <Input.Password
                  placeholder="Password"
                  size="large"
                  className="h-11 text-base rounded-lg"
                />
              </Form.Item>
              <Form.Item
                name="passwordConfirmation"
                dependencies={["password"]}
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
                  placeholder="Confirm password"
                  size="large"
                  className="h-11 text-base rounded-lg"
                />
              </Form.Item>
            </div>
            <Form.Item className="mt-4 flex justify-center">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="!w-[250px] !h-[50px] text-base font-medium !bg-[#003087] hover:!bg-[#003087]/90 rounded-full"
                loading={isPending}
              >
                Sign up
              </Button>
            </Form.Item>
          </Form>

          <div className="text-left">
            <Text className="text-gray-600 text-base">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-[#003087] hover:text-[#003087]/90 cursor-pointer font-medium"
              >
                Sign in
              </span>
            </Text>
          </div>
        </Card>
      </Col>

      <Col
        xs={24}
        sm={24}
        md={24}
        lg={12}
        xxl={12}
        className="flex items-start lg:justify-start justify-center px-4 lg:pt-2 lg:pl-8 mt-8 lg:mt-0"
      >
        {/* <img
          src={RegisterAccount}
          alt="registerimage"
          className="w-full max-w-[500px] lg:max-w-[700px] h-auto object-contain"
        /> */}
      </Col>
    </Row>
  );
};

export default Register;
