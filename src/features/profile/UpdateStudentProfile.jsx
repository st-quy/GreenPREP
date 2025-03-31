import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { Form, Input } from "antd";
import { profileSchema, yupSync } from "./schema";
import toast, { Toaster } from "react-hot-toast";

const UpdateStudentProfile = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      await profileSchema.validate(values, { abortEarly: false });
      toast.success("Profile updated successfully!");
      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } catch (err) {
      const errors = {};
      err.inner.forEach((error) => {
        if (error.type === 'required') {
          errors[error.path] = error.message;
        }
      });
      if (Object.keys(errors).length > 0) {
        form.setFields(
          Object.keys(errors).map((field) => ({
            name: field,
            errors: [errors[field]],
          }))
        );
        toast.error("Please fill in all required fields!");
      } else {
        const otherErrors = err.inner.filter(error => {
          if (error.path === 'phoneNumber' && !values.phoneNumber) {
            return false;
          }
          return error.type !== 'required';
        });
        
        if (otherErrors.length > 0) {
          toast.error("Please check your input format!");
        } else {
          toast.success("Profile updated successfully!");
          setTimeout(() => {
            navigate("/profile");
          }, 1000);
        }
      }
    }
  };

  const handleCancel = () => {
    form.setFieldsValue({
      firstName: "Thu",
      lastName: "Dang",
      email: "thu.dang@gmail.com",
      className: "CLASS01",
      studentId: "SV0001",
      phoneNumber: "",
    });
    form.setFields(
      ['firstName', 'lastName', 'email', 'className', 'studentId', 'phoneNumber'].map((field) => ({
        name: field,
        errors: [],
      }))
    );
    toast.success("Changes cancelled");
    setTimeout(() => {
      navigate("/profile");
    }, 1000);
  };

  const formItemStyle = {
    required: true,
    colon: false,
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F9F9]">
      <Toaster position="top-right" />
      <main className="flex-1 w-full max-w-[1728px] mx-auto px-[6%] pt-[2%] max-md:px-5 max-md:pt-8">
        <button
          onClick={() => navigate("/profile")}
          className="inline-flex items-center gap-1 text-[#111928] text-lg font-medium cursor-pointer mb-[2.7%] bg-[#F9F9F9] border-none hover:text-[#3758F9] transition-colors"
        >
          <ChevronLeftIcon className="w-6 h-6 text-black" />
          <span>Back to profile</span>
        </button>

        <div className="mb-[3.5%]">
          <h4 className="text-black text-[2rem] font-bold leading-[2.375rem] mb-[0.75rem]">
            Update profile
          </h4>
          <p className="text-[#637381] text-[1.125rem] font-medium leading-[1.625rem]">
            Keep your profile up to date by editing your personal information.
          </p>
        </div>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          validateTrigger={["onChange"]}
          initialValues={{
            firstName: "Thu",
            lastName: "Dang",
            email: "thu.dang@gmail.com",
            className: "CLASS01",
            studentId: "SV0001",
            phoneNumber: "",
          }}
          className="bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.15)] rounded-lg w-full relative [&_.ant-form-item-label>label]:font-medium [&_.ant-form-item-label>label]:text-[#111928] [&_.ant-form-item-label>label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before]:!text-[#FF0000] [&_.ant-form-item-label>label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before]:!content-['*_'] [&_.ant-form-item-label>label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before]:!order-last [&_.ant-form-item-label>label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::after]:!content-[''] [&_.ant-form-item-explain-error]:text-[#FF0000] [&_.ant-form-item-explain-error]:mt-1 [&_.ant-form-item-explain-error]:text-sm"
          noValidate
        >
          <div className="w-full p-[97px] max-xl:p-10 max-md:p-5">
            <div className="grid grid-cols-1 gap-y-[25px]">
              <div className="flex justify-between max-md:flex-col max-md:gap-y-[25px]">
                <div className="w-[516px] max-w-full">
                  <Form.Item
                    label="First name"
                    name="firstName"
                    rules={[yupSync(profileSchema)]}
                    required={false}
                  >
                    <Input className="h-[46px] border-[#111928] rounded" />
                  </Form.Item>
                </div>
                <div className="w-[516px] max-w-full">
                  <Form.Item
                    label="Last name"
                    name="lastName"
                    rules={[yupSync(profileSchema)]}
                    required={false}
                  >
                    <Input className="h-[46px] border-[#111928] rounded" />
                  </Form.Item>
                </div>
              </div>
              <div className="flex justify-between max-md:flex-col max-md:gap-y-[25px]">
                <div className="w-[516px] max-w-full">
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[yupSync(profileSchema)]}
                    {...formItemStyle}
                  >
                    <Input type="email" className="h-[46px] border-[#111928] rounded" />
                  </Form.Item>
                </div>
                <div className="w-[516px] max-w-full">
                  <Form.Item
                    label="Class name"
                    name="className"
                    rules={[yupSync(profileSchema)]}
                    {...formItemStyle}
                  >
                    <Input className="h-[46px] border-[#111928] rounded" />
                  </Form.Item>
                </div>
              </div>
              <div className="flex justify-between max-md:flex-col max-md:gap-y-[25px]">
                <div className="w-[516px] max-w-full">
                  <Form.Item
                    label="Student ID"
                    name="studentId"
                    rules={[yupSync(profileSchema)]}
                    {...formItemStyle}
                  >
                    <Input className="h-[46px] border-[#111928] rounded" />
                  </Form.Item>
                </div>
                <div className="w-[516px] max-w-full">
                  <Form.Item
                    label="Phone number"
                    name="phoneNumber"
                    rules={[yupSync(profileSchema)]}
                    required={false}
                  >
                    <Input type="tel" className="h-[46px] border-[#111928] rounded" placeholder="Enter your phone number" />
                  </Form.Item>
                </div>
              </div>
            </div>
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
          </div>
        </Form>
      </main>
    </div>
  );
};

export default UpdateStudentProfile;
