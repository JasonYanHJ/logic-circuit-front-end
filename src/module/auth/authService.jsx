import { request, requestUrlEncoded } from "../../service/request";

export async function login(username, password) {
  return requestUrlEncoded("POST", "/api/v1/users/login", {
    password,
    username,
  }).then((res) => {
    localStorage.setItem("access_token", res.access_token);
    return res;
  });
}

export async function register(username, password) {
  return request("POST", "/api/v1/users/signup", { username, password });
}

export async function logout() {
  return request("POST", "/api/v1/users/logout");
}

export async function getAuthUser() {
  return request("GET", "/api/v1/users/me");
}
