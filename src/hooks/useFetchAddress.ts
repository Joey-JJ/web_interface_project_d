import { useCallback } from "react";
import { AddressData } from "../types/AddressData";

export const useFetchAddress = () => {
  const fetchAddresses = useCallback(async (address: AddressData) => {
    const url = `https://api.bag.kadaster.nl/lvbag/individuelebevragingen/v2/adressen?postcode=${
      address.postalCode
    }&huisnummer=${address.houseNumber}${
      address.addition ? `&huisletter=${address.addition}` : ""
    }`;

    try {
      const response = await fetch(url, {
        headers: {
          "X-Api-Key": process.env.REACT_APP_BAG_API_KEY!,
          Accept: "application/hal+json",
          "Accept-Crs": "28992",
        },
      });

      const data = await response.json();
      return data;
    } catch (error: any) {
      alert(error.message);
    }
  }, []);

  return fetchAddresses;
};
