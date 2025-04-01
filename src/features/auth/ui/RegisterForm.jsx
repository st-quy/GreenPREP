import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  validateFormField,
  getInitialFormValues,
  getInitialFormErrors,
  getInitialFieldsValidated,
  checkFormValidity,
} from "../schema/registerSchema";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthApi } from "../api";
import { toast } from "react-hot-toast"; // Import toast

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(getInitialFormValues());
  const [formErrors, setFormErrors] = useState(getInitialFormErrors());
  const [fieldsValidated, setFieldsValidated] = useState(
    getInitialFieldsValidated()
  );

  const [formValid, setFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  useEffect(() => {
    setFormValid(checkFormValidity(fieldsValidated));
  }, [fieldsValidated]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateFormField(
      name,
      value,
      formValues,
      setFieldsValidated,
      setFormErrors
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValid) {
      try {
        // Chuẩn bị payload
        const payload = {
          lastName: formValues.lastName,
          firstName: formValues.firstName,
          email: formValues.email,
          password: formValues.password,
          studentCode: formValues.studentId,
          teacherCode: "",
          roleIDs: ["student"],
          class: formValues.className,
        };

        // Gọi API register
        const response = await AuthApi.register(payload);
        console.log("Registration successful:", response.data);

        // Hiển thị thông báo thành công
        toast.success("Registration successful!");

        // Điều hướng đến trang đăng nhập
        navigate("/login");
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Registration failed";
        console.error("Registration failed:", errorMessage);
        setFormErrors((prev) => ({
          ...prev,
          apiError: errorMessage,
        }));
        toast.error(errorMessage); // Hiển thị thông báo lỗi
      }
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const renderInputField = (
    name,
    type,
    placeholder,
    isPassword = false,
    showPasswordState = false,
    toggleVisibility = null
  ) => {
    const inputClasses = `
      w-full h-[48px] 
      rounded-[6px] 
      px-[20px] py-[12px] 
      ${isPassword ? "pr-[40px]" : "pr-[16px]"} 
      font-normal text-[16px] leading-[24px] tracking-[0px] 
      border ${formErrors[name] ? "border-red-500" : "border-[#DFE4EA]"} 
      focus:outline-none focus:ring-1 focus:ring-blue-500
    `;

    return (
      <div className="mb-4 relative w-full">
        <div className="relative">
          <input
            type={isPassword ? (showPasswordState ? "text" : "password") : type}
            name={name}
            value={formValues[name]}
            onChange={handleInputChange}
            placeholder={placeholder}
            className={inputClasses}
          />

          {isPassword && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {showPasswordState ? (
                <FaEye
                  className="text-gray-500 h-5 w-5 cursor-pointer"
                  onClick={toggleVisibility}
                />
              ) : (
                <FaEyeSlash
                  className="text-gray-500 h-5 w-5 cursor-pointer"
                  onClick={toggleVisibility}
                />
              )}
            </div>
          )}
        </div>

        {formErrors[name] && (
          <p className="mt-1 text-sm text-red-500">{formErrors[name]}</p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="w-full relative h-32 bg-[#F9F9F9] flex items-center justify-center sm:justify-start sm:pl-[125px]">
        <div className="flex items-center">
          <img
            src="/src/assets/images/logo-graduation.png"
            className="w-[50px] h-[50px]"
            alt="Logo"
          />
          <div className="ml-4 font-bold text-[30px] leading-[38px] tracking-normal text-[#111928]">
            GreenPREP
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-4 lg:py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-10">
          <div className="w-full lg:w-1/2 xl:w-5/12 mt-4 sm:mt-6 md:mt-8 lg:mt-0">
            <div
              className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg w-full max-w-[663px] mx-auto"
              style={{
                boxShadow:
                  "0px 12px 34px 0px #0D0A2C14, 0px 34px 26px 0px #0D0A2C0D",
              }}
            >
              <h2 className="font-bold text-[32px] sm:text-[40px] md:text-[48px] leading-[1.2] tracking-normal text-[#111928] mb-1 sm:mb-2">
                Create an account
              </h2>
              <p className="font-normal text-[16px] leading-[24px] tracking-normal text-[#637381] mb-4 sm:mb-6">
                Create an account to continue.
              </p>

              <form onSubmit={handleSubmit} className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {renderInputField("firstName", "text", "First name *")}
                  {renderInputField("lastName", "text", "Last name *")}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-2">
                  {renderInputField("email", "email", "Email *")}
                  {renderInputField("className", "text", "Class name *")}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-2">
                  {renderInputField("studentId", "text", "Student ID *")}
                  {renderInputField("phoneNumber", "text", "Phone number")}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-2">
                  {renderInputField(
                    "password",
                    "password",
                    "Password *",
                    true,
                    showPassword,
                    togglePasswordVisibility
                  )}
                  {renderInputField(
                    "confirmPassword",
                    "password",
                    "Confirm password *",
                    true,
                    showConfirmPassword,
                    toggleConfirmPasswordVisibility
                  )}
                </div>

                <div className="mt-6 flex justify-center">
                  <button
                    type="submit"
                    disabled={!formValid}
                    className={`
                      w-full sm:w-[250px] h-[50px] rounded-[50px] 
                      px-7 py-[13px] 
                      flex items-center justify-center gap-[10px] 
                      font-medium text-white 
                      ${formValid ? "bg-[#3758F9] hover:bg-[#2244dd]" : "bg-gray-400 cursor-not-allowed"}
                    `}
                  >
                    Sign up
                  </button>
                </div>
              </form>

              <div className="mt-4 flex items-center justify-center sm:justify-start">
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

          <div className="w-full lg:w-1/2 xl:w-7/12 mt-8 lg:mt-0 hidden sm:block">
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src="/src/assets/images/loginimage.png"
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
