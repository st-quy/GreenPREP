// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Form, Button, Input, message } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ForgotPw from "@assets/images/Forgotpw.png";
import { emailSchema } from "../schema/forgotPasswordSchema";
import { AuthApi } from "../api";
import Logo from "@assets/images/Logo.png";

const ForgotPasswordForm = () => {
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const [isReset, setIsReset] = useState(false);
  const navigate = useNavigate();
  const resetToken = searchParams.get("token");

  useEffect(() => {
    if (location.pathname === "/reset-password") {
      if (!resetToken) {
        message.error("Invalid or missing reset token");
        navigate("/forgot-password");
        return;
      }
      setIsReset(true);
    }
  }, [resetToken, location.pathname, navigate]);

  const forgotPasswordMutation = useMutation({
    mutationFn: (email) => AuthApi.forgotPassword(email),
    onSuccess: (response) => {
      message.success(
        response.message || "Password reset link sent to your email"
      );
    },
    onError: (error) => {
      message.error(
        error.response?.data?.message ||
          "Failed to process request. Please try again."
      );
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (data) => AuthApi.resetPassword(data.token, data.password),
    onSuccess: () => {
      navigate("/reset-password-success");
    },
    onError: (error) => {
      message.error(
        error.response?.data?.message ||
          "Failed to process request. Please try again."
      );
    },
  });

  const handleEmailSubmit = (values) => {
    forgotPasswordMutation.mutate(values.email);
  };

  const handlePasswordSubmit = (values) => {
    if (values.password !== values.confirmPassword) {
      message.error("Passwords do not match");
      return;
    }

    if (!resetToken) {
      message.error("Reset token is missing");
      return;
    }

    resetPasswordMutation.mutate({
      token: resetToken,
      password: values.password,
    });
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="flex item-center min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mt-5">
            <div className="w-full lg:w-[658px] h-auto lg:h-[697px] bg-white p-6 lg:p-12 rounded-lg shadow-lg">
              {!isReset && (
                <Link
                  to="/login"
                  className="mb-4 text-[#111928] text-sm lg:text-base font-semibold flex items-center self-start no-underline hover:no-underline mt-[30px]"
                >
                  <span className="mr-2">&lt;</span> Back to Login
                </Link>
              )}
              <h2 className="text-3xl lg:text-5xl font-bold text-[#111928] mb-4 mt-[30px]">
                {isReset ? "Create new password" : "Forgot password?"}
              </h2>
              <p className="text-[#637381] text-base lg:text-lg mt-4 mb-8">
                {isReset
                  ? "Your previous password has been reset. Please set a new password for your account."
                  : "Don't worry! Enter your email below to recover your password"}
              </p>
              <Form
                form={form}
                onFinish={isReset ? handlePasswordSubmit : handleEmailSubmit}
                layout="vertical"
                className="mt-[30px] space-y-6"
              >
                {!isReset ? (
                  <Form.Item
                    label={
                      <>
                        Email <span className="ml-1 text-red-500">*</span>
                      </>
                    }
                    name="email"
                    required={false}
                    rules={[
                      {
                        validator: async (_, value) => {
                          try {
                            await emailSchema.validate({ email: value });
                          } catch (err) {
                            throw new Error(err.message);
                          }
                        },
                      },
                    ]}
                  >
                    <Input
                      className="h-12 text-base rounded-lg placeholder:text-[#9CA3AF] border border-solid border-[#d9d9d9] hover:border-[#4096ff] focus:border-[#4096ff] focus:shadow-[0_0_0_2px_rgba(5,145,255,0.1)] focus:outline-none transition-all"
                      placeholder="Enter your email here"
                    />
                  </Form.Item>
                ) : (
                  <>
                    <Form.Item
                      label={
                        <>
                          New password <span className="ml-1 text-red-500">*</span>
                        </>
                      }
                      name="password"
                      required={false}
                      validateTrigger={["onChange", "onBlur"]}
                      help={
                        form.getFieldValue("password") ? (
                          <ul className="list-none pl-0 mt-1 text-xs lg:text-sm space-y-1">
                            <li
                              className={
                                form.getFieldValue("password")?.length >= 8
                                  ? "text-green-500"
                                  : "text-red-500"
                              }
                            >
                              • At least 8 characters
                            </li>
                            <li
                              className={
                                /[A-Z]/.test(form.getFieldValue("password"))
                                  ? "text-green-500"
                                  : "text-red-500"
                              }
                            >
                              • One uppercase letter
                            </li>
                            <li
                              className={
                                /[a-z]/.test(form.getFieldValue("password"))
                                  ? "text-green-500"
                                  : "text-red-500"
                              }
                            >
                              • One lowercase letter
                            </li>
                            <li
                              className={
                                /[0-9]/.test(form.getFieldValue("password"))
                                  ? "text-green-500"
                                  : "text-red-500"
                              }
                            >
                              • One number
                            </li>
                            <li
                              className={
                                /[@$!%*?&]/.test(form.getFieldValue("password"))
                                  ? "text-green-500"
                                  : "text-red-500"
                              }
                            >
                              • One special character (@$!%*?&)
                            </li>
                          </ul>
                        ) : null
                      }
                      rules={[
                        {
                          validator: async (_, value) => {
                            if (!value) {
                              throw new Error("New password is required");
                            }

                            const errors = [];

                            if (value.length < 8) {
                              errors.push("Password must be at least 8 characters");
                            }
                            if (!/[A-Z]/.test(value)) {
                              errors.push(
                                "Password must contain at least one uppercase letter"
                              );
                            }
                            if (!/[a-z]/.test(value)) {
                              errors.push(
                                "Password must contain at least one lowercase letter"
                              );
                            }
                            if (!/[0-9]/.test(value)) {
                              errors.push(
                                "Password must contain at least one number"
                              );
                            }
                            if (!/[@$!%*?&]/.test(value)) {
                              errors.push(
                                "Password must contain at least one special character (@$!%*?&)"
                              );
                            }

                            if (errors.length > 0) {
                              throw new Error(errors.join(", "));
                            }
                          },
                        },
                      ]}
                    >
                      <Input.Password
                        className="h-12 text-base rounded-lg placeholder:text-[#9CA3AF] border border-solid border-[#d9d9d9] hover:border-[#4096ff] focus:border-[#4096ff] focus:shadow-[0_0_0_2px_rgba(5,145,255,0.1)] focus:outline-none transition-all"
                        placeholder="********"
                        onChange={() => {
                          form.validateFields(["confirmPassword"]);
                          form.setFieldValue(
                            "password",
                            form.getFieldValue("password")
                          );
                        }}
                        iconRender={(visible) =>
                          visible ? <EyeOutlined className="text-lg lg:text-xl" /> : <EyeInvisibleOutlined className="text-lg lg:text-xl" />
                        }
                        onCopy={(e) => e.preventDefault()}
                      />
                    </Form.Item>
                    <Form.Item
                      label={
                        <>
                          Confirm new password{" "}
                          <span className="ml-1 text-red-500">*</span>
                        </>
                      }
                      name="confirmPassword"
                      required={false}
                      dependencies={["password"]}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          validator: async (_, value) => {
                            if (!value) {
                              throw new Error("Please confirm your new password");
                            }
                            const password = form.getFieldValue("password");
                            if (value !== password) {
                              throw new Error("The two passwords do not match");
                            }
                          },
                        },
                      ]}
                    >
                      <Input.Password
                        className="h-12 text-base rounded-lg placeholder:text-[#9CA3AF] border border-solid border-[#d9d9d9] hover:border-[#4096ff] focus:border-[#4096ff] focus:shadow-[0_0_0_2px_rgba(5,145,255,0.1)] focus:outline-none transition-all"
                        placeholder="********"
                        iconRender={(visible) =>
                          visible ? <EyeOutlined className="text-lg lg:text-xl" /> : <EyeInvisibleOutlined className="text-lg lg:text-xl" />
                        }
                        onCopy={(e) => e.preventDefault()}
                      />
                    </Form.Item>
                  </>
                )}
                <div className="flex justify-center w-full">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={
                      forgotPasswordMutation.isPending ||
                      resetPasswordMutation.isPending
                    }
                    className="w-full md:w-[250px] h-[50px] rounded-[50px] px-7 py-[13px] flex items-center justify-center gap-[10px] font-medium text-white bg-[#003087] hover:bg-[#002A6B] border-hidden"
                  >
                    {isReset ? "Submit" : "Reset password"}
                  </Button>
                </div>
              </Form>
            </div>
            <div className="hidden lg:flex w-full lg:w-[726px] h-auto lg:h-[697px] items-center justify-center p-8">
              <img
                src={ForgotPw}
                alt="Forgot Password Illustration"
                className="w-full lg:w-[726px] h-auto lg:h-[697px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
