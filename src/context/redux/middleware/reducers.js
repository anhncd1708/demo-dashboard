import * as PATH_ACTION from "../pathAction";
const initialState = {
  currentUser: [],
  accounts: [],
  employees: [],
  customers: [],
  brokers: [],
  customerTypes: [],
  vocatives: [],
  employeePositions: [],
  briefs: [],
  briefPoints: [],
  assets: [],
  assetTypes: [],
  appraisalPlans: [],
  appraisalPlanDetails: [],
  appraisalPlanTypes: [],
  appraisalDocumentDetail: []
};

export default function reducers(state = initialState, { type, payload }) {
  switch (type) {
    case PATH_ACTION.GET_LIST_ACCOUNT:
      state.accounts = payload;
      break;
    case PATH_ACTION.LOGIN_USER:
      state.currentUser = payload;
      break;
    case PATH_ACTION.GET_LIST_EMPLOYEE:
      state.employees = payload;
      break;
    case PATH_ACTION.GET_LIST_CUSTOMER:
      state.customers = payload;
      break;
    case PATH_ACTION.GET_LIST_CUSTOMER_TYPE:
      state.customerTypes = payload;
      break;
    case PATH_ACTION.GET_LIST_EMPLOYEE_POSITIONS:
      state.employeePositions = payload;
      break;
    case PATH_ACTION.GET_LIST_BRIEF:
      state.briefs = payload;
      break;
    case PATH_ACTION.GET_LIST_BRIEF_POINT:
      state.briefPoints = payload;
      break;
    case PATH_ACTION.GET_LIST_ASSET:
      state.assets = payload;
      break;
    case PATH_ACTION.GET_LIST_ASSET_TYPE:
      state.assetTypes = payload;
      break;
    case PATH_ACTION.GET_LIST_APPRAISAL_PLAN:
      state.appraisalPlans = payload;
      break;
    case PATH_ACTION.GET_LIST_APPRAISAL_PLAN_DETAIL:
      state.appraisalPlanDetails = payload;
      break;
    case PATH_ACTION.GET_LIST_APPRAISAL_DOCUMENT_DETAIL:
      state.appraisalDocumentDetail = payload;
      break;
    case PATH_ACTION.GET_LIST_APPRAISAL_PLAN_TYPE:
      state.appraisalPlanTypes = payload;
      break;
    default:
      return { ...state };
  }
  return { ...state };
}
