import React from "react";
import ImageUpload from "../images/ImageUpload";
import PageContainer from "../layout/PageContainer";
import ImageGrid from "../images/ImageGrid";

const ImagesPage: React.FC = () => {
  return (
    <PageContainer className="flex flex-col justify-center items-center">
      <ImageUpload />
      <ImageGrid />
    </PageContainer>
  );
};

export default ImagesPage;
