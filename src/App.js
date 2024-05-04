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
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';



const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let userTmp = Cookies.get('user');
    const token = Cookies.get('token');
    
      
    if (userTmp) {
      setLoading(true)
      setUser(JSON.parse(userTmp));
      console.log(user)
      setLoading(false);
    }
  
  }, []);

  if (!user) {
    let userTmp = Cookies.get('user');
    if (!userTmp 
      && location.pathname !== '/login' && location.pathname !== '/register'
      && location.pathname !== '/forgot-password' ) {
      return (window.location.href = '/login');
    }
  }


  return loading ? (
    <Loading/>
  ) : (
    <>
    { user && user.role === 'ADMIN' ? (
       <Sidebar>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
        </Sidebar>
    ) : (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    ) }
    </>
  );
}

export default App;
