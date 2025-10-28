import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: localStorage.getItem('userId') || null,
  userName: localStorage.getItem('userName') || null,
  role: localStorage.getItem('userRole') || null,
  isAuthenticated: !!localStorage.getItem('userId'),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      state.role = action.payload.role;
      state.isAuthenticated = true;
    },
    clearUserInfo: (state) => {
      state.userId = null;
      state.userName = null;
      state.role = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;