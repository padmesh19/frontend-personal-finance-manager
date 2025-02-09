import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../features/registerSlice";
import loginReducer from "../features/loginSlice";
import userReducer from "../features/userSlice";
import budgetReducer from "../features/budgetSlice";
import categoryReducer from "../features/categorySlice"
import transactionReducer from "../features/transactionSlice"
import goalReducer from "../features/goalSlice"

const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    user: userReducer,
    budget: budgetReducer,
    category: categoryReducer,
    transaction: transactionReducer,
    goal: goalReducer
  },
});

export default store;
