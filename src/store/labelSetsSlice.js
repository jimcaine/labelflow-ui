import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiamltYm9zbGljZSIsImlzX2FkbWluIjp0cnVlfQ.ZNsON5eQR1UcfOMhQ03LAB-86SxclzPhtQY-YoOQog0'

const initialState = {
  data: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const getLabelSets = createAsyncThunk('/labelsets', async () => {
  const url = 'http://localhost:8000/labelset';
  const response = await axios.get(url, {
    headers: {"LFML-API-KEY": token},
  });
  return response.data;
});

export const deleteLabelSet = createAsyncThunk('/labelset/delete', async (id) => {
  const url = 'http://localhost:8000/labelset/' + id;
  const response = await axios.delete(url, {
    headers: {"LFML-API-KEY": token},
  });
  return {id, ...response.data}
});

const labelSetsSlice = createSlice({
  name: 'labelsets',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getLabelSets.pending, (state) => {
        state.status ='loading';
      })
      .addCase(getLabelSets.fulfilled, (state, action) => {
        const success = action.payload.success;
        const data = action.payload.data;
        state.data = data;
      })
      .addCase(getLabelSets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteLabelSet.fulfilled, (state, action) => {
        const labelsetId = action.payload.id;
        state.data = state.data.filter((d => d.id !== labelsetId))
      })
  }
});

export default labelSetsSlice.reducer;