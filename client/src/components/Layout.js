import React from "react";
import Sidebar from "./Sidebar";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Layout = () => {
  const { currentUser } = useAuth();
  return currentUser !== null ? (
    <div className="relative z-0 flex h-screen w-screen overflow-hidden">
      <div
        className="flex-shrink-0 overflow-x-hidden text-white"
        style={{ width: "90px" }}
      >
        <Sidebar />
      </div>
      <div className="relative flex h-full max-w-full flex-1 flex-col overflow-hidden">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to={"/auth"} replace />
  );
};

export default Layout;
