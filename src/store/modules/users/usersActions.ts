import { actionTypes } from '.'
import { Dispatch } from 'redux'
import api from '@/services/axiosBffInstance'

export const listAccountByApplicationId = (page: number=1, search: string='') =>
  async (dispatch: Dispatch) => {
    const applicationId = process.env.NEXT_PUBLIC_APLICATION_ADMIN_ID

    try {
      const url = `/api/v1/Account/${applicationId}/ListAccountByApplicationId?page=${page}&pageSize=10&search=${search}`
      const { data } = await api.get(url)

      if (data.success) {
        dispatch(setAccountsByPharmacy(data))
        dispatch(setAccountsByPharmacyPagination(data.paging))
        return data
      }
      return data
    } catch (e: unknown) {
      console.log(e)
    }
  }

export const GetAccountById = (accountId: any) => async () => {
  try {
    const url = `/api/v1/Account/${accountId}/GetAccountById`
    const response = await api.get(url)
    const result = response.data

    if (result.success) {
      return result
    }
    return result
  } catch (e: unknown) {
    console.log(e)
  }
}

export const InsertAccount = (data: any) => async () => {
  try {
    const url = `/api/v1/Account/InsertAccount`
    const response = await api.post(url, data)
    const result = response.data

    if (result.success) {
      return result
    }
    return result
  } catch (e: any) {
    console.log(e)
    return e?.response.data

  }
}

export const UpdateAccount = ({ accountId, data }: { accountId: string, data: any }) => async () => {
  try {
    const url = `/api/v1/Account/${accountId}/UpdateAccount`
    const response = await api.put(url, data)
    const result = response.data

    if (result.success) {
      return result
    }
    return result
  } catch (e: unknown) {
    console.log(e)
  }
}


export const RemoveAccount = (accountId: any) => async () => {
  try {
    const url = `/api/v1/Account/${accountId}/DeleteAccount`
    const response = await api.delete(url)
    const result = response.data

    if (result.success) {
      return result
    }
    return result
  } catch (e: unknown) {
    console.log(e)
  }
}

export const ListProfilesByApplicationId = () =>
  async (dispatch: Dispatch) => {
    try {
      const applicationId = process.env.NEXT_PUBLIC_APLICATION_ADMIN_ID

      const url = `/api/v1/Profile/${applicationId}/ListProfilesByApplicationId`
      const { data } = await api.get(url)

      if (data.success) {
        dispatch(setAllProfilesList(data))
        return data
      }
      return data
    } catch (e: unknown) {
      console.log(e)
    }
  }

export const setAccountsByPharmacy = (data: any) => ({
  type: actionTypes.GET_ALL_USERS,
  payload: data
})

export const setAccountsByPharmacyPagination = (paging: any) => ({
  type: actionTypes.SET_STUDENTS_PAGINATION,
  payload: paging
})

export const setAllProfilesList = (profiles: any) => ({
  type: actionTypes.SET_ALL_PROFILES,
  payload: profiles
})