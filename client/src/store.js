import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "feature/user/UserSlice";
import { BillSlice } from "feature/bill/BillSlice";
import { StatisticalSlice } from "feature/statistical/StatisticalSlice";
export default configureStore({
  reducer: {
    user: UserSlice.reducer,
    bill: BillSlice.reducer,
    statistical: StatisticalSlice.reducer,
  },
});
