import { actionTypes } from './alertsActionsType'
import { RootState } from '@/store'

type State = {
  type: string | undefined,
  isOpen: boolean,
  mensagem: string,
}

const initialState: State = {
  type: '',
  isOpen: false,
  mensagem: ''
}

const AlertReducer = (state: State = initialState, action: any): State => {
  switch (action.type) {
    case actionTypes.SHOW_ALERT: {
      return {
        ...action.payload
      }
    }

    default: {
      return state
    }
  }
}

export default AlertReducer
export const AlertState = (state: RootState) => state
