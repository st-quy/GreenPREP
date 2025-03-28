import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import * as Yup from "yup";

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

  // Define validation schema with Yup
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("Please input your first name!")
      .matches(
        /^[A-Za-z]+$/,
        "First name can only contain alphabetic characters"
      )
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name cannot exceed 50 characters"),
    lastName: Yup.string()
      .required("Please input your last name!")
      .matches(
        /^[A-Za-z]+$/,
        "Last name can only contain alphabetic characters"
      )
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name cannot exceed 50 characters"),
    email: Yup.string()
      .required("Please input your email!")
      .email("Please enter a valid email!"),
    className: Yup.string()
      .required("Please input your class name!")
      .matches(
        /^[A-Za-z0-9\s]+$/,
        "Class name can only contain alphanumeric characters and spaces"
      )
      .min(2, "Class name must be at least 2 characters")
      .max(100, "Class name cannot exceed 100 characters"),
    studentId: Yup.string()
      .required("Please input your student ID!")
      .matches(
        /^[A-Za-z0-9]+$/,
        "Student ID can only contain alphanumeric characters"
      )
      .min(5, "Student ID must be at least 5 characters")
      .max(15, "Student ID cannot exceed 15 characters"),
    phoneNumber: Yup.string()
      .matches(/^\d+$/, "Phone number can only contain numeric characters")
      .length(10, "Phone number must be exactly 10 digits")
      .nullable(),
    password: Yup.string()
      .required("Please input your password!")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: Yup.string()
      .required("Please confirm your password!")
      .oneOf([Yup.ref("password"), null], "The two passwords do not match!"),
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

  // Validate individual field using Yup
  const validateField = (field, value) => {
    try {
      // Get the specific field schema from the validation schema
      const fieldSchema = Yup.reach(validationSchema, field);

      // Validate the field value
      // @ts-ignore
      fieldSchema.validateSync(value);

      // If validation passes, update the fieldsValidated state
      setFieldsValidated((prev) => ({ ...prev, [field]: true }));
    } catch (error) {
      // If validation fails, update the fieldsValidated state
      setFieldsValidated((prev) => ({ ...prev, [field]: false }));

      // You can also set form errors if needed
      form.setFields([
        {
          name: field,
          errors: [error.message],
        },
      ]);
    }
  };

  // Convert Yup validation schema to Ant Design form rules
  const getYupRules = (fieldName) => {
    return [
      {
        validator: async (_, value) => {
          try {
            // @ts-ignore
            await Yup.reach(validationSchema, fieldName).validate(value);
            return Promise.resolve();
          } catch (error) {
            return Promise.reject(error.message);
          }
        },
      },
    ];
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
                  <Form.Item name="firstName" rules={getYupRules("firstName")}>
                    <Input
                      size="large"
                      placeholder="First name *"
                      className="font-normal text-[16px] leading-[24px] tracking-normal"
                      onChange={(e) =>
                        validateField("firstName", e.target.value)
                      }
                    />
                  </Form.Item>

                  <Form.Item name="lastName" rules={getYupRules("lastName")}>
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
                  <Form.Item name="email" rules={getYupRules("email")}>
                    <Input
                      size="large"
                      placeholder="Email *"
                      className="font-normal text-[16px] leading-[24px] tracking-normal"
                      onChange={(e) => validateField("email", e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item name="className" rules={getYupRules("className")}>
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
                  <Form.Item name="studentId" rules={getYupRules("studentId")}>
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
                    rules={getYupRules("phoneNumber")}
                  >
                    <Input
                      size="large"
                      placeholder="Phone number"
                      className="font-normal text-[16px] leading-[24px] tracking-normal"
                      onChange={(e) =>
                        validateField("phoneNumber", e.target.value)
                      }
                    />
                  </Form.Item>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Form.Item name="password" rules={getYupRules("password")}>
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
                    rules={getYupRules("confirmPassword")}
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
