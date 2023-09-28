'use client'

import { useEffect } from 'react'
import { useAppDispatch } from '@/hooks/useRedux'
import { setPageName } from '@/store/modules/pageSettings/pageSettingsActions'
import { InteractionType } from '@azure/msal-browser'
import { useMsalAuthentication } from '@azure/msal-react'
import { Typography } from '@mui/material'

export default function DashboardPage() {
  useMsalAuthentication(InteractionType.Redirect)
  const dispatch = useAppDispatch()


  useEffect(() => {
    dispatch(setPageName('Dashboard'))
  }, [dispatch])

  return (
    <Typography>Dashbord Admin</Typography>
  )
}