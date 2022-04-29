import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MainLayout from "./components/MainLayout";
import { routes } from "./routes";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";

function App() {

  const { isAuth } = useSelector(state => state.user);

  const renderRoute = (route) => {
    if (route.authRequired === true && isAuth === false) {
      return <Route key={route.path} path={route.path} element={<Navigate to="/signin" />} />
    } else {
      return <Route key={route.path} path={route.path} element={route.component} />
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <MainLayout>
          <Routes>
            {routes.map((route) => renderRoute(route))}
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
