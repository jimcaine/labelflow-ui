import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = 'http://localhost:8000/'
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiamltYm9zbGljZSIsImlzX2FkbWluIjp0cnVlfQ.ZNsON5eQR1UcfOMhQ03LAB-86SxclzPhtQY-YoOQog0'
const headers = { headers: {"LFML-API-KEY": token}}

const initialState = {
  data: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const getDataSources = createAsyncThunk('/datasources', async () => {
  const endpoint = 'datasources';
  const url = baseUrl + endpoint;
  const response = await axios.get(url, headers);
  return response.data;
});

export const deleteDataSource = createAsyncThunk('/datasource/delete', async (id) => {
  const endpoint = 'datasource/' + id;
  const url = baseUrl + endpoint;
  const response = await axios.delete(url, headers);
  return {id, ...response.data}
});

const dataSourcesSlice = createSlice({
  name: 'dataSources',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getDataSources.pending, (state) => {
        state.status ='loading';
      })
      .addCase(getDataSources.fulfilled, (state, action) => {
        const success = action.payload.success;
        const data = action.payload.data;
        state.data = data;
      })
      .addCase(getDataSources.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteDataSource.fulfilled, (state, action) => {
        const dataSourceId = action.payload.id;
        state.data = state.data.filter((d => d.id !== dataSourceId))
      })
  }
});

export default dataSourcesSlice.reducer;