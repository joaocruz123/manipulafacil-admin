'use client'

import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/navigation'
import { Store } from 'react-notifications-component'
import { useSelector } from 'react-redux'

import { removeMask } from '@/utils'
import { UserSchema } from '@/validators/UserSchema'
import {
  GetAccountById, InsertAccount,
  ListProfilesByApplicationId, UpdateAccount
} from '@/store/modules/users/usersActions'
import { AuthState } from '@/store/modules/auth/authReducers'

import {
  InputText,
  CpfNumberMask,
  CellPhoneMask,
  InputDate
} from '@/components'

import { Button, Grid } from '@mui/material'
import { LuArrowLeft } from 'react-icons/lu'

import { useAppDispatch } from '@/hooks/useRedux'
import { FormValues } from '@/types/users'

import { ButtonFormSubmit, HeaderPage } from '../style'

const defaultValues = {
  fullName: '',
  cpf: '',
  email: '',
  phone: '',
  perfil: '',
  birthDate: moment(Date.now())
}

export default function EditCreateUserPage({ params }: { params: { id: string } }) {
  const { id } = params
  const route = useRouter()
  const dispatch = useAppDispatch()
  // eslint-disable-next-line
  const authState = useSelector(AuthState)
  // eslint-disable-next-line
  const [profiles, setProfiles] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [formValues, setformValues] = useState(defaultValues)

  useEffect(() => {
    if (id && id !== 'novo') {
      dispatch(GetAccountById(id)).then(response => {
        if (response.success) {
          const values: FormValues = {
            fullName: response.result?.fullName,
            cpf: response.result?.cpfCnpj,
            email: response.result?.email,
            phone: response.result?.mobilePhone,
            perfil: response.result?.profileId,
            birthDate: moment(response.result?.birthDate)
          }
          setformValues(values)
        }
      })
      .catch(() => (
        Store.addNotification({
          title: 'Error!',
          message: 'Falha ao carregar usuário. Por favor, tente mais tarde!',
          type: 'danger',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__fadeIn'],
          animationOut: ['animate__animated', 'animate__fadeOut'],
          dismiss: { duration: 4000 }
        })
      ))
    }
  }, [id, dispatch])

  useEffect(() => {
    dispatch(ListProfilesByApplicationId()).then(response => {
      const mappedProfiles = response && response.map((profile: any) => {
        return { value: profile.id, label: profile.name }
      })
      setProfiles(mappedProfiles)
    })
  }, [dispatch])

  const handleFormValidation = (values: FormValues) => {
    setLoading(true)
    if (id && id !== 'novo') {
      const newValuew = {
        'pharmacyId': null,
        'email': values.email,
        'fullName': values.fullName,
        'cpfCnpj': removeMask(values.cpf),
        'mobilePhone': removeMask(values.phone),
        'birthDate': moment(values.birthDate).format(),
        'profileId': process.env.NEXT_PUBLIC_APLICATION_ADMIN_ID
      }

      dispatch(UpdateAccount({ accountId: id, data: newValuew }))
        .then((response: any) => {
          if (response && response.success) {
            setLoading(false)
            Store.addNotification({
              title: 'Usuário Editado!',
              message: 'Usuário editado com sucesso!',
              type: 'success',
              insert: 'top',
              container: 'top-right',
              animationIn: ['animate__animated', 'animate__fadeIn'],
              animationOut: ['animate__animated', 'animate__fadeOut'],
              dismiss: { duration: 4000 }
            })
            setformValues(defaultValues)
          } else {
            const erroEmail = response.errors &&
              response.errors.find((err: any) => err.code === 'DM004')
            if (erroEmail) {
              setLoading(false)
              return
            }
            setLoading(false)
          }
        })
        .catch(() => {
          Store.addNotification({
            title: 'Error!',
            message: 'Falha ao tentar editar usuário. Por favor, tente mais tarde!',
            type: 'danger',
            insert: 'top',
            container: 'top-right',
            animationIn: ['animate__animated', 'animate__fadeIn'],
            animationOut: ['animate__animated', 'animate__fadeOut'],
            dismiss: { duration: 4000 }
          })

          setLoading(false)
        })
    } else {
      const newValuew = {
        'email': values.email,
        'fullName': values.fullName,
        'cpfCnpj': removeMask(values.cpf),
        'mobilePhone': removeMask(values.phone),
        'birthDate': moment(values.birthDate).format()
      }
      dispatch(InsertAccount(newValuew))
        .then((response: any) => {
          if (response && response.success) {
            setLoading(false)
            setformValues(defaultValues)
            Store.addNotification({
              title: 'Usuário Cadastrado!',
              message: 'Usuário cadastrado com sucesso!',
              type: 'success',
              insert: 'top',
              container: 'top-right',
              animationIn: ['animate__animated', 'animate__fadeIn'],
              animationOut: ['animate__animated', 'animate__fadeOut'],
              dismiss: { duration: 4000 }
            })
          } else {
            const erroEmail = response.errors &&
              response.errors.find((err: any) => err.code === 'DM004')
            if (erroEmail) {
              setLoading(false)
              return
            }
            setLoading(false)
          }
        })
        .catch(() => {
          Store.addNotification({
            title: 'Error!',
            message: 'Falha ao tentar cadastrar usuário. Por favor, tente mais tarde!',
            type: 'danger',
            insert: 'top',
            container: 'top-right',
            animationIn: ['animate__animated', 'animate__fadeIn'],
            animationOut: ['animate__animated', 'animate__fadeOut'],
            dismiss: { duration: 4000 }
          })

          setLoading(false)
        })
    }
  }

  return (<>
    <HeaderPage>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Button onClick={() => route.push('/usuarios')}
            color='secondary' startIcon={<LuArrowLeft />}>Voltar</Button>
        </Grid>
      </Grid>
    </HeaderPage>
    <Formik
      initialValues={formValues}
      enableReinitialize={true}
      validationSchema={UserSchema()}
      onSubmit={(values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        handleFormValidation(values)
        setSubmitting(false)
      }}
    >
      <Form>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <InputText
              required
              id='fullName'
              name='fullName'
              variant='outlined'
              label='Nome Completo'
              inputProps={{ maxLength: 200 }}
              disabled={loading}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <InputText
              required
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
          <Grid item md={6} xs={12}>
            <InputText
              required
              id='email'
              name='email'
              type='email'
              variant='outlined'
              label='Email'
              disabled={loading}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <InputText
              required
              type='tel'
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
          <Grid item xs={12} md={6}>
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
          <Grid item xs={12} md={4} lg={2}>
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
          </Grid>
        </Grid>
      </Form>
    </Formik>

  </>)
}