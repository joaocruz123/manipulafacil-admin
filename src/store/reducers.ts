import { combineReducers } from "redux";
import AuthReducer from "./modules/auth/authReducers";
import SettingReducer from "./modules/settings/settingsReducers";
import UsersReducer from "./modules/users/usersReducers";

const reducers = combineReducers({
  auth: AuthReducer,
  settings: SettingReducer,
  users: UsersReducer,
});

export default reducers;
