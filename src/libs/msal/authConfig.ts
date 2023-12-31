import { Configuration, PopupRequest } from '@azure/msal-browser'

export const b2cPoliciesAdmin = {
  names: {
    signUpSignIn: process.env.NEXT_PUBLIC_SIGNIN_ADMIN
  },
  authorities: {
    signUpSignIn: {
      authority: process.env.NEXT_PUBLIC_SIGNIN_ADMIN_PATH
    }
  },
  authorityDomain: process.env.NEXT_PUBLIC_DOMAIN
}

// Config object to be passed to Msal on creation
export const msalConfigAdmin: Configuration = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_CLIENTID_ADMIN as string,
    authority: b2cPoliciesAdmin.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPoliciesAdmin.authorityDomain as string],
    redirectUri: '/',
    postLogoutRedirectUri: '/autenticacao/login'
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false
  }
}

export const apiConfig = {
  scopes: [process.env.NEXT_PUBLIC_SCORE_PATH_ADMIN as string],
  uri: process.env.NEXT_PUBLIC_PATH_URI
}

export const loginRequest: PopupRequest = {
  scopes: ['openid', process.env.NEXT_PUBLIC_SCORE_PATH_ADMIN as string]
}

export const tokenRequest = {
  scopes: [...apiConfig.scopes],
  forceRefresh: false
}
