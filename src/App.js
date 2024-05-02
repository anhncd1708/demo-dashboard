import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'boxicons/css/boxicons.min.css';
import { fetchData, postData } from './services/AppService';
import { useState } from 'react';
import Cookies from "js-cookie";

import PrivateRoute from './util/PrivateRoute';
import Loading from "./components/Loading/Loading"
import Sidebar from './components/Sidebar/Sidebar';




const App = () => {
const user = {
  id: 1,
  username: "anhncd1708",
  password: "123",
  created_at: "2024-05-01T00:00:00",
  updated_at: "2024-05-01T00:00:00",
  deleted_at: "2024-05-01T00:00:00",
  role: "admin",
  email: "anhncd1708@gmail.com",
  active: true,
}

  const initData = () => {
    Cookies.set("user",  JSON.stringify(user));
  };


  const [loading, setLoading] = useState(false);
  useEffect(() => {
    initData();
  }, []);


  return loading ? (
    <Loading/>
  ) : (
    <>
    <Sidebar>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    </Sidebar>
    </>
  );
}

export default App;
