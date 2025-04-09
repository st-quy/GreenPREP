import React from "react";
import { Form, Input, Button, Card, Typography, Spin, Modal } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useUpdateProfile } from "@features/auth/hooks";
import { useSelector } from "react-redux";
import { UpdateProfileSchema } from "../../schema.js";
import { yupSync } from "@shared/lib/utils";

const ProfileUpdate = ({ openKey, setOpenKey }) => {
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const { user } = useSelector((state) => state.auth);

  const handleFinish = (values) => {
    updateProfile(values, {
      onSuccess: () => {
        setOpenKey(null);
      },
    });
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
    <Modal
      open={openKey === "update-profile" ? true : false}
      footer={null}
      centered
      width={800}
      onCancel={() => setOpenKey(null)}
    >
      <div className="p-6">
        <Typography.Title level={3} className="font-bold mb-2">
          Update Profile
        </Typography.Title>
        <p className="text-gray-600 mb-6">
          Keep your profile up to date by editing your personal information.
        </p>
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
            required
            rules={[yupSync(UpdateProfileSchema)]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            required
            rules={[yupSync(UpdateProfileSchema)]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            required
            rules={[yupSync(UpdateProfileSchema)]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Class Name"
            name="class"
            rules={[yupSync(UpdateProfileSchema)]}
            required
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Student ID"
            name="studentCode"
            required
            rules={[yupSync(UpdateProfileSchema)]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[yupSync(UpdateProfileSchema)]}
          >
            <Input />
          </Form.Item>
          <div className="col-span-2 flex justify-end space-x-4">
            <Button
              type="default"
              htmlType="button"
              onClick={() => {
                setOpenKey(null);
                form.resetFields();
              }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={isPending}>
              Update
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default ProfileUpdate;
