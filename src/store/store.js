import { createStore, applyMiddleware } from "redux";
import authReducer from "./reducers";

const store = createStore(authReducer);

export default store;
