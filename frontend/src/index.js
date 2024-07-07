import React from "react";
import ReactDOM from "react-dom/client"; // Updated import
import App from "./App";
import { Provider } from "react-redux";
import store from "./Store";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* Uncomment if using react-alert */}
      {/* <AlertProvider template={AlertTemplate} {...options}> */}
      <App />
      {/* </AlertProvider> */}
    </Provider>
  </React.StrictMode>
);
