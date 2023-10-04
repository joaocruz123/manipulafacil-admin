'use client'

import React, { useEffect, useState, useLayoutEffect } from 'react'

import moment from 'moment'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { NOTIFICATION_TYPE, Store } from 'react-notifications-component'

import { useAppDispatch } from '@/hooks/useRedux'
import { setPageName } from '@/store/modules/pageSettings/pageSettingsActions'
import SearchIcon from '@mui/icons-material/Search'
import { TableLoading, CustomDialog, PortalPagination } from '@/components'

import {
  Grid,
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
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput
} from '@mui/material'

import { LuPenSquare, LuMessageSquare, LuMapPin } from 'react-icons/lu'

import {
  BodyPage,
  BodyTableCell,
  CustomSwitch,
  HeaderPage,
  HeaderTableCell
} from './style'
import {
  ChangeStatus,
  ListAccountByApplicationId
} from '@/store/modules/clients/clientsActions'
import { ListProfilesByApplicationId } from '@/store/modules/roles/rolesActions'
import { HeadCellProfiles } from '@/types/profiles'
import { RolesState } from '@/store/modules/roles/rolesReducers'

const headCells: readonly HeadCellProfiles[] = [
  { id: 'name', label: 'Perfil' },
  { id: 'budget', label: 'Orçamento' },
  { id: 'clients', label: 'Clientes' },
  { id: 'financial', label: 'Financeiro' },
  { id: 'users', label: 'Usuários' },
  { id: 'administrative', label: 'Administrativo' },
  { id: 'log', label: 'Log' },
  { id: 'active', label: 'Status' },
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

export default function ClientsPage() {
  moment.locale('pt-br')
  const dispatch = useAppDispatch()
  const [search, setSearch] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [selectedClient, setselectedClient] = useState<any>(null)
  const [tableLoading, setTableLoading] = useState<boolean>(true)
  const [openActiveAccount, setOpenActiveAccount] = useState<boolean>(false)
  const [openDesableAccount, setOpenDisableAccount] = useState<boolean>(false)
  const { profiles } = useSelector(RolesState)
  const totalPages = profiles.paging.totalPages
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
    dispatch(setPageName('Perfis e Permissões'))
  }, [dispatch])

  useEffect(() => {
    dispatch(ListProfilesByApplicationId(page, search)).then(() => {
      setTableLoading(false)
    })
  }, [dispatch])

  const handleClickOpenDisable = () => setOpenDisableAccount(true)

  const handleCloseDisable = () => setOpenDisableAccount(false)

  const handleClickOpenActive = () => setOpenActiveAccount(true)

  const handleCloseActive = () => setOpenActiveAccount(false)

  const handleStatusAccount = (account: any) => {
    setTableLoading(true)
    dispatch(ChangeStatus(account.id))
      .then(response => {
        if (response.success) {
          if (response.result?.active) {
            Alert({
              title: 'Cliente Ativado!',
              message: 'Cliente ativado com sucesso!',
              type: 'success'
            })
          } else {
            Alert({
              title: 'Cliente Desativado!',
              message: 'Cliente desativado com sucesso!',
              type: 'success'
            })
          }
        }
        dispatch(ListAccountByApplicationId(page, search)).then(() => {
          setTableLoading(false)
        })
        setTableLoading(false)
      })
      .catch(() => {
        setTableLoading(false)
        Alert({
          title: 'Error!',
          message:
            'Falha ao tentar ativar/desativar cliente. Por favor, tente mais tarde!',
          type: 'danger'
        })
      })
    handleCloseDisable()
    handleCloseActive()
  }

  function handleSearchPress() {
    if (search && search.length > 0) {
      setTableLoading(true)
      dispatch(ListAccountByApplicationId(1, search)).then(() => {
        setTableLoading(false)
      })
    } else {
      setTableLoading(true)
      dispatch(ListAccountByApplicationId(1, search)).then(() => {
        setTableLoading(false)
      })
    }
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const handleChangePagination = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: any
  ) => {
    setPage(value)

    dispatch(ListAccountByApplicationId(value, search)).then(() => {
      setTableLoading(false)
    })
  }

  const handleChangeStatusAccount = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      handleClickOpenActive()
    } else {
      handleClickOpenDisable()
    }
  }
  return (
    <>
      <HeaderPage>
        <Grid container spacing={2}>
          <Grid item xs={8}></Grid>
          <Grid item xs={4}>
            <FormControl variant='outlined' size='small' fullWidth>
              <InputLabel htmlFor='outlined-adornment-password'>
                Pesquisar
              </InputLabel>
              <OutlinedInput
                id='search-users'
                type='text'
                onChange={e => setSearch(e.target.value)}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleSearchPress}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
                label='Password'
              />
            </FormControl>
          </Grid>
        </Grid>
      </HeaderPage>
      {tableLoading ? (
        <TableLoading />
      ) : (
        <BodyPage>
          <TableContainer>
            <Table
              sx={{ minWidth: 650, fontSize: '16px' }}
              aria-label='simple table'
            >
              <EnhancedTableHead />
              <TableBody>
                {profiles.result?.map((row: any, index: any) => {
                  return (
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <BodyTableCell component='th' scope='row'>
                        {row.name}
                      </BodyTableCell>
                      <BodyTableCell>{row.budget?.action}</BodyTableCell>
                      <BodyTableCell>{row.clients?.action}</BodyTableCell>
                      <BodyTableCell>{row.admin?.action}</BodyTableCell>
                      <BodyTableCell>{row.users?.action}</BodyTableCell>
                      <BodyTableCell>{row.financial?.action}</BodyTableCell>
                      <BodyTableCell>{row.log?.action}</BodyTableCell>
                      <BodyTableCell>
                        <CustomSwitch
                          sx={{ m: 1 }}
                          checked={row.active}
                          onClick={() => setselectedClient(row)}
                          onChange={handleChangeStatusAccount}
                        />
                      </BodyTableCell>
                      <BodyTableCell sx={{ minWidth: '200px' }}>
                        <Tooltip title='Endereços' placement='top' arrow>
                          <IconButton
                            aria-label='edit'
                            color='secondary'
                            onClick={() => {
                              route.push(`/clientes/${row.id}/enderecos`)
                            }}
                          >
                            <LuMapPin />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title='Editar' placement='top' arrow>
                          <IconButton
                            aria-label='edit'
                            color='primary'
                            onClick={() => {
                              route.push(`/clientes/${row.id}`)
                            }}
                          >
                            <LuPenSquare />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title='Chat' placement='top' arrow>
                          <IconButton
                            aria-label='trash'
                            sx={{ color: '#FFC107' }}
                            onClick={() => {}}
                          >
                            <LuMessageSquare />
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
      )}
      <CustomDialog
        title='Ativar cliente!'
        open={openActiveAccount}
        maxWidth={'xs'}
        handleClickOpen={handleClickOpenActive}
        handleClose={handleCloseActive}
        content={`Deseja ativar cliente ${selectedClient?.fullName}? O acesso do cliente a plataforma será restaurado.`}
        fullWidthValeu={true}
        footer={
          <>
            <Button variant='outlined' onClick={handleCloseActive}>
              Não
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              onClick={() => handleStatusAccount(selectedClient)}
            >
              Ativar
            </Button>
          </>
        }
        icon={false}
        iconType=''
        textAlign='left'
      />
      <CustomDialog
        title='Desativar cliente!'
        open={openDesableAccount}
        maxWidth={'xs'}
        handleClickOpen={handleClickOpenDisable}
        handleClose={handleCloseDisable}
        content={`Deseja desativar o cliente ${selectedClient?.fullName}? Isso resulta na inativação total dos acessos do cliente.`}
        fullWidthValeu={true}
        footer={
          <>
            <Button variant='outlined' onClick={handleCloseDisable}>
              Não
            </Button>
            <Button
              variant='outlined'
              color='error'
              onClick={() => handleStatusAccount(selectedClient)}
            >
              Desativar
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
