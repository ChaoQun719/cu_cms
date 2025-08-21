import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sider from "./Sider";
import Footer from "./Footer";

interface BasicLayoutProps {
  showHeader?: boolean;
  showSider?: boolean;
  showFooter?: boolean;
}

const BasicLayout: React.FC<BasicLayoutProps> = ({
  showHeader = true,
  showSider = true,
  showFooter = true,
}) => {

  return (
    <div>
      {showHeader && <Header />}
      <div>
        {showSider && <Sider />}
        <Outlet />
      </div>
      {showFooter && <Footer />}
    </div>
  )
}

export default BasicLayout;