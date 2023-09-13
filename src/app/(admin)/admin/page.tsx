"use client";
import LoadingComponent from "@/components/_ui/LoadingComponent";
import { useAppDispatch } from "@/hooks/useRedux";
import { setModuleProfileAccess } from "@/store/modules/settings/settingsActions";
import { InteractionType } from "@azure/msal-browser";
import { useIsAuthenticated, useMsalAuthentication } from "@azure/msal-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
    const route = useRouter()
    const isAuthenticated = useIsAuthenticated();
    useMsalAuthentication(InteractionType.Redirect);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isAuthenticated) {
            route.push("/admin/dashboard");
        } else {
            route.push("/admin/autenticacao/login");
        }
    }, [isAuthenticated, route]);

    useEffect(() => {
        dispatch(setModuleProfileAccess("admin"))
    }, [dispatch])

    return (
        <LoadingComponent loading={true} color="#96C12B" text="Autenticando ..." />
    )
}