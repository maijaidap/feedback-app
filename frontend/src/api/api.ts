import axios from "axios";

const BASE_URL = "http://localhost:8090";

export const login = (username: string, password: string) => {
  return axios.post(`${BASE_URL}/login`, {
    name: username,
    password: password,
    role: "",
  });
};

export const createUser = (username: string, password: string) => {
  return axios.post(`${BASE_URL}/register`, {
    name: username,
    password: password,
    role: "",
  });
};
