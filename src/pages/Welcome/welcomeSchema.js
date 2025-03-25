import * as Yup from 'yup';

export const welcomeSchema = Yup.object({
    sessionKey: Yup.string()
        .matches(/^[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>?,./`|\\-]*$/, "Session key contains invalid characters.")
        .min(1, "The key is invalid. Please try again.")
        .max(100, "Session key is too long. It should be 100 characters or less.")
        .required("Session key is required."),
});
