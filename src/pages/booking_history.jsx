import React, { useEffect } from "react";

import {
  Container,
  Box,
  CssBaseline,
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
} from "@mui/material";
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";
import {
  CancelBookingService,
  GetBookingService,
} from "../services/userService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const BookingHistory = () => {
  const [allround, setAllround] = React.useState([]);
  useEffect(() => {
    GetBookingService().then((result) => {
      setAllround(result.data);
    });
  }, []);
  return (
    <Container>
      <CssBaseline />
      <Card>
        <CardHeader
          avatar={<ModeOfTravelIcon />}
          titleTypographyProps={{ variant: "h5" }}
          title={`ประวัติการจองทั้งหมด`}
        />
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">ต้นทาง</TableCell>
                <TableCell align="center">ปลายทาง</TableCell>
                <TableCell align="center">เวลาออก</TableCell>
                <TableCell align="center">ทะเบียนรถ</TableCell>
                <TableCell align="center">จัดการ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allround.map((round) => {
                return (

                  <TableRow key={round.id}>
                    <TableCell align="center">
                      {round.round_name.location_start_name.name}
                    </TableCell>
                    <TableCell align="center">
                      {round.round_name.location_end_name.name}
                    </TableCell>
                    <TableCell align="center">
                      {new Date(round.round_name.time_start).toLocaleDateString(
                        "th-TH",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour12: false,
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      ) + " น."}
                    </TableCell>
                    <TableCell align="center">
                      {round.round_name.bus_name.bus_id}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          MySwal.fire({
                            title: "ยืนยันการยกเลิกการจอง",
                            text: "คุณต้องการยกเลิกการจองหรือไม่",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "ยืนยัน",
                            cancelButtonText: "ยกเลิก",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              CancelBookingService(round.id).then((result) => {
                                if (result.status === 200) {
                                  MySwal.fire({
                                    title: "ยกเลิกการจองสำเร็จ",
                                    icon: "success",
                                    showConfirmButton: false,
                                    timer: 1500,
                                  }).then(() => {
                                    window.location.reload();
                                  });
                                } else {
                                  MySwal.fire({
                                    title: "ยกเลิกการจองไม่สำเร็จ",
                                    icon: "error",
                                    showConfirmButton: false,
                                    timer: 1500,
                                  });
                                }
                              });
                            }
                          });
                        }}
                      >
                        ยกเลิก
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Container>
  );
};

export default BookingHistory;
