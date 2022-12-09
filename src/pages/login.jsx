import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";

import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

import { LoginService } from "../services/authService";

export default function Login() {
  const [email, setEmail] = React.useState(localStorage.getItem("email"));
  const [password, setPassword] = React.useState(
    localStorage.getItem("password")
  );
  const [Emailchk, setEmailchk] = React.useState(false);
  const [Passchk, setPasschk] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var email = data.get("email");
    var password = data.get("password");
    setEmailchk(email === "");

    if (password.length < 8) {
      setPasschk(true);
    } else {
      setPasschk(false);
    }

    if (!Emailchk && !Passchk) {
      localStorage.clear();
      if (data.get("remember") === "1") {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
      }
      const res = LoginService(email, password);
      // console.log(res);
      // console.log(res.data);
      if (res.data !== null) {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("name", res.name);
        localStorage.setItem("surname", res.surname);
        localStorage.setItem("username", res.username);

        MySwal.fire({
          title: "Success",
          text: "Login Success",
          icon: "success",
        }).then(() => {
          window.location.href = "/";
        });
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            error={Emailchk}
            helperText={Emailchk ? "Email is required" : ""}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            error={Passchk}
            helperText={Passchk ? "Password is required" : ""}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={
              <Checkbox value="remember" color="primary" name="remember" />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forgotpass">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link to="/register">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
