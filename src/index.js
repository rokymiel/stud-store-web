import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import Header from "./components/StoreHeader";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      {/* <Header /> */}
      <App />
    </BrowserRouter>
  </Provider>

  // <BrowserRouter>
  // <Provider store={store}>
  // <App />
  // </Provider>
  // </BrowserRouter>
);
