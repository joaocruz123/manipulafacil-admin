import { Dispatch } from 'redux'
import { actionTypes } from './alertsActionsType'

type PropsTypes = {
  type: string,
  isOpen: boolean,
  mensagem: string,
}

export const AlertActions = (alert: PropsTypes) => async (dispatch: Dispatch) => {
  dispatch(showAlert(alert))
}

const showAlert = (alert: PropsTypes) => ({
  type: actionTypes.SHOW_ALERT,
  payload: alert
})
