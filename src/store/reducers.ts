import { combineReducers } from 'redux'
import AuthReducer from './modules/auth/authReducers'
import SettingReducer from './modules/settings/settingsReducers'
import UsersReducer from './modules/users/usersReducers'
import AlertReducer from './modules/alerts/alertsReducers'

const reducers = combineReducers({
  auth: AuthReducer,
  settings: SettingReducer,
  users: UsersReducer,
  alert: AlertReducer
})

export default reducers
