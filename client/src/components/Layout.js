import React from "react";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";

const Layout = (props) => {
  const { children } = props;

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
