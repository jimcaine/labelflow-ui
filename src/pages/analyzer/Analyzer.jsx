import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import 'react-tabulator/lib/styles.css'; // required styles
import '../../styles/table.css'; // theme
import { ReactTabulator } from 'react-tabulator';

import { getAnalyzerData } from '../../store/analyzerSlice';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import AnalyzerScope from './AnalyzerScope';
import AnalyzerFilters from './AnalyzerFilters';

export default function Analyzer() {

  // store
  const dispatch = useDispatch();
  const data = useSelector((state) => state.analyzer.data.data);
  const dataColumns = useSelector((state) => state.analyzer.data.cols);
  const dataStatus = useSelector((state) => state.analyzer.status);

  // state
  const [scope, setScope] = useState({
    dataSourceId: "bbc",
  });

  const [filters, setFilters] = useState([]);
  const [activeLabel, setActiveLabel] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  // click events
  const handleLoadDataClick = () => {
    dispatch(getAnalyzerData());
  };

  // table handlers
  const handleRowClick = (e, row) => {
    console.log(e, row);
  }

  // form handlers
  const handleDataSourceChange = (e) => {
    console.log(e);
  }

  // iniialize page

  // components
  const TabulatorTable = ({ columns, data }) => {
    if (dataStatus === 'idle') {
      return (
        <div></div>
      )
    } else if (dataStatus === 'loading') {
      return (
        <h1>Loading data...</h1>
      )
    } else {
      let tabulatorCols = JSON.parse(JSON.stringify(columns));
      let tabulatorData = JSON.parse(JSON.stringify(data));
      return (
        <ReactTabulator
          columns={tabulatorCols}
          data={tabulatorData} />
      )
    }
  };

  return (
    <div>
      <Typography variant="h3">
        Analyzer
      </Typography>
      <hr/>

      {/* scope */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="analyzer-scope"
          id="analyzer-header"
        >
          <Typography>Scope</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AnalyzerScope scope={scope} setScope={setScope} />
        </AccordionDetails>
      </Accordion>

      {/* filters */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="analyzer-filters"
          id="analyzer-filters"
        >
          <Typography>Filters</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AnalyzerFilters filters={filters} setFilters={setFilters} />
        </AccordionDetails>
      </Accordion>

      {/* validations */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="analyzer-validations"
          id="analyzer-validations"
        >
          <Typography>Validations</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div></div>
        </AccordionDetails>
      </Accordion>

      {/* data */}
      <hr/>
      <Button onClick={() => handleLoadDataClick() }>Load Data</Button>
      <TabulatorTable
        columns={dataColumns}
        data={data} />
    </div>
  )
}