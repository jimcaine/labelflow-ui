import { useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => (
  {
    title: {
      fontWeight: 500,
      paddingBottom: "20px",
    },
  }
));

const formTextFieldStyle = {
  marginTop: "10px",
  marginBottom: "10px",
}

export default function UserSettings() {

  const [dataSourceId, setDataSourceId] = useState('');
  const [dataSourceName, setDataSourceName] = useState('');
  const [dataSourceEntityId, setDataSourceEntityId] = useState('');
  const [dataSourceFeatures, setDataSourceFeatures] = useState('');

  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const token = user.token;

  const classes = useStyles();

  const handleSubmit = (e) => {

    async function postDataSource(requestBody) {
      const response = await axios.post('http://localhost:8000/datasource',
      requestBody,
        { headers: {"LFML-API-KEY": token} });
    };

    e.preventDefault();
    const requestBody = {
      id: dataSourceId,
      datasource_nm: dataSourceName,
      entity_id: dataSourceEntityId,
      features: dataSourceFeatures.split(","),
    };
    postDataSource(requestBody);
    navigate("/datasources");
  };

  return (
    <div>
      <Typography variant="h1">
        <Box className={classes.title}>Create Data Source</Box>
      </Typography>

      <form noValidate autoComplete="off" onSubmit={(e) => handleSubmit(e)}>

        <TextField
          required
          label="Id"
          variant="outlined"
          fullWidth
          sx={formTextFieldStyle}
          onChange={(e) => setDataSourceId(e.target.value)} />

        <TextField
          required
          label="Name"
          variant="outlined"
          fullWidth
          sx={formTextFieldStyle}
          onChange={(e) => setDataSourceName(e.target.value)} />

        <TextField
          required
          label="Entity ID"
          variant="outlined"
          fullWidth
          sx={formTextFieldStyle}
          onChange={(e) => setDataSourceEntityId(e.target.value)} />

        <TextField
          required
          label="Features"
          variant="outlined"
          fullWidth
          sx={formTextFieldStyle}
          onChange={(e) => setDataSourceFeatures(e.target.value)} />

        <Button
          type="submit"
          color="primary"
          variant="outlined" >
          Submit
        </Button>
      </form>
    </div>
  )
}
