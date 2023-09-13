'use client'

import ReactSwipe from 'react-swipe'
import React, { useEffect, useState } from 'react'
import { Container, Grid } from '@mui/material'
import { containerStyle, divContainerStyle } from './styles'
import StepEmailPhone from './steps/StepEmailPhone'
import StepToken from './steps/StepToken'
import StepNewPassword from './steps/StepNewPassword'
import { getAccessFlowRecoverPassword } from '@/store/modules/auth/authActions'
import { useAppDispatch } from '@/hooks/useRedux'
import LoadingComponent from '@/components/_ui/Loading'

const RecoverPassword = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [startCounter, setStartCounter] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  let reactSwipeEl: ReactSwipe | null

  useEffect(() => {
    dispatch(getAccessFlowRecoverPassword()).then(() => {
      setLoading(false)
    })
  }, [dispatch])

  const handleStartCounter = (value: boolean) => {
    setStartCounter(value)
  }

  const handleNextStep = () => {
    reactSwipeEl?.next()
  }

  const handlePreviousStep = () => {
    reactSwipeEl?.prev()
  }

  return (
    <>
      {loading ? <LoadingComponent loading={true} color='#96C12B' text='' /> :
        <Container component='main' maxWidth={false} sx={containerStyle}>
          <Container component='div' maxWidth='md' sx={divContainerStyle}>
            <Grid
              container
              padding={2}
              justifyContent={'center'}
            >
              <Grid item md={12} xs={12}>
                <ReactSwipe
                  className='carousel'
                  ref={swipeComponent => { reactSwipeEl = swipeComponent }}
                  swipeOptions={{ continuous: false }}
                >
                  <Grid>
                    <StepEmailPhone
                      handleNextStep={handleNextStep}
                      handleStartCounter={handleStartCounter}
                    />
                  </Grid>
                  <Grid>
                    <StepToken
                      handleNextStep={handleNextStep}
                      handlePreviousStep={handlePreviousStep}
                      startCounter={startCounter}
                    />
                  </Grid>
                  <Grid><StepNewPassword /></Grid>
                </ReactSwipe>
              </Grid>
            </Grid>
          </Container>
        </Container>}
    </>
  )
}

export default RecoverPassword
