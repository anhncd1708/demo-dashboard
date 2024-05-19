import * as PATH_ACTION from "../pathAction";
const initialState = {
  currentUser: [],
  accounts: [],
  employees: [],
  customers: [],
  customerDetail: [],
  personal: [],
  brokers: [],
  customerTypes: [],
  vocatives: [],
  employeePositions: [],
  briefs: [],
  briefPoints: [],
  assets: [],
  assetsDetail: [],
  files:[],
  assetTypes: [],
  appraisalPlans: [],
  appraisalPlanDetails: [],
  appraisalPlanTypes: [],
  appraisalDocumentDetail: [],
  priorityLevels: [],
  briefApproval: []
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
    case PATH_ACTION.GET_LIST_CUSTOMER_FULL_INFORMATION:
      state.customerDetail = payload;
      break;
    case PATH_ACTION.GET_LIST_PERSONAL_APPRAISAL:
      state.personal = payload;
      break;
    case PATH_ACTION.GET_LIST_BROKER:
      state.brokers = payload;
      break;
    case PATH_ACTION.GET_LIST_VOCATIVE:
      state.vocatives = payload;
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
      case PATH_ACTION.GET_LIST_BRIEF_SUPER_DETAIL:
      state.briefDetail = payload;
      break;
    case PATH_ACTION.GET_LIST_BRIEF_POINT:
      state.briefPoints = payload;
      break;
    case PATH_ACTION.POST_BRIEF_APPROVAL:
      state.briefApproval = payload;
      break;
    case PATH_ACTION.GET_LIST_ASSET:
      state.assets = payload;
      break;
    case PATH_ACTION.GET_LIST_ASSET_DETAIL:
      state.assetsDetail = payload;
      break;
    case PATH_ACTION.GET_LIST_FILES:
      state.files = payload;
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
    case PATH_ACTION.GET_LIST_PRIORITY_LEVEL:
      state.priorityLevels = payload;
      break;
    default:
      return { ...state };
  }
  return { ...state };
}
