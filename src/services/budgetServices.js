import instance from "./instance";

const budgetServices = {
  getAllBudget: async () => {
    const response = await instance.get("/budgets");
    return response.data;
  },
  getBudget: async (id) => {
    return await instance.get(`/budgets/${id}`);
  },
  addBudget: async (data) => {
    return await instance.post(`/budgets`, data);
  },
  updateBudget: async (id, data) => {
    return await instance.put(`/budgets/${id}`, data);
  },
  deleteBudget: async (id) => {
    return await instance.delete(`/budgets/${id}`);
  },
};

export default budgetServices;
