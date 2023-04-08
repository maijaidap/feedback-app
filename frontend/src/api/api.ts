import axios from "axios";

const BASE_URL = "http://localhost:8090";

export const getUsers = () => {
  return axios.get(`${BASE_URL}/users`);
};

export const login = (username: string, password: string) => {
  return axios.post(`${BASE_URL}/login`, {
    name: username,
    password: password,
    role: "",
  });
};

export const createUser = (
  id: number,
  username: string,
  password: string,
  role: string
) => {
  return axios.post(`${BASE_URL}/users`, { id, username, password, role });
};
