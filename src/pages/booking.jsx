import * as React from "react";

import {
  Box,
  Typography,
  Container,
  Stepper,
  Step,
  StepLabel,
  CssBaseline,
  Card,
  CardContent,
  Button,
  CardHeader,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";

// import Moment from "react-moment";
// import "moment/locale/th";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import BusAlertIcon from "@mui/icons-material/BusAlert";
import { BookingService, GetRoute } from "../services/userService";
const MySwal = withReactContent(Swal);

const steps = ["เลือกเส้นทาง", "เลือกรอบการเดินรถ", "ตรวจสอบข้อมูล"];

const Booking = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const Locations = [
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
  const [location_start, setLocationStart] = React.useState(1);
  const [location_end, setLocationEnd] = React.useState(2);
  const [RouteList, setRouteList] = React.useState([]);
  const [selectroute, setSelectRoute] = React.useState("");

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };
  const submitFunction = () => {
    BookingService(selectroute).then((res) => {
      if (res.data.status) {
        MySwal.fire({
          title: "จองเสร็จสิ้น",
          icon: "success",
          confirmButtonText: "ตกลง",
        }).then(() => {
          window.location.href = "/";
        });
      } else {
        MySwal.fire({
          title: "จองไม่สำเร็จ",
          text: res.data.message,
          icon: "error",
          confirmButtonText: "ตกลง",
        });
      }
    });
  };
  const handleNext = async () => {
    if (activeStep === 0) {
      routelistupdate();
    }
    if (isLastStep() && !allStepsCompleted()) {
      submitFunction();
    }
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          activeStep
        : activeStep + 1;

    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const routelistupdate = () => {
    GetRoute(location_start, location_end).then((res) => {
      setRouteList(res.data);
      if (res.data.length === 0) {
        setActiveStep(0);
        MySwal.fire({
          title: "ไม่พบเส้นทาง",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
      }
      setSelectRoute(
        RouteList.includes((x) => {
          return x.id === selectroute;
        })
          ? selectroute
          : res.data[0].round_id
      );
    });
  };
  return (
    <Container>
      <CssBaseline />
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <CardContent>
        {(activeStep === 0 && (
          <Box>
            <Card>
              <CardHeader title="SelectRoute" avatar={<BusAlertIcon />} />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>ต้นทาง</InputLabel>
                      <Select
                        label="ต้นทาง"
                        value={location_start}
                        defaultValue="1"
                        onChange={(e) => {
                          setLocationStart(e.target.value);
                        }}
                      >
                        {Locations.map((location) => (
                          <MenuItem
                            value={location.id}
                            key={location.name}
                            disabled={location.id === location_end}
                          >
                            {location.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>ปลายทาง</InputLabel>
                      <Select
                        label="ปลายทาง"
                        value={location_end}
                        defaultValue="2"
                        onChange={(e) => {
                          setLocationEnd(e.target.value);
                        }}
                      >
                        {Locations.map((location) => (
                          <MenuItem
                            value={location.id}
                            disabled={location.id === location_start}
                            key={location.name}
                          >
                            {location.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        )) ||
          (activeStep === 1 && (
            <Box>
              <Card>
                <CardHeader title="เลือกวันและรอบ" avatar={<BusAlertIcon />} />
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <FormControl fullWidth>
                        <InputLabel>วันเวลาและรอบ</InputLabel>
                        <Select
                          label="วันเวลาและรอบ"
                          value={selectroute}
                          onChange={(e) => {
                            setSelectRoute(e.target.value);
                          }}
                        >
                          {RouteList.map((route) => (
                            <MenuItem
                              value={route.round_id}
                              key={route.round_id}
                            >
                              {new Date(route.time_start).toLocaleDateString(
                                "th-TH",
                                {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "numeric",
                                  minute: "numeric",
                                  hour12: false,
                                }
                              ) + " น."}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          )) ||
          (activeStep === 2 && (
            <Box>
              {/* display all data before */}
              <Card>
                <CardHeader title="ตรวจสอบข้อมูล" avatar={<BusAlertIcon />} />
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6">ต้นทาง</Typography>
                      <Typography variant="body1">
                        {Locations.find((x) => x.id === location_start).name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6">ปลายทาง</Typography>
                      <Typography variant="body1">
                        {Locations.find((x) => x.id === location_end).name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Typography variant="h6">วันเวลาและรอบ</Typography>
                      <Typography variant="body1">
                        {new Date(
                          RouteList.find(
                            (x) => x.round_id === selectroute
                          ).time_start
                        ).toLocaleDateString("th-TH", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: false,
                        }) + " น."}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          ))}
      </CardContent>

      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          variant="contained"
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          ย้อนกลับ
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />

        <Button onClick={handleNext} variant="contained">
          {activeStep === steps.length - 1 ? "บันทึกข้อมูล" : "ถัดไป"}
        </Button>
      </Box>
    </Container>
  );
};

export default Booking;
