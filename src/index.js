import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import logger from 'redux-logger';
import rootReducer from "./context/redux/middleware/reducers";
import { applyMiddleware, compose, createStore } from "redux";
import { BrowserRouter } from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { thunk } from 'redux-thunk';

const root = ReactDOM.createRoot(document.getElementById('root'));
const composeEnhancers =
  (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const enhancer = composeEnhancers(
  // applyMiddleware(logger),
  applyMiddleware(thunk)
  // other store enhancers if any
);

const store = createStore(rootReducer, enhancer);
root.render(
  <Provider store={store}>
    <ProSidebarProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ProSidebarProvider>
  </Provider>
);

