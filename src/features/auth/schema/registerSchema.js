export const validateField = (field, value, form) => {
    let isValid = false;
    let errorMessage = "";
    
    switch (field) {
      case "firstName":
        isValid = value && /^[A-Za-z]+$/.test(value) && value.length >= 2 && value.length <= 50;
        errorMessage = !value ? "Please input your first name!" : 
                      !/^[A-Za-z]+$/.test(value) ? "First name can only contain alphabetic characters" :
                      value.length < 2 ? "First name must be at least 2 characters" :
                      "First name cannot exceed 50 characters";
        break;
      case "lastName":
        isValid = value && /^[A-Za-z]+$/.test(value) && value.length >= 2 && value.length <= 50;
        errorMessage = !value ? "Please input your last name!" : 
                      !/^[A-Za-z]+$/.test(value) ? "Last name can only contain alphabetic characters" :
                      value.length < 2 ? "Last name must be at least 2 characters" :
                      "Last name cannot exceed 50 characters";
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = value && emailRegex.test(value);
        errorMessage = !value ? "Please input your email!" : "Please enter a valid email!";
        break;
      case "className":
        isValid = value && /^[A-Za-z0-9\s]+$/.test(value) && value.length >= 2 && value.length <= 100;
        errorMessage = !value ? "Please input your class name!" : 
                      !/^[A-Za-z0-9\s]+$/.test(value) ? "Class name can only contain alphanumeric characters and spaces" :
                      value.length < 2 ? "Class name must be at least 2 characters" :
                      "Class name cannot exceed 100 characters";
        break;
      case "studentId":
        isValid = value && /^[A-Za-z0-9]+$/.test(value) && value.length >= 5 && value.length <= 15;
        errorMessage = !value ? "Please input your student ID!" : 
                      !/^[A-Za-z0-9]+$/.test(value) ? "Student ID can only contain alphanumeric characters" :
                      value.length < 5 ? "Student ID must be at least 5 characters" :
                      "Student ID cannot exceed 15 characters";
        break;
      case "phoneNumber":
        if (!value) {
          isValid = true;
        } else {
          isValid = /^\d+$/.test(value) && value.length === 10;
          errorMessage = !/^\d+$/.test(value) ? "Phone number can only contain numeric characters" :
                        "Phone number must be exactly 10 digits";
        }
        break;
      case "password":
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
        isValid = value && value.length >= 8 && passwordRegex.test(value);
        errorMessage = !value ? "Please input your password!" :
                      value.length < 8 ? "Password must be at least 8 characters" :
                      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character";
        break;
      case "confirmPassword":
        const password = form.getFieldValue("password");
        isValid = value && value === password;
        errorMessage = !value ? "Please confirm your password!" : "The two passwords do not match!";
        break;
      default:
        isValid = true;
    }
    
    return { isValid, errorMessage };
  };
  
  export const getValidationRules = (fieldName, form) => {
    return [
      {
        validator: async (_, value) => {
          if (!value && fieldName !== "phoneNumber") {
            return Promise.reject(`Please input your ${fieldName.replace(/([A-Z])/g, ' $1').toLowerCase()}!`);
          }
          
          switch (fieldName) {
            case "firstName":
            case "lastName":
              if (!/^[A-Za-z]+$/.test(value)) {
                return Promise.reject(`${fieldName.replace(/([A-Z])/g, ' $1').toLowerCase()} can only contain alphabetic characters`);
              }
              if (value.length < 2) {
                return Promise.reject(`${fieldName.replace(/([A-Z])/g, ' $1').toLowerCase()} must be at least 2 characters`);
              }
              if (value.length > 50) {
                return Promise.reject(`${fieldName.replace(/([A-Z])/g, ' $1').toLowerCase()} cannot exceed 50 characters`);
              }
              break;
            case "email":
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(value)) {
                return Promise.reject("Please enter a valid email!");
              }
              break;
            case "className":
              if (!/^[A-Za-z0-9\s]+$/.test(value)) {
                return Promise.reject("Class name can only contain alphanumeric characters and spaces");
              }
              if (value.length < 2) {
                return Promise.reject("Class name must be at least 2 characters");
              }
              if (value.length > 100) {
                return Promise.reject("Class name cannot exceed 100 characters");
              }
              break;
            case "studentId":
              if (!/^[A-Za-z0-9]+$/.test(value)) {
                return Promise.reject("Student ID can only contain alphanumeric characters");
              }
              if (value.length < 5) {
                return Promise.reject("Student ID must be at least 5 characters");
              }
              if (value.length > 15) {
                return Promise.reject("Student ID cannot exceed 15 characters");
              }
              break;
            case "phoneNumber":
              if (!value) return Promise.resolve();
              if (!/^\d+$/.test(value)) {
                return Promise.reject("Phone number can only contain numeric characters");
              }
              if (value.length !== 10) {
                return Promise.reject("Phone number must be exactly 10 digits");
              }
              break;
            case "password":
              if (value.length < 8) {
                return Promise.reject("Password must be at least 8 characters");
              }
              if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(value)) {
                return Promise.reject("Password must include at least one uppercase letter, one lowercase letter, one number, and one special character");
              }
              break;
            case "confirmPassword":
              if (value !== form.getFieldValue("password")) {
                return Promise.reject("The two passwords do not match!");
              }
              break;
          }
          return Promise.resolve();
        }
      }
    ];
  };
  
  export const getInitialFormValues = () => ({
    firstName: "",
    lastName: "",
    email: "",
    className: "",
    studentId: "",
    phoneNumber: "",
    password: "",
    confirmPassword: ""
  });
  
  export const getInitialFormErrors = () => ({
    firstName: "",
    lastName: "",
    email: "",
    className: "",
    studentId: "",
    phoneNumber: "",
    password: "",
    confirmPassword: ""
  });
  
  export const getInitialFieldsValidated = () => ({
    firstName: false,
    lastName: false,
    email: false,
    className: false,
    studentId: false,
    password: false,
    confirmPassword: false,
  });
  
  export const validateFormField = (field, value, formValues, setFieldsValidated, setFormErrors) => {
    const mockForm = {
      getFieldValue: (fieldName) => formValues[fieldName]
    };
    
    const { isValid, errorMessage } = validateField(field, value, mockForm);
    
    setFieldsValidated(prev => ({ 
      ...prev, 
      [field]: isValid 
    }));
    
    setFormErrors(prev => ({
      ...prev,
      [field]: (!isValid && value) ? errorMessage : ""
    }));
  };
  
  export const checkFormValidity = (fieldsValidated) => {
    return Object.values(fieldsValidated).every(isValid => isValid);
  };
  