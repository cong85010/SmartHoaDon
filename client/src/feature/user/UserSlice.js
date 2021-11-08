import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const signupUser = createAsyncThunk(
  "register",
  async ({ firstName, lastName, email, password }, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3001/api/account/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });
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
export const loginUser = createAsyncThunk(
  "login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3001/api/account/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      let data = await response.json();
      console.log(data);

      if (response.status === 200) {
        localStorage.setItem("token", data.auth_token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
export const fetchUserByToken = createAsyncThunk(
  "fetchUserByToken",
  async ({ auth_token }, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3001/api/me/infomation", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": auth_token,
        },
      });
      const data = await response.json();

      if (response.status === 200) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      console.log("Error", error.response.data);
      thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const UserSlice = createSlice({
  name: "user",
  initialState: {
    firstName: "",
    lastName: "",
    email: "",
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
    [signupUser.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.isFetching = false;
      state.isSuccess = payload.status;
      // state.email = payload.email;
      // state.firstName = payload.firstName;
      // state.lastName = payload.lastName;
    },
    [signupUser.pending]: (state) => {
      state.isFetching = true;
    },
    [signupUser.rejected]: (state, { payload }) => {
      console.log("Fail");
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.error;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.email = payload.email;
      state.username = payload.name;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
      console.log("payload", payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.error;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchUserByToken.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;

      state.email = payload.email;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
    },
    [fetchUserByToken.rejected]: (state) => {
      console.log("Fail token");
      state.isFetching = false;
      state.isError = true;
    },
    [fetchUserByToken.pending]: (state) => {
      state.isFetching = true;
    },
  },
});

export const userSelector = (state) => state.user;
export const { clearState } = UserSlice.actions;
