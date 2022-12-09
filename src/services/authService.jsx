import axios from "axios";

const API_URL = "https://api.modbus.sleepyboi.space/api/auth/";

// const API_URL = "http://localhost:8080/api/auth/";

const headers = {
  "Content-Type": "application/json",
  "access-token": localStorage.getItem("access-token"),
};

export async function LoginService(username, password) {
  try {
    console.log(username, password)
    const res = await axios.post(
      API_URL + "signin",
      {
        username: username,
        password: password,
      },
      // headers
    );
    console.log(res);
    return res;
  } catch (err) {
    return [];
  }
}
