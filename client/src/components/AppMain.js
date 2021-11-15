import { fetchUserByToken, userSelector } from "feature/user/UserSlice";
import moment from "moment";
import React, { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
import Header from "./header/Header";
import IndexSider from "./Sider/indexSider";

const checkToken = () => {
  try {
    const date = document.cookie?.split(";")[1].split("=")[1];
    const token = document.cookie?.split(";")[0].split("=")[1];
    const expires = moment(date);
    const now = moment();
    if (token.length < 20) return false;
    return expires > now;
  } catch (error) {
    return false;
  }
};
export const getToken = () =>
  document.cookie?.split(";")[0].split("=")[1] || "";
export default function AppMain() {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      if (!checkToken()) {
        if (location.pathname === "/register") {
          history.push("/register");
        } else {
          history.push("/login");
        }
      }
    }, [300]);
  }, [location.pathname]);
  const Home = lazy(() => import("pages/Home/Home"));
  const Login = lazy(() => import("pages/Login/Login"));
  const Register = lazy(() => import("pages/Register/Register"));
  const InformatinoUser = lazy(() => import("pages/User/User"));
  const AddBill = lazy(() => import("pages/AddBill/AddBill"));
  const Bills = lazy(() => import("pages/Bills/Bills"));
  return (
    <>
      {checkToken() && <IndexSider />}
      {checkToken() && <Header />}
      <div className="App-main">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />

          <Redirect exact from="/" to="home" />
          <Route exact path="/home" component={Home} />
          <Route exact path="/user" component={InformatinoUser} />
          <Route exact path="/add-bill" component={AddBill} />
          <Route exact path="/my-bills" component={Bills} />
        </Switch>
      </div>
    </>
  );
}
