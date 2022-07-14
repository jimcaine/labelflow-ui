import SignIn from "./pages/SignIn";
import MainPage from "./pages/Main";
import Data from "./pages/Data";
import Analyzer from "./pages/analyzer/Analyzer";

import DataSources from "./pages/datasources/DataSources";
import CreateDataSources from "./pages/datasources/CreateDataSources";

import DataSource from "./pages/datasources/DataSource";
import Dashboard from "./pages/Dashboard";
import UserSettings from "./pages/UserSettings";
import LabelSets from "./pages/labelSets/LabelSets";
import PageDNE from "./pages/404";

export const routes = [
  {
    path: "/signin",
    authRequired: false,
    adminRequired: false,
    component: <SignIn />,
  },
  {
    path: "/dashboard",
    authRequired: true,
    adminRequired: false,
    component: <Dashboard />,
  },
  {
    path: "/",
    authRequired: true,
    adminRequired: false,
    component: <MainPage />,
  },
  {
    path: "/datasources",
    authRequired: true,
    adminRequired: false,
    component: <DataSources />,
  },
  {
    path: "/datasource/:source_name",
    authRequired: true,
    adminRequired: false,
    component: <DataSource />,
  },
  {
    path: "/datasources/create",
    authRequired: true,
    adminRequired: false,
    component: <CreateDataSources />,
  },
  {
    path: "/labelsets",
    authRequired: true,
    adminRequired: false,
    component: <LabelSets />,
  },
  {
    path: "/analyzer",
    authRequired: true,
    adminRequired: false,
    component: <Analyzer />,
  },
  {
    path: "/userSettings",
    authRequired: true,
    adminRequired: false,
    component: <UserSettings />,
  },
  {
    path: "/*",
    authRequired: false,
    adminRequired: false,
    component: <PageDNE />
  }
];