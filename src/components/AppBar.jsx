import { useSelector } from "react-redux";

import { AppBar as MuiAppBar } from '@mui/material';
import Toolbar from '@mui/material/Toolbar'
import { makeStyles } from '@mui/styles';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: "300px",
  },
  toolbar: {
    zIndex: -1,
  },
  account: {
    flexGrow: 1
  } 
}));

export default function AppBar() {
  const navigate = useNavigate();
  const classes = useStyles();
  const user = useSelector((state) => state.user);

  return (
    <MuiAppBar
      position="fixed" 
      elevation={0}
      color="primary"
      className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <h6 className={classes.account}>.                  test</h6>
        <p style={{paddingRight: "10px"}}>{user.userName}</p>
        <AccountCircleIcon
          fontSize="large"
          onClick={() => navigate("/userSettings")} />
      </Toolbar>
    </MuiAppBar>
  )
};