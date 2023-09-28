import { ChangeEvent } from 'react'
import { InputText } from '@/components/_ui/Inputs/InputText'
import { Wrapper } from '@/styles/general'
import { RecoverPasswordSchema } from '@/validators/RecoverPasswordSchema'
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  Button
} from '@mui/material'
import { Form, Formik, FormikHelpers } from 'formik'
import { useState } from 'react'
import { BoxForm, ButtonFormBack, ButtonFormSubmit, boxForm } from '../styles'
import { CellPhoneMask } from '@/components/_ui/Masks/CellPhoneMask'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/hooks/useRedux'
import { sendTokenValidation } from '@/store/modules/auth/authActions'
import { CustomDialog } from '@/components'

type FormValues = {
  email: string;
  phone: string;
};

interface Props {
  // eslint-disable-next-line
  handleStartCounter: (value: boolean) => void;
  handleNextStep: () => void;
}

const StepEmailPhone = ({ handleNextStep, handleStartCounter }: Props) => {
  const route = useRouter()
  const dispatch = useAppDispatch()
  const [valueTokenType, setValueTokenType] = useState<string>('email')
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [dialogContent, setDialogContent] = useState<string>('')

  const handleChangeTokenType = (event: ChangeEvent<HTMLInputElement>) => {
    setValueTokenType((event.target as HTMLInputElement).value)
  }

  const handleFormValidation = (values: FormValues) => {
    setLoading(true)
    const emailOrMobilePhone =
      valueTokenType === 'email' ? values.email : values.phone
    dispatch(
      sendTokenValidation({
        emailOrMobilePhone: emailOrMobilePhone,
        type: valueTokenType
      })
    ).then((response: any) => {
      if (response && response.success) {
        handleNextStep()
        handleStartCounter(true)
        setLoading(false)
      } else {
        const erroEmail =
          response.errors &&
          response.errors.find((err: any) => err.code === 'DM004')
        if (erroEmail) {
          setDialogContent(
            erroEmail.message || 'Registro não encontrado na base.'
          )
          setOpen(true)
          setLoading(false)

          return
        }
        route.push('/server-error')
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
          Recuperar Senha
        </Typography>
        <Box sx={boxForm}>
          <Formik
            initialValues={{
              email: '',
              phone: ''
            }}
            validationSchema={RecoverPasswordSchema(valueTokenType)}
            onSubmit={(
              values: FormValues,
              { setSubmitting }: FormikHelpers<FormValues>
            ) => {
              handleFormValidation(values)
              setSubmitting(false)
            }}
          >
            <Form>
              <Wrapper container columnGap={16}>
                <Grid item xs={12} md={6}>
                  <Grid container direction={'column'}>
                    <Grid item md={12}>
                      <FormControl>
                        <RadioGroup
                          aria-labelledby='controlled-radio-buttons-group-token-email'
                          name='controlled-radio-buttons-group-token-email'
                          value={valueTokenType}
                          onChange={handleChangeTokenType}
                        >
                          <FormControlLabel
                            value='email'
                            control={<Radio />}
                            label='Enviar token por e-mail'
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    {valueTokenType === 'email' && (
                      <Grid item md={12}>
                        <InputText
                          id='email'
                          name='email'
                          type='email'
                          variant='outlined'
                          label='Email'
                          disabled={valueTokenType !== 'email'}
                          fullWidth
                        />
                      </Grid>
                    )}
                    <Grid item md={12}>
                      <FormControl>
                        <RadioGroup
                          aria-labelledby='controlled-radio-buttons-group-token-sms'
                          name='controlled-radio-buttons-group-token-sms'
                          value={valueTokenType}
                          onChange={handleChangeTokenType}
                        >
                          <FormControlLabel
                            value='sms'
                            control={<Radio />}
                            label='Enviar token por SMS'
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    {valueTokenType === 'sms' && (
                      <Grid item md={12}>
                        <InputText
                          type='tel'
                          id='phone'
                          name='phone'
                          variant='outlined'
                          label='Telefone celular'
                          disabled={valueTokenType !== 'sms'}
                          InputProps={{
                            maxLength: 14,
                            inputComponent: CellPhoneMask
                          }}
                        />
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Wrapper>
              <Wrapper container>
                <Grid item xs={12} md={6}>
                  <Grid item xs={12}>
                    <ButtonFormSubmit
                      color='primary'
                      variant='contained'
                      type='submit'
                      disableElevation
                      loading={loading}
                    >
                      Continuar
                    </ButtonFormSubmit>
                  </Grid>
                  <Grid item xs={12}>
                    <ButtonFormBack
                      color='secondary'
                      onClick={() => route.push('/autenticacao/login')}
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
          title='E-mail/Telefone não registrado!'
          open={open}
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

export default StepEmailPhone
