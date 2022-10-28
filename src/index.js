import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import { Provider } from "react-redux";

import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
<<<<<<< HEAD
      <React.Fragment>
=======
    <React.Fragment>
>>>>>>> 2f20071ab1e769f7e9fec3f8339307b5e69b4bd7
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.Fragment>
    </Provider>
);

serviceWorker.unregister()
