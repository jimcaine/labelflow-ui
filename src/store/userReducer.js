import { createSlice } from '@reduxjs/toolkit';

const userInitState = {
  isAuth: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitState,
  reducers: {
    authUser: (state, action) => {
      if (action.payload.token == 'test') {
        state.isAuth = true;
      } else {
        state.isAuth = false;
      }
    },
    unauthUser: (state) => {
      state.isAuth = false;
    }
  }
});

export const { authUser, unauthUser } = userSlice.actions;
export default userSlice.reducer;
