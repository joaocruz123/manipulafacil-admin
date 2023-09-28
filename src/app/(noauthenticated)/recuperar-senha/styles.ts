import { Grid, GridProps, Button, ButtonProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import LoadingButton from '@mui/lab/LoadingButton'

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
    padding: '1rem',
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: `30px`
}))

export const BoxContador = styled(Grid)<GridProps>(() => ({
    display: 'flex',
    justifyItems: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '1rem 0'
}))

export const divContainerStyle = {
    display: 'flex',
    justifyItems: 'center',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center'
}
export const boxForm = {
    mt: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
}

export const ButtonFormSubmit = styled(LoadingButton)<ButtonProps>(({ theme }) => ({
    marginTop: `${theme.spacing(2)}`,
    color: 'white',
    width: '100%'
}))

export const ButtonFormBack = styled(Button)<ButtonProps>(({ theme }) => ({
    marginTop: `${theme.spacing(1)}`,
    width: '100%'
}))