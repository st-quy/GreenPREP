import * as yup from "yup";

export const profileSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .matches(/^[a-zA-Z\s]*$/, "First name must contain only letters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .matches(/^[a-zA-Z\s]*$/, "Last name must contain only letters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  className: yup
    .string()
    .required("Class name is required")
    .matches(/^[A-Z0-9]+$/, "Class name must contain only uppercase letters and numbers"),
  studentId: yup
    .string()
    .required("Student ID is required")
    .matches(/^SV\d{4}$/, "Student ID must be in format SV0000"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{9,10}$/, "Phone number must be 9-10 digits")
    .nullable(),
});

export const yupSync = (schema) => ({
  validator: async (_, value) => {
    if (!value) return Promise.resolve();
    try {
      await schema.validateSyncAt(_.field, { [_.field]: value });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(new Error(error.message));
    }
  },
}); 