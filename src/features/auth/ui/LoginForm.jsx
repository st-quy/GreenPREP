import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate để điều hướng
import loginHappyStudent from "@assets/images/login-happy-student.png";
import mail from "@assets/icons/mail.svg";
import Logo from "@assets/images/Logo.png";
import { Form, Input, Button } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { loginSchema } from "../schema/loginSchema";
import { AuthApi } from "../api";
import { toast } from "react-hot-toast"; // Import toast

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
  const navigate = useNavigate(); // Sử dụng để điều hướng sau khi đăng nhập thành công

  const onSubmit = async (values) => {
    try {
      const response = await AuthApi.login(values); // Gọi API login
      console.log("Login successful:", response.data);

      // Lưu token vào localStorage (nếu cần)
      localStorage.setItem("token", response.data.token);

      // Hiển thị thông báo thành công
      toast.success("Login successful!");

      // Điều hướng đến trang dashboard hoặc trang khác
      navigate("/");
    } catch (error) {
      // Hiển thị thông báo lỗi từ API
      const errorMessage = error.response?.data?.message || "Login failed";
      setErrorMessage(errorMessage);
      toast.error(errorMessage); // Hiển thị thông báo lỗi
    }
  };

  return (
    <div className="flex item-center min-h-screen bg-gray-100 px-4 md:px-10 lg:px-20">
      <img src={Logo} alt="" className="absolute w-[147px] h-[34px] mt-[42px] ml-[82px]" />
      <div className="flex flex-col md:flex-row items-center max-w-[1440px] w-full justify-evenly">
        {/* Form Section - Left Side */}
        <div className="w-full md:w-[440px] h-auto p-6 md:p-12 bg-white rounded-lg shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111928]">Welcome back!</h2>
          <p className="text-[#637381] text-xs md:text-sm mt-2 mb-4">Welcome back! Please enter your details.</p>
          {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}
          <Form
            form={form}
            layout="vertical"
            onFinish={onSubmit}
            className="mt-4"
          >
            <Form.Item
              name="email"
              label={<span>Email <span className="text-red-500">*</span></span>}
              rules={[
                {
                  validator: validateWithYup(loginSchema, "email"), // Sử dụng Yup để xác thực email
                },
              ]}
            >
              <Input
                suffix={<img src={mail} alt="Mail icon" className="w-4 h-4" />}
                placeholder="Enter your email here"
                className="rounded placeholder:text-[#9CA3AF] text-sm"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span>Password <span className="text-red-500">*</span></span>}
              rules={[
                {
                  validator: validateWithYup(loginSchema, "password"), // Sử dụng Yup để xác thực password
                },
              ]}
            >
              <Input.Password
                placeholder="* * * * * * * *"
                iconRender={(visible) => (
                  visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                )}
                className="rounded placeholder:text-[#9CA3AF] text-sm"
              />
            </Form.Item>

            <div className="mt-1 text-right">
              <Link to="" className="text-[#003087] text-xs no-underline">Forgot password?</Link>
            </div>

            <div className="flex justify-center">
              <Button
                type="primary"
                htmlType="submit"
                className="mt-4 bg-[#003087] text-white w-[167px] h-[34px] border-hidden rounded-full hover:bg-blue-600"
              >
                Login
              </Button>
            </div>
          </Form>
        </div>

        {/* Image Section - Right Side */}
        <div className="hidden md:flex w-[40%] items-center justify-center p-8">
          <img src={loginHappyStudent} alt="Happy students celebrating" className="max-w-full h-auto object-contain" />
        </div>
      </div>
    </div>
  );
}
