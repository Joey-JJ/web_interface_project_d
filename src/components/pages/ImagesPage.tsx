import React from "react";
import ImageUpload from "../images/ImageUpload";
import PageContainer from "../layout/PageContainer";

const ImagesPage: React.FC = () => {
  return (
    <PageContainer className="flex flex-col justify-center items-center">
      <ImageUpload />
    </PageContainer>
  );
};

export default ImagesPage;
