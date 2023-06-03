import React from "react";
import { validatePostalCode } from "../../utils/addressFormValidation";

const AddressForm: React.FC = () => {
  const [postalCode, setPostalCode] = React.useState<string>("");

  return (
    <form
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        console.log(validatePostalCode(postalCode));
      }}
      className="flex flex-col gap-2"
    >
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
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
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
