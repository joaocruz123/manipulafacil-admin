'use client'

import { LoadingComponent } from '@/components'
import { InteractionType } from '@azure/msal-browser'
import { useIsAuthenticated, useMsalAuthentication } from '@azure/msal-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function HomePage() {
    const route = useRouter()
    const isAuthenticated = useIsAuthenticated()
    useMsalAuthentication(InteractionType.Redirect)

    useEffect(() => {
        if (isAuthenticated) {
            route.push('/dashboard')
        } else {
            route.push('/autenticacao/login')
        }
    }, [isAuthenticated, route])

    return (
        <LoadingComponent loading={true} color='#96C12B' text='Autenticando ...' />
    )
}