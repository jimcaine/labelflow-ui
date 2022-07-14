import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = 'http://localhost:8000/'
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiamltYm9zbGljZSIsImlzX2FkbWluIjp0cnVlfQ.ZNsON5eQR1UcfOMhQ03LAB-86SxclzPhtQY-YoOQog0'
const headers = { headers: {"LFML-API-KEY": token}}

const initialState = {
  data: {
    id: 'bbc',
    datasource_nm: 'bbc',
    entity_id: 'ArticleId',
    fields: [],
  },
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const getDataSource = createAsyncThunk('/datasource', async (dataSourceId) => {
  const endpoint = 'datasource/' + dataSourceId;
  const url = baseUrl + endpoint;
  const response = await axios.get(url, headers);
  return response.data;
});

const dataSourceSlice = createSlice({
  name: 'dataSource',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getDataSource.pending, (state) => {
        state.status ='loading';
      })
      .addCase(getDataSource.fulfilled, (state, action) => {
        const success = action.payload.success;
        const data = action.payload.data;
        state.data = data;
        state.status = 'idle'
      })
      .addCase(getDataSource.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
});

export default dataSourceSlice.reducer;