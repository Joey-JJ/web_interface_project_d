export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const INITIAL_SIGN_IN_FORM_DATA = {
    email: "",
    password: "",
  };

export const DEFAULT_BUILDING_FORM_DATA = {
  name: "",
  description: "",
  lon: 0,
  lat: 0,
};
