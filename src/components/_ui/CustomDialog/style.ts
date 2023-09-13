import { styled } from '@mui/material/styles'
import DialogTitle, { DialogTitleProps } from '@mui/material/DialogTitle'
import { Box, BoxProps } from '@mui/material'

export const CustomDialogTitle = styled(DialogTitle)<DialogTitleProps>(({ theme }) => ({
    color: `${theme.palette.secondary.main}`
}))

export const IconBox = styled(Box)<BoxProps>(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    paddingTop: `${theme.spacing(4)}`
}))