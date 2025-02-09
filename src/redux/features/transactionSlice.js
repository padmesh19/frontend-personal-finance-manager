import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./api/api";
import moment from "moment";

export const fetchTransaction = createAsyncThunk(
  "/fetchTransaction",
  async () => {
    const response = await api.get("/transactions");
    return response.data;
  }
);

export const addTransaction = createAsyncThunk(
  "/addTransaction",
  async (data) => {
    const response = await api.post("/transactions", data);
    return response.data;
  }
);

export const updateTransaction = createAsyncThunk(
  "/updateTransaction",
  async ({ id, data }) => {
    const response = await api.put(`/transactions/${id}`, data);
    return response.data;
  }
);

export const deleteTransaction = createAsyncThunk(
  "/deleteTransaction",
  async (id) => {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        const { date } = action.payload;
        const transaction_date = moment(date).format("YYYY-MM-DD");
        const transaction = { ...action.payload, date: transaction_date };
        state.transactions.unshift(transaction);
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const index = state.transactions.findIndex(
          (transaction) => transaction._id === action.payload._id
        );
        if (index !== -1) state.transactions[index] = action.payload;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          (transaction) => transaction._id !== action.payload
        );
      });
  },
});

export const transactionState = (state) => state.transaction;

export default transactionSlice.reducer;
