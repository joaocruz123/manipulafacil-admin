import { InputText } from '@/components/_ui/Inputs/InputText'
import { Wrapper } from '@/styles/general'
import { NewPasswordSchema } from '@/validators/RecoverPasswordSchema'
import { Box, Grid, Typography, Button, Link } from '@mui/material'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import { BoxForm, ButtonFormSubmit, boxForm } from '../styles'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { AuthState } from '@/store/modules/auth/authReducers'
import { useAppDispatch } from '@/hooks/useRedux'
import { resetPasswordWithTokenValidation } from '@/store/modules/auth/authActions'
import CustomDialog from '@/components/_ui/CustomDialog'

type FormValues = {
  password: string;
  confirmPassword: string;
}

const StepNewPassword = () => {
  const route = useRouter()
  const authState = useSelector(AuthState)
  const dispatch = useAppDispatch()

  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  const handleResetPasswordWithTokenValidation = (values: FormValues) => {
    setLoading(true)
    const bodyData = {
      ...authState?.recoverPassword?.bodyAPI,
      'password': values?.password,
      'confirmPassword': values?.confirmPassword
    }

    dispatch(resetPasswordWithTokenValidation(bodyData))
      .then((response: any) => {
        if (response && response.success) {
          handleClickOpen()
          setLoading(false)

          setTimeout(() => { route.push('/farmacias/autenticacao/login') }, 7000)
        } else {
          route.push('/farmacias/server-error')
          setLoading(false)
        }
      })

  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <BoxForm>
        <Typography component='h1' variant='h6' color={'secondary'}>
          Informe a nova senha
        </Typography>
        <Box sx={boxForm}>
          <Formik
            initialValues={{
              password: '',
              confirmPassword: ''
            }}
            validationSchema={NewPasswordSchema}
            onSubmit={(values: FormValues) => {
              handleResetPasswordWithTokenValidation(values)
            }}
          >
            <Form>
              <Wrapper container columnGap={16}>
                <Grid item xs={12} md={6}>
                  <Grid container direction={'column'}>
                    <Grid item md={12}>
                      <InputText
                        required
                        id='password'
                        name='password'
                        type='password'
                        variant='outlined'
                        label='Nova senha'
                        fullWidth
                        disabled={loading}
                      />
                    </Grid>
                    <Grid item md={12}>
                      <InputText
                        required
                        id='confirmPassword'
                        name='confirmPassword'
                        type='password'
                        variant='outlined'
                        label='confirmar nova senha'
                        fullWidth
                        disabled={loading}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Wrapper>
              <Wrapper container >
                <Grid item xs={12} md={6}>
                  <Grid item xs={12}>
                    <ButtonFormSubmit
                      color='primary'
                      variant='contained'
                      type='submit'
                      disableElevation
                      loading={loading}
                    >
                      Redefinir Senha
                    </ButtonFormSubmit>
                  </Grid>
                </Grid>
              </Wrapper>
            </Form>
          </Formik>
        </Box>
        <CustomDialog
          title='Senha alterada com sucesso!'
          open={open}
          maxWidth={'xs'}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          content={<>
            <Typography>Senha alterada com sucesso! Para acessar o sistema basta inserir sua nova senha na tela de login.
              Você será redirecionado automaticamente, mas caso isso não aconteça <Link href='/farmacias/autenticacao/login'>clique aqui</Link>.
            </Typography>
          </>}
          fullWidthValeu={true}
          footer={<Button onClick={handleClose}>Entendi</Button>}
          icon={true}
          iconType='success'
          textAlign='center'
        />
      </BoxForm>
    </>
  )
}

export default StepNewPassword
