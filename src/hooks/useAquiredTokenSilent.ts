import { msalConfigAdmin, msalConfigPharmacies } from '@/libs/msal/authConfig'
import { PublicClientApplication } from '@azure/msal-browser'

const AcquireAccessTokenPharmacy = async () => {
  const msalInstance = new PublicClientApplication(msalConfigPharmacies)
  const activeAccount = msalInstance.getActiveAccount()
  const accounts = msalInstance.getAllAccounts()

  if (!activeAccount && accounts.length === 0) {
    throw new Error('Unauthenticated')
  }
  const request = {
    scopes: [process.env.NEXT_PUBLIC_SCORE_PATH_PHARMACY as string],
    account: activeAccount || accounts[0]
  }

  const authResult = await msalInstance.acquireTokenSilent(request)

  return authResult
}

const AcquireAccessTokenAdmin = async () => {
  const msalInstance = new PublicClientApplication(msalConfigAdmin)
  const activeAccount = msalInstance.getActiveAccount()
  const accounts = msalInstance.getAllAccounts()

  if (!activeAccount && accounts.length === 0) {
    throw new Error('Unauthenticated')
  }
  const request = {
    scopes: [process.env.NEXT_PUBLIC_SCORE_PATH_ADMIN as string],
    account: activeAccount || accounts[0]
  }

  const authResult = await msalInstance.acquireTokenSilent(request)

  return authResult
}

export {
  AcquireAccessTokenAdmin,
  AcquireAccessTokenPharmacy
}