'use client'

import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/navigation'
import { NOTIFICATION_TYPE, Store } from 'react-notifications-component'
import { removeMask } from '@/utils'
import { UserSchema } from '@/validators/UserSchema'
import {
  GetAccountById,
  ResetPasswordWithAccountId,
  UpdateAccount
} from '@/store/modules/clients/clientsActions'

import {
  InputText,
  CpfNumberMask,
  CellPhoneMask,
  InputDate
} from '@/components'

import { Box, Button, Grid, Paper } from '@mui/material'
import { LuArrowLeft } from 'react-icons/lu'

import { useAppDispatch } from '@/hooks/useRedux'
import { FormValues } from '@/types/clients'

import { ButtonFormSubmit } from '../style'

const defaultValues = {
  fullName: '',
  cpf: '',
  email: '',
  phone: '',
  birthDate: moment(Date.now())
}

export default function EditCreateClientPage({
  params
}: {
  params: { id: string };
}) {
  const { id } = params
  moment.locale('pt-br')
  const route = useRouter()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<boolean>(false)
  const [formValues, setformValues] = useState(defaultValues)
  const [profileId, setProfileId] = useState('')

  const Alert = ({
    title,
    message,
    type
  }: {
    title: string;
    message: string;
    type: NOTIFICATION_TYPE | undefined;
  }) =>
    Store.addNotification({
      title: title,
      message: message,
      type: type,
      insert: 'top',
      container: 'top-right',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: { duration: 4000 }
    })

  useEffect(() => {
    if (id && id !== 'novo') {
      dispatch(GetAccountById(id))
        .then(response => {
          if (response.success) {
            const values: FormValues = {
              fullName: response.result?.fullName,
              cpf: response.result?.cpfCnpj,
              email: response.result?.email,
              phone: response.result?.mobilePhone,
              birthDate: moment(response.result?.birthDate)
            }
            setProfileId(response.result?.profileId)
            setformValues(values)
          }
        })
        .catch(() =>
          Alert({
            title: 'Error!',
            message: 'Falha ao carregar usuário. Por favor, tente mais tarde!',
            type: 'danger'
          })
        )
    }
  }, [id, dispatch])

  const handleFormValidation = (values: FormValues) => {
    setLoading(true)
    const newValuew = {
      pharmacyId: null,
      email: values.email,
      fullName: values.fullName,
      cpfCnpj: removeMask(values.cpf),
      mobilePhone: removeMask(values.phone),
      birthDate: moment(values.birthDate).format(),
      profileId: profileId
    }

    dispatch(UpdateAccount({ accountId: id, data: newValuew }))
      .then((response: any) => {
        if (response && response.success) {
          setLoading(false)
          Alert({
            title: 'Usuário Editado!',
            message: 'Usuário editado com sucesso!',
            type: 'success'
          })
          setformValues(defaultValues)
          route.push('/clientes')
        } else {
          const erroEmail =
            response.errors &&
            response.errors.find((err: any) => err.code === 'DM004')
          if (erroEmail) {
            setLoading(false)
            return
          }
          setLoading(false)
        }
      })
      .catch(() => {
        Alert({
          title: 'Error!',
          message:
            'Falha ao tentar editar usuário. Por favor, tente mais tarde!',
          type: 'danger'
        })
        setLoading(false)
      })
  }

  const handleNewPassword = () => {
    setLoading(true)

    const data = {
      applicationId: process.env.NEXT_PUBLIC_APLICATION_ID
    }
    dispatch(ResetPasswordWithAccountId(id, data))
      .then((response: any) => {
        if (response && response.success) {
          setLoading(false)
          Alert({
            title: 'Nova senha criada!',
            message: 'Uma nova senha foi criada para o cliente!',
            type: 'success'
          })
          setformValues(defaultValues)
          route.push('/clientes')
        } else {
          const erroEmail =
            response.errors &&
            response.errors.find((err: any) => err.code === 'DM004')
          if (erroEmail) {
            setLoading(false)
            return
          }
          setLoading(false)
        }
      })
      .catch(() => {
        Alert({
          title: 'Error!',
          message:
            'Falha ao tentar criar nova senha. Por favor, tente mais tarde!',
          type: 'danger'
        })
        setLoading(false)
      })
  }
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 0,
          margin: '0 0 20px 0'
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Button
              onClick={() => route.push('/clientes')}
              color='secondary'
              startIcon={<LuArrowLeft />}
            >
              Voltar
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={2}>
        <Grid item md={12} xs={12} sm={12} lg={6} xl={4}>
          <Paper sx={{ padding: '1rem' }}>
            <Formik
              initialValues={formValues}
              enableReinitialize={true}
              validationSchema={UserSchema()}
              onSubmit={(
                values: FormValues,
                { setSubmitting }: FormikHelpers<FormValues>
              ) => {
                handleFormValidation(values)
                setSubmitting(false)
              }}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item md={12} xs={12}>
                    <InputText
                      required
                      size='small'
                      id='fullName'
                      name='fullName'
                      variant='outlined'
                      label='Nome Completo'
                      inputProps={{ maxLength: 200 }}
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <InputText
                      required
                      size='small'
                      type='tel'
                      id='cpf'
                      name='cpf'
                      variant='outlined'
                      label='CPF'
                      InputProps={{
                        maxLength: 12,
                        inputComponent: CpfNumberMask
                      }}
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <InputText
                      required
                      id='email'
                      size='small'
                      name='email'
                      type='email'
                      variant='outlined'
                      label='Email'
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <InputText
                      required
                      type='tel'
                      size='small'
                      id='phone'
                      name='phone'
                      variant='outlined'
                      label='Telefone'
                      InputProps={{
                        maxLength: 14,
                        inputComponent: CellPhoneMask
                      }}
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <InputDate
                      id='birthDate'
                      name='birthDate'
                      variant='outlined'
                      label='Data de Nascimento'
                      disabled={loading}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12} lg={12}>
                    <Grid item xs={12}>
                      <ButtonFormSubmit
                        color='secondary'
                        variant='contained'
                        type='submit'
                        disableElevation
                        loading={loading}
                      >
                        Salvar
                      </ButtonFormSubmit>
                    </Grid>
                    <Grid item xs={12}>
                      <ButtonFormSubmit
                        color='secondary'
                        variant='contained'
                        onClick={() => handleNewPassword()}
                        disableElevation
                        loading={loading}
                      >
                        Enviar nova senha
                      </ButtonFormSubmit>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}
