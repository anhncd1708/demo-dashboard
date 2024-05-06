/// gọi axios
import * as PATH_ACTION from "../pathAction";
import { jwtDecode } from "jwt-decode";
import * as API_DOMAIN from "./api_domain";
import { URL_API } from "../../../config/axios/url/url";
import Axios from "../../../config/axios/axios/axios";
import { CustomizedToast } from "../../../components/Toast/ToastCustom";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const createAction = ({ type, payload }) => {
  return { type, payload };
};


export const LoginAthen = (user, navigate) => {
  return async (dispatch) => {
    try {
      const res = await Axios("POST", URL_API + API_DOMAIN.LOGIN_USER, user);
      localStorage.setItem("token", res.data.data.token);
      const token = localStorage.getItem("token");
      const detoken = jwtDecode(token);

      dispatch(
        createAction({
          type: PATH_ACTION.LOGIN_USER,
          payload: res.data.data,
        })
      );
      if (detoken.RoleName === "{role}") {
        navigate("{domain}");
        CustomizedToast({
          message: "Đăng nhập thành công",
          type: "SUCCESS",
        });
      } else if (detoken.RoleName === "{role}") {
        navigate("{domain}");
        CustomizedToast({
          message: "Đăng nhập thành công",
          type: "SUCCESS",
        });
      }
    } catch (error) {
      CustomizedToast({
        message: "Tên đăng nhập hoặc mật khẩu sai",
        type: "ERROR",
      });
    }
  };
};

export const loginFirebase = (idtoken, navigate) => {
  return async (dispatch) => {
    try {
      const res = await Axios("POST", URL_API + `/Axios/v1/authen/firebase?idtoken=${idtoken}`);
      console.log(res.data.data.token);
      localStorage.setItem("token", res.data.data.token);
      const token = localStorage.getItem("token");
      const detoken = jwtDecode(token);
      dispatch(
        createAction({
          type: PATH_ACTION.LOGIN_USER,
          payload: res.data.token,
        })
      );
      if (detoken.RoleName === "user") {
        navigate("/user/campaign");
        CustomizedToast({
          message: "Đăng nhập thành công",
          type: "SUCCESS",
        });
      } else if (detoken.RoleName === "admin") {
        // như trên
      }
    } catch (e) {
      console.log(e);
      CustomizedToast({
        message: "Tên đăng nhập hoặc mật khẩu sai",
        type: "ERROR",
      });
    }
  };
};

export const getListEmployee = (token) => {
  return async (dispatch) => {
    try {
      const res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_EMPLOYEE, null, token);

      dispatch(
        createAction({
          type: PATH_ACTION.GET_LIST_EMPLOYEE,
          payload: res.data
        })
      );
    } catch (err) { }
  };
};


