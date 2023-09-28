import { Grid, GridProps, Typography, TypographyProps } from '@mui/material'
import { styled } from '@mui/material/styles'

export const containerStyle = {
    backgroundColor: '#F8F8F8',
    width: '100vw',
    height: '100vh'
}

export const BoxForm = styled(Grid)<GridProps>(({ theme }) => ({
    display: 'flex',
    justifyItems: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '4rem',
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: `30px`
}))

export const divContainerStyle = {
    display: 'flex',
    justifyItems: 'center',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center'
}

export const Paragraph = styled(Typography)<TypographyProps>(() => ({
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#393939',
    margin: '.8rem 0'
}))