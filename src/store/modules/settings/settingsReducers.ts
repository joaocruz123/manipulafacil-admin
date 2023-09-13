import { actionTypes } from '.'
import { RootState } from '@/store'

interface State {
  profile: any;
  namePage: string;
}

const initialState: State = {
  profile: null,
  namePage: ''
}

const SettingReducer = (state: State = initialState, action: any): State => {
  let newState = state
  switch (action.type) {
    case actionTypes.SET_MODULE_PROFILE_DATA: {
      newState = {
        ...state,
        profile: action.payload
      }

      break
    }
    case actionTypes.SET_NAME_PAGE: {
      newState = {
        ...state,
        namePage: action.payload
      }

      break
    }
    default: {
      newState = state

      break
    }
  }

  return newState
}

export default SettingReducer
export const SettingsState = (state: RootState) => state.settings
