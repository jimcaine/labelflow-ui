import { useSelector, useDispatch } from 'react-redux';
import { setDataSource } from '../../../store/analyzerSlice';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function AnalyzerScope() {

  const dispatch = useDispatch();
  const dataSource = useSelector((state) => state.analyzer.data.dataSource);

  const handleDataSourceChange = (e) => {
    dispatch(setDataSource(e.target.value));
  };

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
          <MenuItem value="bbc">BBC</MenuItem>
          <MenuItem value="bloomberg">Bloomberg</MenuItem>
          <MenuItem value="reuters">Reuters</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}