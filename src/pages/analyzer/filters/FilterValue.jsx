import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../../store/analyzerSlice';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

export default function FilterValue({ filterId }) {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.analyzer.data.filters);
  const dataSource = useSelector((state) => state.analyzer.data.dataSource);
  const filter = filters[filterId];
  const filterField = filter.field;
  const filterOperator = filter.operator;

  const handleChange = (e) => {
    const filter = filters[filterId];
    const newFilter = {...filter, 'vl': e.target.value};
    const newFilters = [...filters.slice(0, filterId), newFilter, ...filters.slice(filterId+1)]
    dispatch(setFilters(newFilters));
  };

  const filterVls = dataSource.fields
    .filter((ds) => ds.field_nm === filterField)[0].vls;

  if (filterOperator === "=" && filterVls !== null) {

    return (
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={filter.vl}
        label="filterField"
        onChange={(e) => handleChange(e) } >
      {filterVls.map((vl) => (
        <MenuItem key={vl} value={vl}>{vl}</MenuItem>
      ))}
      </Select>
    )
  } else if (filterOperator === 'contains') {
    return (
      <TextField
        id="filter-vl"
        variant="standard"
        onChange={(e) => handleChange(e) } />
    )
  } else {
    return (
      <TextField
        id="filter-vl"
        variant="standard"
        onChange={(e) => handleChange(e) } />
    )
  }
};