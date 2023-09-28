import { Dispatch } from 'redux'
import { actionTypes } from './pageSettingsActionType'

export const setPageName = (name: string) => (dispatch: Dispatch) => {
  dispatch({
    type: actionTypes.SET_NAME_PAGE,
    payload: name
  })
}