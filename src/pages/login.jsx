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
import { object, string, boolean } from "yup";
import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

import { LoginService } from "../services/authService";

const initialValues = {
  email: "",
  password: "",
  remember: false,
};

const validation = object({
  email: string()
    .required("กรุณากรอกชื่อผู้ใช้งาน")
    .default(localStorage.getItem("email"))
    .nullable(),
  password: string()
    .required("กรุณากรอกรหัสผ่าน")
    .min(8, "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร")
    .default(localStorage.getItem("password"))
    .nullable(),
  remember: boolean().default(localStorage.getItem("remember")),
});

const LoginForm = () => {
  const handleSubmit = (values, { resetForm, isSubmitting }) => {
    LoginService(values.email, values.password)
      .then((res) => {
        if (res.data.status) {
          localStorage.clear();
          if (values.remember) {
            localStorage.setItem("remember", true);
            localStorage.setItem("email", values.email);
            localStorage.setItem("password", values.password);
          }
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("name", res.data.name);
          localStorage.setItem("surname", res.data.surname);
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("role", res.data.role);

          MySwal.fire({
            title: "Success",
            text: "Login Success",
            icon: "success",
          }).then(() => {
            location.reload();
          });
        } else {
          MySwal.fire({
            title: "Login Failed",
            text: "Invalid Username or Password",
            icon: "error",
          });
          resetForm();
        }
      })
      .catch(() => {
        MySwal.fire({
          title: "Error",
          text: "Login Error",
          icon: "error",
        });
        resetForm();
      });
  };
  // if logged in redirect to home
  const navigate = useNavigate();
  React.useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, []);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validation}
      >
        {({ errors, isValid, touched, dirty }) => (
          <Form>
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
                เข้าสู่ระบบ
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Field
                  autoFocus
                  margin="dense"
                  name="email"
                  type="text"
                  as={TextField}
                  variant="outlined"
                  color="primary"
                  label="รหัสผู้ใช้งาน"
                  fullWidth
                  error={Boolean(errors.email) && Boolean(touched.email)}
                  helperText={(Boolean(touched.email) && errors.email) || " "}
                  autoComplete="email"
                  required
                />
                <Field
                  required
                  margin="dense"
                  name="password"
                  type="password"
                  as={TextField}
                  variant="outlined"
                  color="primary"
                  label="รหัสผ่าน"
                  fullWidth
                  error={Boolean(errors.password) && Boolean(touched.password)}
                  helperText={
                    (Boolean(touched.password) && errors.password) || " "
                  }
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      value="remember"
                      color="primary"
                      name="remember"
                    />
                  }
                  label="จดจำรหัสผ่าน"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  เข้าสู่ระบบ
                </Button>
                <Grid container>
                  <Grid item xs component={Link} to="/forgotpass">
                    ลืมรหัสผ่าน?
                  </Grid>
                  <Grid item component={Link} to="/register">
                    ยังไม่มีบัญชีผู้ใช้งาน?
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default LoginForm;
