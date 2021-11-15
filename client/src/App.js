import { Layout } from "antd";
import AppMain from "components/AppMain";
import { Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "store";
import "./App.scss";
import LoadingPage from "components/loadingPage/loadingPage";

function App() {
  return (
    <Provider store={store}>
      <Layout style={{ minHeight: "100vh" }} className="App">
        <Suspense fallback={<LoadingPage />}>
          <BrowserRouter>
            <AppMain />
          </BrowserRouter>
        </Suspense>
      </Layout>
    </Provider>
  );
}

export default App;
