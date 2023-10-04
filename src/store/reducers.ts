import { combineReducers } from 'redux'
import AuthReducer from './modules/auth/authReducers'
import UsersReducer from './modules/users/usersReducers'
import AlertReducer from './modules/alerts/alertsReducers'
import PageSettingsReducer from './modules/pageSettings/pageSettingsReducers'
import ClientsReducer from './modules/clients/clientsReducers'
import ProfilesReducer from './modules/roles/rolesReducers'

const reducers = combineReducers({
  auth: AuthReducer,
  accounts: UsersReducer,
  alert: AlertReducer,
  page: PageSettingsReducer,
  clients: ClientsReducer,
  roles: ProfilesReducer
})

export default reducers
