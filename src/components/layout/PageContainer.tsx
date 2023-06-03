import React from "react";

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className,
}) => {
  return (
    <main className={`h-[calc(100vh-64px)] w-screen bg-base-300 ${className}`}>
      {children}
    </main>
  );
};

export default PageContainer;
