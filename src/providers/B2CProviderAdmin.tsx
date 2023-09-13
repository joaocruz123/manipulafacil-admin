import * as React from "react";
import { useMsalInstanceAdmin } from "@/hooks/useMsalInstanceAdmin";
import { MsalProvider } from "@azure/msal-react";

export function B2CProviderAdmin({ children }: { children: React.ReactNode }) {
    const msalInstance = useMsalInstanceAdmin()
    return <MsalProvider instance={msalInstance}>
        {children}
    </MsalProvider>;
}
