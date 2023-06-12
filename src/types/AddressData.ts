export type AddressData = {
  postalCode: string;
  houseNumber: string;
  addition?: string;
};

export const DEFAULT_ADDRESS_DATA: AddressData = {
  postalCode: "",
  houseNumber: "",
  addition: "",
};
