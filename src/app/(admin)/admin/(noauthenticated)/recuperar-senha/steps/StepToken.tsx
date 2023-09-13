import { InputText } from '@/components/_ui/Inputs/InputText'
import { Wrapper } from '@/styles/general'
import { RecoverPasswordTokenSchema } from '@/validators/RecoverPasswordSchema'
import { Alert, Box, Button, Grid, Stack, Typography } from '@mui/material'
import { Form, Formik, useFormikContext } from 'formik'
import { useState, useRef, useEffect } from 'react'
import { BoxContador, BoxForm, ButtonFormBack, ButtonFormSubmit, boxForm } from '../styles'
import { useSelector } from 'react-redux'
import { AuthState } from '@/store/modules/auth/authReducers'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/hooks/useRedux'
import { sendTokenValidation, verifyTokenValidation } from '@/store/modules/auth/authActions'
import CustomDialog from '@/components/_ui/CustomDialog'

type FormValues = { token: string; }

interface Props {
  startCounter: boolean;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

const StepToken = ({ startCounter, handleNextStep, handlePreviousStep }: Props) => {
  const Ref = useRef<any | null>(null)
  const route = useRouter()
  const authState = useSelector(AuthState)
  const dispatch = useAppDispatch()

  const [timer, setTimer] = useState<string>('0')
  const [controllerSubmit, setControllerSubmit] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [counterClink, setCounterClick] = useState<number>(0)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [dialogContent, setDialogContent] = useState<string>('')

  const AutoSubmitToken = () => {
    const { values, submitForm } = useFormikContext<FormValues>()
    useEffect(() => {
      if (values?.token.length === 6 && controllerSubmit) {
        submitForm()
      }
    }, [values, submitForm])
    return null
  }

  const handleClickOpen = () => {
    setOpenDialog(true)
  }

  const handleClose = () => {
    setOpenDialog(false)
  }

  const getTimeRemaining = (e: string): {
    total: number,
    hours: number,
    minutes: number,
    seconds: number
  } => {
    const total: number = Date.parse(e) - Date.parse(new Date().toString())
    const seconds: number = Math.floor((total / 1000) % 60)
    const minutes: number = Math.floor((total / 1000 / 60) % 60)
    const hours: number = Math.floor((total / 1000 / 60 / 60) % 24)
    return {
      total,
      hours,
      minutes,
      seconds
    }
  }

  const startTimer = (e: any) => {
    let { total, seconds } =
      getTimeRemaining(e)
    if (total >= 0) {
      setTimer(`${(seconds)}`)
    }
  }

  const clearTimer = (e: any) => {
    setTimer('60')
    if (Ref.current) clearInterval(Ref.current)
    const id = setInterval(() => {
      startTimer(e)
    }, 1000)
    Ref.current = id
  }

  const getDeadTime = () => {
    let deadline = new Date()
    deadline.setSeconds(deadline.getSeconds() + 60)
    return deadline
  }

  useEffect(() => {
    if (startCounter) {
      clearTimer(getDeadTime())
    }
  }, [startCounter])

  const resetCounter = () => {
    clearTimer(getDeadTime())
  }

  const handleFormVerifyTokenValidation = (values: FormValues) => {
    setLoading(true)

    const bodyData = {
      ...authState?.recoverPassword?.bodyAPI,
      'codeToVerify': values.token
    }

    dispatch(verifyTokenValidation(bodyData))
      .then((response: any) => {
        if (response && response.success) {
          handleNextStep()
          setLoading(false)
        } else {
          const erroRegister = response.errors &&
            response.errors.find((err: any) => err.code === 'TV001')
          if (erroRegister) {
            setDialogContent(erroRegister.message ||
              'Não foi possivel validar o token.')
            setOpenDialog(true)
            setLoading(false)
            setControllerSubmit(true)
            setTimer('0')

            return
          }

          route.push('/farmacias/server-error')
          setLoading(false)
        }
      })
  }

  const resendTokenValidation = () => {
    setCounterClick(counterClink + 1)
    const emailOrMobilePhone = authState?.recoverPassword?.bodyAPI?.emailOrMobilePhone || ''
    const selectedFlow = authState?.recoverPassword?.bodyAPI?.selectedFlow || ''
    const valueTokenType = authState?.recoverPassword?.bodyAPI?.verificationCodeType || ''
    dispatch(sendTokenValidation({
      emailOrMobilePhone: emailOrMobilePhone,
      flow: selectedFlow,
      type: valueTokenType == 1 ? 'email' : 'sms'
    }))
      .then((response: any) => {
        if (response && response.success) {
          resetCounter()
          setLoading(false)
        } else {
          route.push('/farmacias/server-error')
          setLoading(false)
        }
      })
  }

  return (
    <>
      <BoxForm>
        <Typography component='h1' variant='h6' color={'secondary'}>
          Insira o token para redefinir a senha
        </Typography>
        {counterClink == 2 && <Stack sx={{ width: '80%', marginTop: 2 }} spacing={2}>
          <Alert severity='info'>Com dificuldade de realizar a redefinição de senha? Entre em contato conosco através do
            <strong> (99) 99999-9999</strong> para te ajudarmos a recuperar sua senha</Alert>
        </Stack>}
        <Box sx={boxForm}>
          <Formik
            initialValues={{
              token: ''
            }}
            validationSchema={RecoverPasswordTokenSchema}
            onSubmit={(values: FormValues, { resetForm }) => {
              setControllerSubmit(false)
              handleFormVerifyTokenValidation(values)
              setTimeout(() => { resetForm() }, 1000)
            }}
          >
            <Form>
              <Wrapper container columnGap={16}>
                <Grid item xs={12} md={6}>
                  <Grid container direction={'column'}>
                    <Grid item md={12}>
                      <InputText
                        required
                        id='token'
                        name='token'
                        type='number'
                        variant='outlined'
                        label='Informe o token recebido:'
                        fullWidth
                        disabled={loading}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <AutoSubmitToken />
              </Wrapper>
              <BoxContador>
                <Typography textAlign={'center'} maxWidth={'300px'}>
                  Não recebeu? Você pode solicitar um novo token em <strong>{timer}s</strong>
                </Typography>
              </BoxContador>
              <Wrapper container >
                <Grid item xs={12} md={6}>
                  <Grid item xs={12}>
                    <ButtonFormSubmit
                      color='primary'
                      variant='contained'
                      onClick={() => resendTokenValidation()}
                      disableElevation
                      disabled={timer !== '0'}
                    >
                      Solicitar novo token
                    </ButtonFormSubmit>
                  </Grid>
                  <Grid item xs={12}>
                    <ButtonFormBack
                      color='secondary'
                      onClick={() => handlePreviousStep()}
                      disableElevation
                    >
                      Voltar
                    </ButtonFormBack>
                  </Grid>
                </Grid>
              </Wrapper>
            </Form>
          </Formik>
        </Box>
        <CustomDialog
          title='Token inválido'
          open={openDialog}
          maxWidth={'xs'}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          content={<Typography>{dialogContent}</Typography>}
          fullWidthValeu={true}
          footer={<Button onClick={handleClose}>Entendi</Button>}
          icon={true}
          iconType='error'
          textAlign='center'
        />
      </BoxForm>
    </>
  )
}

export default StepToken
