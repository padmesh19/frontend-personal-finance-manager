import instance from "./instance";

const transactionServices = {
  getAllTransaction: async () => {
    return await instance.get("/transactions");
  },
  getTransaction: async (id) => {
    return await instance.get(`/transactions/${id}`);
  },
  addTransaction: async (id, data) => {
    return await instance.post(`/transactions/${id}`, data);
  },
  updateTransaction: async (id, data) => {
    return await instance.put(`/transactions/${id}`, data);
  },
  deleteTransaction: async (id) => {
    return await instance.delete(`/transactions/${id}`);
  },
};

export default transactionServices;
