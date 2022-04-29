import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import dataSourcesReducer from './dataSourcesSlice';
import labelSetsReducer from './labelSetsSlice';
import analyzerReducer from './analyzerSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    dataSources: dataSourcesReducer,
    labelSets: labelSetsReducer,
    analyzer: analyzerReducer,
  },
});

export default store;