import React from "react";
import { Form, Input, Button, Card, Typography, Spin } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useUpdateProfile } from "@features/auth/hooks";
import { useSelector } from "react-redux";

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const { user } = useSelector((state) => state.auth);

  const handleFinish = (values) => {
    updateProfile(values);
  };

  const [form] = Form.useForm();

  const initialValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    class: user?.class,
    studentCode: user?.studentCode,
    phone: user?.phone,
  };

  if (!user) {
    return (
      <div className="flex justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="flex flex-col px-10">
      <div
        className="flex items-center gap-2 mb-6 cursor-pointer"
        onClick={() => navigate("/profile")}
      >
        <LeftOutlined />
        <Typography.Text className="text-sm inline-block">
          Back to profile
        </Typography.Text>
      </div>
      <Typography.Title className="font-bold mb-2">
        Update Profile
      </Typography.Title>
      <p className="text-gray-600 mb-6">
        Keep your profile up to date by editing your personal information.
      </p>
      <Card className="w-full">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          size="large"
          className="grid grid-cols-2 gap-4"
          initialValues={initialValues}
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: "First name is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Last name is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Class Name"
            name="class"
            rules={[{ required: true, message: "Class name is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Student ID"
            name="studentCode"
            rules={[{ required: true, message: "Student ID is required" }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              {
                pattern: /^[0-9]+$/,
                message: "Phone number must be numeric",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="col-span-2 flex justify-end space-x-4">
            <Button
              type="default"
              htmlType="button"
              onClick={() => navigate("/profile")}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={isPending}>
              Update
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default ProfileUpdate;
