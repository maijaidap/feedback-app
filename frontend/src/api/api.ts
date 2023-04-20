import axios from "axios";
import itemsMock from "./itemsMock.json";
import reviewsMock from "./reviewsMock.json";

const BASE_URL = "http://localhost:8090";

interface Item {
  id: string;
  name: string;
  avgGrade: string;
  reviewsDone: string;
}

interface Review {
  id: string;
  grade: string;
  review: string;
  date: string;
}

export const setToken = (token: string) => {
    localStorage.setItem("token", token);
};

export const login = (username: string, password: string) => {
  return axios.post(`${BASE_URL}/login`, {
    name: username,
    password: password,
    role: "",
  });
};

export const register = (username: string, password: string) => {
  return axios.post(`${BASE_URL}/register`, {
    name: username,
    password: password,
    role: "",
  });
};

export const logout = (username: string) => {
  return axios.post(`${BASE_URL}/logout`, {
    name: username,
  });
};

export const getItems = () => {
  // return axios.get(`${BASE_URL}/items`, {});
  return new Promise<Item[]>((resolve) => {
    setTimeout(() => {
      resolve(itemsMock);
    }, 500);
  });
};

export const getItem = () => {
  return axios.get(`${BASE_URL}/item`, {});
};

export const getReviews = () => {
  //return axios.post(`${BASE_URL}/items/{id}/reviews`, {});
  return new Promise<Review[]>((resolve) => {
    setTimeout(() => {
      resolve(reviewsMock);
    }, 500);
  });
};

export const addReview = (grade: number, review: string) => {
  /**return axios.post(`${BASE_URL}/items/item{id}/add-review`, {
    grade: number,
    review: string,
  });**/
};
