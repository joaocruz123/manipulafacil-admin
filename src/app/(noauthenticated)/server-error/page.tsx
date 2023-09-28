'use client'

import React from 'react'
import { Container, Grid } from '@mui/material'
import { BoxForm, Paragraph, containerStyle, divContainerStyle } from './styles'
import MedicamentoIcon from '@/assets/icons/medicamento-icon.png'
import Image from 'next/image'

const ServerError = () => {
  return (
    <>
      <Container component='main' maxWidth={false} sx={containerStyle}>
        <Container component='div' maxWidth='md' sx={divContainerStyle}>
          <Grid
            container
            padding={2}
            justifyContent={'center'}
          >
            <Grid item md={12} xs={12}>
              <BoxForm>
                <Image src={MedicamentoIcon} width={80} alt='Picture of the author' />
                <Paragraph>Desculpe, algo deu errado.</Paragraph>
                <Paragraph>Estamos trabalhando nisso e consertaremos o mais rápido possível.</Paragraph>
              </BoxForm>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </>
  )
}

export default ServerError