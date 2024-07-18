import axios from "axios";

export const api = axios.create({
    baseURL: "localhost:1433/",
    timeout: 8000
})
