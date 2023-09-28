import { styled } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'
import { Box, BoxProps, ButtonProps } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

export const HeaderTableCell = styled(TableCell)(() => ({
    fontSize: '16px'
}))

export const BodyTableCell = styled(TableCell)(() => ({
    fontSize: '15px'
}))

export const HeaderPage = styled(Box)<BoxProps>(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 0, 5, 0)
}))

export const ButtonFormSubmit = styled(LoadingButton)<ButtonProps>(({ theme }) => ({
    marginTop: `${theme.spacing(5)}`,
    color: 'white',
    width: '100%'
}))