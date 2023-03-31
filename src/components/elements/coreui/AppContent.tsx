import React, { memo, ReactNode } from "react";
import { CContainer } from "@coreui/react";

interface AppContentProps {
  children: ReactNode;
}

const AppContent: React.FC<AppContentProps> = ({ children }) => {
  return <CContainer fluid>{children}</CContainer>;
};

export default memo(AppContent);
