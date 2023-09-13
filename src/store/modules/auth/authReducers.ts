import { actionTypes } from ".";
import { RootState } from "@/store";

interface State {
  auth: any;
  profile: any;
  recoverPassword: any;
}

const initialState: State = {
  auth: null,
  profile: null,
  recoverPassword: null,
};

const AuthReducer = (state: State = initialState, action: any): State => {
  let newState = state;
  switch (action.type) {
    case actionTypes.SET_ACCESS_TOKEN_FLOW: {
      newState = {
        ...state,
        recoverPassword: action.payload,
      };

      break;
    }
    case actionTypes.SET_BODY_DATA_RECOVER: {
      newState = {
        ...state,
        recoverPassword: {
          ...state.recoverPassword,
          bodyAPI: action.payload,
        },
      };

      break;
    }
    case actionTypes.SET_PROFILE_DATA: {
      newState = {
        ...state,
        profile: action.payload,
      };

      break;
    }
    case actionTypes.SET_USER_AUTH: {
      newState = {
        ...state,
        auth: action.payload,
      };

      break;
    }
    default: {
      newState = state;

      break;
    }
  }

  return newState;
};

export default AuthReducer;
export const AuthState = (state: RootState) => state.auth;
