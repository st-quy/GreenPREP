import React from "react";
import { Form, Input, Button, Card, Row, Col, Typography } from "antd";
import { yupSync } from "@shared/lib/utils";
import { registerSchema } from "./schema";
import { RegisterImg } from "@assets/images";
import { useRegister } from "@features/auth/hooks";

const { Title, Text } = Typography;

const Register = () => {
  const { mutate: registerFunc } = useRegister();
  const onFinish = (values) => {
    registerFunc(values);
  };

  return (
    <Row className=" bg-[#f3f4f6]">
      <Col
        xs={{ span: 24 }}
        md={{ span: 12 }}
        className="flex items-center justify-center p-4"
      >
        <Card className="w-full max-w-xl shadow-lg p-4 sm:p-8">
          <div className="mb-6">
            <Title
              level={2}
              className="!text-gray-900 !mb-2 text-center sm:text-left"
            >
              Create an account
            </Title>
            <Text className="text-gray-500 block text-center sm:text-left">
              Create an account to continue.
            </Text>
          </div>

          <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[yupSync(registerSchema)]}
              >
                <Input placeholder="First name" size="large" />
              </Form.Item>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[yupSync(registerSchema)]}
              >
                <Input placeholder="Last name" size="large" />
              </Form.Item>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Form.Item
                name="email"
                label="Email"
                rules={[yupSync(registerSchema)]}
              >
                <Input placeholder="Email" size="large" />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[yupSync(registerSchema)]}
              >
                <Input placeholder="Phone number" size="large" />
              </Form.Item>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Form.Item
                name="class"
                label="Class Name"
                rules={[yupSync(registerSchema)]}
              >
                <Input placeholder="Class name" size="large" />
              </Form.Item>
              <Form.Item
                name="studentCode"
                label="Student ID"
                rules={[yupSync(registerSchema)]}
              >
                <Input placeholder="Student ID" size="large" />
              </Form.Item>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Form.Item
                name="password"
                label="Password"
                rules={[yupSync(registerSchema)]}
              >
                <Input.Password placeholder="Password" size="large" />
              </Form.Item>
              <Form.Item
                name="passwordConfirmation"
                label="Confirm Password"
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
                <Input.Password placeholder="Confirm password" size="large" />
              </Form.Item>
            </div>
            <Form.Item className="mt-4">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="w-full bg-blue-700 hover:bg-blue-800 rounded-full"
              >
                Sign up
              </Button>
            </Form.Item>
          </Form>

          <Text className="text-gray-600 mt-4 block text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-700 hover:underline">
              Sign in
            </a>
          </Text>
        </Card>
      </Col>

      <Col
        xs={{ span: 0 }}
        md={{ span: 12 }}
        className="flex items-center justify-center"
      >
        <div className="text-center p-4">
          <img
            src={RegisterImg}
            alt="registerimage"
            className="max-w-full h-auto"
          />
        </div>
      </Col>
    </Row>
  );
};

export default Register;
