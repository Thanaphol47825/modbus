import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./dashboard";
import { Box } from "@mui/material";

const Admin = () => {
  return (
    <Box>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/admin/booking" element={<Booking />} />
        <Route path="/admin/booking_history" element={<BookingHistory />} /> */}
        <Route path="/*" element={<Navigate to="/admin/dashboard" />} />
      </Routes>
    </Box>
  );
};

export default Admin;
