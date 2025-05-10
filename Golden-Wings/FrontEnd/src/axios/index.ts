// Golden-Wings/FrontEnd/src/axios/index.ts
import axios from "axios";

const instance = axios.create({
  // Use environment variable, which will be injected during the Docker build.
  // The fallback is useful if you run 'npm start' locally without this var set.
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:4000/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
