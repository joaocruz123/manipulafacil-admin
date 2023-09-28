import { ReactNode } from 'react'
import { useMsalInstanceAdmin } from '@/hooks/useMsalInstanceAdmin'
import { MsalProvider } from '@azure/msal-react'

export function B2CProviderPharmacies({ children }: { children: ReactNode }) {
  const msalInstance = useMsalInstanceAdmin()
  return (
    <MsalProvider instance={msalInstance}>
      {children}
    </MsalProvider>
  )
}
