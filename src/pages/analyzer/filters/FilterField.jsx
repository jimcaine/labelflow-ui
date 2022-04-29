import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../../store/analyzerSlice';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function FilterField({ filterId }) {

  const dispatch = useDispatch();
  const filters = useSelector((state) => state.analyzer.data.filters);
  const dataSource = useSelector((state) => state.analyzer.data.dataSource);
  const filter = filters[filterId];
  const dataSourceFields = dataSource.fields;

  const handleChange = (e) => {
    const field = e.target.value;
    const filter = filters[filterId];
    const newFilter = {...filter, 'field': field};
    const newFilters = [...filters.slice(0, filterId), newFilter, ...filters.slice(filterId+1)]
    dispatch(setFilters(newFilters));
  };

  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={filter.field}
      label="filterField"
      onChange={(e) => handleChange(e) } >
    {dataSourceFields.map((f) => (
      <MenuItem key={f} value={f}>{f}</MenuItem>
    ))}
    </Select>
  )
}