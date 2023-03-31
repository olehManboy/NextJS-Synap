import React, { ReactNode } from "react";
import AppContent from "@src/components/elements/coreui/AppContent";
import Header from "@src/components/elements/header/SynapMeHeader";

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <AppContent>{children}</AppContent>
    </>
  );
};

export default DefaultLayout;
