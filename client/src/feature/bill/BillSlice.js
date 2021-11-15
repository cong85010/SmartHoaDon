import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getToken } from "components/AppMain";

export const sendBill = createAsyncThunk("sendBill", async (file, thunkAPI) => {
  try {
    let formData = new FormData();
    formData.append("image", file);
    const response = await fetch("http://localhost:3001/api/bill/store", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "auth-token": getToken(),
      },
      body: formData,
    });
    let data = await response.json();
    if (data.status === true) {
      return { ...data.bill };
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (error) {
    console.log("Error", error.response.data);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
export const updateBill = createAsyncThunk(
  "updateBill",
  async (bill, thunkAPI) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/bill/edit/61894f8776aa80178459571a",
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "auth-token": getToken(),
          },
          body: JSON.stringify({ bill }),
        }
      );
      let data = await response.json();
      if (data.status === true) {
        return {
          ...data,
          // firstName: firstName,
          // lastName: lastName,
          // email: email,
        };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
export const BillSlice = createSlice({
  name: "bill",
  initialState: {
    id: "",
    total: 0,
    address: "",
    dateTime: "",
    imageKey: "",
    owner: "",
    items: [],
    createdAt: "",
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
    [sendBill.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.isFetching = false;
      state.isSuccess = true;
      state.id = payload.id;
      state.total = payload.total;
      state.address = payload.address;
      state.dateTime = payload.dateTime;
      state.imageKey = payload.imageKey;
      state.owner = payload.owner;
      state.items = payload.items;
      state.createdAt = payload.createdAt;
      return state;
    },
    [sendBill.rejected]: (state, { payload }) => {
      console.log(payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.error;
    },
    [sendBill.pending]: (state) => {
      state.isFetching = true;
    },
    [updateBill.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.isFetching = false;
      state.isSuccess = true;
      // state.id = payload.id;
      // state.total = payload.total;
      // state.address = payload.address;
      // state.dateTime = payload.dateTime;
      // state.imageKey = payload.imageKey;
      // state.owner = payload.owner;
      // state.items = payload.items;
      // state.createdAt = payload.createdAt;
      return state;
    },
    [updateBill.rejected]: (state, { payload }) => {
      console.log(payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.error;
    },
    [updateBill.pending]: (state) => {
      state.isFetching = true;
    },
  },
});
export const billSelector = (state) => state.bill;
export const { clearState } = BillSlice.actions;
