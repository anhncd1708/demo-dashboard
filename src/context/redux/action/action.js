/// gọi axios
import * as PATH_ACTION from "../PathAction";
import { jwtDecode } from "jwt-decode";
import * as API_DOMAIN from "./api_domain";
import { URL_API } from "../../../config/axios/url/url";
import Axios from "../../../config/axios/axios/axios";
import { CustomizedToast } from "../../../components/Toast/ToastCustom";

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

export const getListCustomer = (token) => {
  return async (dispatch) => {
    try {
      const res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_CUSTOMER, null, token);

      dispatch(
        createAction({
          type: PATH_ACTION.GET_LIST_CUSTOMER,
          payload: res.data
        })
      );
    } catch (err) { }
  };
};

export const getListBroker = (token) => {
  return async (dispatch) => {
    try {
      const res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_BROKER, null, token);

      dispatch(
        createAction({
          type: PATH_ACTION.GET_LIST_BROKER,
          payload: res.data
        })
      );
    } catch (err) { }
  };
};

export const getListCustomerType = (token) => {
  return async (dispatch) => {
    try {
      const res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_CUSTOMER_TYPE, null, token);

      dispatch(
        createAction({
          type: PATH_ACTION.GET_LIST_CUSTOMER_TYPE,
          payload: res.data
        })
      );
    } catch (err) { }
  };
};

export const getListVocative = (token) => {
  return async (dispatch) => {
    try {
      const res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_VOCATIVE, null, token);

      dispatch(
        createAction({
          type: PATH_ACTION.GET_LIST_VOCATIVE,
          payload: res.data
        })
      );
    } catch (err) { }
  };
};

export const getListEmployeePositions = (token) => {
  return async (dispatch) => {
    try {
      const res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_EMPLOYEE_POSITIONS, null, token);

      dispatch(
        createAction({
          type: PATH_ACTION.GET_LIST_EMPLOYEE_POSITIONS,
          payload: res.data
        })
      );
    } catch (err) { }
  };
};

export const getListBrief = (token) => {
  return async (dispatch) => {
    try {
      const res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_BRIEF, null, token);

      dispatch(
        createAction({
          type: PATH_ACTION.GET_LIST_BRIEF,
          payload: res.data
        })
      );
    } catch (err) { }
  };
};

export const getListBriefPoint = (token) => {
  return async (dispatch) => {
    try {
      const res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_BRIEF_POINT, null, token);

      dispatch(
        createAction({
          type: PATH_ACTION.GET_LIST_BRIEF_POINT,
          payload: res.data
        })
      );
    } catch (err) { }
  };
};

export const getListAsset = (token) => {
  return async (dispatch) => {
    try {
      const res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_ASSET, null, token);

      dispatch(
        createAction({
          type: PATH_ACTION.GET_LIST_ASSET,
          payload: res.data
        })
      );
    } catch (err) { }
  };
};

export const getListAssetType = (token) => {
  return async (dispatch) => {
    try {
      const res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_ASSET_TYPE, null, token);

      dispatch(
        createAction({
          type: PATH_ACTION.GET_LIST_ASSET_TYPE,
          payload: res.data
        })
      );
    } catch (err) { }
  };
};

export const getListAppraisalPlan = (token) => {
  return async (dispatch) => {
    try {
      const res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_APPRAISAL_PLAN, null, token);

      dispatch(
        createAction({
          type: PATH_ACTION.GET_LIST_APPRAISAL_PLAN,
          payload: res.data
        })
      );
    } catch (err) { }
  };
};

export const getListAppraisalPlanDetail = (token) => {
  return async (dispatch) => {
    try {
      const res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_APPRAISAL_PLAN_DETAIL, null, token);

      dispatch(
        createAction({
          type: PATH_ACTION.GET_LIST_APPRAISAL_PLAN_DETAIL,
          payload: res.data
        })
      );
    } catch (err) { }
  };
};

export const getListAppraisalPlanType = (token) => {
  return async (dispatch) => {
    try {
      const res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_APPRAISAL_PLAN_TYPE, null, token);

      dispatch(
        createAction({
          type: PATH_ACTION.GET_LIST_APPRAISAL_PLAN_TYPE,
          payload: res.data
        })
      );
    } catch (err) { }
  };
};

export const getListAppraisalDocumentDetail = (token) => {
  return async (dispatch) => {
    try {
      const res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_APPRAISAL_DOCUMENT_DETAIL, null, token);

      dispatch(
        createAction({
          type: PATH_ACTION.GET_LIST_APPRAISAL_DOCUMENT_DETAIL,
          payload: res.data
        })
      );
    } catch (err) { }
  };
};
