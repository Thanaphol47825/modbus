import React, { useEffect } from "react";
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
import {
  GetAdminDashboardGraphService,
  GetAdminDashboardService,
} from "../../services/userService";

ChartJS.register(ArcElement, Tooltip, Legend);

export const color = [
  {
    bg: "rgba(234, 85, 69, 0.2)",
    border: "rgba(234, 85, 69, 1)",
  },
  {
    bg: "rgba(244, 106, 155, 0.2)",
    border: "rgba(244, 106, 155, 1)",
  },
  {
    bg: "rgba(239, 155, 32, 0.2)",
    border: "rgba(239, 155, 32, 1)",
  },
  {
    bg: "rgba(237, 191, 51, 0.2)",
    border: "rgba(237, 191, 51, 1)",
  },
  {
    bg: "rgba(237, 225, 91, 0.2)",
    border: "rgba(237, 225, 91, 1)",
  },
  {
    bg: "rgba(189, 207, 50, 0.2)",
    border: "rgba(189, 207, 50, 1)",
  },
  {
    bg: "rgba(135, 188, 69, 0.2)",
    border: "rgba(135, 188, 69, 1)",
  },
  {
    bg: "rgba(39, 174, 239, 0.2)",
    border: "rgba(39, 174, 239, 1)",
  },
  {
    bg: "rgba(179, 61, 198, 0.2)",
    border: "rgba(179, 61, 198, 1)",
  },
];

export const Dashboard = () => {
  const datatemp1 = {
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
  const datatemp2 = {
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
  const [todaybooking, setTodaybooking] = React.useState(0);
  const [todayround, setTodayround] = React.useState(0);
  const [lastweekbooking, setLastweekbooking] = React.useState(0);
  const [dataset, setDataset] = React.useState(datatemp1);
  const [dataset2, setDataset2] = React.useState(datatemp2);
  const chart1 = React.createRef();
  const chart2 = React.createRef();
  useEffect(() => {
    GetAdminDashboardService()
      .then((res) => {
        setTodaybooking(res.data.booking);
        setTodayround(res.data.round);
        setLastweekbooking(res.data.lastweek_booking);
      })
      .catch((err) => {});
  }, []);
  useEffect(() => {
    GetAdminDashboardGraphService()
      .then((res) => {
        // use this data to set the graph
        let data = {
          labels: [],
          datasets: [
            {
              data: [],
              backgroundColor: [],
              borderColor: [],
              borderWidth: 1,
            },
          ],
        };
        let data2 = {
          labels: [],
          datasets: [
            {
              data: [],
              backgroundColor: [],
              borderColor: [],
              borderWidth: 1,
            },
          ],
        };

        let today_graph = res.data.today;
        let lastweek_graph = res.data.lastweek;
        // use today_graph to set the graph by for loop
        today_graph.map((item, index) => {
          data.labels.push(item.round_name);
          data.datasets[0].data.push(item.booking_count);
          data.datasets[0].backgroundColor.push(color[index % 9].bg);
          data.datasets[0].borderColor.push(color[index % 9].border);
        });
        lastweek_graph.map((item, index) => {
          data2.labels.push(item.date);
          data2.datasets[0].data.push(item.booking_count);
          data2.datasets[0].backgroundColor.push(color[index % 9].bg);
          data2.datasets[0].borderColor.push(color[index % 9].border);
        });
        setDataset(data);
        setDataset2(data2);
      })
      .catch((err) => {});
  }, []);

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
              titleTypographyProps={{ variant: "h6" }}
              avatar={<NaturePeopleIcon />}
            />
            <CardContent>
              <Typography variant="h6" color="gray">
                {todaybooking}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card>
            <CardHeader
              title="จำนวนรอบการเดินรถในวันนี้"
              titleTypographyProps={{ variant: "h6" }}
              avatar={<DirectionsBusIcon />}
            />
            <CardContent>
              <Typography variant="h6" color="gray">
                {todayround}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card>
            <CardHeader
              title="ยอดผู้เดินทางในสัปดาห์นี้"
              titleTypographyProps={{ variant: "h6" }}
              avatar={<DateRangeIcon />}
            />
            <CardContent>
              <Typography variant="h6" color="gray">
                {lastweekbooking}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title="ผู้เดินทางในแต่ละรอบของวันนี้" />
            <CardContent>
              <Pie data={dataset} redraw={true} ref={chart1} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title="ผู้เดินทางในแต่ละวันของสัปดาห์" />
            <CardContent>
              <Pie data={dataset2} redraw={true} ref={chart2} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;

// Copilot help me update Pie chart data
// Using react-chartjs-2
// Data is from API
// I want to update data On Load
// But it's not working
// I don't know why
// Please help me
