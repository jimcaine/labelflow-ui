import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = 'http://localhost:8000/'
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiamltYm9zbGljZSIsImlzX2FkbWluIjp0cnVlfQ.ZNsON5eQR1UcfOMhQ03LAB-86SxclzPhtQY-YoOQog0'
const headers = { headers: {"LFML-API-KEY": token}}

const initialState = {
  data: {
    data: [{"pending": "true"}],
    cols: [{title: "unloaded", field: "pending"}],
    filters: [],
    dataSource: {
      dataSourceNm: "bbc",
      fields: [
        "Text",
        "Category"
      ]
    }
  },
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const getAnalyzerData = createAsyncThunk('/extract', async () => {
  const endpoint = 'extract';
  const url = baseUrl + endpoint;
  const payload = {
    data_source_nm: "bbc",
    nrows: 10
  };
  const response = await axios.post(url, payload, headers);
  return response.data;
});

const analyzerSlice = createSlice({
  name: 'analyzer',
  initialState: initialState,
  reducers: {
    setFilters(state, action) {
      console.log(action);
      state.data.filters = action.payload.filters;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getAnalyzerData.pending, (state) => {
        state.status ='loading';
      })
      .addCase(getAnalyzerData.fulfilled, (state, action) => {
        const success = action.payload.success;

        const data = action.payload.data;
        const dataColumns = [
          {title:"Entity ID", field:"ArticleId"},
          {title:"Text", field:"Text"},
          {title:"Category", field:"Category"}
        ];


        // const data = [
        //   {id: 0, text: "da bears", category: "sports"},
        //   {id: 5, text: "da bulls", category: "sports"},
        // ];

        // const dataColumns = [
        //   {title:"Entity ID", field:"id"},
        //   {title:"Text", field:"text"},
        //   {title:"Category", field:"category"}
        // ];

        state.data.data = data;
        state.data.cols = dataColumns;
        state.status = 'succeeded';
      })
      .addCase(getAnalyzerData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
});

export default analyzerSlice.reducer;