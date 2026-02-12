import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const register = async (data: any) => {
    return axios.post(`${API}/register`, data);
};

export const login = async (data: any) => {
    const res = await axios.post(`${API}/login`, data);
    localStorage.setItem("token", res.data.token);
    return res.data;
};
