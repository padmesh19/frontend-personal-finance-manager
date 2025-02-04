import budgetServices from "@/services/budgetServices";


const budgetLoader = async () => {
  try {
    const response = await budgetServices.getAllBudget();
    return response.data;
  } catch (error) {
    return null;
  }
};

export default budgetLoader;
