import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => (
  {
    title: {
      fontWeight: 500,
      paddingBottom: "20px",
    }
  }
));

function MainPage() {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h3" >
        <Box className={classes.title}>Welcome to Labelflow UI.</Box>
      </Typography>
      <Typography variant="p">
        Labelflow is an application to create and manage classification pipelines.
      </Typography>

      <Divider sx={{ my: 1}} /> 
      <Typography variant="h5" >
        <Box>Data Sources</Box>
      </Typography>
      <Typography variant="p" >
        Manage data sources.
      </Typography>

    </div>
  )
}

export default MainPage;