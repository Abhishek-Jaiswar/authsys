export const validationRules = {
    fullname: {
      regex: /^.{3,50}$/,
      message: "Full name must be 3 to 50 characters long",
    },
    email: {
      regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "Please provide a valid email address",
    },
    password: {
      regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      message:
        "Password must be at least 8 characters and contain one uppercase letter, one lowercase letter, and one number",
    },
  };