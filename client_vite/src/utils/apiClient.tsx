import axios from "axios";
import { getSessionStorage, setSessionStorage } from "./storage";

const apiClient = axios.create();

apiClient.interceptors.request.use((req) => {
  const access = getSessionStorage("access", null);

  req.headers["x-access-token"] = access;

  return req;
});

apiClient.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    if (err.response.status === 401 && err.response.data.refresh) {
      try {
        const refreshRequest = await axios.post("/api/refresh");
        const { access } = refreshRequest.data;

        setSessionStorage("access", access);
        console.log("refreshing access token...");

        return apiClient(err.response.config);

      } catch (e) {
        return e;
      }
    }

    return Promise.reject(err);
  }
);

export default apiClient;
