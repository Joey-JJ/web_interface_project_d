import React, { FormEventHandler } from "react";

type AddressFormProps = {
  onSubmit: FormEventHandler<HTMLFormElement>;
};

const AddressForm: React.FC<AddressFormProps> = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2 my-10">
      <div className="flex gap-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Postal code</span>
          </label>
          <input
            type="text"
            placeholder="1234AB"
            className="input input-bordered w-32"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">House number</span>
          </label>
          <input
            type="text"
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
