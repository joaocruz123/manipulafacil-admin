import { styled } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'
import { ButtonProps, Paper, PaperProps, SwitchProps, Switch, Badge, BadgeProps, Alert, AlertProps } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

export const HeaderTableCell = styled(TableCell)(() => ({
  fontSize: '16px'
}))

export const BodyTableCell = styled(TableCell)(() => ({
  fontSize: '15px'
}))

export const HeaderPage = styled(Paper)<PaperProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  margin: theme.spacing(0, 0, 2, 0)
}))

export const BodyPage = styled(Paper)<PaperProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(3),
  margin: theme.spacing(0, 0, 3, 0)
}))

export const ButtonFormSubmit = styled(LoadingButton)<ButtonProps>(({ theme }) => ({
  marginTop: `${theme.spacing(2)}`,
  color: 'white',
  width: '100%'
}))

export const CustomSwitch = styled(Switch)<SwitchProps>(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#4375A9' : '#4375A9',
        opacity: 1,
        border: 0
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5
      }
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#4375A9',
      border: '6px solid #fff'
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600]
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
    }
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500
    })
  }
}))

export const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -20,
    top: -5,
    color: 'white',
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px'
  }
}))

export const CustomAlert = styled(Alert)<AlertProps>(() => ({

}))