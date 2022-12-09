import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputMask from "react-input-mask";

import { Link } from "react-router-dom";

export default function Register() {
  const [username , setUsername] = React.useState("");
  const [firstName , setFirstName] = React.useState("");
  const [lastName , setLastName] = React.useState("");
  const [email , setEmail] = React.useState("");
  const [mobile , setMobile] = React.useState("");
  const [password , setPassword] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var username = data.get("username");
    var firstName = data.get("firstName");
    var lastName = data.get("lastName");
    var email = data.get("email");
    var mobile = data.get("mobile");
    var password = data.get("password");

    console.log({
      username,
      firstName,
      lastName,
      email,
      mobile,
      password,
    });
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
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                name="username"
                required
                fullWidth
                id="username"
                label="ชื่อผู้ใช้งาน"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="ชื่อจริง"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="นามสกุล"
                name="lastName"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="อีเมล"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <InputMask mask="999-999-9999" disabled={false} maskChar=" ">
                {() => (
                  <TextField
                    required
                    fullWidth
                    id="mobile"
                    label="เบอร์โทรศัพท์"
                    name="mobile"
                    autoComplete="mobile"
                  />
                )}
              </InputMask>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="รหัสผ่าน"
                type="password"
                id="password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login">มีบัญชีอยู่แล้ว? ลงชื่อเข้าใช้</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
