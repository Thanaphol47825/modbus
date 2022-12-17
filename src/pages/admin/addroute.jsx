import React, { useEffect } from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  AddRoundService,
  GetAllBusService,
  GetAllRoundService,
  GetRoundBookingService,
} from "../../services/userService";

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
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
  TablePagination,
} from "@mui/material";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
const MySwal = withReactContent(Swal);

export const Location = [
  {
    id: 1,
    name: "KMUTT",
  },
  {
    id: 2,
    name: "KX",
  },
  {
    id: 3,
    name: "ราชบุรี",
  },
  {
    id: 4,
    name: "บางขุนเทียน",
  },
];

const AddPath = () => {
  const [bus, setBus] = React.useState([]);
  const [bus_id, setBus_id] = React.useState("");
  const [location_start, setLocation_start] = React.useState("");
  const [location_end, setLocation_end] = React.useState("");
  const [date, setDate] = React.useState(new Date());
  const [path, setPath] = React.useState([]);
  const [Booking, setBooking] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  // make pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    // console.log(newPage);
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    GetAllBusService().then((result) => {
      setBus(result.data);
    });
    GetAllRoundService().then((result) => {
      setPath(result.data);
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
      {/* Dialog For Show Booking Detail  */}
      <Dialog
        open={open}
        disableEscapeKeyDown={true}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>รายละเอียดการจอง</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>รหัสนักศึกษา</TableCell>
                  <TableCell align="right">ชื่อ</TableCell>
                  <TableCell align="right">นามสกุล</TableCell>
                  <TableCell align="right">เบอร์โทร</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Booking.map((row) => {
                  return (
                    <TableRow>
                      <TableCell>{row.user_name.username}</TableCell>
                      <TableCell>{row.user_name.name}</TableCell>
                      <TableCell>{row.user_name.surname}</TableCell>
                      <TableCell>{row.user_name.mobile}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            color="primary"
          >
            ปิด
          </Button>
        </DialogActions>
      </Dialog>
      <CssBaseline />
      <Card>
        <CardHeader
          title="เพิ่มรอบการให้บริการ"
          titleTypographyProps={{ variant: "h5" }}
          avatar={<AddLocationAltIcon />}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
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
            <Grid item xs={12} lg={6}>
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
            <Grid item xs={12} lg={6}>
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
            <Grid item xs={12} lg={6}>
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

      <Box mt={2}></Box>
      <Card>
        <CardHeader
          title="รายการรอบการให้บริการ"
          titleTypographyProps={{ variant: "h5" }}
          avatar={<ListAltIcon />}
        />

        <CardContent>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">ทะเบียนรถ</TableCell>
                  <TableCell align="center">ต้นทาง</TableCell>
                  <TableCell align="center">ปลายทาง</TableCell>
                  <TableCell align="center">วันที่เวลา</TableCell>
                  <TableCell align="center">จัดการ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {path
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((e) => {
                    return (
                      <TableRow key={e.round_id}>
                        <TableCell>{e.bus_name.bus_id}</TableCell>
                        <TableCell>{e.location_start_name.name}</TableCell>
                        <TableCell>{e.location_end_name.name}</TableCell>
                        <TableCell>
                          {new Date(e.time_start).toLocaleDateString("th-TH", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour12: false,
                            hour: "2-digit",
                            minute: "2-digit",
                          }) + " น."}
                        </TableCell>

                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              GetRoundBookingService(e.round_id).then(
                                (result) => {
                                  setBooking(result.data);
                                  setOpen(true);
                                }
                              );
                            }}
                          >
                            <PersonSearchIcon />
                            ดูรายละเอียด
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
            {/* Paginater */}
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              component="div"
              count={path.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddPath;
