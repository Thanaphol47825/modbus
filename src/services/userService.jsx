import axios from "axios";

const API_URL = "https://api.modbus.sleepyboi.space/api/";

// const API_URL = "http://localhost:8080/api/";

const header = {
  "Content-Type": "application/json",
  "access-token": localStorage.getItem("accessToken"),
};

export async function GetRoute(location_start, location_end) {
  return axios.get(
    API_URL + "get/round/" + location_start + "/" + location_end,
    {}
  );
}

export async function BookingService(round_id) {
  console.log(header);
  return axios.post(API_URL + "booking/" + round_id, {}, { headers: header });
}

export async function GetAllBusService() {
  return axios.get(API_URL + "get/bus", {});
}

export async function AddRoundService(
  bus_id,
  location_start,
  location_end,
  date
) {
  return axios.post(
    API_URL + "create/round",
    {
      bus_id: bus_id,
      location_start: location_start,
      location_end: location_end,
      date: date,
    },
    { headers: header }
  );
}

export async function GetTodayRoundService() {
  return axios.get(API_URL + "get/round/today", {});
}

export async function GetBookingService() {
  return axios.get(API_URL + "get/booking", {headers: header});
}

// CancelBookingService
export async function CancelBookingService(booking_id) {
  return axios.post(API_URL + "cancel/booking/" + booking_id, {}, {headers: header})
}


// admin service 

export async function GetAdminDashboardService() {
  return axios.get(API_URL + "get/admin/dashboard", {headers: header})
}

export async function GetAdminDashboardGraphService() {
  return axios.get(API_URL + "get/admin/dashboard/graph", {headers: header})
}
