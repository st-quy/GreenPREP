import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import loginHappyStudent from "../../../assets/images/login-happy-student.png";
import mail from "@assets/icons/mail.svg";
import logo from "@assets/images/Logo.png"
import { Input } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    // Handle login logic here
  };

  return (
    <div className="flex item-center min-h-screen bg-gray-100 px-4 md:px-10 lg:px-20">
      <img src={logo} alt="" className="absolute w-[147px] h-[34px] mt-[42px] ml-[82px]"/>
      <div className="flex flex-col md:flex-row items-center max-w-[1440px] w-full justify-evenly">
        {/* Form Section - Left Side */}
        <div className="w-full md:w-[440px] h-auto p-6 md:p-12 bg-white rounded-lg shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111928]">Welcome back!</h2>
          <p className="text-[#637381] text-xs md:text-sm mt-2 mb-4">Welcome back! Please enter your details.</p>
          {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}
          <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-xs md:text-sm font-medium pb-1">Email <span className="text-red-500">*</span></label>
              <div className="relative w-full">
                <input
                  type="email"
                  placeholder="Enter your email here"
                  {...register("email", { required: "Email is required" })}
                  className="w-full p-2 mt-1 rounded placeholder:text-[#9CA3AF] text-sm"
                  style={{ border: `1px solid ${errors.email ? "#EF4444" : "#DFE4EA"}`, outline: "none"}}
                />
                <span className="absolute inset-y-5 right-4 flex items-center">
                  <img src={mail} alt="Mail icon" />
                </span>
              </div>
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message?.toString()}</p>}
            </div>

            {/* Input Password */}
            <div className="mt-3">
              <label className="block text-xs md:text-sm font-medium pb-1">Password <span className="text-red-500">*</span></label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="* * * * * * * *"
                  {...register("password", { required: "Password is required" })}
                  className="w-full p-2 mt-1 rounded placeholder:text-[#9CA3AF] text-sm"
                  style={{ border: `1px solid ${errors.password ? "#EF4444" : "#DFE4EA"}`, outline: "none"}}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer absolute inset-y-5 right-4 flex items-center"
                >
                  {showPassword ? <EyeInvisibleOutlined className="text-gray-500" /> : <EyeOutlined className="text-gray-500" />}
                </span>
              </div>
              {errors.password && <p className="text-red-500 text-xs">{errors.password.message?.toString()}</p>}
            </div>

            <div className="mt-1 text-right">
              <Link to="" className="text-[#003087] text-xs no-underline">Forgot password?</Link>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="mt-4 p-2 bg-[#003087] text-white w-[167px] h-[34px] border-hidden rounded-full hover:bg-blue-600"
              >
                Login
              </button>
            </div>
          </form>
        </div>

        {/* Image Section - Right Side */}
        <div className="hidden md:flex w-[40%] items-center justify-center p-8">
          <img src={loginHappyStudent} alt="Happy students celebrating" className="max-w-full h-auto object-contain" />
        </div>
      </div>
    </div>
  );
}
