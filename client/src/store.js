import { configureStore } from '@reduxjs/toolkit';
import { UserSlice } from 'feature/user/UserSlice';
export default configureStore({
  reducer: {
    user: UserSlice.reducer,
  },
});