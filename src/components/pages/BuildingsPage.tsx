import React from "react";
import PageContainer from "../layout/PageContainer";
import Table from "../table";

const BuildingsPage: React.FC = () => {
  return (
    <PageContainer className="flex flex-col justify-center items-center">
      <Table />
    </PageContainer>
  );
};

export default BuildingsPage;
