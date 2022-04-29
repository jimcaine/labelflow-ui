import { useLocation } from 'react-router-dom';

import Container from "@mui/material/Container";
import { makeStyles } from '@mui/styles';

import AppBar from './AppBar';
import Sidenav from './Sidenav';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => {
  return ({
    root: {
      display: 'flex',
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    subAppBar: {
      marginTop: theme.mixins.toolbar.minHeight,
      width: '100%'
    },
    contentContainer: {
      paddingTop: "40px",
    },
  })
});

export default function MainLayout({ children }) {

  const location = useLocation();
  const classes = useStyles();

  if (location.pathname === '/signin') {
    return (
      <div>
        {children}
      </div>
    )
  } else {
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} />
        <Sidenav className={classes.drawer} />
        <div className={classes.subAppBar}>
          <Container className={classes.contentContainer}>
            { children }
          </Container>
        </div>
      </div>
    )
  }
}