import { useState, useEffect } from 'react'
import { useMsal } from '@azure/msal-react'
import { AccountInfo } from '@azure/msal-browser'

import {
  EventType,
  EventMessage,
  AuthenticationResult
} from '@azure/msal-browser'

import { b2cPoliciesAdmin } from '@/libs/msal/authConfig'

export const useAuth = () => {
  const { instance } = useMsal()
  const [status, setStatus] = useState<string | null>(null)

  useEffect(() => {
    const callbackId = instance.addEventCallback((event: EventMessage) => {
      const payload = event.payload as AuthenticationResult

      if (
        (event.eventType === EventType.LOGIN_SUCCESS ||
          event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) &&
        payload
      ) {
        // @ts-ignore
        if (payload.idTokenClaims['tfp'] === b2cPoliciesAdmin.names.editProfile) {
          // retrieve the account from initial sing-in to the app
          const originalSignInAccount = instance.getAllAccounts().find(
            (account: AccountInfo) =>
              // @ts-ignore
              account.idTokenClaims.oid === payload.idTokenClaims.oid &&
              // @ts-ignore
              account.idTokenClaims.sub === payload.idTokenClaims.sub &&
              // @ts-ignore
              account.idTokenClaims['tfp'] === b2cPoliciesAdmin.names.signUpSignIn
          )

          let signUpSignInFlowRequest = {
            authority: b2cPoliciesAdmin.authorities.signUpSignIn.authority,
            account: originalSignInAccount
          }

          // silently login again with the signUpSignIn policy
          instance.ssoSilent(signUpSignInFlowRequest)
        }
      }

      if (event.eventType === EventType.SSO_SILENT_SUCCESS && payload.account) {
        setStatus('ssoSilent success')
      }

    })

    return () => {
      if (callbackId) {
        instance.removeEventCallback(callbackId)
      }
    }

    // eslint-disable-next-line
  }, []);

  return status
}
