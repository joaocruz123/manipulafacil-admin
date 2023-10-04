import { actionTypes } from '.'
import { Dispatch } from 'redux'
import api from '@/services/axiosBffInstance'
import { mapAllProfiles } from '@/domain/profiles'

type CitiesTypes = {
  cityId: string,
}

export const ListProfilesByApplicationId = (page: number, search: string) =>
  async (dispatch: Dispatch) => {
    const applicationId = process.env.NEXT_PUBLIC_APLICATION_ADMIN_ID || ''

    try {
      const url = `/api/v1/Profile/${applicationId}/ListProfilesByApplicationId?page=${page}&pageSize=10&search=${search}`
      const response = await api.get(url)
      const data = response.data
      const mappedProfiles = mapAllProfiles(response.data.result)

      console.log(mappedProfiles)
      if (data.success) {
        dispatch(setProfiles({
          ...data,
          result: mappedProfiles
        }))
        dispatch(setAccountsByPharmacyPagination(data.paging))
        return data
      }
      return data
    } catch (e: unknown) {
      console.log(e)
    }
  }

export const ListAddressByAccountId = (accountId: string, page: number = 1) => async (dispatch: Dispatch) => {
  try {
    const url = `/api/v1/AccountAddress/${accountId}/ListAddressByAccountId?page=${page}&pageSize=10`
    const response = await api.get(url)
    const result = response.data

    if (result.success) {
      dispatch(setAddressesByAccount(result))
      return result
    }
    return result
  } catch (e: unknown) {
    console.log(e)
  }
}

export const ChangeStatus = (accountId: string) => async () => {
  try {
    const url = `/api/v1/Account/${accountId}/ChangeStatus`
    const response = await api.put(url)
    const result = response.data

    if (result.success) {
      return result
    }
    return result
  } catch (e: unknown) {
    console.log(e)
  }
}

export const ResetPasswordWithAccountId = (accountId: string, data: any) => async () => {
  try {
    const url = `/api/v1/Account/${accountId}/ResetPasswordWithAccountId`
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


export const GetAddressById = (accountAddressId: any) => async () => {
  try {
    const url = `/api/v1/AccountAddress/${accountAddressId}/GetAddressById`
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

export const InsertAddress = (data: any) => async () => {
  try {
    const url = `/api/v1/AccountAddress/InsertAddress`
    const response = await api.post(url, data)
    const result = response.data

    if (result.success) {
      return result
    }
    return result
  } catch (e: unknown) {
    console.log(e)
  }
}

export const UpdateAddress = ({ accountAddressId, data }: { accountAddressId: any, data: any }) => async () => {
  try {
    const url = `/api/v1/AccountAddress/${accountAddressId}/UpdateAddress`
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

export const DeleteAddress = (accountAddressId: any) => async () => {
  try {
    const url = `/api/v1/AccountAddress/${accountAddressId}/DeleteAddress`
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

export const fetchListStates = () => async (dispatch: Dispatch) => {
  try {
    const url = '/api/v1/Address/GetListStates'
    const { data } = await api.get(url)

    if (data.success) {
      dispatch(setListStates(data))
      return data
    }

    return data
  } catch (e: unknown) {
    console.log(e)
  }
}

export const fetchListCities = (cityId: CitiesTypes) => async (dispatch: Dispatch) => {
  try {
    const url = `/api/v1/Address/${cityId}/GetCitiesByState`
    const { data } = await api.get(url)

    if (data.success) {
      dispatch(setListCities(data))
      return data
    }
  } catch (e: unknown) {
    console.log(e)
  }
}

export const fetchListCitiesSearch = (cityId: CitiesTypes, search: string) => async (dispatch: Dispatch) => {
  try {
    const url = `/api/v1/Address/${cityId}/GetCitiesByState?search=${search}`
    const { data } = await api.get(url)

    if (data.success) {
      dispatch(setListCities(data))
      return data
    }
  } catch (e: unknown) {
    console.log(e)
  }
}

export const setProfiles = (data: any) => ({
  type: actionTypes.GET_ALL_PROFILES,
  payload: data
})

export const setAccountsByPharmacyPagination = (paging: any) => ({
  type: actionTypes.SET_CLIENTS_PAGINATION,
  payload: paging
})

export const setAllProfilesList = (profiles: any) => ({
  type: actionTypes.SET_ALL_PROFILES,
  payload: profiles
})

export const setAddressesByAccount = (addresses: any) => ({
  type: actionTypes.GET_ALL_ADDRESSES_ACCOUNTS,
  payload: addresses
})

const setListStates = (data: object) => ({
  type: actionTypes.SET_LIST_STATE,
  payload: data
})

const setListCities = (data: object) => ({
  type: actionTypes.SET_LIST_CITIES,
  payload: data
})