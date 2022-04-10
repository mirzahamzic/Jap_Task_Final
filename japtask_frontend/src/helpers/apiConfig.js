import axios from "axios";

const fetchClient = () => {
  const defaultOptions = {
    baseURL: "https://localhost:5001",
    headers: {
      "Content-Type": "application/json",
    },
  };
  // Create instance
  let instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user ? user.data : "";

    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });

  return instance;
};

export default fetchClient();
