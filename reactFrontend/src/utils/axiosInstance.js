import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        console.log("Unauthorized! Redirecting to login...");
      } else if (status === 500) {
        console.log("Server error! Try again later.");
      } else if (status === 403) {
        console.log("Forbidden! You don't have permission.");
      }
    } else {
      console.log("Network error or server not responding.");
    }
    return Promise.reject(error);
  }
);

  export default axiosInstance;