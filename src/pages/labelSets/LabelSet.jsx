// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch} from 'react-redux';
// // import { getDataSources, deleteDataSource } from '../store/labelsSlice';

// import Typography from "@mui/material/Typography";
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import Link from '@mui/material/Link';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { makeStyles } from '@mui/styles';

// // import { deleteDataSource } from '../api';

// const useStyles = makeStyles((theme) => (
//   {
//     title: {
//       fontWeight: 500,
//       paddingBottom: "20px",
//     },
//   }
// ));

// export default function Data() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const classes = useStyles();
//   const dataSources = useSelector((state) => state.dataSources.data);

//   const handleDeleteDataSource = (dataSourceId) => {
//     dispatch(deleteDataSource(dataSourceId));
//   };

//   useEffect(() => {
//     dispatch(getDataSources())
//   }, []);

//   return (
//     <div>
//       <Typography variant="h3">
//         <Box className={classes.title}>Data Sources</Box>
//       </Typography>

//       <Button
//         onClick={() => { navigate("/data/create") }}>Add Data Source</Button>

//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell>Data Source Name</TableCell>
//               <TableCell>Entity ID</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//           {dataSources.map((row) => (
//             <TableRow
//               key={row.id}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 <Link
//                   href="#"
//                   component="button"
//                   onClick={() => navigate("/data/" + row.id)}>{row.datasource_nm}</Link>
//               </TableCell>
//               <TableCell component="th" scope="row">
//                 {row.entity_id}
//               </TableCell>
//               <TableCell component="th" scope="row">
//                 <DeleteIcon
//                   onClick={() => handleDeleteDataSource(row.id)} />
//               </TableCell>
//             </TableRow>
//           ))}
//           </TableBody>
//         </Table>
//     </TableContainer>

//     </div>
//   )
// }