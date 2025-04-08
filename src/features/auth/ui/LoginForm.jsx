import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import loginHappyStudent from "@assets/images/login-happy-student.png";
import mail from "@assets/icons/mail.svg";
import Logo from "@assets/images/Logo.png";
import { Form, Input, Button } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { loginSchema } from "../schema/loginSchema";
import { AuthApi } from "../api";
import { toast, Toaster } from "react-hot-toast";
import { getUserFromToken } from "../../../shared/lib/utils/auth";

const validateWithYup = (schema, field) => async (_, value) => {
  try {
    await schema.validateSyncAt(field, { [field]: value });
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Sử dụng React Query mutation cho login
  const loginMutation = useMutation({
    mutationFn: async (values) => {
      const response = await AuthApi.login(values);
      return response.data;
    },
    onSuccess: (data) => {
      // Lưu token vào localStorage
      localStorage.setItem("access_token", data.data.access_token);
      localStorage.setItem("refresh_token", data.data.refresh_token);

      // Decode token để lấy thông tin user
      const userData = getUserFromToken();
      console.log("Decoded user data:", userData);

      if (userData.role[0] === "student") {
        toast.success("Login successful!");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        toast.error("Login failed!");
      }
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || "Login failed";
      setErrorMessage(errorMessage);
      toast.error(errorMessage);
    }
  });

  const onSubmit = async (values) => {
    loginMutation.mutate(values);
  };

  const onForgotPassword = () => {
    navigate("/forgot-password");
  }

  return (
    <div className="flex item-center min-h-screen bg-[#F9F9F9]">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 w-full lg:max-w-[calc(36rem+120px)]">
            <div className="bg-white p-10 rounded-2xl shadow-lg h-[600px]">
              <div className="mt-[30px] w-full">
                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#111928] mb-4">
                  Welcome back!
                </h2>
                <p className="text-[#637381] text-base lg:text-lg mt-4 mb-8">
                  Welcome back! Please enter your details.
                </p>
                {errorMessage && (
                  <p className="text-red-500 text-base text-center mb-4">
                    {errorMessage}
                  </p>
                )}
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={onSubmit}
                  className="mt-8 space-y-6 flex-1 flex flex-col"
                >
                  <Form.Item
                    name="email"
                    label={
                      <span className="text-base lg:text-lg font-medium">
                        Email <span className="text-red-500">*</span>
                      </span>
                    }
                    rules={[
                      {
                        validator: validateWithYup(loginSchema, "email"),
                      },
                    ]}
                  >
                    <Input
                      suffix={
                        <img src={mail} alt="Mail icon" className="w-5 h-5 lg:w-6 lg:h-6" />
                      }
                      placeholder="Enter your email here"
                      className="h-12 text-base rounded-lg placeholder:text-[#9CA3AF]"
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    label={
                      <span className="text-base lg:text-lg font-medium">
                        Password <span className="text-red-500">*</span>
                      </span>
                    }
                    rules={[
                      {
                        validator: validateWithYup(loginSchema, "password"),
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="* * * * * * * *"
                      iconRender={(visible) =>
                        visible ? (
                          <EyeOutlined className="text-lg lg:text-xl" />
                        ) : (
                          <EyeInvisibleOutlined className="text-lg lg:text-xl" />
                        )
                      }
                      className="h-12 text-base rounded-lg placeholder:text-[#9CA3AF]"
                    />
                  </Form.Item>

                  <div className="mt-2 text-right">
                    <Button
                      type="link"
                      className="text-[#003087] text-base font-medium no-underline px-0"
                      onClick={onForgotPassword}
                    >
                      Forgot password?
                    </Button>
                  </div>

                  <div className="flex justify-center mt-auto">
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loginMutation.isPending}
                      className="w-[200px] h-[50px] rounded-[50px] px-7 py-[13px] flex items-center justify-center gap-[10px] font-medium text-white bg-[#003087] hover:bg-[#002A6B] border-hidden"
                    >
                      {loginMutation.isPending ? "Logging in..." : "Login"}
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full lg:max-w-[calc(36rem+120px)]">
            <img
              src={loginHappyStudent}
              alt="Happy students celebrating"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
