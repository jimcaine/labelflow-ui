import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  userName: 'jimboslice',
  isAuth: false,
  isAdmin: true,
  token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiamltYm9zbGljZSIsImlzX2FkbWluIjp0cnVlfQ.ZNsON5eQR1UcfOMhQ03LAB-86SxclzPhtQY-YoOQog0',
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// const initialState = {
//   userName: '',
//   isAuth: false,
//   isAdmin: false,
//   token: '',
//   status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
//   error: null,
// };

export const fetchAuth = createAsyncThunk('user/authorize', async (token) => {
    const response = await axios.get('http://localhost:8000/authorize', {
      headers: {"LFML-API-KEY": token},
    });
    return response.data;
});


const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAuth.pending, (state, action) => {
        state.status ='loading';
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        const success = action.payload.success;
        if (success === true) {
          state.userName = action.payload.data.user;
          state.isAdmin = action.payload.data.is_admin;
          state.isAuth = true;
          state.token = action.payload.data.token;
        } else {
          console.log('Fulfilled but not success!');
        }
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
});

export default userSlice.reducer;