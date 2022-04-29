import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


export default function AnalyzerScope({ scope, setScope }) {

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="data_source_nm">Data Source</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={scope.dataSourceId}
            label="Age"
            onChange={(e) => setScope({...scope, dataSourceId: e.target.value})}
          >
          <MenuItem value="bbc">BBC</MenuItem>
          <MenuItem value="bloomberg">Bloomberg</MenuItem>
          <MenuItem value="reuters">Reuters</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}