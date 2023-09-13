import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { Link, Tooltip } from '@mui/material';
import { styleCustom } from '../style';

const MainListItems = (profileAccess: any) => {
  return (
    <React.Fragment>
      <Link
        href={`/${profileAccess.profileAccess}/dashboard`}
        underline="none"
        sx={styleCustom}
      >
        <Tooltip title="Painel" placement="right" arrow>
          <ListItemButton>
            <ListItemIcon>
              <SpaceDashboardOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Painel" />
          </ListItemButton>
        </Tooltip>
      </Link>
      <Link
        href={`/${profileAccess.profileAccess}/usuarios`}
        underline="none"
        sx={styleCustom}
      >
        <Tooltip title="Usuários" placement="right" arrow>
          <ListItemButton>
            <ListItemIcon>
              <PeopleAltOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Usuários" />
          </ListItemButton>
        </Tooltip>
      </Link>
    </React.Fragment>
  );
}

export default MainListItems;