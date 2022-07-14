import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getDataSource } from "../../store/dataSourceSlice";
import Typography from "@mui/material/Typography";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import BarChart from '../../components/BarChart';

const FeaturesTable = ({dataSource}) => {

  console.log(dataSource);
  const dataSourceFeatures = dataSource.fields;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650}} aria-label="datasource-features-table">
        <TableHead>
          <TableRow>
            <TableCell>Feature</TableCell>
            <TableCell>Feature Type</TableCell>
            <TableCell>Cardinality</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {dataSourceFeatures.map((feature, index) => (
          <TableRow key={index}>
            <TableCell component="th" scope="row">
              {feature.field_nm}
            </TableCell>
            <TableCell>
              {feature.type}
            </TableCell>
            <TableCell>
              N/A
            </TableCell>
            <TableCell>
              <RemoveCircleIcon />
            </TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table> 
    </TableContainer>
  )
}

export default function DataSource() {

  // get dataSourceId
  const location = useLocation();
  const dataSourceId = location.pathname.split("/").slice(-1)[0];

  // store
  const dispatch = useDispatch();
  const dataSource = useSelector((state) => state.dataSource.data);
  console.log(dataSource);

  useEffect(() => {
    'getting data source from component'
    dispatch(getDataSource(dataSourceId));
    console.log(dataSource);
  }, []);

  return (
    <div>
      <Typography variant="h3">
        Data Source: {dataSourceId}
      </Typography>
      <hr />

      {/* metrics */}
      <BarChart />

      {/* features */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="datasource-features"
          id="datasource-features"
        >
          <Typography>Features</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FeaturesTable dataSource={dataSource}/>
        </AccordionDetails>
      </Accordion>

    <br /><br /><br />
    </div>
  )
}