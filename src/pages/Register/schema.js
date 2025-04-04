import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  class: Yup.string().required("Class name is required"),
  studentCode: Yup.string().required("Student ID is required"),
  phone: Yup.string().nullable(),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});
