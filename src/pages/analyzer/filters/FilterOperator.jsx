import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../../store/analyzerSlice';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function FilterOperator({ filterId }) {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.analyzer.data.filters);
  const filter = filters[filterId];

  const handleChange = (e) => {
    const filter = filters[filterId]
    const newFilter = {...filter, 'operator': e.target.value}
    const newFilters = [...filters.slice(0, filterId), newFilter, ...filters.slice(filterId+1)]
    dispatch(setFilters(newFilters));
  };

  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={filter.operator}
      label="filterOperator"
      onChange={(e) => handleChange(e) } >
      <MenuItem value="=">EQUALS</MenuItem>
      <MenuItem value="contains">CONTAINS</MenuItem>
    </Select>
  )
};