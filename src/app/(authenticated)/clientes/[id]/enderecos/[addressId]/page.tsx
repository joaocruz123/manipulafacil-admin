'use client'

import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Form, Formik, FormikHelpers, useFormikContext } from 'formik'
import { useRouter } from 'next/navigation'
import { NOTIFICATION_TYPE, Store } from 'react-notifications-component'
import {
  GetAddressById,
  InsertAddress,
  UpdateAddress,
  fetchListCities,
  fetchListCitiesSearch,
  fetchListStates
} from '@/store/modules/clients/clientsActions'

import { InputText, CepMask, InputAutoComplete } from '@/components'

import { Box, Button, Grid, Paper } from '@mui/material'
import { LuArrowLeft } from 'react-icons/lu'

import { useAppDispatch } from '@/hooks/useRedux'
import { ButtonFormSubmit } from '../../../style'
import { FormValuesAddress } from '@/types/clients'
import { AutoCompleteAsync } from './AutoCompleteAsync'
import { AddressSchema } from '@/validators/AddressSchema'
import { removeMask } from '@/utils'
import { InputSwitch } from '@/components/_ui/Inputs/InputSwitch'

const defaultValues = {
  cep: '',
  street: '',
  complement: '',
  neighborhood: '',
  number: '',
  city: '',
  state: '',
  nickname: '',
  principal: false
}

export default function EditCreateClientPage({
  params
}: {
  params: { addressId: string; id: string };
}) {
  const { addressId, id } = params
  moment.locale('pt-br')
  const route = useRouter()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<boolean>(false)
  const [formValues, setformValues] = useState(defaultValues)
  const [statesList, setStatesList] = useState<Array<any>>([])
  const [citiesList, setCitiesList] = useState<Array<any>>([])
  const [selectedStateId, setSelectedStateId] = useState<any>(null)

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
    dispatch(fetchListStates()).then(response => {
      if (response.success) {
        setStatesList(
          response.result.map((item: any) => {
            return {
              title: item.name,
              id: item.id
            }
          })
        )
      }
    })
  }, [dispatch])

  useEffect(() => {
    if (selectedStateId) {
      dispatch(fetchListCities(selectedStateId)).then(response => {
        if (response.success) {
          setCitiesList(
            response.result.map((item: any) => {
              return {
                title: item.name,
                id: item.id
              }
            })
          )
        }
      })
    }
  }, [selectedStateId, dispatch])

  const ClientStateCity = () => {
    const {
      values: { state }
    } = useFormikContext<FormValuesAddress>()

    useEffect(() => {
      if (state !== '') {
        setSelectedStateId(state?.id)
      }
    }, [state])

    return null
  }

  useEffect(() => {
    if (addressId && addressId !== 'novo') {
      dispatch(GetAddressById(addressId))
        .then((response: any) => {
          if (response.success) {
            const values: FormValuesAddress = {
              nickname: response.result?.nickname,
              cep: response.result?.address?.cep,
              street: response.result?.address?.street,
              complement: response.result?.address?.complement,
              number: response.result?.address?.number,
              neighborhood: response.result?.address?.neighborhood,
              city: {
                id: response.result?.address?.city?.id,
                title: response.result?.address?.city?.name
              },
              state: {
                id: response.result?.address?.state?.id,
                title: response.result?.address?.state?.name
              },
              principal: response.result?.principal
            }

            setformValues(values)
          }
        })
        .catch(() =>
          Alert({
            title: 'Error!',
            message: 'Falha ao carregar endereço. Por favor, tente mais tarde!',
            type: 'danger'
          })
        )
    }
  }, [addressId, dispatch])

  const handleFormAddress = (values: FormValuesAddress, resetForm: any) => {
    setLoading(true)
    const newValuew = {
      cep: removeMask(values.cep),
      street: values.street,
      complement: values.complement,
      neighborhood: values.neighborhood,
      number: values.number,
      cityId: values.city.id,
      latitude: '',
      longitude: '',
      stateId: values.state.id,
      accountId: id,
      nickname: values.nickname,
      principal: values.principal
    }

    if (addressId && addressId !== 'novo') {
      dispatch(UpdateAddress({ accountAddressId: addressId, data: newValuew }))
        .then((response: any) => {
          if (response && response.success) {
            setLoading(false)
            resetForm()
            Alert({
              title: 'Endereço Editado!',
              message: 'Endereço editado com sucesso!',
              type: 'success'
            })
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
              'Falha ao tentar editar endereço. Por favor, tente mais tarde!',
            type: 'danger'
          })
          setLoading(false)
        })
    } else {
      dispatch(InsertAddress(newValuew))
        .then((response: any) => {
          if (response && response.success) {
            setLoading(false)
            resetForm()
            Alert({
              title: 'Endereço Cadastrado!',
              message: 'Endereço cadastrado com sucesso!',
              type: 'success'
            })
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
              'Falha ao tentar cadastrar endereço. Por favor, tente mais tarde!',
            type: 'danger'
          })
          setLoading(false)
        })
    }
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
              onClick={() => route.push(`/clientes/${id}/enderecos`)}
              color='secondary'
              startIcon={<LuArrowLeft />}
            >
              Voltar
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={2}>
        <Grid item md={12} xs={12} sm={12} lg={12} xl={12}>
          <Paper sx={{ padding: '1rem' }}>
            <Formik
              initialValues={formValues}
              enableReinitialize={true}
              validationSchema={AddressSchema()}
              onSubmit={(
                values: FormValuesAddress,
                { setSubmitting, resetForm }: FormikHelpers<FormValuesAddress>
              ) => {
                handleFormAddress(values, resetForm)
                setSubmitting(false)
              }}
            >
              <Form>
                <Grid container spacing={2}>
                  <ClientStateCity />
                  <Grid item md={6} xs={12}>
                    <InputText
                      required
                      size='small'
                      id='nickname'
                      name='nickname'
                      variant='outlined'
                      label='Apelido'
                      inputProps={{ maxLength: 200 }}
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <InputText
                      required
                      size='small'
                      type='tel'
                      id='cep'
                      name='cep'
                      variant='outlined'
                      label='CEP'
                      InputProps={{
                        maxLength: 9,
                        inputComponent: CepMask
                      }}
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <InputText
                      required
                      id='street'
                      size='small'
                      name='street'
                      type='text'
                      variant='outlined'
                      label='Endereço'
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <InputText
                      size='small'
                      id='complement'
                      name='complement'
                      type='text'
                      variant='outlined'
                      label='Complemento'
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <InputText
                      size='small'
                      id='number'
                      name='number'
                      type='text'
                      variant='outlined'
                      label='Numero'
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <InputText
                      size='small'
                      id='neighborhood'
                      name='neighborhood'
                      type='text'
                      variant='outlined'
                      label='Bairro'
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <InputAutoComplete
                      id='state'
                      name='state'
                      variant='outlined'
                      label='Estado'
                      data={statesList}
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Grid item md={12}>
                      <AutoCompleteAsync
                        id='city'
                        name='city'
                        size='small'
                        variant='outlined'
                        label='Cidade'
                        data={citiesList}
                        handleapi={fetchListCitiesSearch}
                        disabled={loading}
                      />
                    </Grid>
                  </Grid>
                  <Grid item md={12}>
                    <InputSwitch
                      id='principal'
                      name='principal'
                      label='Endereço principal'
                      checked={formValues.principal}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12} lg={12}>
                    <Grid item xs={2}>
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
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}
