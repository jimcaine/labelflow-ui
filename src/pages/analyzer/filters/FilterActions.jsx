import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../../store/analyzerSlice';

export default function FilterActions({ filterId }) {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.analyzer.data.filters);

  const handleRemoveFilter = () => {
    const newFilters = [...filters.slice(0, filterId), ...filters.slice(filterId+1)];
    dispatch(setFilters(newFilters));
  }

  return (
    <div>
      <RemoveCircleIcon
        sx={{color: "red"}}
        onClick={() => handleRemoveFilter() } />
    </div>
  )
}