import * as yup from "yup";

export const profileSchema = yup.object().shape({
  fullname: yup
    .string()
    .required("Fullname is required")
    .matches(/^[A-Za-zÀ-ỹ\s]+$/, "Fullname can only contain letters"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  studentCode: yup
    .string()
    .required("Student code is required")
    .matches(/^[A-Z0-9]+$/, "Student code can only contain uppercase letters and numbers"),
  phoneNumber: yup
    .string()
    .nullable()
    .notRequired()
    .test(
      "is-valid-phone",
      "Phone number must be 10 digits and start with 0",
      (value) => !value || /^0[0-9]{9}$/.test(value)
    ),
  className: yup
    .string()
    .required("Class name is required")
    .matches(/^[A-Za-z0-9\s-]+$/, "Class name can only contain letters, numbers, spaces and hyphens")
    .max(50, "Class name cannot exceed 50 characters")
});

export const passwordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required("Current password is required"),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
}); 