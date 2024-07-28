import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: { currentUser: null, isFetching: false, error: false },
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.currentUser = action.payload;
    },
    logout: (state) => {
      state = initialState;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
