import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import Link from "@mui/material/Link";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />

      <List>
        {navItems.map((item) => (
          <ListItem key={`/${item.toLowerCase()}`} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }} color="primary">
              <Link to={`/${item.toLowerCase()}`}>
                <ListItemText
                  primary={item}
                  color="primary"
                  sx={{ color: "#000" }}
                />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <Link to="/login">
              <ListItemText primary="Login" sx={{ color: "#000" }} />
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="span"
            sx={{ flexGrow: 1, display: { xs: "block", sm: "block" } }}
          >
            MUI
            <Box sx={{ display: { xs: "none", sm: "inline" } }}>
              {navItems.map((item) => (
                <Link to={`/${item.toLowerCase()}`}>
                  <Button
                    key={`/${item.toUpperCase()}`}
                    sx={{ color: "#fff" }}
                    color="primary"
                  >
                    {item}
                  </Button>
                </Link>
              ))}
            </Box>
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Link to="/login">
              <Button key="LOGIN" sx={{ color: "#fff" }}>
                Login
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ p: 3, justifyContent: "center", display: "flex" }}
      >
        <Toolbar />
        <Typography></Typography>
      </Box>
    </Box>
  );
}

Navbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Navbar;
