import axios from "axios";
import reviewsMock from "./reviewsMock.json";

const BASE_URL = "http://localhost:8090";

interface Review {
    id: string;
    grade: string;
    written_review: string;
    date_written: string;
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

export const logout = (token: string) => {
    return axios.post(`${BASE_URL}/logout`, "", {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const getItems = (token: string) => {
    return axios.get(`${BASE_URL}/getItems`);
};

export const getItem = () => {
    return axios.get(`${BASE_URL}/getItem`, {});
};

export const getItemName = (itemId: string) => {
    return axios.post(`${BASE_URL}/getItemName`, {
        itemId: itemId,
    });
};

export const getReviews = (itemId: string) => {
    return axios.post(`${BASE_URL}/getReviews`, {
        itemId: itemId,
    });
};

export const addReview = (
    token: string,
    grade: string,
    writtenReview: string,
    itemId: number
) => {
    return axios.post(
        `${BASE_URL}/items/${itemId}/add-review`,
        {
            grade: grade,
            writtenReview: writtenReview,
            itemId: itemId,
        },
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
};
