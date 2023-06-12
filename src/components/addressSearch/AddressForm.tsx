import React, { useState } from "react";
import { validatePostalCode } from "../../utils/addressFormValidation";
import { useFetchAddress } from "../../hooks/useFetchAddress";
import { AddressData, DEFAULT_ADDRESS_DATA } from "../../types/AddressData";

type AddressFormProps = {
  setAddressSearchResults: React.Dispatch<React.SetStateAction<any>>;
};

const AddressForm: React.FC<AddressFormProps> = ({
  setAddressSearchResults,
}) => {
  const [formData, setFormData] = useState<AddressData>(DEFAULT_ADDRESS_DATA);
  const fetchAddress = useFetchAddress();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePostalCode(formData.postalCode)) {
      alert("Invalid postal code");
      return;
    }

    const data = await fetchAddress(formData);
    setAddressSearchResults(data._embedded?.adressen);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2">
      <div className="flex gap-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Postal code</span>
          </label>
          <input
            required
            type="text"
            placeholder="1234AB"
            className="input input-bordered w-32"
            value={formData.postalCode}
            onChange={(e) =>
              setFormData((prev) => {
                return { ...prev, postalCode: e.target.value };
              })
            }
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">House number</span>
          </label>
          <input
            required
            maxLength={5}
            min={1}
            step={1}
            type="number"
            placeholder="12"
            className="input input-bordered w-20"
            value={formData.houseNumber}
            onChange={(e) =>
              setFormData((prev) => {
                return {
                  ...prev,
                  houseNumber: e.target.value,
                };
              })
            }
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Addition</span>
          </label>
          <input
            type="text"
            placeholder="A"
            className="input input-bordered w-20"
            maxLength={4}
            value={formData.addition}
            onChange={(e) =>
              setFormData((prev) => {
                return { ...prev, addition: e.target.value };
              })
            }
          />
        </div>
      </div>
      <button className="btn btn-primary max-w-sm" type="submit">
        Search
      </button>
    </form>
  );
};

export default AddressForm;
