export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const POSTAL_CODE_REGEX = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i;

export const INITIAL_SIGN_IN_FORM_DATA = {
  email: "",
  password: "",
};

export const DEFAULT_BUILDING_FORM_DATA = {
  name: "",
  description: "",
  lon: 0,
  lat: 0,
  imageUrl: "",
};

export const BUILDING_TABLE_NAME = "buildings";
export const BUILDING_IMAGE_BUCKET = "building-images";

export const ROOT_ROUTE = "/";
export const ADDRESS_SEARCH_ROUTE = "/address_search";
export const IMAGES_ROUTE = "/images";
