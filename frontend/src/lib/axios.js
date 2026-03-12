import axios from "axios"
export const axiosInstance=axios.create({
    baseURL: "HTTP://localhose:5001/api",
    withCredentials: true,
})