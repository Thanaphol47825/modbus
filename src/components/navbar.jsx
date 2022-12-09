import * as React from "react";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { Link } from "react-router-dom";

const drawerWidth = 240;
const navItems = [
  { title: "Home", url: "/home" },
  { title: "About", url: "/about" },
  { title: "Contact", url: "/contact" },
];

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  // get username from local storage
  // const username = localStorage.getItem("username");
  const [username, setUsername] = React.useState(
    localStorage.getItem("username")
  );
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("name");
    localStorage.removeItem("surname");
    setUsername("");
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />

      <List>
        {navItems.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{ display: "flex" }}
            component={Link}
            to={item.url}
          >
            <ListItemButton
              sx={{ textAlign: "center", display: "flex" }}
              color="primary"
            >
              <ListItemText
                primary={item.title}
                color="primary"
                sx={{ color: "#000" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List sx={{ display: username != "" ? "none" : "flex" }}>
        <ListItem
          key={"login"}
          disablePadding
          sx={{ display: "flex" }}
          
        >
          <ListItemButton sx={{ textAlign: "center", display: "flex" }} color="primary" component={Link} to='/login'>
            <ListItemText
              primary="Login"
              color="primary"
              sx={{ color: "#000" }}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <List sx={{ display: username == "" ? "none" : "flex" }}>
        <ListItem key="logout" disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText
                primary="Logout"
                sx={{ color: "#000" }}
                onClick={logout}
              />
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
              {navItems.map((item, index) => (
                <Link to={item.url}>
                  <Button key={index} sx={{ color: "#fff" }} color="primary">
                    {item.title}
                  </Button>
                </Link>
              ))}
            </Box>
          </Typography>

          <Box sx={{ display: username !=""? { xs: "none", sm: "block" } : 'none' }}>
            <Typography variant="p" component="span" sx={{ flexGrow: 1 }}>
              {localStorage.getItem("name")} {localStorage.getItem("surname")}
              </Typography>
              <Button sx={{ color: "#fff" }} onClick={logout}>Logout</Button>
          </Box>
          <Box sx={{ display: username ==""? { xs: "none", sm: "block" } : 'none' }}>
            <Link to="/login">
              <Button sx={{ color: "#fff" }}>Login</Button>
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

export default Navbar;
