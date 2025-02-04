import instance from "./instance";

const categoryServices = {
  getAllCategory: async () => {
    return await instance.get("/categories");
  },
  getCategory: async (id) => {
    return await instance.get(`/categories/${id}`);
  },
  addCategory: async (data) => {
    return await instance.post(`/categories`, data);
  },
  updateCategory: async (id, data) => {
    return await instance.put(`/categories/${id}`, data);
  },
  deleteCategory: async (id) => {
    return await instance.delete(`/categories/${id}`);
  },
};

export default categoryServices;
