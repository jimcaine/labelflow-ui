import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";

import BarChart from '../components/BarChart';

export default function DataSource() {
  const location = useLocation();
  const dataSourceName = location.pathname.split("/").slice(-1)[0];
  console.log(dataSourceName);

  return (
    <div>
      <Typography variant="h3">
        Data Source: {dataSourceName}
      </Typography>
      <BarChart />
    </div>
  )
}