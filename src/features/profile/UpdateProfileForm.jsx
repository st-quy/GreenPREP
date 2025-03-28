import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputProfile from "./components/UpdateInputProfile";

const ProfileForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      firstName: "Thu",
      lastName: "Dang",
      email: "thu.dang@gmail.com",
      className: "CLASS01",
      studentId: "SV0001",
      phoneNumber: "",
    },
    mode: "onChange"
  });

  const onSubmit = (data) => {
    toast.success("Profile updated successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setTimeout(() => {
      navigate("/profile");
    }, 3000);
  };

  const handleCancel = () => {
    reset({
      firstName: "Thu",
      lastName: "Dang",
      email: "thu.dang@gmail.com",
      className: "CLASS01",
      studentId: "SV0001",
      phoneNumber: "",
    });

    toast.error("Changes have been canceled!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <ToastContainer />
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.15)] rounded-lg w-full relative"
      >
        <div className="w-full p-[97px] max-xl:p-10 max-md:p-5">
          <div className="grid grid-cols-1 gap-y-[25px]">
            <div className="flex justify-between max-md:flex-col max-md:gap-y-[25px]">
              <InputProfile
                label="First name"
                required
                register={register("firstName", {
                  required: "First name is required",
                  pattern: {
                    value: /^[a-zA-ZÀ-ỹ\s]*$/,
                    message: "First name must contain only letters"
                  }
                })}
                error={errors.firstName?.message}
              />
              <InputProfile
                label="Last name"
                required
                register={register("lastName", {
                  required: "Last name is required",
                  pattern: {
                    value: /^[a-zA-ZÀ-ỹ\s]*$/,
                    message: "Last name must contain only letters"
                  }
                })}
                error={errors.lastName?.message}
              />
            </div>
            <div className="flex justify-between max-md:flex-col max-md:gap-y-[25px]">
              <InputProfile
                label="Email"
                type="email"
                required
                register={register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                error={errors.email?.message}
              />
              <InputProfile
                label="Class name"
                required
                register={register("className", {
                  required: "Class name is required",
                  pattern: {
                    value: /^[A-Z0-9]+$/,
                    message: "Class name must contain only uppercase letters and numbers"
                  }
                })}
                error={errors.className?.message}
              />
            </div>
            <div className="flex justify-between max-md:flex-col max-md:gap-y-[25px]">
              <InputProfile
                label="Student ID"
                required
                register={register("studentId", {
                  required: "Student ID is required",
                  pattern: {
                    value: /^SV\d{4}$/,
                    message: "Student ID must be in format SV0000"
                  }
                })}
                error={errors.studentId?.message}
              />
              <InputProfile
                label="Phone number"
                type="tel"
                placeholder="Enter your phone number"
                register={register("phoneNumber", {
                  pattern: {
                    value: /^[0-9]{9,10}$/,
                    message: "Phone number must be 9-10 digits"
                  }
                })}
                required={false}
                error={errors.phoneNumber?.message}
              >
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
              </InputProfile>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ProfileForm;