import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import MainLayout from "./layouts/MainLayout/MainLayout";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <MainLayout />
  </Provider>
);
