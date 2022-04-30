import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../../store/analyzerSlice';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FilterField from './FilterField';
import FilterOperator from './FilterOperator';
import FilterValue from './FilterValue';
import FilterActions from './FilterActions';


export default function AnalyzerFilters() {

  const dispatch = useDispatch();
  const filters = useSelector((state) => state.analyzer.data.filters);
  const dataSource = useSelector((state) => state.analyzer.data.dataSource);
  const dataSourceFields = dataSource.fields;

  const handleAddFilter = () => {
    const filter = {
      field: dataSourceFields[0].field_nm,
      operator: 'contains',
      vl: ''
    };
    dispatch(setFilters([...filters, filter]));
  };


  const handleAddRules = () => {
    console.log('Adding rules', filters);
  }

  return (
    <div>
      <Button onClick={() => handleAddFilter() }>Add Filter</Button>
      <Button onClick={() => handleAddRules() }>Add To Char Rules</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650}} aria-label="filter table">
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell>Operator</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {filters.map((filter, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                <FilterField filterId={index} />
              </TableCell>
              <TableCell>
                <FilterOperator filterId={index} />
              </TableCell>
              <TableCell>
                <FilterValue filterId={index} />
              </TableCell>
              <TableCell>
                <FilterActions filterId={index} />
              </TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table> 
      </TableContainer>
    </div>
  )
}