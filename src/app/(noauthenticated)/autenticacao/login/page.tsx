'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAccount, useIsAuthenticated, useMsal, useMsalAuthentication } from '@azure/msal-react'
import { InteractionType } from '@azure/msal-browser'
import LoadingComponent from '@/components/_ui/Loading'
import { AcquireAccessTokenAdmin } from '@/hooks/useAquiredTokenSilent'
import { setUserAuthData } from '@/store/modules/auth/authActions'
import { useAppDispatch } from '@/hooks/useRedux'

export default function AdminPage() {
  const dispatch = useAppDispatch()
  const route = useRouter()
  const isAuthenticated = useIsAuthenticated()
  useMsalAuthentication(InteractionType.Redirect)
  const { instance, accounts } = useMsal()
  const account = useAccount(accounts[0] || {})

  useEffect(() => {
    if (isAuthenticated && account) {
      AcquireAccessTokenAdmin().then(response => {
        console.log(response)
        dispatch(setUserAuthData(response))
        route.push('/dashboard')
      })
    }
  }, [isAuthenticated, route, instance, account, dispatch])

  return (
    <LoadingComponent loading={true} color='#96C12B' text='' />
  )
}