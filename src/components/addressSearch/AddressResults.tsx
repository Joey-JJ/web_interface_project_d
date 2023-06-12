import React from "react";
import { copyToClipboard } from "../../utils/copyToClipboard";

type AddressResultProps = {
  addressSearchResults: any[];
};

const AddressResults: React.FC<AddressResultProps> = ({
  addressSearchResults,
}) => {
  if (!addressSearchResults) {
    return <div>No results</div>;
  }

  return (
    <div className="mt-8 flex flex-col gap-2">
      {addressSearchResults.map((address) => {
        return (
          <div className="flex gap-2 p-6 border rounded-xl" key={Math.random()}>
            <p>{address.korteNaam}</p>
            <p>{address.huisnummer}</p>
            <p>{address.huisletter}</p>-<p>{address.pandIdentificaties[0]}</p>
            <button
              onClick={() => copyToClipboard(address.pandIdentificaties[0])}
              className="btn btn-primary btn-xs"
            >
              Copy BAG id
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default AddressResults;
