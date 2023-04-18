import { signUpFormData } from "../components/auth/SignIn";
import { EMAIL_REGEX } from "./constants";

const validateEmail = (email: string): boolean =>
  EMAIL_REGEX.test(String(email).toLowerCase());

const validatePassword = (password: string): boolean => password.length > 0;

export const signInFormValidation = (formData: signUpFormData) => {
  const { email, password } = formData;
  return validateEmail(email) && validatePassword(password);
};
