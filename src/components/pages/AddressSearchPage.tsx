import React from "react";
import PageContainer from "../layout/PageContainer";
import AddressForm from "../addressForm";

const AddressSearchPage: React.FC = () => {
  return (
    <PageContainer className="flex flex-col justify-center items-center">
      <AddressForm />
    </PageContainer>
  );
};

export default AddressSearchPage;
