import * as React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import { Link, Tooltip } from '@mui/material'
import { styleCustom } from '../style'

const MainListItems = () => {
  return (
    <React.Fragment>
      <Link
        href='/dashboard'
        underline='none'
        sx={styleCustom}
      >
        <Tooltip title='Painel' placement='right' arrow>
          <ListItemButton>
            <ListItemIcon>
              <SpaceDashboardOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='Painel' />
          </ListItemButton>
        </Tooltip>
      </Link>
      <Link
        href='/usuarios'
        underline='none'
        sx={styleCustom}
      >
        <Tooltip title='Usuários' placement='right' arrow>
          <ListItemButton>
            <ListItemIcon>
              <PeopleAltOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='Usuários' />
          </ListItemButton>
        </Tooltip>
      </Link>
      <Link
        href='/clientes'
        underline='none'
        sx={styleCustom}
      >
        <Tooltip title='Clientes' placement='right' arrow>
          <ListItemButton>
            <ListItemIcon>
              <FavoriteBorderOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary='Clientes' />
          </ListItemButton>
        </Tooltip>
      </Link>
    </React.Fragment>
  )
}

export default MainListItems