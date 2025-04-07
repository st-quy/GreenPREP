import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
  validateFormField,
  getInitialFormValues,
  getInitialFormErrors,
  getInitialFieldsValidated,
  checkFormValidity,
} from "../schema/registerSchema";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthApi } from "../api";
import { toast, Toaster } from "react-hot-toast";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(getInitialFormValues());
  const [formErrors, setFormErrors] = useState(getInitialFormErrors());
  const [fieldsValidated, setFieldsValidated] = useState(getInitialFieldsValidated());
  const [formValid, setFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    setFormValid(checkFormValidity(fieldsValidated));
  }, [fieldsValidated]);

  // Sử dụng React Query mutation cho register
  const registerMutation = useMutation({
    mutationFn: async (payload) => {
      const response = await AuthApi.register(payload);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Registration successful!");
      navigate("/login");
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || "Registration failed";
      console.error("Registration failed:", errorMessage);
      setFormErrors((prev) => ({
        ...prev,
        apiError: errorMessage,
      }));
      toast.error(errorMessage);
    }
  });

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

      registerMutation.mutate(payload);
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
      w-full h-12 
      rounded-lg 
      px-4 py-2 
      ${isPassword ? "pr-[40px]" : "pr-[16px]"} 
      font-normal text-base 
      border border-solid ${formErrors[name] ? "border-red-500 hover:border-red-500 focus:border-red-500 focus:shadow-[0_0_0_2px_rgba(255,77,79,0.2)]" : "border-[#d9d9d9] hover:border-[#4096ff] focus:border-[#4096ff] focus:shadow-[0_0_0_2px_rgba(5,145,255,0.1)]"}
      focus:outline-none
      placeholder:text-[#9CA3AF]
      transition-all
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
    <div className="flex item-center min-h-screen bg-[#F9F9F9]">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mt-5">
          <div className="w-full lg:w-[658px] h-auto lg:h-[699px] p-6 lg:p-12 bg-white rounded-lg shadow-xl">
            <h2 className="text-3xl lg:text-5xl font-bold text-[#111928] mb-4 mt-[30px]">Create an account</h2>
            <p className="text-[#637381] text-base lg:text-lg mt-4 mb-8">Create an account to continue.</p>

            <form onSubmit={handleSubmit} className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {renderInputField("firstName", "text", "First name *")}
                {renderInputField("lastName", "text", "Last name *")}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-2">
                {renderInputField("email", "email", "Email *")}
                {renderInputField("className", "text", "Class name *")}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-2">
                {renderInputField("studentId", "text", "Student ID *")}
                {renderInputField("phoneNumber", "text", "Phone number")}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-2">
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
                  disabled={!formValid || registerMutation.isPending}
                  className={`
                    w-full md:w-[250px] h-[50px] rounded-[50px] 
                    px-7 py-[13px] 
                    flex items-center justify-center gap-[10px] 
                    font-medium text-white 
                    ${formValid && !registerMutation.isPending ? "bg-[#003087] hover:bg-[#002A6B]" : "bg-gray-400 cursor-not-allowed"}
                  `}
                >
                  {registerMutation.isPending ? "Signing up..." : "Sign up"}
                </button>
              </div>
            </form>

            <div className="mt-4 flex items-center justify-center md:justify-start">
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

          <div className="hidden lg:flex w-full lg:w-[726px] h-auto lg:h-[839px] items-center justify-center p-8">
            <img
              src="/src/assets/images/loginimage.png"
              alt="Registration Illustration"
              className="w-full lg:w-[726px] h-auto lg:h-[839px] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
