import React, { useEffect } from "react";
import {
  CssBaseline,
  Container,
  Card,
  CardHeader,
  CardContent,
  Grid,
  TextField,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";

import { AddBusService, GetBusTypeService } from "../../services/userService";

import { object, string, boolean, number } from "yup";
import { Field, Form, Formik } from "formik";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const AddBus = () => {
  const [bustype, setBustype] = React.useState([]);
  useEffect(() => {
    GetBusTypeService().then((result) => {
      setBustype(result.data);
    });
  }, []);
  return (
    <Container>
      <CssBaseline />
      <Card>
        <CardHeader title="เพิ่มรถ" />
        <CardContent>
          <Formik
            initialValues={{
              bus_id: "",
              bus_type: "",
            }}
            validationSchema={object({
              bus_id: string().required("กรุณากรอกทะเบียนรถ"),
              bus_type: string().required("กรุณากรอกประเภทรถ"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              AddBusService(values.bus_id, values.bus_type)
                .then((result) => {
                  MySwal.fire({
                    icon: "success",
                    title: "เพิ่มรถสำเร็จ",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                })
                .catch((error) => {
                  MySwal.fire({
                    icon: "error",
                    title: "เพิ่มรถไม่สำเร็จ",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                });
            }}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} lg={6}>
                    <Field
                      as={TextField}
                      name="bus_id"
                      label="ทะเบียนรถ"
                      variant="outlined"
                      required
                      fullWidth
                      error={Boolean(errors.bus_id && touched.bus_id)}
                      helperText={
                        errors.bus_id && touched.bus_id ? errors.bus_id : null
                      }
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <FormControl fullWidth required>
                      <InputLabel>ประเภทรถ</InputLabel>
                      <Field
                        as={Select}
                        name="bus_type"
                        label="ประเภทรถ"
                        variant="outlined"
                        fullWidth
                        error={Boolean(errors.bus_type && touched.bus_type)}
                      >
                        {bustype.map((item) => (
                          <MenuItem value={item.id} key={item.id}>
                            {item.name} จำนวน {item.capacity} ที่นั่ง
                          </MenuItem>
                        ))}
                      </Field>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      disabled={isSubmitting}
                    >
                      เพิ่มรถ
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddBus;
