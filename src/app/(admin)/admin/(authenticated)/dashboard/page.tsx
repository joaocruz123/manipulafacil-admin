"use client"
import { SignOutButton } from "@/components/_ui";
import { useAppDispatch } from "@/hooks/useRedux";
import { getFullProfileAccount } from "@/store/modules/auth/authActions";
import { setModuleProfileAccess } from "@/store/modules/settings/settingsActions";
import { InteractionType } from "@azure/msal-browser";
import { useMsalAuthentication } from "@azure/msal-react";
import { Typography } from "@mui/material";
import { useEffect } from "react";

export default function DashboardPage() {
  useMsalAuthentication(InteractionType.Redirect);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setModuleProfileAccess("admin"));
    setTimeout(() => dispatch(getFullProfileAccount(2)), 3000)
  }, [dispatch])

  return (
    <>
      <Typography>Dashbord Admin</Typography>
      <SignOutButton />
    </>
  )
}