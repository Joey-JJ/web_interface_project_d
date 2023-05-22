import { POSTAL_CODE_REGEX } from "./constants";

export const validatePostalCode = (postalCode: string): boolean =>
  POSTAL_CODE_REGEX.test(String(postalCode).toLowerCase());
