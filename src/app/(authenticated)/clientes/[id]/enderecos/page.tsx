'use client'

import React, { useEffect, useState, useLayoutEffect } from 'react'

import moment from 'moment'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { NOTIFICATION_TYPE, Store } from 'react-notifications-component'

import { useAppDispatch } from '@/hooks/useRedux'
import { setPageName } from '@/store/modules/pageSettings/pageSettingsActions'
import { HeadCell } from '@/types/clients'
import { TableLoading, CustomDialog, PortalPagination } from '@/components'

import {
  Button,
  Divider,
  Tooltip,
  Table,
  TableRow,
  TableBody,
  TableHead,
  IconButton,
  TableSortLabel,
  TableContainer,
  Box,
  Grid,
  Chip
} from '@mui/material'

import { LuPenSquare, LuTrash2 } from 'react-icons/lu'

import {
  BodyPage,
  BodyTableCell,
  CustomAlert,
  HeaderTableCell
} from './../../style'
import { ClientState } from '@/store/modules/clients/clientsReducers'
import {
  DeleteAddress,
  ListAddressByAccountId
} from '@/store/modules/clients/clientsActions'
import { LuArrowLeft } from 'react-icons/lu'

const headCells: readonly HeadCell[] = [
  { id: 'nickname', label: 'Nome' },
  { id: 'cep', label: 'CEP' },
  { id: 'street', label: 'Rua' },
  { id: 'complement', label: 'Complemento' },
  { id: 'neighborhood', label: 'Bairro' },
  { id: 'city', label: 'Cidade' },
  { id: 'state', label: 'Estado' },
  { id: 'actions', label: 'Ações' }
]

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <HeaderTableCell key={headCell.id}>
            <TableSortLabel>{headCell.label}</TableSortLabel>
          </HeaderTableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default function ClientsAddressesPage({
  params
}: {
  params: { id: string };
}) {
  moment.locale('pt-br')
  const { id } = params
  const dispatch = useAppDispatch()
  const [page, setPage] = useState<number>(1)
  const [selectedAddress, setSelectedAddress] = useState<any>(null)
  const [tableLoading, setTableLoading] = useState<boolean>(true)
  const [openRemoveAddress, setOpenRemoveAddress] = useState<boolean>(false)
  const [openRemoveAddressPrincial, setOpenRemoveAddressPrincipal] = useState<boolean>(false)
  const { addresses } = useSelector(ClientState)
  const totalPages = addresses.paging.totalPages
  const route = useRouter()

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

  useLayoutEffect(() => {
    dispatch(setPageName('Clientes'))
  }, [dispatch])

  useEffect(() => {
    dispatch(setPageName('Endereços do Cliente'))
    dispatch(ListAddressByAccountId(id, page)).then(() => {
      setTableLoading(false)
    })
  }, [dispatch])

  const handleClickOpen = () => setOpenRemoveAddress(true)

  const handleClose = () => setOpenRemoveAddress(false)

  
  const handleClickOpenPrincipal = () => setOpenRemoveAddressPrincipal(true)

  const handleClosePrincipal = () => setOpenRemoveAddressPrincipal(false)

  const handleRemoveAddress = (account: any) => {
    setTableLoading(true)
    dispatch(DeleteAddress(account.id))
      .then(response => {
        if (response.success) {
          Alert({
            title: 'Endereço excluido!',
            message: 'Endereço excluido com sucesso!',
            type: 'success'
          })
        }
        dispatch(ListAddressByAccountId(id, page)).then(() => {
          setTableLoading(false)
        })
        setTableLoading(false)
      })
      .catch(() => {
        setTableLoading(false)
        Alert({
          title: 'Error!',
          message:
            'Falha ao tentar excluir endereço. Por favor, tente mais tarde!',
          type: 'danger'
        })
      })
    handleClose()
  }

  const handleChangePagination = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: any
  ) => {
    setPage(value)

    dispatch(ListAddressByAccountId(id, value)).then(() => {
      setTableLoading(false)
    })
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 0,
              margin: '0 0 20px 0'
            }}
          >
            <Button
              onClick={() => route.push('/clientes')}
              color='secondary'
              startIcon={<LuArrowLeft />}
            >
              Voltar
            </Button>
            <Button
              variant='outlined'
              onClick={() => route.push(`/clientes/${id}/enderecos/novo`)}
              color='secondary'
            >
              Novo endereço
            </Button>
          </Box>
        </Grid>
      </Grid>
      {tableLoading ? (
        <TableLoading />
      ) : (
        <>
          {addresses.result && addresses.result.length > 0 ? (
            <BodyPage>
              <TableContainer>
                <Table
                  sx={{ minWidth: 650, fontSize: '16px' }}
                  aria-label='simple table'
                >
                  <EnhancedTableHead />
                  <TableBody>
                    {addresses.result?.map((row: any, index: any) => {
                      return (
                        <TableRow
                          key={index}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 }
                          }}
                        >
                          <BodyTableCell component='th' scope='row'>
                            {row.principal ? (
                              <>
                                {row.nickname}{' '}
                                <Chip
                                  sx={{ color: 'white', fontWeight: 'bold' }}
                                  label='Principal'
                                  variant='filled'
                                  color='primary'
                                  size='small'
                                />
                              </>
                            ) : (
                              row.nickname
                            )}
                          </BodyTableCell>
                          <BodyTableCell>{row.address?.cep}</BodyTableCell>
                          <BodyTableCell>{row.address?.street}</BodyTableCell>
                          <BodyTableCell>
                            {row.address?.complement}
                          </BodyTableCell>
                          <BodyTableCell>
                            {row.address?.neighborhood}
                          </BodyTableCell>
                          <BodyTableCell>
                            {row.address?.city?.name}
                          </BodyTableCell>
                          <BodyTableCell>
                            {row.address?.state?.name}
                          </BodyTableCell>
                          <BodyTableCell sx={{ minWidth: '150px' }}>
                            <Tooltip title='Editar' placement='top' arrow>
                              <IconButton
                                aria-label='edit'
                                color='primary'
                                onClick={() => {
                                  route.push(
                                    `/clientes/${id}/enderecos/${row.id}`
                                  )
                                }}
                              >
                                <LuPenSquare />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title='Chat' placement='top' arrow>
                              <IconButton
                                aria-label='trash'
                                color='error'
                                onClick={() => {
                                  if(row.principal){
                                    handleClickOpenPrincipal()
                                    return
                                  }
                                  setSelectedAddress(row)
                                  handleClickOpen()
                                }}
                              >
                                <LuTrash2 />
                              </IconButton>
                            </Tooltip>
                          </BodyTableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <Divider />
              <PortalPagination
                totalPages={totalPages}
                page={page}
                handleChange={handleChangePagination}
              />
            </BodyPage>
          ) : (
            <BodyPage>
              <CustomAlert severity='info'>
                O cliente não possui endereços cadastrados! Adicione endereços
                clicando no botão de cadastro.
              </CustomAlert>
            </BodyPage>
          )}
        </>
      )}
      <CustomDialog
        title='Excluir endereço!'
        open={openRemoveAddressPrincial}
        maxWidth={'xs'}
        handleClickOpen={handleClickOpenPrincipal}
        handleClose={handleClosePrincipal}
        content={`Não é possivel remover o endereço princial do cliente!`}
        fullWidthValeu={true}
        footer={
          <>
            <Button variant='outlined' onClick={handleClosePrincipal}>
              Fechar
            </Button>
          </>
        }
        icon={false}
        iconType=''
        textAlign='left'
      />
      <CustomDialog
        title='Excluir endereço!'
        open={openRemoveAddress}
        maxWidth={'xs'}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        content={`Deseja excluir o endereço ${selectedAddress?.nickname}? Ele será removido da lista de endereços.`}
        fullWidthValeu={true}
        footer={
          <>
            <Button variant='outlined' onClick={handleClose}>
              Não
            </Button>
            <Button
              variant='outlined'
              color='error'
              onClick={() => handleRemoveAddress(selectedAddress)}
            >
              Excluir
            </Button>
          </>
        }
        icon={false}
        iconType=''
        textAlign='left'
      />
    </>
  )
}
