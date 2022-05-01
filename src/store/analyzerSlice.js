import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = 'http://localhost:8000/'
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiamltYm9zbGljZSIsImlzX2FkbWluIjp0cnVlfQ.ZNsON5eQR1UcfOMhQ03LAB-86SxclzPhtQY-YoOQog0'
const headers = { headers: {"LFML-API-KEY": token}}

const initialState = {
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  data: {
    data: {
      rows: [],
      cols: [],
    },
    filters: [],
    selectedItems: [],
    dataSources: [
      {
        id: "bbc",
        datasource_nm: "BBC",
        entity_id: "ArticleId",
        fields: [
          {
            "field_nm": "Category",
            "type": "categorical",
            "vls": ["sport", "tech", "business", "politics", "entertainment"]
          },
          {
            "field_nm": "Text",
            "type": "text"
          },
        ]
      }
    ],
    dataSource: {
      id: "bbc",
      fields: [
        {
          "field_nm": "Category",
          "type": "categorical",
          "vls": ["sport", "tech", "business", "politics", "entertainment"]
        },
        {
          "field_nm": "Text",
          "type": "text"
        },        
      ]
    }
  },
  error: null,
};

export const getAnalyzerData = createAsyncThunk('analyzer/data/get', async (state) => {
  console.log('state', state);
  const dataSourceId = state.data.dataSource.id;
  const filters = state.data.filters;
  const endpoint = 'extract';
  const url = baseUrl + endpoint;
  const payload = {
    data_source_nm: dataSourceId,
    filters: filters,
    nrows: 10,
  };
  console.log('getAnalyzerData payload', payload);
  const response = await axios.post(url, payload, headers);
  return response.data;
});

export const setDataSource = createAsyncThunk('analyzer/dataSource', async (dataSourceId) => {
  const endpoint = 'datasource/' + dataSourceId;
  const url = baseUrl + endpoint;
  const response = await axios.get(url, headers);
  return response.data;
});

export const setDataSources = createAsyncThunk('analyzer/dataSources', async () => {
  const endpoint = 'datasource'
  const url = baseUrl + endpoint;
  const response = await axios.get(url, headers);
  return response.data;
});

const analyzerSlice = createSlice({
  name: 'analyzer',
  initialState: initialState,
  reducers: {
    setFilters(state, action) {
      state.data.filters = action.payload;
    },
    setSelectedItems(state, action) {
      state.data.selectedItems = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getAnalyzerData.pending, (state) => {
        console.log('loading analyzer data')
        state.status ='loading';
      })
      .addCase(getAnalyzerData.fulfilled, (state, action) => {
        const success = action.payload.success;
        const data = action.payload.data;
        const dataRows = data.rows;
        const dataColumns = data.cols;

        state.data.data = {
          'rows': dataRows,
          'cols': dataColumns,
        }
        state.status = 'idle';
      })
      .addCase(getAnalyzerData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(setDataSource.pending, (state) => {
        console.log('loading data source')
        state.status = 'loading'
      })
      .addCase(setDataSource.fulfilled, (state, action) => {
        state.data.filters = [];
        state.data.data = {cols: [], rows: []}
        state.data.dataSource = action.payload.data;
        console.log('set data source fulfilled')
        state.status = 'idle';
      })
      .addCase(setDataSources.pending, (state) => {
        console.log('loading data sources')
        state.status = 'loading';
      })
      .addCase(setDataSources.fulfilled, (state, action) => {
        state.data.dataSources = action.payload.data;
        state.status = 'idle';
        console.log('load data sources fulfilled')
      })
  }
});

export const { setFilters, setSelectedItems } = analyzerSlice.actions;

export default analyzerSlice.reducer;