import React from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AddRoundService, GetAllBusService } from "../../services/userService";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";


import { object, string, boolean } from "yup";
import { Field, Form, Formik } from "formik";
import {
  Container,
  CssBaseline,
  Select,
  MenuItem,
  FormControl,
  Card,
  CardContent,
  Grid,
  InputLabel,
  TextField,
  CardActions,
  Button,
  CardHeader,
} from "@mui/material";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";

const MySwal = withReactContent(Swal);

export const Location = [
  {
      id: 1,
      name: "KMUTT"
  },
  {
      id: 2,
      name: "KX"
  },
  {
      id: 3,
      name: "ราชบุรี"
  },
  {
      id: 4,
      name: "บางขุนเทียน"
  },
]

const AddPath = () => {
  const [bus, setBus] = React.useState([]);
  const [bus_id, setBus_id] = React.useState("");
  const [location_start, setLocation_start] = React.useState("");
  const [location_end, setLocation_end] = React.useState("");
  const [date, setDate] = React.useState(new Date());
  React.useEffect(() => {
    GetAllBusService().then((result) => {
      setBus(result.data);
    });
  }, []);
  const handleSubmit = () => {
    if (
      [bus_id, location_start, location_end, date].every((e) => {
        return e != "";
      })
    ) {
      AddRoundService(bus_id, location_start, location_end, date).then(() => {
        MySwal.fire({
          title: "เพิ่มรอบการให้บริการสำเร็จ",
          icon: "success",
          confirmButtonText: "ตกลง",
        });
        setLocation_start("");
        setLocation_end("");
        setBus_id("");
        setDate(new Date());
      });
    } else {
      MySwal.fire({
        title: "กรุณากรอกข้อมูลให้ครบ",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
    }
  };
  return (
    <Container>
      <CssBaseline />
      <Card>
        <CardHeader
          title="เพิ่มรอบการให้บริการ"
          avatar={<AddLocationAltIcon />}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">ต้นทาง</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={0}
                  value={location_start}
                  label="ต้นทาง"
                  onChange={(event) => {
                    setLocation_start(event.target.value);
                  }}
                >
                  {Location.map((e) => {
                    return (
                      <MenuItem
                        value={e.id}
                        key={e.id}
                        disabled={e.id == location_end}
                      >
                        {e.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">ปลายทาง</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={0}
                  value={location_end}
                  label="ปลายทาง"
                  onChange={(event) => {
                    setLocation_end(event.target.value);
                  }}
                >
                  {Location.map((e) => {
                    return (
                      <MenuItem
                        value={e.id}
                        key={e.id}
                        disabled={e.id == location_start}
                      >
                        {e.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">รถ</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={0}
                  value={bus_id}
                  label="เลือกรถ"
                  onChange={(event) => {
                    setBus_id(event.target.value);
                  }}
                >
                  {bus.map((e) => {
                    return (
                      <MenuItem value={e.id} key={e.id}>
                        {e.bus_id}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Date&Time picker"
                    value={date}
                    onChange={(e) => {
                      setDate(e);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={handleSubmit}>
            บันทึก
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default AddPath;
