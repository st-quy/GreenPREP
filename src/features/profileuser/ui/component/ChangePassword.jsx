import React from 'react';
import { Form, Input, Button, Modal, message } from 'antd';
import PropTypes from 'prop-types';
import { passwordSchema } from '../../schema/profileButtonsSchema';
import { getUserFromToken, changePasswordFromApi } from '../../../../shared/lib/utils/auth';

const ChangePassword = ({ isOpen, onClose, userData }) => {
  const [form] = Form.useForm();

  const validateField = async (fieldName, value) => {
    try {
      const values = form.getFieldsValue();
      
      // Validate specific field rules
      switch (fieldName) {
        case 'currentPassword':
          if (!value) {
            throw new Error('Current password is required');
          }
          break;
        case 'newPassword':
          if (!value) {
            throw new Error('New password is required');
          }
          break;
        case 'confirmPassword':
          if (!value) {
            throw new Error('Please confirm your password');
          }
          if (value !== values.newPassword) {
            throw new Error('The two passwords do not match');
          }
          break;
        default:
          break;
      }

      form.setFields([{ name: fieldName, errors: [] }]);
    } catch (err) {
      form.setFields([{ name: fieldName, errors: [err.message] }]);
    }
  };

  const handleSubmit = async (values) => {
    try {
      
      // Verify confirm password matches new password
      if (values.newPassword !== values.confirmPassword) {
        form.setFields([
          {
            name: "confirmPassword",
            errors: ["The two passwords do not match"],
          },
        ]);
        return;
      }

      const decodedUser = getUserFromToken();
      if (!decodedUser?.userId) {
        throw new Error('No user ID found in token');
      }
      console.log(values.currentPassword);
      console.log(values.newPassword);

      // Call change password API
      await changePasswordFromApi(decodedUser.userId, {
        oldPassword: values.currentPassword,
        newPassword: values.newPassword
      });

      message.success("Password changed successfully");
      onClose();
      form.resetFields();
    } catch (err) {
      if (err.response?.data?.message) {
        message.error(err.response.data.message);
      } else {
        message.error("Failed to change password. Please try again.");
      }
    }
  };

  return (
    <Modal
      title={
        <div className="mb-4">
          <h4 className="text-xl font-bold mb-2">Change Password</h4>
          <p className="text-gray-500">
            Secure your account with a new password.
          </p>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={500}
      maskClosable={false}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        className="space-y-4"
      >
        <Form.Item
          label={
            <span className="font-medium">
              Current password <span className="text-red-500">*</span>
            </span>
          }
          name="currentPassword"
          validateTrigger={["onChange", "onBlur"]}
          validateFirst
          rules={[
            { required: true, message: 'Current password is required' }
          ]}
        >
          <Input.Password
            className="h-[46px] rounded-lg"
            placeholder="Enter your current password"
            onChange={(e) => validateField("currentPassword", e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="font-medium">
              New password <span className="text-red-500">*</span>
            </span>
          }
          name="newPassword"
          validateTrigger={["onChange", "onBlur"]}
          validateFirst
          rules={[
            { required: true, message: 'New password is required' }
          ]}
        >
          <Input.Password
            className="h-[46px] rounded-lg"
            placeholder="Enter your new password"
            onChange={(e) => validateField("newPassword", e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="font-medium">
              Confirm new password <span className="text-red-500">*</span>
            </span>
          }
          name="confirmPassword"
          validateTrigger={["onChange", "onBlur"]}
          validateFirst
          rules={[
            { required: true, message: 'Please confirm your password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match'));
              },
            }),
          ]}
        >
          <Input.Password
            className="h-[46px] rounded-lg"
            placeholder="Confirm your new password"
            onChange={(e) => validateField("confirmPassword", e.target.value)}
          />
        </Form.Item>

        <div className="flex justify-end gap-4 mt-6">
          <Button
            onClick={onClose}
            className="h-[46px] w-[113px] rounded-full"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="h-[46px] w-[113px] bg-[#003087] hover:bg-[#002A6B] rounded-full"
          >
            Update
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

ChangePassword.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  userData: PropTypes.shape({
    password: PropTypes.string
  })
};

export default ChangePassword; 