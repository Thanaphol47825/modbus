import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CssBaseline,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data1 = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export const data2 = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const Dashboard = () => {
  return (
    <Container>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Card
            sx={{
              borderTop: 10,
              borderColor: "primary.main",
              borderRadius: 1,
              bgcolor: "background.paper",
            }}
          >
            <CardHeader title="ยินดีต้อนรับ" />
            <CardContent>
              <Typography variant="h6" color="gray">
                {localStorage.getItem("name") +
                  " " +
                  localStorage.getItem("surname")}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* grid */}

        <Grid item xs={12} lg={4}>
          <Card>
            <CardHeader
              title="ยอดผู้เดินทางวันนี้"
              avatar={<NaturePeopleIcon />}
            />
            <CardContent>
              <Typography variant="h6" color="gray">
                0
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card>
            <CardHeader
              title="จำนวนรอบการเดินรถในวันนี้"
              avatar={<DirectionsBusIcon />}
            />
            <CardContent>
              <Typography variant="h6" color="gray">
                0
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card>
            <CardHeader
              title="ยอดผู้เดินทางในสัปดาห์นี้"
              avatar={<DateRangeIcon />}
            />
            <CardContent>
              <Typography variant="h6" color="gray">
                0
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title="ผู้เดินทางในแต่ละรอบของวันนี้" />
            <CardContent>
              <Pie data={data1} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title="ผู้เดินทางในแต่ละวันของสัปดาห์" />
            <CardContent>
              <Pie data={data2} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
