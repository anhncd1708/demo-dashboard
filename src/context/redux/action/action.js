/// gọi axios
import * as PATH_ACTION from "../pathAction";
import { jwtDecode } from "jwt-decode";
import * as API_DOMAIN from "./api_domain";
import { URL_API } from "../../../config/axios/url/url";
import Axios from "../../../config/axios/axios/axios";
import { CustomizedToast } from "../../../components/Toast/ToastCustom";

export const createAction = ({ type, payload }) => {
  return { type, payload };
};


export const LoginAuthen = (username, password) => {
  try {
    let user = {
      "username": username,
      "password": password
    };
    const res = Axios("POST", URL_API + API_DOMAIN.LOGIN_USER, user);
    if (res) {
      CustomizedToast({
        message: "Đăng nhập thành công",
        type: "SUCCESS",
      });
      return res;
    } else {
      CustomizedToast({
        message: "Đăng nhập thất bại",
        type: "ERROR",
      });
      return undefined;
    }
  } catch (error) {
    CustomizedToast({
      message: "Tên đăng nhập hoặc mật khẩu sai",
      type: "ERROR",
    });
  }
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

export const getListEmployee = (value, token) => {
  return async (dispatch) => {
    try {
      let res;
      if (value != undefined)
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_EMPLOYEE + "?employee_code=" + value, null, token);
      else
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_EMPLOYEE, null, token);
      dispatch(
        createAction({
          type: PATH_ACTION.GET_LIST_EMPLOYEE,
          payload: res.data
        })
      );
    } catch (err) { }
  };
};

export const getListCustomer = (value, token) => {
  return async (dispatch) => {
    try {
      let res;
      if (value != undefined)
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_CUSTOMER + "?customer_code=" + value, null, token);
      else
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_CUSTOMER, null, token);
      dispatch(
        createAction({
          type: PATH_ACTION.GET_LIST_CUSTOMER,
          payload: res.data
        })
      );
    } catch (err) { }
  };
};

export const getListCustomerDetail = (value, token) => {
  return async (dispatch) => {
    try {
      let res;
      if (value != undefined)
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_CUSTOMER_FULL_INFORMATION + "?customer_code=" + value, null, token);
      else
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_CUSTOMER_FULL_INFORMATION, null, token);
      dispatch(
        createAction({
          type: PATH_ACTION.GET_LIST_CUSTOMER_FULL_INFORMATION,
          payload: res.data
        })
      );
    } catch (err) { }
  };
};

export const getListPersonalAppraisal = (value, token) => {
  return async (dispatch) => {
    try {
      let res;
      if (value != undefined)
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_PERSONAL_APPRAISAL + "?customer_code=" + value, null, token);
      else
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_PERSONAL_APPRAISAL, null, token);
      dispatch(
        createAction({
          type: PATH_ACTION.GET_LIST_PERSONAL_APPRAISAL,
          payload: res.data
        })
      );
    } catch (err) { }
  };
};

export const getListBroker = (value, token) => {
  return async (dispatch) => {
    try {
      let res;
      if (value != undefined)
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_BROKER + "?broker_code=" + value, null, token);
      else
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_BROKER, null, token);
      dispatch(
        createAction({
          type: PATH_ACTION.GET_LIST_BROKER,
          payload: res.data
        })
      );
    } catch (err) { }
  };
};

export const getListCustomerType = (value, token) => {
  return async (dispatch) => {
    try {
      let res;
      if (value != undefined)
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_CUSTOMER_TYPE + "?customer_type_code=" + value, null, token);
      else
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_CUSTOMER_TYPE, null, token);
      dispatch(
        createAction({
          type: PATH_ACTION.GET_LIST_CUSTOMER_TYPE,
          payload: res.data
        })
      );
    } catch (err) { }
  };
};

export const getListVocative = (value, token) => {
  return async (dispatch) => {
    try {
      let res;
      if (value != undefined)
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_VOCATIVE + "?vocative_code=" + value, null, token);
      else
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_VOCATIVE, null, token);

      dispatch(
        createAction({
          type: PATH_ACTION.GET_LIST_VOCATIVE,
          payload: res.data
        })
      );
    } catch (err) { }
  };
};

export const getListEmployeePositions = (value, token) => {
  return async (dispatch) => {
    try {
      let res;
      if (value != undefined)
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_EMPLOYEE_POSITIONS + "?employee_position_code=" + value, null, token);
      else
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_EMPLOYEE_POSITIONS, null, token);
      dispatch(
        createAction({
          type: PATH_ACTION.GET_LIST_EMPLOYEE_POSITIONS,
          payload: res.data
        })
      );
    } catch (err) { }
  };
};

export const getListBrief = (value, token) => {
  return async (dispatch) => {
    try {
      let res;
      if (value != undefined)
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_BRIEF + "?brief_code=" + value, null, token);
      else
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_BRIEF, null, token);

      dispatch(
        createAction({
          type: PATH_ACTION.GET_LIST_BRIEF,
          payload: res.data
        })
      );
    } catch (err) { }
  };
};

export const getListBriefPoint = (value, token) => {
  return async (dispatch) => {
    try {
      let res;
      if (value != undefined)
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_BRIEF_POINT + "?brief_code=" + value, null, token);
      else
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_BRIEF_POINT, null, token);
      dispatch(
        createAction({
          type: PATH_ACTION.GET_LIST_BRIEF_POINT,
          payload: res.data
        })
      );
    } catch (err) { }
  };
};

