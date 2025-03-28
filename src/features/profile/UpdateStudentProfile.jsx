import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileForm from "@features/profile/UpdateProfileForm";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

const UpdateStudentProfile = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F9F9]">
      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1728px] mx-auto px-[6%] pt-[2%] max-md:px-5 max-md:pt-8">
        {/* Back Button */}
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
        <ProfileForm />
      </main>
    </div>
  );
};

export default UpdateStudentProfile;
