'use client'

import { forwardRef, SyntheticEvent } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/hooks/useRedux'

import { AlertState } from '@/store/modules/alerts/alertsReducers'

import { Stack, Snackbar, AlertColor } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export const Alerts = () => {
  const dispatch = useAppDispatch()
  const { alert: { type, isOpen, mensagem } } = useSelector(AlertState)

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    dispatch({
      type: 'SHOW_ALERT',
      paylod: { type: '', isOpen: false, mensagem: '' }
    })
  }

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={isOpen} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type as AlertColor} sx={{ width: '100%' }}>
          {mensagem}
        </Alert>
      </Snackbar>
    </Stack>
  )
}