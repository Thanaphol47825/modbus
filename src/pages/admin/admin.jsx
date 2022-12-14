import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./dashboard";
import { Box, Button, Container, Grid } from "@mui/material";
import AddPath from "./addroute";
import AddBus from "./addbus";
import StaffManage from "./staff";

const Admin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("role") !== "1") {
      navigate("/");
    }
  }, []);
  return (
    <Box>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={6} lg={3}>
            <Button
              component={Link}
              to="/admin/dashboard"
              variant="contained"
              fullWidth
            >
              Dashboard
            </Button>
          </Grid>
          <Grid item xs={6} lg={3}>
            <Button
              component={Link}
              to="/admin/route"
              variant="contained"
              color="success"
              fullWidth
            >
              Manage route
            </Button>
          </Grid>
          <Grid item xs={6} lg={3}>
            <Button
              component={Link}
              to="/admin/add/bus"
              variant="contained"
              color="secondary"
              fullWidth
            >
              Add new bus
            </Button>
          </Grid>
          <Grid item xs={6} lg={3}>
            <Button
              component={Link}
              to="/admin/manage/staff"
              variant="contained"
              color="warning"
              fullWidth
            >
              Manage Staff
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Box sx={{ height: "20px" }} />

      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/route" element={<AddPath />} />
        <Route path="/add/bus" element={<AddBus />} />
        <Route path="/manage/staff" element={<StaffManage />} />
        <Route path="/*" element={<Navigate to="/admin/dashboard" />} />
      </Routes>
    </Box>
  );
};

export default Admin;
