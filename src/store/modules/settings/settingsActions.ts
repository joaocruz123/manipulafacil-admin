import { Dispatch } from "redux";
import { actionTypes } from ".";

export const setModuleProfileAccess = (module: any) => (dispatch: Dispatch) => {
  try {
    dispatch({
      type: actionTypes.SET_MODULE_PROFILE_DATA,
      payload: module,
    })
  }
  catch (e) {
    console.log(e);
  }
};

export const setPageName = (name: string) => (dispatch: Dispatch) => {
  try {
    dispatch({
      type: actionTypes.SET_NAME_PAGE,
      payload: name,
    });
  }
  catch (e) {
    console.log(e);
  }
}