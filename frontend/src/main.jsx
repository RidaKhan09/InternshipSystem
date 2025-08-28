/* eslint-disable no-unused-vars */
import favicon from './assets/IIFALOGO.png';
import './index.css'
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";   // 👈 Provider import karo
import store from "./redux/store/store";  // 👈 apna store import karo
import App from "./App";

// Dynamically set favicon
const link = document.createElement('link');
link.rel = 'icon';
link.type = 'image/png';
link.href = favicon;
document.head.appendChild(link);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>   {/* 👈 App ko Redux store ke andar wrap karo */}
      <App />
    </Provider>
  </React.StrictMode>
);
