import { LOGIN, LOGOUT } from "./actions";

const initialState = {
  isLoggedIn: false,
  user: null,
  token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.user,
        token: action.token,
      };
    case LOGOUT:
      return { ...state, isLoggedIn: false, user: null };
    default:
      return state;
  }
};

export default authReducer;
