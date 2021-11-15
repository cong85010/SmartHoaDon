import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getToken } from "components/AppMain";

export const fetchStatisticalBillMoney = createAsyncThunk(
  "fetchStatisticalBillMoney",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        "http://18.140.68.161:3001/api/bill/statistical-overview",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "auth-token": getToken(),
          },
        }
      );
      let data = await response.json();
      console.log(data);
      if (data) {
        return data[0];
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      console.log("Error", error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const statisticalAvgCountMonth = createAsyncThunk(
  "statisticalAvgCountMonth",
  async (month, thunkAPI) => {
    try {
      const response = await fetch(
        `http://18.140.68.161:3001/api/bill/statistical?month=${month}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "auth-token": getToken(),
          },
        }
      );
      let data = await response.json();
      if (data) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
export const StatisticalSlice = createSlice({
  name: "statistical",
  initialState: {
    //money
    sumTotalBill: 0,
    //bill
    countBill: 0,
    //money
    sumAllTotalBill: 0,
    countAllBill: 0,
    details: [],
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
  },
  extraReducers: {
    [fetchStatisticalBillMoney.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.isFetching = false;
      state.isSuccess = true;
      state.sumTotalBill = payload.sumTotalBill;
      state.countBill = payload.countBill;
      return state;
    },
    [fetchStatisticalBillMoney.rejected]: (state, { payload }) => {
      console.log(payload);
      state.isFetching = false;
      state.isError = true;
      // state.errorMessage = payload.error;
    },
    [fetchStatisticalBillMoney.pending]: (state) => {
      state.isFetching = true;
    },
    [statisticalAvgCountMonth.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.isFetching = false;
      state.isSuccess = true;
      state.sumAllTotalBill = payload.sumAllTotalBill;
      state.countAllBill = payload.countAllBill;
      state.type = payload.type;
      state.details = payload.details;
      return state;
    },
    [statisticalAvgCountMonth.rejected]: (state, { payload }) => {
      console.log(payload);
      state.isFetching = false;
      state.isError = true;
    },
    [statisticalAvgCountMonth.pending]: (state) => {
      state.isFetching = true;
    },
  },
});
export const statisticalSelector = (state) => state.statistical;
export const { clearState } = StatisticalSlice.actions;
