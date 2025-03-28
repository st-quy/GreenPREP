import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import * as yup from "yup";

const UpdateStudentProfile = () => {
  const navigate = useNavigate();

  const profileSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email address").required("Email is required"),
    className: yup.string().required("Class name is required"),
    studentId: yup
      .string()
      .matches(/^SV\d{4}$/, "Student ID must be in the format SV0000")
      .required("Student ID is required"),
    phoneNumber: yup
      .string()
      .matches(/^[0-9]{9,10}$/, "Phone number must be 9-10 digits")
      .notRequired(),
  });

  const [formValues, setFormValues] = useState({
    firstName: "Thu",
    lastName: "Dang",
    email: "thu.dang@gmail.com",
    className: "CLASS01",
    studentId: "SV0001",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await profileSchema.validate(formValues, { abortEarly: false });
      navigate("/profile");
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  const handleCancel = () => {
    setFormValues({
      firstName: "Thu",
      lastName: "Dang",
      email: "thu.dang@gmail.com",
      className: "CLASS01",
      studentId: "SV0001",
      phoneNumber: "",
    });
    setErrors({});
  };

  const renderInput = ({ label, name, value, onChange, required, type = "text", placeholder = "", error, isLast=false }) => {
    return (
      <div className="w-[516px] max-w-full">
        <label className="block text-sm font-medium text-[#637381] mb-2">
          {label} {required && <span className="text-[#FF0000]">*</span>}
        </label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full h-[46px] px-3 text-base border rounded-lg outline-none placeholder:text-[#919EAB] bg-white ${
            error ? "border-[#FF0000]" : "border-[#111928]"
          }`}
          required={required}
        />
        {error && <p className="mt-1 text-sm text-[#FF0000]">{error}</p>}
        {isLast && (
          <div className="flex items-center justify-end gap-[10px] mt-[46px]">
            <button
              type="button"
              onClick={handleCancel}
              className="h-[50px] w-[113px] text-[#3758F9] text-base font-medium rounded-[50px] border border-[#3758F9] hover:bg-[#3758F9] hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-[50px] w-[113px] bg-[#3758F9] text-white text-base font-medium rounded-[50px] border-none hover:bg-[#2944c1] transition-colors"
            >
              Update
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F9F9]">
      <main className="flex-1 w-full max-w-[1728px] mx-auto px-[6%] pt-[2%] max-md:px-5 max-md:pt-8">
        <button
          onClick={() => navigate("/profile")}
          className="inline-flex items-center gap-1 text-[#111928] text-lg font-medium cursor-pointer mb-[2.7%] bg-[#F9F9F9] border-none hover:text-[#3758F9] transition-colors"
        >
          <ChevronLeftIcon className="w-6 h-6 text-black" />
          <span>Back to profile</span>
        </button>

        {/* Title Section */}
        <div className="mb-[3.5%]">
          <h4 className="text-black text-[2rem] font-bold leading-[2.375rem] mb-[0.75rem]">
            Update profile
          </h4>
          <p className="text-[#637381] text-[1.125rem] font-medium leading-[1.625rem]">
            Keep your profile up to date by editing your personal information.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.15)] rounded-lg w-full relative">
          <div className="w-full p-[97px] max-xl:p-10 max-md:p-5">
            <div className="grid grid-cols-1 gap-y-[25px]">
              <div className="flex justify-between max-md:flex-col max-md:gap-y-[25px]">
                {renderInput({
                  label: "First name",
                  name: "firstName",
                  value: formValues.firstName,
                  onChange: handleChange,
                  required: true,
                  error: !formValues.firstName ? "First name is required" : "",
                })}
                {renderInput({
                  label: "Last name",
                  name: "lastName",
                  value: formValues.lastName,
                  onChange: handleChange,
                  required: true,
                  error: !formValues.lastName ? "Last name is required" : "",
                })}
              </div>
              <div className="flex justify-between max-md:flex-col max-md:gap-y-[25px]">
                {renderInput({
                  label: "Email",
                  name: "email",
                  value: formValues.email,
                  onChange: handleChange,
                  required: true,
                  error: !formValues.email.includes("@") ? "Invalid email address" : "",
                })}
                {renderInput({
                  label: "Class name",
                  name: "className",
                  value: formValues.className,
                  onChange: handleChange,
                  required: true,
                  error: !formValues.className ? "Class name is required" : "",
                })}
              </div>
              <div className="flex justify-between max-md:flex-col max-md:gap-y-[25px]">
                {renderInput({
                  label: "Student ID",
                  name: "studentId",
                  value: formValues.studentId,
                  onChange: handleChange,
                  required: true,
                  error: !/^SV\d{4}$/.test(formValues.studentId) ? "Student ID must be in the format SV0000" : "",
                })}
                {renderInput({
                  label: "Phone number",
                  name: "phoneNumber",
                  value: formValues.phoneNumber,
                  onChange: handleChange,
                  required: false,
                  error:
                    formValues.phoneNumber && !/^[0-9]{9,10}$/.test(formValues.phoneNumber)
                      ? "Phone number must be 9-10 digits"
                      : "",
                  isLast: true,
                })}
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default UpdateStudentProfile;
