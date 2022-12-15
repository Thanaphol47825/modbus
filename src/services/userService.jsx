import axios from "axios";

const API_URL = "https://api.modbus.sleepyboi.space/api/auth/";

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
