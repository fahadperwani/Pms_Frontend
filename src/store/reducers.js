import { LOGIN, LOGOUT } from "./actions";

const initialState = {
  isLoggedIn: false,
  token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoggedIn: true, token: action.token };
    case LOGOUT:
      return { ...state, isLoggedIn: false, token: null };
    default:
      return state;
  }
};

export default authReducer;