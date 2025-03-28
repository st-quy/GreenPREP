import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
// Remove the Logo import since you'll use your own image
// import { Logo } from "@assets/images";

const RegisterForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [formValid, setFormValid] = useState(false);
  const [fieldsValidated, setFieldsValidated] = useState({
    firstName: false,
    lastName: false,
    email: false,
    className: false,
    studentId: false,
    password: false,
    confirmPassword: false,
  });

  // Check if all required fields are valid
  useEffect(() => {
    const {
      firstName,
      lastName,
      email,
      className,
      studentId,
      password,
      confirmPassword,
    } = fieldsValidated;
    setFormValid(
      firstName &&
        lastName &&
        email &&
        className &&
        studentId &&
        password &&
        confirmPassword
    );
  }, [fieldsValidated]);

  const onFinish = (values) => {
    console.log("Registration values:", values);
    // Add your registration logic here
    navigate("/Welcome"); // Navigate to login page after successful registration
  };

  // Validate individual field
  const validateField = (field, value) => {
    form
      .validateFields([field])
      .then(() => {
        setFieldsValidated((prev) => ({ ...prev, [field]: true }));
      })
      .catch(() => {
        setFieldsValidated((prev) => ({ ...prev, [field]: false }));
      });
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      {/* Header - Updated with fixed dimensions */}
      <div className="w-full relative h-44 bg-[#F9F9F9]">
        <img
          src="/src/assets/images/graduation.png"
          className="absolute w-[50px] h-[50px] top-[63px] left-[125px]"
          alt="Logo"
        />
        <div className="absolute w-[166px] h-[38px] top-[69px] left-[179px] font-bold text-[30px] leading-[38px] tracking-normal text-center text-[#111928]">
          GreenPREP
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-10 lg:gap-12">
          {/* Left Form Section */}
          <div className="w-full lg:w-1/2 xl:w-5/12 mt-4 sm:mt-6 md:mt-8 lg:mt-0">
            <div
              className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg w-full max-w-[663px] mx-auto"
              style={{
                boxShadow:
                  "0px 12px 34px 0px #0D0A2C14, 0px 34px 26px 0px #0D0A2C0D",
              }}
            >
              <h2 className="w-[507px] h-[57px] font-bold text-[48px] leading-[58px] tracking-normal text-[#111928] mb-1 sm:mb-2">
                Create an account
              </h2>
              <p className="w-[234px] h-[24px] font-normal text-[16px] leading-[24px] tracking-normal text-[#637381] mb-4 sm:mb-6">
                Create an account to continue.
              </p>

              <Form
                form={form}
                layout="vertical"
                name="register_form"
                onFinish={onFinish}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Form.Item
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your first name!",
                      },
                      {
                        pattern: /^[A-Za-z]+$/,
                        message:
                          "First name can only contain alphabetic characters",
                      },
                      {
                        min: 2,
                        message: "First name must be at least 2 characters",
                      },
                      {
                        max: 50,
                        message: "First name cannot exceed 50 characters",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="First name *"
                      className="font-normal text-[16px] leading-[24px] tracking-normal"
                      onChange={(e) =>
                        validateField("firstName", e.target.value)
                      }
                    />
                  </Form.Item>

                  <Form.Item
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your last name!",
                      },
                      {
                        pattern: /^[A-Za-z]+$/,
                        message:
                          "Last name can only contain alphabetic characters",
                      },
                      {
                        min: 2,
                        message: "Last name must be at least 2 characters",
                      },
                      {
                        max: 50,
                        message: "Last name cannot exceed 50 characters",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Last name *"
                      className="font-normal text-[16px] leading-[24px] tracking-normal"
                      onChange={(e) =>
                        validateField("lastName", e.target.value)
                      }
                    />
                  </Form.Item>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                      { type: "email", message: "Please enter a valid email!" },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Email *"
                      className="font-normal text-[16px] leading-[24px] tracking-normal"
                      onChange={(e) => validateField("email", e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item
                    name="className"
                    rules={[
                      {
                        required: true,
                        message: "Please input your class name!",
                      },
                      {
                        pattern: /^[A-Za-z0-9\s]+$/,
                        message:
                          "Class name can only contain alphanumeric characters and spaces",
                      },
                      {
                        min: 2,
                        message: "Class name must be at least 2 characters",
                      },
                      {
                        max: 100,
                        message: "Class name cannot exceed 100 characters",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Class name *"
                      className="font-normal text-[16px] leading-[24px] tracking-normal"
                      onChange={(e) =>
                        validateField("className", e.target.value)
                      }
                    />
                  </Form.Item>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Form.Item
                    name="studentId"
                    rules={[
                      {
                        required: true,
                        message: "Please input your student ID!",
                      },
                      {
                        pattern: /^[A-Za-z0-9]+$/,
                        message:
                          "Student ID can only contain alphanumeric characters",
                      },
                      {
                        min: 5,
                        message: "Student ID must be at least 5 characters",
                      },
                      {
                        max: 15,
                        message: "Student ID cannot exceed 15 characters",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Student ID *"
                      className="font-normal text-[16px] leading-[24px] tracking-normal"
                      onChange={(e) =>
                        validateField("studentId", e.target.value)
                      }
                    />
                  </Form.Item>

                  <Form.Item
                    name="phoneNumber"
                    rules={[
                      {
                        pattern: /^\d+$/,
                        message:
                          "Phone number can only contain numeric characters",
                      },
                      {
                        len: 10,
                        message: "Phone number must be exactly 10 digits",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Phone number"
                      className="font-normal text-[16px] leading-[24px] tracking-normal"
                    />
                  </Form.Item>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                      {
                        min: 8,
                        message: "Password must be at least 8 characters",
                      },
                      {
                        pattern:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                        message:
                          "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
                      },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Password"
                      className="font-normal text-[16px] leading-[24px] tracking-normal"
                      iconRender={(visible) =>
                        visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                      }
                      onChange={(e) =>
                        validateField("password", e.target.value)
                      }
                    />
                  </Form.Item>

                  <Form.Item
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("The two passwords do not match!")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Confirm password"
                      className="font-normal text-[16px] leading-[24px] tracking-normal"
                      iconRender={(visible) =>
                        visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                      }
                      onChange={(e) =>
                        validateField("confirmPassword", e.target.value)
                      }
                    />
                  </Form.Item>
                </div>

                <Form.Item className="mt-6 flex justify-center">
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    disabled={!formValid}
                    className="w-[250px] h-[50px] rounded-[50px] px-7 py-[13px] bg-[#3758F9] flex items-center justify-center gap-[10px]"
                  >
                    Sign up
                  </Button>
                </Form.Item>
              </Form>

              <div className="mt-4 flex items-center justify-start">
                <span className="font-medium text-[14px] leading-[22px] tracking-normal text-[#89868D]">
                  Already have an account?
                </span>{" "}
                <Link
                  to="/login"
                  className="ml-1 font-medium text-[14px] leading-[22px] tracking-normal text-[#003087] hover:underline"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="w-full lg:w-1/2 xl:w-7/12 mt-8 lg:mt-0 hidden md:block">
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src="/src/assets/images/login-image.png"
                alt="Registration Illustration"
                className="w-full max-w-[614px] h-auto object-contain mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
