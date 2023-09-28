import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { CustomDialogTitle, IconBox } from './style'
import Error from '@/assets/icons/erro.png'
import Success from '@/assets/icons/sucesso.png'
import Image from 'next/image'
import { DialogProp } from '@/components/types/types'

export const CustomDialog = ({
  open,
  handleClose,
  title,
  content,
  maxWidth,
  fullWidthValeu,
  footer,
  icon,
  iconType,
  textAlign
}: DialogProp) => {
  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
        fullWidth={fullWidthValeu}
        maxWidth={maxWidth}
        sx={{ textAlign: textAlign }}
      >
        {icon && <IconBox>
          {iconType === 'error' &&
            <Image src={Error} width={80} alt='Icon error' />}
          {iconType === 'success' &&
            <Image src={Success} width={80} alt='Icon success' />}
        </IconBox>}
        <CustomDialogTitle>{title}</CustomDialogTitle>
        <DialogContent>
          {content}
        </DialogContent>
        <DialogActions>
          {footer}
        </DialogActions>
      </Dialog>
    </div>
  )
}