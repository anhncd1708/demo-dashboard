import * as PATH_ACTION from "../pathAction";
const initialState = {
  currentUser: [],
  accounts: [],
  employees: []
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
    default:
      return { ...state };
  }
  return { ...state };
}
