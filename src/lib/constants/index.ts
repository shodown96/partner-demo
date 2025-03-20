export const VALIDATION_MESSAGES = {
  CodeRequired: "Verification code is required.",
  EmailInvalid: "Please enter a valid email.",
  EmailRequired: "Email is required.",
  FirstNameRequired: "First name is required.",
  LastNameRequired: "Last name is required.",
  PasswordMismatch: "Passwords must match!",
  PasswordRequired: "Password is required.",
  Required: "{} is required.",
};

export const ERROR_MESSAGES = {
  BadRequestError: "Bad Request Error",
  AuthenticationError: "You're not signed in.",
  InternalServerError: "Internal Server Error.",
  RequiredDetails: "Please Fill in Required Details!",
  UnexpectedError: "Unable to process request, please try again later.",
};

export const PLACEHOLDERS = {
  EMAIL: "name@mail.com",
  NAME: "Enter Name",
  FIRST_NAME: "Enter First Name",
  LAST_NAME: "Enter Last Name",
  NEW_PASSWORD: "Enter New Password",
  PASSWORD: "Enter Password",
  SURNAME: "Surname",
  PHONE: "Phone Number",
};


export const originURL = process.env.NODE_ENV === 'development' ?
    'http://localhost:3000' : `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`


export const DOMAIN = process.env.NODE_ENV === 'development' ?
    'localhost' : process.env.VERCEL_PROJECT_PRODUCTION_URL