import { Grid, Typography, GridProps, TypographyProps, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

const drawerWidth: number = 290;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  marginLeft: "88px !important",
  width: `calc(100% - 88px)`,
  boxShadow: "none",
  backgroundColor: "transparent",
  // backgroundColor: theme.palette.primary.main,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  // color: theme.palette.secondary.main,
  ...(open && {
    backgroundColor: "transparent",
    // backgroundColor: theme.palette.primary.main,
    boxShadow: "none",
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      padding: theme.spacing(2),
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      // boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);",
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(11),
        },
      }),
    },
  }),
);

export const Wrapper = styled(Grid)<GridProps>(({ theme }) => ({
  borderRadius: `30px`,
  display: `flex`,
  justifyContent: `center`,
}));

export const Title = styled(Typography)<TypographyProps>(({ theme }) => ({
  color: theme.palette.grey[900],
  margin: theme.spacing(2),
  fontWeight: theme.typography.fontWeightBold,
}));
