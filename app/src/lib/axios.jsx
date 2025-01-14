import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:3000/", // Replace with your actual base URL
  });

export {axiosClient};