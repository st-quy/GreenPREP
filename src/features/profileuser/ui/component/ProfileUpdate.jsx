import React from 'react';
import { Form, Input, Button, Modal, message } from 'antd';
import PropTypes from 'prop-types';
import { profileSchema } from '../../schema/profileButtonsSchema';
import { getUserFromToken, updateDataFromApi } from '../../../../shared/lib/utils/auth';

const ProfileUpdate = ({ isOpen, onClose, userData, loading, error }) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (isOpen && userData) {
      form.setFieldsValue({
        fullname: userData.fullName,
        email: userData.email,
        studentCode: userData.studentCode,
        phoneNumber: userData.phoneNumber,
        className: userData.class
      });
    }
  }, [userData, form, isOpen]);

  // Reset form when modal is closed
  React.useEffect(() => {
    if (!isOpen) {
      form.resetFields();
    }
  }, [isOpen, form]);

  const validateField = async (fieldName, value) => {
    try {
      const values = form.getFieldsValue();
      // Map field names to match schema
      const formattedValues = {
        fullname: values.fullname,
        email: values.email,
        studentCode: values.studentCode,
        className: values.className,
        phoneNumber: values.phoneNumber
      };
      await profileSchema.validateAt(fieldName, formattedValues);
      form.setFields([{ name: fieldName, errors: [] }]);
    } catch (err) {
      form.setFields([{ name: fieldName, errors: [err.message] }]);
    }
  };

  const handleSubmit = async (values) => {
    try {
      // Map form values to match schema
      const formattedValues = {
        fullname: values.fullname,
        email: values.email,
        studentCode: values.studentCode,
        className: values.className,
        phoneNumber: values.phoneNumber
      };

      await profileSchema.validate(formattedValues, { abortEarly: false });
      
      const decodedUser = getUserFromToken();
      if (!decodedUser?.userId) {
        throw new Error('No user ID found in token');
      }

      await updateDataFromApi(decodedUser.userId, {
        firstName: values.fullname.split(' ')[0],
        lastName: values.fullname.split(' ').slice(1).join(' '),
        email: values.email,
        studentCode: values.studentCode,
        phoneNumber: values.phoneNumber,
        class: values.className
      });

      message.success("Profile updated successfully");
      onClose();
    } catch (err) {
      if (err.inner) {
        const errors = {};
        err.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        Object.keys(errors).forEach((field) => {
          form.setFields([
            {
              name: field,
              errors: [errors[field]],
            },
          ]);
        });
        console.log(errors);
      } else if (err.response?.data?.message) {
        message.error(err.response.data.message);
      } else {
        message.error("Failed to update profile");
      }
    }
  };

  const modalContent = () => {
    if (loading) {
      return <div className="flex items-center justify-center h-40">Loading...</div>;
    }

    if (error) {
      return <div className="text-red-500">Error: {error}</div>;
    }

    if (!userData) {
      return <div>No user data found</div>;
    }

    return (
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"
      >
        <Form.Item
          label={
            <div className="flex">
              <span>Full Name</span>
              <span className="text-red-500 ml-1">*</span>
            </div>
          }
          name="fullname"
          required={false}
          validateTrigger={["onChange", "onBlur"]}
          validateFirst
          rules={[
            { required: true, message: "Fullname is required" }
          ]}
        >
          <Input 
            className="h-[46px] rounded-lg" 
            onChange={(e) => validateField("fullname", e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label={
            <div className="flex">
              <span>Email</span>
              <span className="text-red-500 ml-1">*</span>
            </div>
          }
          name="email"
          required={false}
          validateTrigger={["onChange", "onBlur"]}
          validateFirst
          rules={[
            { required: true, message: "Email is required" }
          ]}
        >
          <Input 
            className="h-[46px] rounded-lg"
            onChange={(e) => validateField("email", e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label={
            <div className="flex">
              <span>Student ID</span>
              <span className="text-red-500 ml-1">*</span>
            </div>
          }
          name="studentCode"
          required={false}
          validateTrigger={["onChange", "onBlur"]}
          validateFirst
          rules={[
            { required: true, message: "Student ID is required" }
          ]}
        >
          <Input 
            className="h-[46px] rounded-lg"
            onChange={(e) => validateField("studentCode", e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label={
            <div className="flex">
              <span>Class Name</span>
              <span className="text-red-500 ml-1">*</span>
            </div>
          }
          name="className"
          required={false}
          validateTrigger={["onChange", "onBlur"]}
          validateFirst
          rules={[
            { required: true, message: "Class name is required" }
          ]}
        >
          <Input 
            className="h-[46px] rounded-lg"
            onChange={(e) => validateField("className", e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          required={false}
          validateTrigger={["onChange", "onBlur"]}
          validateFirst
        >
          <Input 
            className="h-[46px] rounded-lg"
            onChange={(e) => validateField("phoneNumber", e.target.value)}
          />
        </Form.Item>

        <div className="md:col-span-2 flex justify-end gap-4 mt-6">
          <Button
            onClick={onClose}
            className="h-[50px] w-[113px] rounded-full"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="h-[50px] w-[113px] bg-[#003087] hover:bg-[#002A6B] rounded-full"
          >
            Update
          </Button>
        </div>
      </Form>
    );
  };

  return (
    <Modal
      title={
        <div className="mb-4">
          <h4 className="text-2xl font-bold mb-2">Update profile</h4>
          <p className="text-gray-500">
            Keep your profile up to date by editing your personal information.
          </p>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={1000}
      maskClosable={false}
    >
      {modalContent()}
    </Modal>
  );
};

ProfileUpdate.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  userData: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    studentCode: PropTypes.string,
    phoneNumber: PropTypes.string,
    class: PropTypes.string
  }),
  loading: PropTypes.bool,
  error: PropTypes.string
};

export default ProfileUpdate; 