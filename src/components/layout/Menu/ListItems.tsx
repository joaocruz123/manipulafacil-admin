import * as React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Link, Tooltip } from '@mui/material'
import { styleCustom } from '../style'
import { LuLayoutGrid, LuUsers, LuHeart, LuShieldCheck } from 'react-icons/lu'
import { usePathname } from 'next/navigation'
import { styleCustomMenuItem } from '../style'

const styleMenu = (pathname: string, item: string) => {
  const verifyPathURL = (pathName: string, menu: string) => {
    const url = pathName.indexOf(menu)

    if (url !== -1) {
      return true
    } else {
      return false
    }
  }

  return {
    ...styleCustomMenuItem,
    color: verifyPathURL(pathname, item) ? '#96C12B' : ''
  }
}
const MainListItems = () => {
  const pathname = usePathname()

  return (
    <React.Fragment>
      <Link href='/dashboard' underline='none' sx={styleCustom}>
        <Tooltip title='Painel' placement='right' arrow>
          <ListItemButton sx={styleMenu(pathname, 'dashboard')}>
            <ListItemIcon sx={styleMenu(pathname, 'dashboard')}>
              <LuLayoutGrid />
            </ListItemIcon>
            <ListItemText primary='Painel' />
          </ListItemButton>
        </Tooltip>
      </Link>
      <Link href='/usuarios' underline='none' sx={styleCustom}>
        <Tooltip title='Usuários' placement='right' arrow>
          <ListItemButton sx={styleMenu(pathname, 'usuarios')}>
            <ListItemIcon sx={styleMenu(pathname, 'usuarios')}>
              <LuUsers />
            </ListItemIcon>
            <ListItemText primary='Usuários' />
          </ListItemButton>
        </Tooltip>
      </Link>
      <Link href='/clientes' underline='none' sx={styleCustom}>
        <Tooltip title='Clientes' placement='right' arrow>
          <ListItemButton sx={styleMenu(pathname, 'clientes')}>
            <ListItemIcon sx={styleMenu(pathname, 'clientes')}>
              <LuHeart />
            </ListItemIcon>
            <ListItemText primary='Clientes' />
          </ListItemButton>
        </Tooltip>
      </Link>
      <Link href='/perfis-permissoes' underline='none' sx={styleCustom}>
        <Tooltip title='Perfis e Permissões' placement='right' arrow>
          <ListItemButton sx={styleMenu(pathname, 'perfis-permissoes')}>
            <ListItemIcon sx={styleMenu(pathname, 'perfis-permissoes')}>
              <LuShieldCheck />
            </ListItemIcon>
            <ListItemText primary='Perfis e Permissões' />
          </ListItemButton>
        </Tooltip>
      </Link>
    </React.Fragment>
  )
}

export default MainListItems
