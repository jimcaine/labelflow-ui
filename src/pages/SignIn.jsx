import { useState } from "react";

import { useSelector, useDispatch} from "react-redux";
import { authUser } from "../store/userReducer";

import Container from "@mui/material/Container"
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import LabelflowLogo from '../assets/labelflowLogo.png';

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    padding: "80px",
    paddingTop: "10px",
    minHeight: "500px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  logo: {
    maxHeight: "80px",
    margin: "20px",
  },
  title: {
    padding: "10px",
  },
  field: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  button: {

  },
};

export default function SignIn() {

  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  const isAuth = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authUser({'token': token}));
    console.log('isauth2', isAuth);
  };

  return (
    <Container sx={styles.container}>
      <Card sx={styles.card}>
        <img src={LabelflowLogo} style={styles.logo} alt="Labelflow Logo" />

        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            required
            label="Email"
            variant="outlined"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            sx={styles.field} />

          <TextField
            required
            label="Token"
            variant="outlined"
            type="password"
            fullWidth
            onChange={(e) => setToken(e.target.value)}
            sx={styles.field} />

          <Button
            type="submit"
            color="primary"
            variant="outlined"
            sx={styles.button}>
            Log in
          </Button>
        </form>
      </Card>
    </Container>
  )
}
