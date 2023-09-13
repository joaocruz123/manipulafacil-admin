import { Dispatch } from 'redux'
import { actionTypes } from '.'
import withPublicAuthHeader from '@/utils/withAuthHeader'
import { removeMask } from '@/utils'
import publicApi from '@/services/publicApi'
import api from '@/services/axiosBffInstance'
import { mapUserAuthAccess } from '@/domain/users/usersDTO'

//--------------Actions do  Flow de Recuperação de Senha ------------------------
export const getAccessFlowRecoverPassword = () => async (dispatch: Dispatch) => {
  try {
    const credentials = {
      'username': process.env.NEXT_PUBLIC_USER_BFF_TOKEN_VALIDATION,
      'password': process.env.NEXT_PUBLIC_PASSWORD_BFF_TOKEN_VALIDATION
    }
    const url = `/api/v1/Account/TokenValidation/GenerateFlowToken`
    const response = await publicApi.post(url, credentials)
    const data = response.data

    if (data.success) {
      dispatch(setAccessFlowRecover(data.result))
      return data
    }
    return data
  } catch (e: any) {
    console.warn(e)
    return e?.response.data
  }
}

export const sendTokenValidation = ({ emailOrMobilePhone, flow, type }:
  { emailOrMobilePhone: string, flow: number, type: string }) =>
  async (dispatch: Dispatch) => {
    try {
      const body = {
        'applicationId': flow === 1 ? process.env.NEXT_PUBLIC_ADMIN_APP_ID :
          process.env.NEXT_PUBLIC_PHARMACY_APP_ID,
        'verificationCodeType': type === 'email' ? 1 : 2,
        'emailOrMobilePhone': type === 'sms' ?
          removeMask(emailOrMobilePhone) : emailOrMobilePhone
      }
      const url = `/api/v1/Account/SendTokenValidation`
      const response = await publicApi.post(url, body, {
        ...withPublicAuthHeader()
      })
      const data = response.data

      if (data.success) {
        dispatch(setBodyDataRecover(body))
        return data
      }

      return data
    } catch (e: any) {
      console.warn(e)
      return e?.response.data
    }
  }

export const verifyTokenValidation = (bodyData: any) =>
  async (dispatch: Dispatch) => {
    try {
      const url = `/api/v1/Account/VerifyTokenValidation`
      const response = await publicApi.post(url, bodyData, {
        ...withPublicAuthHeader()
      })
      const data = response.data

      if (data.success) {
        dispatch(setBodyDataRecover(bodyData))
        return data
      }
      return data
    } catch (e: any) {
      console.warn(e)
      return e?.response.data
    }
  }

export const resetPasswordWithTokenValidation = (bodyData: any) =>
  async (dispatch: Dispatch) => {
    try {
      const url = `/api/v1/Account/ResetPasswordWithTokenValidation`
      const response = await publicApi.post(url, bodyData, {
        ...withPublicAuthHeader()
      })
      const data = response.data

      if (data.success) {
        dispatch(setBodyDataRecover({}))
        return data
      }
      return data
    } catch (e: unknown) {
      console.log(e)
    }
  }

export const setAccessFlowRecover = (result: String) => ({
  type: actionTypes.SET_ACCESS_TOKEN_FLOW,
  payload: result
})

export const setBodyDataRecover = (body: object) => ({
  type: actionTypes.SET_BODY_DATA_RECOVER,
  payload: body
})

//--------------Actions do  Flow de Recuperação de Senha ------------------------


//--------------Actions de recuperação de dados do usuário ------------------------

export const getFullProfileAccount = (flow: number) =>
  async (dispatch: Dispatch) => {
    const applicationId = flow === 1 ?
      process.env.NEXT_PUBLIC_ADMIN_APP_ID :
      process.env.NEXT_PUBLIC_PHARMACY_APP_ID
    try {
      const url = `/api/v1/Account/${applicationId}/Me`
      const response = await api.get(url)
      const data = response.data

      if (data.success) {
        dispatch(setProfileData(data.result))
        return data
      }
      return data
    } catch (e: unknown) {
      console.log(e)
    }
  }

export const setProfileData = (data: any) => ({
  type: actionTypes.SET_PROFILE_DATA,
  payload: data
})

export const setUserAuthData = (access: any) => ({
  type: actionTypes.SET_USER_AUTH,
  payload: mapUserAuthAccess(access)
})