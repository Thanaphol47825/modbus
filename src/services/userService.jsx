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
      time_start: date,
    },
    { headers: header }
  );
}

export async function GetTodayRoundService() {
  return axios.get(API_URL + "get/round/today", {});
}

export async function GetBookingService() {
  return axios.get(API_URL + "get/booking", { headers: header });
}

export async function GetBusTypeService() {
  return axios.get(API_URL + "get/bus/type");
}

export async function AddBusService(bus_id, bus_type) {
  return axios.post(
    API_URL + "create/bus",
    {
      bus_type: bus_type,
      bus_id: bus_id,
    },
    { headers: header }
  );
}

// CancelBookingService
export async function CancelBookingService(booking_id) {
  return axios.post(
    API_URL + "cancel/booking/" + booking_id,
    {},
    { headers: header }
  );
}

// admin service

export async function GetAdminDashboardService() {
  return axios.get(API_URL + "get/admin/dashboard", { headers: header });
}

export async function GetAdminDashboardGraphService() {
  return axios.get(API_URL + "get/admin/dashboard/graph", { headers: header });
}

export async function GetAllUserService() {
  return axios.get(API_URL + "get/admin/user", { headers: header });
}

export async function DeleteAccount(user_id) {
  return axios.post(
    API_URL + "delete/user/" + user_id,
    {},
    { headers: header }
  );
}

export async function ChangePermission(user_id, role) {
  return axios.post(
    API_URL + "update/permission/" + user_id,
    { role: role },
    { headers: header }
  );
}

export async function GetAllRoundService() {
  return axios.get(API_URL + "get/admin/round", { headers: header });
}

export async function GetRoundBookingService(round_id){
  return axios.get(API_URL + "get/admin/round/booking/" + round_id, { headers: header });
}
