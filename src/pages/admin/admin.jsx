import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./dashboard";
import { Box } from "@mui/material";
import AddPath from "./addroute";

const Admin = () => {
  return (
    <Box>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add/route" element={<AddPath />} />
        <Route path="/*" element={<Navigate to="/admin/dashboard" />} />
      </Routes>
    </Box>
  );
};

export default Admin;
