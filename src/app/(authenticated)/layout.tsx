'use client'

import { ReactNode } from 'react'

import { Dashboard } from '@/components'
import { B2CProviderAdmin } from '@/providers/B2CProviderAdmin'
import ThemeRegistry from '@/app/ThemeRegistry'
import { ReduxProvider } from '@/providers/ReduxProvider'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'

export default function DashboardLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <ReduxProvider>
      <B2CProviderAdmin>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <ThemeRegistry options={{ key: 'mui' }}>
            <ReactNotifications />
            <Dashboard>{ children }</Dashboard>
            {/* <Alerts /> */}
          </ThemeRegistry>
        </LocalizationProvider>
      </B2CProviderAdmin>
    </ReduxProvider>
  )
}
