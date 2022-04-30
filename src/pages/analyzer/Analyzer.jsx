import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import 'react-tabulator/lib/styles.css'; // required styles
import '../../styles/table.css'; // theme
import { ReactTabulator } from 'react-tabulator';

import { getAnalyzerData } from '../../store/analyzerSlice';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import AnalyzerScope from './scope/AnalyzerScope';
import AnalyzerFilters from './filters/AnalyzerFilters';
import AnalyzerValidations from './validations/AnalyzerValidations';
import AnalyzerData from './data/AnalyzerData';

export default function Analyzer() {

  // store
  const dispatch = useDispatch();
  const analyzerSlice = useSelector((state) => state.analyzer);
  const dataRows = analyzerSlice.data.data.rows;
  const dataColumns = analyzerSlice.data.data.cols;
  const filters = analyzerSlice.data.filters;
  const selectedItems = analyzerSlice.data.selectedItems;

  const [activeLabel, setActiveLabel] = useState('');

  // click events
  const handleLoadDataClick = () => {
    dispatch(getAnalyzerData(filters));
  };

  return (
    <Container sx={{marginBottom: "100px"}}>
      <Typography variant="h3">
        Analyzer
      </Typography>
      <Button onClick={() => console.log(analyzerSlice)}>Log State</Button>
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
          <AnalyzerScope  />
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
          <AnalyzerFilters />
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
          <AnalyzerValidations />
        </AccordionDetails>
      </Accordion>

      {/* data */}

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="analyzer-data"
          id="analyzer-data"
        >
          <Typography>Data</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button onClick={() => handleLoadDataClick() }>Load Data</Button>
          <AnalyzerData columns={dataColumns} rows={dataRows} />
        </AccordionDetails>
      </Accordion>

    </Container>
  )
}