import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => (
  {
    title: {
      fontWeight: 500,
      paddingBottom: "20px",
    },
    widget: {
      padding: "20px",
    },
    widgetPaper: {
      height: "300px",
    }
  }
));

const widgets = [
  {
    "name": "Recent Projects",
  },
  {
    "name": "Data Sources",
  },
  {
    "name": "Recent Characteristics",
  },
  {
    "name": "Cohorts",
  },
]

export default function Dashboard() {

  const classes = useStyles();

  return (
    <div>
      <Typography variant="h3" >
        <Box className={classes.title}>Dashboard</Box>
      </Typography>
      <Grid container>
        {widgets.map((widget, index) => (
        <Grid key={index} item xs={6} className={classes.widget}>
          <Paper xs={6} className={classes.widgetPaper}>
            {widget.name}
          </Paper>
        </Grid>
        ))}
      </Grid>
    </div>
  )
}