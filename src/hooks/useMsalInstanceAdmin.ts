import {
  PublicClientApplication,
  EventType,
  EventMessage,
  AuthenticationResult
} from '@azure/msal-browser'

import { msalConfigAdmin } from '@/libs/msal/authConfig'

export const useMsalInstanceAdmin = () => {
  const msalInstance = new PublicClientApplication(msalConfigAdmin)

  const accounts = msalInstance.getAllAccounts()
  if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0])
  }

  msalInstance.enableAccountStorageEvents()
  msalInstance.addEventCallback((event: EventMessage) => {
    if (
      event.eventType === EventType.LOGIN_SUCCESS ||
      event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS ||
      event.eventType === EventType.SSO_SILENT_SUCCESS
    ) {
      const payload = event.payload as AuthenticationResult
      const account = payload.account
      msalInstance.setActiveAccount(account)
    }
  })

  return msalInstance
}
