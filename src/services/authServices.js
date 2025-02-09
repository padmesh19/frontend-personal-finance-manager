import instance from "./instance";

const authServices = {
  register: async (data) => {
    const createCategory = await instance.post("/categories/create");
    return await instance.post("/auth/register", data);
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