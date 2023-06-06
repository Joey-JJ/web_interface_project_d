type AddressData = {
  postalCode: string;
  houseNumber: number;
  addition?: string;
};

export const fetchAddress = async (address: AddressData) => {
  try {
    const response = await fetch(
      `https://api.bag.kadaster.nl/lvbag/individuelebevragingen/v2/adressen?postcode=${
        address.postalCode
      }&huisnummer=${address.houseNumber}${
        address.addition ? `&huisnummertoevoeging=${address.addition}` : ""
      }`,
      {
        headers: {
          "X-Api-Key": process.env.BAG_API_KEY!,
        },
      }
    );
    console.log(response);
  } catch (error: any) {
    console.log(error.message);
  }

  //   const data = await response.json();
};
