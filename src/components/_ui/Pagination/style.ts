import { styled } from '@mui/material/styles'
import { Grid, GridProps } from '@mui/material'

export const ContainerPagination = styled(Grid)<GridProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: theme.spacing(4)
}))