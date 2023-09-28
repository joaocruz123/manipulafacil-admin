import { actionTypes } from '.'
import { RootState } from '@/store'

interface State {
  namePage: string;
}

const initialState: State = {
  namePage: ''
}

const PageSettingReducer = (state: State = initialState, action: any): State => {
  switch (action.type) {
    case actionTypes.SET_NAME_PAGE: {
      return {
        namePage: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export default PageSettingReducer
export const PageSettingsState = (state: RootState) => state
