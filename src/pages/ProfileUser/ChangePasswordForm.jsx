import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { passwordSchema } from "@pages/ProfileUser/changepasswordSchema";
import { useNavigate, Link } from "react-router-dom";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const ChangePasswordPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validateField = async (fieldName) => {
    try {
      await passwordSchema.validateAt(fieldName, form.getFieldsValue());
      form.setFields([{ name: fieldName, errors: [] }]);
    } catch (err) {
      form.setFields([{ name: fieldName, errors: [err.message] }]);
    }
  };

  const handleSubmit = async (values) => {
    try {
      await passwordSchema.validate(values, { abortEarly: false });
      message.success("Password changed successfully");
      navigate("/profile");
      form.resetFields();
    } catch (err) {
      if (err.inner) {
        const errors = {};
        err.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        Object.keys(errors).forEach((field) => {
          form.setFields([
            {
              name: field,
              errors: [errors[field]],
            },
          ]);
        });
      } else {
        message.error("Failed to change password. Please try again.");
      }
    }
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  const renderPasswordField = (fieldName, label) => (
    <Form.Item
      label={
        <span className="font-medium text-[16px] leading-6 text-[#111928]">
          {label} <span className="text-red-500">*</span>
        </span>
      }
      name={fieldName}
      className="mb-6"
    >
      <Input
        type={showPasswords[fieldName] ? "text" : "password"}
        className="w-full rounded-md border border-[#111928] py-3 pl-5 pr-4 text-base font-medium"
        onChange={() => validateField(fieldName)}
        suffix={
          <span
            onClick={() => togglePasswordVisibility(fieldName)}
            className="cursor-pointer text-gray-400"
          >
            {showPasswords[fieldName] ? (
              <EyeOutlined />
            ) : (
              <EyeInvisibleOutlined />
            )}
          </span>
        }
      />
    </Form.Item>
  );

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="w-full max-w-[1440px] mx-auto relative">
        <div className="mb-8 pt-8 relative">
          <div className="absolute left-0 top-0 md:left-8 lg:left-12">
            <Link
              to="/profile"
              className="inline-flex items-center font-medium text-[16px] leading-[26px] text-[#111928] no-underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Back to profile
            </Link>
          </div>

          <div className="text-center md:text-left md:pl-8 lg:pl-12 pt-12 md:pt-8">
            <h1 className="font-bold text-[24px] md:text-[28px] lg:text-[30px] leading-[38px] text-black mb-2">
              Change password
            </h1>

            <p className="font-medium text-[16px] md:text-[18px] leading-[26px] text-[#637381]">
              Secure your account with a new password.
            </p>
          </div>
        </div>

        <div
          className="bg-white rounded-lg p-4 sm:p-6 md:p-8 mx-auto mt-6 md:mt-8 
                     w-full sm:w-[90%] md:w-[80%] lg:w-[574px] max-w-[574px] shadow"
          style={{ boxShadow: "0px 0px 4px 0px #00000026" }}
        >
          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            className="w-full"
          >
            {renderPasswordField("currentPassword", "Current password")}
            {renderPasswordField("newPassword", "New password")}

            <Form.Item
              label={
                <span className="font-medium text-[16px] leading-6 text-[#111928]">
                  Confirm new password <span className="text-red-500">*</span>
                </span>
              }
              name="confirmPassword"
              className="mb-8"
            >
              <Input
                type={showPasswords.confirmPassword ? "text" : "password"}
                className="w-full rounded-md border border-[#111928] py-3 pl-5 pr-4 text-base font-medium"
                onChange={() => validateField("confirmPassword")}
                suffix={
                  <span
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                    className="cursor-pointer text-gray-400"
                  >
                    {showPasswords.confirmPassword ? (
                      <EyeOutlined />
                    ) : (
                      <EyeInvisibleOutlined />
                    )}
                  </span>
                }
              />
            </Form.Item>

            <div className="flex justify-end gap-4">
              <Button
                onClick={handleCancel}
                className="h-[40px] sm:h-[45px] md:h-[50px] px-4 sm:px-6 md:px-[28px] rounded-[50px] 
                          border border-[#003087] bg-white text-[#003087] font-medium transition-all duration-300 
                          hover:bg-[#E5E7EB] hover:shadow-md hover:-translate-y-0.5"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="h-[40px] sm:h-[45px] md:h-[50px] px-4 sm:px-6 md:px-[28px] rounded-[50px] 
                          bg-[#003087] text-white font-medium transition-all duration-300
                          hover:bg-[#4D82CC] hover:shadow-md hover:-translate-y-0.5"
              >
                Update
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export const ChangePassword = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen && !onClose) {
    navigate("/changepassword");
    return null;
  }

  const ChangePasswordPage = React.lazy(() => import("./ChangePasswordForm"));
  return <ChangePasswordPage />;
};

export default ChangePasswordPage;
