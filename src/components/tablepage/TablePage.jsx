import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

import CellLink from './CellLink';
import CellActions from './CellActions';


const useStyles = makeStyles((theme) => (
  {
    title: {
      fontWeight: 500,
      paddingBottom: "20px",
    },
  }
));

export default function TablePage(props) {
  // unpack props
  const titleName = props.titleName;
  const entityName = props.entityName;
  const endpoint = props.endpoint;
  const columns = props.columns;
  const data = props.data;
  const deleteRecord = props.deleteRecord;

  // use navigate on button clicks
  const navigate = useNavigate();

  // render css classes
  const classes = useStyles();

  // methods
  const renderRowCell = (col, row, index) => {
    if (col.type === 'link') {
      const val = row[col.dataSelector];
      const navigatePath = endpoint + row[col.params.linkPathSelector];
      return (
        <TableCell key={index} component="th" scope="row">
          <CellLink val={val} navigatePath={navigatePath} />
        </TableCell>
      )
      } else if (col.type === 'text') {
        const val = row[col.dataSelector];
        return (
          <TableCell key={index} component="th" scope="row">
            {val}
          </TableCell>
        )
      } else {
        const rowId = row.id;
        return (
          <TableCell key={index} component="th" scope="row">
            <CellActions deleteRow={() => handleDelete(rowId)} />
          </TableCell>
        )
      }
  };

  const handleDelete = (id) => {
    console.log('Deleting ', id);
    deleteRecord(id);
  };

  // return
  return (
    <div>
      <Typography variant="h1">
        <Box className={classes.title}>{titleName}</Box>
      </Typography>
      <hr/>

      <Button
        onClick={() => { navigate(endpoint + 'create') }}>Add {entityName}</Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">

          {/* render table header */}
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                return (
                  <TableCell key={column.nm}>{column.nm}</TableCell>
                )
              })}
            </TableRow>
          </TableHead>

          {/* render table rows */}
          <TableBody>
          {data.map((row) => {
            return (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {columns.map((col, index) => renderRowCell(col, row, index))}
              </TableRow>
            )
          })}
          </TableBody>
        </Table>
    </TableContainer>

    </div>
  )
  
}