import { actionTypes } from ".";
import { RootState } from "@/store";

interface State {
  users: any;
  pagination: any;
  profiles: any;
}

const initialState: State = {
  users: null,
  pagination: null,
  profiles: null,
};

const UsersReducer = (state: State = initialState, action: any): State => {
  let newState = state;
  switch (action.type) {
    case actionTypes.GET_ALL_USERS: {
      newState = {
        ...state,
        users: action.payload,
      };

      break;
    }
    case actionTypes.SET_STUDENTS_PAGINATION: {
      newState = {
        ...state,
        pagination: action.payload,
      };

      break;
    }
    case actionTypes.SET_ALL_PROFILES: {
      newState = {
        ...state,
        profiles: action.payload,
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

export default UsersReducer;
export const UserState = (state: RootState) => state;
