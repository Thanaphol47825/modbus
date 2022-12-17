import axios from "axios";

const API_URL = "https://api.modbus.sleepyboi.space/api/auth/";

// const API_URL = "http://localhost:8080/api/auth/";

const headers = {
  "Content-Type": "application/json",
  "access-token": localStorage.getItem("accessToken"),
};

export async function LoginService(username, password) {
  return axios.post(API_URL + "signin", {
    username: username,
    password: password,
  });
}

export async function RegisterService(
  username,
  password,
  name,
  surname,
  email,
  mobile
) {
  return axios.post(API_URL + "signup", {
    username: username,
    password: password,
    name: name,
    surname: surname,
    email: email,
    mobile: mobile,
  });
}

