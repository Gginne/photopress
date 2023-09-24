import React from "react";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Layout = () => {
  const { currentUser } = useAuth();
  return currentUser !== null ? (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Outlet />
      </Box>
    </Box>
  ) : (
    <Navigate to={"/login"} replace />
  );
};

export default Layout;
