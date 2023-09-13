import * as React from 'react'
import { useMsalInstancePharmacies } from '@/hooks/useMsalInstancePharmacies'
import { MsalProvider } from '@azure/msal-react'

export function B2CProviderPharmacies({ children }: { children: React.ReactNode }) {
    const msalInstance = useMsalInstancePharmacies()
    return (<MsalProvider instance={msalInstance}>
        {children}
    </MsalProvider>)
}
