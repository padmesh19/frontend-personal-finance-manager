import instance from "./instance";

const authServices = {
  register: async (data) => {
    const response = await instance.post("/auth/register", data);
    return response;
  },
  login: async (data) => {
    return await instance.post("/auth/login", data);
  },
  logout: async () => {
    return await instance.get("/auth/logout");
  },
  me: async () => {
    return await instance.get("/auth/user");
  },
};

export default authServices;