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

export const getAnalyzerData = createAsyncThunk('analyzer/data/get', async () => {
  const endpoint = 'extract';
  const url = baseUrl + endpoint;
  const payload = {
    data_source_nm: "bbc",
    nrows: 10
  };
  const response = await axios.post(url, payload, headers);
  return response.data;
});

// export const setFilters = createAsyncThunk('analyzer/filters', async (filters) => {
//   return filters;
// });

const analyzerSlice = createSlice({
  name: 'analyzer',
  initialState: initialState,
  reducers: {
    setFilters(state, action) {
      state.data.filters = action.payload;
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

export const { setFilters } = analyzerSlice.actions;

export default analyzerSlice.reducer;