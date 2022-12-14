import * as React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

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

import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { RegisterService } from "../services/authService";
const MySwal = withReactContent(Swal);

const initialValues = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  password: "",
};
const phoneRegex = /^0[0-9]{9}$/;
const validation = object({
  username: string().required("กรุณากรอกชื่อผู้ใช้งาน"),
  firstName: string().required("กรุณากรอกชื่อ"),
  lastName: string().required("กรุณากรอกนามสกุล"),
  email: string()
    .required("กรุณากรอกอีเมล์")
    .email("กรุณากรอกอีเมล์ให้ถูกต้อง"),
  mobile: string()
    .required("กรุณากรอกเบอร์โทรศัพท์")
    .max(10, "กรุณากรอกเบอร์โทรศัพท์ให้ครบ")
    .min(10, "กรุณากรอกเบอร์โทรศัพท์ให้ครบ")
    .matches(phoneRegex, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง"),
  password: string()
    .min(8, "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร")
    .required("กรุณากรอกรหัสผ่าน"),
});

const Register = () => {
  const handleSubmit = (values) => {
    RegisterService(
      values.username,
      values.firstName,
      values.lastName,
      values.email,
      values.mobile,
      values.password
    )
      .then((res) => {
        if (res.data.status) {
          localStorage.clear();
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("name", res.data.name);
          localStorage.setItem("surname", res.data.surname);
          localStorage.setItem("username", res.data.username);
          MySwal.fire({
            icon: "success",
            title: "สมัครสมาชิกสำเร็จ",
            text: "",
          }).then(() => {
            window.location.href = "/";
          });
        } else{
          MySwal.fire({
            icon: "error",
            title: "สมัครสมาชิกไม่สำเร็จ",
            text: res.data.message,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validation}
      >
        {({ errors, isValid, touched, dirty }) => (
          <Form>
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
              <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <Field
                      as={TextField}
                      name="username"
                      required
                      fullWidth
                      id="username"
                      label="ชื่อผู้ใช้งาน"
                      autoComplete="email"
                      autoFocus
                      error={
                        Boolean(errors.username) && Boolean(touched.username)
                      }
                      helperText={
                        (Boolean(touched.username) && errors.username) || " "
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="ชื่อจริง"
                      error={
                        Boolean(errors.firstName) && Boolean(touched.firstName)
                      }
                      helperText={
                        (Boolean(touched.firstName) && errors.firstName) || " "
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      required
                      fullWidth
                      id="lastName"
                      label="นามสกุล"
                      name="lastName"
                      error={
                        Boolean(errors.lastName) && Boolean(touched.lastName)
                      }
                      helperText={
                        (Boolean(touched.lastName) && errors.lastName) || " "
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      required
                      fullWidth
                      id="email"
                      label="อีเมล"
                      name="email"
                      autoComplete="email"
                      error={Boolean(errors.email) && Boolean(touched.email)}
                      helperText={
                        (Boolean(touched.email) && errors.email) || " "
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      required
                      fullWidth
                      id="mobile"
                      label="เบอร์โทรศัพท์"
                      name="mobile"
                      autoComplete="mobile"
                      inputProps={{ maxLength: 10 }}
                      type="tel"
                      error={Boolean(errors.mobile) && Boolean(touched.mobile)}
                      helperText={
                        (Boolean(touched.mobile) && errors.mobile) || " "
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      required
                      fullWidth
                      name="password"
                      label="รหัสผ่าน"
                      type="password"
                      id="password"
                      error={
                        Boolean(errors.password) && Boolean(touched.password)
                      }
                      helperText={
                        (Boolean(touched.password) && errors.password) || " "
                      }
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
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Register;
