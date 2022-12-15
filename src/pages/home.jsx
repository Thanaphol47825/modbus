import * as React from "react";
import {
  Box,
  Table,
  Typography,
  Grid,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Container,
  CssBaseline,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";
import { GetTodayRoundService } from "../services/userService";
function Home() {
  const [allround, setAllround] = React.useState([]);
  React.useEffect(() => {
    GetTodayRoundService().then((result) => {
      console.log(result.data);
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
          title={`ตารางเดินรถวันที่ ${new Date().toLocaleDateString("th-TH", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour12: false,
          })}`}
        />
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">ต้นทาง</TableCell>
                <TableCell align="center">ปลายทาง</TableCell>
                <TableCell align="center">เวลาออก</TableCell>
                <TableCell align="center">ทะเบียนรถ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allround.map((round) => {
                return (
                  <TableRow>
                    <TableCell align="center">
                      {round.location_start_name.name}
                    </TableCell>
                    <TableCell align="center">
                      {round.location_end_name.name}
                    </TableCell>
                    <TableCell align="center">
                      {new Date(round.time_start).toLocaleTimeString("th-TH", {
                        hour12: false,
                        hour: "2-digit",
                        minute: "2-digit",
                      }) + " น."}
                    </TableCell>
                    <TableCell align="center">
                      {round.bus_name.bus_id}
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
}
export default Home;
