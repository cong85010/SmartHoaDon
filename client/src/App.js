import "./App.css";
import { lazy, Suspense } from "react";
import LoadingPage from "./components/loadingPage/loadingPage";
import {
  Switch,
  Route,
  Link,
  Redirect,
  BrowserRouter,
  useHistory,
} from "react-router-dom";
import { Layout, Menu } from "antd";
import IndexSider from "./components/Sider/indexSider";
import store from "store";
import { Provider } from "react-redux";
import Header from "components/header/Header";

function App() {
  const Home = lazy(() => import("./pages/Home/Home"));
  const Login = lazy(() => import("./pages/Login/Login"));
  const Register = lazy(() => import("./pages/Register/Register"));

  return (
    <Provider store={store}>
      <Layout style={{ minHeight: "100vh" }} className="App">
        <Suspense fallback={<LoadingPage />}>
          <BrowserRouter>
            <IndexSider />
            <Header />
            <Switch>
              <Redirect exact from="/" to="home" />
              <Route
                path="/home"
                render={() => {
                  return localStorage.getItem("token") ? (
                    <Home />
                  ) : (
                    <Redirect to="/login" />
                  );
                }}
              />
              <Route
                exact
                path="/login"
                render={() => {
                  return localStorage.getItem("token") ? (
                    <Redirect to="/" />
                  ) : (
                    <Login />
                  );
                }}
              />
              <Route exact path="/register" component={Register} />
            </Switch>
          </BrowserRouter>
        </Suspense>
      </Layout>
    </Provider>
  );
}

export default App;
