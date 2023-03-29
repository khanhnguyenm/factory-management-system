import React from "react";
import { Outlet } from "react-router-dom";
import BasicBreadcrumbs from "../components/BasicBreadcrumbs";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "./style.scss";

interface LayoutProps {
  children?: React.ReactNode;
}

function MainLayout(props: LayoutProps): React.ReactElement {

  return (
    <div className="app">
      <Sidebar />
      <main className="container">
        <Topbar />
        <BasicBreadcrumbs />
        <div className="main-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default MainLayout;