export const getListAsset = (value, token) => {
  return async (dispatch) => {
    try {
      let res;
      if (value != undefined)
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_ASSET + "?asset_code=" + value, null, token);
      else
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_ASSET, null, token);

      dispatch(
        createAction({
          type: PATH_ACTION.GET_LIST_ASSET,
          payload: res.data
        })
      );
    } catch (err) { }
  };
};

export const getListAssetDetail = (value, token) => {
  return async (dispatch) => {
    try {
      let res;
      if (value != undefined)
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_ASSET_DETAIL + "?customer_code=" + value, null, token);
      else
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_ASSET_DETAIL, null, token);

      dispatch(
        createAction({
          type: PATH_ACTION.GET_LIST_ASSET_DETAIL,
          payload: res.data
        })
      );
    } catch (err) { }
  };
};

export const getListFile = (value, token) => {
  return async (dispatch) => {
    try {
      let res;
      if (value != undefined)
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_FILES + "?file_code=" + value, null, token);
      else
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_FILES, null, token);

      dispatch(
        createAction({
          type: PATH_ACTION.GET_LIST_FILES,
          payload: res.data
        })
      );
    } catch (err) { }
  };
};


export const getListAssetType = (value, token) => {
  return async (dispatch) => {
    try {
      let res;
      if (value != undefined)
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_ASSET_TYPE + "?asset_type_code=" + value, null, token);
      else
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_ASSET_TYPE, null, token);
      dispatch(
        createAction({
          type: PATH_ACTION.GET_LIST_ASSET_TYPE,
          payload: res.data
        })
      );
    } catch (err) { }
  };
};

export const getListAppraisalPlan = (value, token) => {
  return async (dispatch) => {
    try {
      let res;
      if (value != undefined)
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_APPRAISAL_PLAN + "?appraisal_plan_code=" + value, null, token);
      else
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_APPRAISAL_PLAN, null, token);
      dispatch(
        createAction({
          type: PATH_ACTION.GET_LIST_APPRAISAL_PLAN,
          payload: res.data
        })
      );
    } catch (err) { }
  };
};

export const getListAppraisalPlanDetail = (value, token) => {
  return async (dispatch) => {
    try {
      let res;
      if (value != undefined)
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_APPRAISAL_PLAN_DETAIL + "?appraisal_plan_detail_code=" + value, null, token);
      else
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_APPRAISAL_PLAN_DETAIL, null, token);
      dispatch(
        createAction({
          type: PATH_ACTION.GET_LIST_APPRAISAL_PLAN_DETAIL,
          payload: res.data
        })
      );
    } catch (err) { }
  };
};

export const getListAppraisalPlanType = (value, token) => {
  return async (dispatch) => {
    try {
      let res;
      if (value != undefined)
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_APPRAISAL_PLAN_TYPE + "?appraisal_plan_type_code=" + value, null, token);
      else
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_APPRAISAL_PLAN_TYPE, null, token);

      dispatch(
        createAction({
          type: PATH_ACTION.GET_LIST_APPRAISAL_PLAN_TYPE,
          payload: res.data
        })
      );
    } catch (err) { }
  };
};

export const getListAppraisalDocumentDetail = (value, token) => {
  return async (dispatch) => {
    try {
      let res;
      if (value != undefined)
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_APPRAISAL_DOCUMENT_DETAIL + "?appraisal_documents_detail_code=" + value, null, token);
      else
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_APPRAISAL_DOCUMENT_DETAIL, null, token);
      dispatch(
        createAction({
          type: PATH_ACTION.GET_LIST_APPRAISAL_DOCUMENT_DETAIL,
          payload: res.data
        })
      );
    } catch (err) { }
  };
};

export const getListPriorityLevel = (value, token) => {
  return async (dispatch) => {
    try {
      let res;
      if (value != undefined)
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_PRIORITY_LEVEL + "?priority_level_code=" + value, null, token);
      else
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_PRIORITY_LEVEL, null, token);
      dispatch(
        createAction({
          type: PATH_ACTION.GET_LIST_PRIORITY_LEVEL,
          payload: res.data
        })
      );
    } catch (err) { }
  };
};

export const getListBriefSuperDetail = (value, token) => {
  return async (dispatch) => {
    try {
      let res;
      if (value != undefined)
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_BRIEF_SUPER_DETAIL + "?brief_code=" + value, null, token);
      else
        res = await Axios("GET", URL_API + API_DOMAIN.GET_LIST_BRIEF_SUPER_DETAIL, null, token);

      dispatch(
        createAction({
          type: PATH_ACTION.GET_LIST_BRIEF_SUPER_DETAIL,
          payload: res.data
        })
      );
    } catch (err) { }
  };
};


export const postBriefApproval = (value) => {
  return async (dispatch) => {
    try {
       const res = await Axios("POST", URL_API + API_DOMAIN.POST_BRIEF_APPROVAL + "?ma_chi_tiet_ho_so=" + value);
      dispatch(
        createAction({
          type: PATH_ACTION.POST_BRIEF_APPROVAL,
          payload: res.data
        })
      );
    } catch (err) { }
  };
};

