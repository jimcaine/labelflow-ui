import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

function OperatorDropDown({ filterId, filters, setFilters }) {
  const handleChange = (e) => {
    const filter = filters[filterId]
    const newFilter = {...filter, 'operator': e.target.value}
    setFilters([...filters.slice(0, filterId), newFilter, ...filters.slice(filterId+1)])
  };

  const filter = filters[filterId];

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

function FilterVl({ filterId, filters, setFilters}) {
  const dataSource = useSelector((state) => state.analyzer.data.dataSource);
  const filter = filters[filterId];
  const filterOperator = filter.operator;

  const handleChange = (e) => {
    const filter = filters[filterId];
    const newFilter = {...filter, 'vl': e.target.value};
    setFilters([...filters.slice(0, filterId), newFilter, ...filters.slice(filterId+1)])
  };

  if (filterOperator === "=") {
    const filterVls = ["sports", "entertainment"]
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

function FieldDropDown({ filterId, filters, setFilters }) {

  const filter = filters[filterId];
  const dataSource = useSelector((state) => state.analyzer.data.dataSource);
  const dataSourceFields = dataSource.fields;

  const handleChange = (e) => {
    const field = e.target.value;
    const filter = filters[filterId];
    const newFilter = {...filter, 'field': field};

    setFilters([...filters.slice(0, filterId), newFilter, ...filters.slice(filterId+1)])
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

export default function AnalyzerFilters({ filters, setFilters }) {

  const dataSource = useSelector((state) => state.analyzer.data.dataSource);

  const handleAddFilter = () => {
    const filter = {
      field: 'Category',
      operator: '=',
      vl: 'sports'
    };
    setFilters([...filters, filter]);
  };

  const handleRemoveFilter = (filterId) => {
    setFilters([...filters.slice(0, filterId), ...filters.slice(filterId+1)]);
  };

  const handleAddRules = () => {
    console.log(filters);
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
                <FieldDropDown filterId={index} filters={filters} setFilters={setFilters} />
              </TableCell>
              <TableCell>
                <OperatorDropDown filterId={index} filters={filters} setFilters={setFilters} />
              </TableCell>
              <TableCell>
                <FilterVl filterId={index} filters={filters} setFilters={setFilters} />
              </TableCell>
              <TableCell>
                <RemoveCircleIcon
                  sx={{color: "red"}}
                  onClick={() => handleRemoveFilter(index) } />
              </TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table> 
      </TableContainer>
    </div>
  )
}