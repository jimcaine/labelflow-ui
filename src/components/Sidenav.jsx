import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import StorageIcon from '@mui/icons-material/Storage';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import LabelIcon from '@mui/icons-material/Label';

import LabelflowLogo from '../assets/labelflowLogo.png';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
    drawer: {
      minWidth: drawerWidth,
    },
    logo: {
      maxHeight: "65px",
    },
    drawerPaper: {
      minWidth: drawerWidth,
    },
  }));

const sidenavItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
  },
  {
    text: "Cases",
    icon: <WorkIcon />,
    path: "/cases",
  },
  {
    text: "Flows",
    icon: <AccountTreeIcon />,
    path: "/flows",
  },
  {
    text: "Characteristics",
    icon: <ModelTrainingIcon />,
    path: "/characteristics",
  },
  {
    text: "Cohorts",
    icon: <ConnectWithoutContactIcon />,
    path: "/cohorts",
  },
  {
    text: "Data Sources",
    icon: <StorageIcon />,
    path: "/datasources",
  },
  {
    text: "Label Management",
    icon: <LabelIcon />,
    path: "/labelsets",
  }, {
    text: "Analyzer",
    icon: <ManageSearchIcon />,
    path: "/analyzer",
  },
];

const secondarySidenavItems = [
  {
    text: "Documentation",
    icon: <LocalLibraryIcon />,
    path: "/docs",
  },
];

const adminSidenavItes = [
  {
    text: "Admin",
    icon: <SupervisorAccountIcon />,
    path: "/admin",
  },  
];

export default function Sidenav() {

  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const classes = useStyles();

  const renderAdminNav = () => {
    if (isAdmin === true) {
      return (
        <div>
          <Divider sx={{ my: 1}} />
          <List>
            {adminSidenavItes.map((item) => (
              <ListItem
                className={classes.drawerPaper}
                button
                key={item.text}
                onClick={() => navigate(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </div>
      )
    }
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      anchor="left" >
      
      <div>
        <img
          src={LabelflowLogo}
          alt="Labelflow Logo"
          className={classes.logo}
          onClick={() => navigate("/")} />
      </div>

      <List>
        {sidenavItems.map((item) => (
          <ListItem
            className={classes.drawerPaper}
            button
            key={item.text}
            onClick={() => navigate(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 1}} />

      <List>
        {secondarySidenavItems.map((item) => (
          <ListItem
            className={classes.drawerPaper}
            button
            key={item.text}
            onClick={() => navigate(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}

      </List>

      { renderAdminNav() }

      
    </Drawer>
  )
}