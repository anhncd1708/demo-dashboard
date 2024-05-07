import React, { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";

//----------------------------------------------------------------
export const Authen = createContext();
export const ProviderToken = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [decode, setDecode] = useState([]);

  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  // console.log(id);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setDecode(decoded);
    }
  }, [dispatch, id, setDecode]);

  return <Authen.Provider value={{ token, decode }}>{children}</Authen.Provider>;
};
