import React, { useState } from "react";
import PageContainer from "../layout/PageContainer";
import AddressForm from "../addressSearch/AddressForm";
import AddressResults from "../addressSearch/AddressResults";

const AddressSearchPage: React.FC = () => {
  const [addressSearchResults, setAddressSearchResults] = useState([]);

  return (
    <PageContainer className="flex flex-col justify-center items-center">
      <AddressForm setAddressSearchResults={setAddressSearchResults} />
      <AddressResults addressSearchResults={addressSearchResults} />
    </PageContainer>
  );
};

export default AddressSearchPage;
