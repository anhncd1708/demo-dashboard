import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getListEmployee } from "../../context/redux/action/action";
import { useCallback } from "react";
import axios from "axios";

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const callAPI = async () => {
      await dispatch(getListEmployee());
    };
    callAPI();
  }, [dispatch]);

  const employees = useSelector((state) => {
    return state.employees;
  });

  return (
    <>
      <h2>sdaasd</h2>
      <p>This is dashboard</p>
    </>
  );
};

export default Dashboard;
