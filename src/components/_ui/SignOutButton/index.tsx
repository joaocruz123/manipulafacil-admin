import { useMsal } from '@azure/msal-react'
import LogoutIcon from '@mui/icons-material/Logout'
import { HeaderIcon } from '../../layout/style'
import { Tooltip } from '@mui/material'

export const SignOutButton = () => {
  const { instance } = useMsal()
  return (
    <div>
      <Tooltip title='Sair' placement='bottom' arrow>
        <HeaderIcon color='inherit' onClick={() => {
          instance.logoutRedirect()
            .catch(e => {
              console.error(`logoutRedirect failed: ${e}`)
            })
        }} >
          <LogoutIcon />
        </HeaderIcon>
      </Tooltip>
    </div>
  )
}