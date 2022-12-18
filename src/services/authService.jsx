import axios from "axios";
require("dotenv").config();

const API_URL = process.env.API_URL;

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
