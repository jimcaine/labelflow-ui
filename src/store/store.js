import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import dataSourcesReducer from './dataSourcesSlice';
import labelSetsReducer from './labelSetsSlice';
import analyzerReducer from './analyzerSlice';
import dataSourceReduer from './dataSourceSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    dataSources: dataSourcesReducer,
    labelSets: labelSetsReducer,
    analyzer: analyzerReducer,
    dataSource: dataSourceReduer,
  },
});

export default store;