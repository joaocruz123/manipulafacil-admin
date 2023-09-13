import { UseSelector } from "react-redux/es/hooks/useSelector";
import { actionTypes } from ".";
import { Dispatch } from "redux";
import { mapAllPharmaciesUsers, mapAllprofilesUsers } from "@/domain/users/usersDTO";
import api from "@/services/axiosBffInstance";
import { AuthState } from "../auth/authReducers";

export const listAccountByPharmacyId = (page: number, search: string) =>
  async (dispatch: Dispatch, getState: UseSelector) => {
    const state = getState(AuthState);
    const pharmacyId = state.auth && state.auth.profile.pharmacyId

    try {
      const url = `/api/v1/Account/${pharmacyId}/ListAccountByPharmacyId?page=${page}&pageSize=10&search=${search}`;
      const response = await api.get(url);
      const data = response.data;
      const users = mapAllPharmaciesUsers(data.result);

      if (data.success) {
        dispatch(setAccountsByPharmacy(users))
        dispatch(setAccountsByPharmacyPagination(data.paging))
        return users;
      }
      return users;
    } catch (e: unknown) {
      console.log(e);
    }
  }

export const ListAccountByApplicationId = (search: string) =>
  async (dispatch: Dispatch, getState: UseSelector) => {
    const state = getState(AuthState);
    const pharmacyId = state.auth && state.auth.profile.pharmacyId
    try {
      const url = `/api/v1/Account/${pharmacyId}/ListAccountByPharmacyId?search=${search}`;
      const response = await api.get(url);
      const data = response.data;
      const users = mapAllPharmaciesUsers(data.result);

      if (data.success) {
        dispatch(setAccountsByPharmacy(users))
        return users;
      }
      return users;
    } catch (e: unknown) {
      console.log(e);
    }
  }

export const GetAccountById = (accountId: any) => async () => {
  try {
    const url = `/api/v1/Account/${accountId}/GetAccountById`;
    const response = await api.get(url);
    const result = response.data;

    if (result.success) {
      return result;
    }
    return result;
  } catch (e: unknown) {
    console.log(e);
  }
}

export const InsertAccount = (data: any) => async () => {
  try {
    const url = `/api/v1/Account/InsertAccount`;
    const response = await api.post(url, data);
    const result = response.data;

    if (result.success) {
      return result;
    }
    return result;
  } catch (e: any) {
    console.log(e);
    return e?.response.data;

  }
}

export const UpdateAccount = ({ accountId, data }: { accountId: string, data: any }) => async () => {
  try {
    const url = `/api/v1/Account/${accountId}/UpdateAccount`;
    const response = await api.put(url, data);
    const result = response.data;

    if (result.success) {
      return result;
    }
    return result;
  } catch (e: unknown) {
    console.log(e);
  }
}


export const RemoveAccount = (accountId: any) => async () => {
  try {
    const url = `/api/v1/Account/${accountId}/DeleteAccount`;
    const response = await api.delete(url);
    const result = response.data;

    if (result.success) {
      return result;
    }
    return result;
  } catch (e: unknown) {
    console.log(e);
  }
}

export const ListProfilesByApplicationId = (flow: number) =>
  async (dispatch: Dispatch) => {
    try {
      const applicationId = flow === 1 ?
        process.env.NEXT_PUBLIC_ADMIN_APP_ID :
        process.env.NEXT_PUBLIC_PHARMACY_APP_ID

      const url = `/api/v1/Profile/${applicationId}/ListProfilesByApplicationId`;
      const response = await api.get(url);
      const result = mapAllprofilesUsers(response.data.result);

      if (response.data.success) {
        dispatch(setAllProfilesList(result));
        return result;
      }
      return result;
    } catch (e: unknown) {
      console.log(e);
    }
  }

export const setAccountsByPharmacy = (data: any) => ({
  type: actionTypes.GET_ALL_USERS,
  payload: data,
});

export const setAccountsByPharmacyPagination = (paging: any) => ({
  type: actionTypes.SET_STUDENTS_PAGINATION,
  payload: paging,
});

export const setAllProfilesList = (profiles: any) => ({
  type: actionTypes.SET_ALL_PROFILES,
  payload: profiles,
});