'use client'

import React, { useEffect, useState, useLayoutEffect } from 'react'

import moment from 'moment'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { NOTIFICATION_TYPE, Store } from 'react-notifications-component'

import { useAppDispatch } from '@/hooks/useRedux'
import { RemoveAccount, listAccountByApplicationId } from '@/store/modules/users/usersActions'
import { UserReducerState } from '@/store/modules/users/usersReducers'
import { setPageName } from '@/store/modules/pageSettings/pageSettingsActions'
import { HeadCell } from '@/types/users'

import {
  TableLoading,
  CustomDialog,
  PortalPagination
} from '@/components'

import {
  Grid,
  Button,
  Divider,
  Tooltip,
  TextField,
  Switch,
  Table,
  TableRow,
  TableBody,
  TableHead,
  IconButton,
  TableSortLabel,
  TableContainer
} from '@mui/material'

import { LuPencil, LuTrash2 } from 'react-icons/lu'

import { BodyTableCell, HeaderPage, HeaderTableCell } from './style'

const headCells: readonly HeadCell[] = [
  { id: 'fullName', label: 'Nome' },
  { id: 'cpf', label: 'CPF' },
  { id: 'email', label: 'E-mail' },
  { id: 'mobilePhone', label: 'Celular' },
  { id: 'birthDate', label: 'Data nascimento' },
  { id: 'actions', label: 'Ações' }
]

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <HeaderTableCell
            key={headCell.id}
          >
            <TableSortLabel>
              {headCell.label}
            </TableSortLabel>
          </HeaderTableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default function UserPage() {
  moment.locale('pt-br')
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [selectedUser, setselectedUser] = useState<any>(null)
  const [tableLoading, setTableLoading] = useState<boolean>(true)
  const { users } = useSelector(UserReducerState)
  const totalPages = users.paging.totalPages
  const route = useRouter()

  const Alert = ({ title, message, type }: {
    title: string, message: string, type: NOTIFICATION_TYPE | undefined
  }
    ) => (
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
  )

  useLayoutEffect(() => {
    dispatch(setPageName('Usuários'))
  }, [dispatch])

  useEffect(() => {
    dispatch(listAccountByApplicationId()).then(() => {
      setTableLoading(false)
    })
  }, [dispatch])

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const handleDeleteUserAccount = (account: any) => {
    setTableLoading(true)
    dispatch(RemoveAccount(account.key))
      .then(response => {
        if (response.success) {
          <Alert
            title='Usuário excluido!'
            message='Usuário excluido com sucesso!'
            type='success'
          />
        }
        dispatch(listAccountByApplicationId()).then(() => {
          setTableLoading(false)
        })
        setTableLoading(false)
      })
      .catch(() => {
        setTableLoading(false)
        return (
          <Alert
            title='Error!'
            message='Falha ao tentar excluir usuário. Por favor, tente mais tarde!'
            type='danger'
          />
        )
      })
    handleClose()

  }

  function handleKeyPress(event: any) {
    if (event.key === 'Enter') {
      if (search && search.length > 0) {
        setTableLoading(true)
        dispatch(listAccountByApplicationId(1, search)).then(() => {
          setTableLoading(false)
        })
      } else {
        setTableLoading(true)
        dispatch(listAccountByApplicationId(1, search)).then(() => {
          setTableLoading(false)
        })
      }
    }
  }

  const handleChangePagination = (event: React.ChangeEvent<HTMLInputElement>, value: any) => {
    setPage(value)

    dispatch(listAccountByApplicationId(value, search)).then(() => {
      setTableLoading(false)
    })
  }

  return (
    <>
      <HeaderPage>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Button sx={{ width: '270px' }} onClick={() => route.push('/usuarios/novo')
            } variant='outlined' color='secondary'>Novo Usuário</Button>
          </Grid>
          <Grid item xs={4}>
            <TextField
              id='search-users'
              label='Pesquisar'
              onChange={e => setSearch(e.target.value)}
              variant='outlined'
              size='small'
              fullWidth
              onKeyDown={handleKeyPress}
            />
          </Grid>
        </Grid>
      </HeaderPage>
      {tableLoading ? <TableLoading /> :
        <TableContainer >
          <Table sx={{ minWidth: 650, fontSize: '16px' }} aria-label='simple table'>
            <EnhancedTableHead />
            <TableBody>
              {users.result?.map((row: any, index: any) => {
                return (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <BodyTableCell component='th' scope='row'>{row.fullName}</BodyTableCell>
                    <BodyTableCell>{row.cpfCnpj}</BodyTableCell>
                    <BodyTableCell>{row.email}</BodyTableCell>
                    <BodyTableCell>{row.mobilePhone}</BodyTableCell>
                    <BodyTableCell>{moment(row.birthDate).format('DD/MM/YYYY')}</BodyTableCell>
                    <BodyTableCell>
                      <Switch defaultChecked={row.active} />
                    </BodyTableCell>
                    <BodyTableCell>
                      <Tooltip title='Editar' placement='top' arrow>
                        <IconButton aria-label='edit' color='primary'
                          onClick={() => { route.push(`/usuarios/${row.key}`) }}
                        >
                          <LuPencil />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title='Deletar' placement='top' arrow>
                        <IconButton aria-label='trash' color='error'
                          onClick={() => {
                            setselectedUser(row)
                            setOpen(true)
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
        </TableContainer>}
      <Divider />
      <PortalPagination totalPages={totalPages} page={page} handleChange={handleChangePagination} />
      <CustomDialog
        title='Deletar usuário!'
        open={open}
        maxWidth={'xs'}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        content={`Remover usuário ${selectedUser?.name} da lista?`}
        fullWidthValeu={true}
        footer={<>
          <Button onClick={handleClose}>Não</Button>
          <Button color='error' onClick={
            () => handleDeleteUserAccount(selectedUser)
          }>Sim</Button>
        </>}
        icon={false}
        iconType=''
        textAlign='left'
      />
    </>
  )
}
