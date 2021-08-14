import "./App.css";
import { lazy, Suspense} from "react";
import LoadingPage from "./components/loadingPage/loadingPage";
import {
  Switch,
  Route,
  Link,
  Redirect,
  BrowserRouter,
  useHistory,
} from "react-router-dom";
import { Layout, Menu } from 'antd';
import IndexSider from "./components/Sider/indexSider";
import store from "store";
import { Provider } from "react-redux";

function App() {
  
  const Home = lazy(() => import('./pages/Home/Home'))
  const Login = lazy(() => import('./pages/Login/Login'))
  const Register = lazy(() => import('./pages/Register/Register'))

  return (
    <Provider store={store}>
    <Layout style={{ minHeight: "100vh" }} className="App">
      <Suspense fallback={<LoadingPage />}>
        <BrowserRouter>
          <IndexSider/>
          <Switch>
            <Redirect exact from="/" to="home" />
            <Route path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </Layout>
    </Provider>
  );
}

export default App;
