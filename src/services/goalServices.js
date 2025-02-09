import instance from "./instance";

const goalServices = {
  getAllGoal: async () => {
    return await instance.get("/goals");
  },
  getGoal: async (id) => {
    return await instance.get(`/goals/${id}`);
  },
  addGoal: async (data) => {
    return await instance.post(`/goals`, data);
  },
  updateGoal: async (id, data) => {
    return await instance.put(`/goals/${id}`, data);
  },
  deleteGoal: async (id) => {
    return await instance.delete(`/goals/${id}`);
  },
};

export default goalServices;
