import { useSelector, useDispatch } from 'react-redux';
import { setDataSource } from '../../../store/analyzerSlice';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function AnalyzerScope() {

  const dispatch = useDispatch();
  const analyzerSlice = useSelector((state) => state.analyzer);
  const dataSources = analyzerSlice.data.dataSources;
  const dataSource = analyzerSlice.data.dataSource;

  const handleDataSourceChange = (e) => {
    console.log(e.target.value);
    dispatch(setDataSource(e.target.value));
  };

  if (analyzerSlice === 'pending') {
    return (
      <h1>Loading</h1>
    )
  } else {
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="data_source_nm">Data Source</InputLabel>
          <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={dataSource.id}
              label="Data Source"
              onChange={ (e) => handleDataSourceChange(e) }
            >
            {dataSources.map((dataSource) => {
              return (
                <MenuItem key={dataSource.id} value={dataSource.id}>{dataSource.datasource_nm}</MenuItem>
              )
            })}
            {/* <MenuItem value="bbc">BBC</MenuItem>
            <MenuItem value="bloomberg">Bloomberg</MenuItem>
            <MenuItem value="reuters">Reuters</MenuItem> */}
          </Select>
        </FormControl>
      </Box>
    )
  }
}