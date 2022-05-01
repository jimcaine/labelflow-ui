import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { getLabelSets, deleteLabelSet } from '../../store/labelSetsSlice';

import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => (
  {
    title: {
      fontWeight: 500,
      paddingBottom: "20px",
    },
  }
));

export default function LabelSets() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const labelSets = useSelector((state) => state.labelSets.data);

  const handleDeleteLabelSet = (labelSetId) => {
    dispatch(deleteLabelSet(labelSetId));
  };

  useEffect(() => {
    dispatch(getLabelSets())
  }, []);

  return (
    <div>
      <Typography variant="h1">
        <Box className={classes.title}>Label Sets</Box>
      </Typography>
      <hr/>

      <Button
        onClick={() => { navigate("/labelsets/create") }}>Add Label Set</Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Label Set Name</TableCell>
              <TableCell>Label Count</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {labelSets.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Link
                  href="#"
                  component="button"
                  onClick={() => navigate("/labelsets/" + row.id)}>{row.labelset_nm}</Link>
              </TableCell>
              <TableCell component="th" scope="row">
                {row.labels.length}
              </TableCell>
              <TableCell component="th" scope="row">
                <DeleteIcon
                  onClick={() => handleDeleteLabelSet(row.id)} />
              </TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
    </TableContainer>

    </div>
  )
}