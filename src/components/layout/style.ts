import { styled } from '@mui/material/styles'
import { Box, BoxProps, IconButton, IconButtonProps } from '@mui/material'

export const AccountBox = styled(Box)<BoxProps>(() => ({
    padding: '1rem',
    background: '#f7f7f7',
    borderRadius: '10px',
    textAlign: 'center'
}))

export const HeaderIcon = styled(IconButton)<IconButtonProps>(() => ({
    border: '1px solid #E2E2E2',
    marginRight: '.7rem'
}))

export const styleCustom = {
    color: '#707070',
    '&:hover': {
        color: '#707070',
        textDecoration: 'none'
    }
}