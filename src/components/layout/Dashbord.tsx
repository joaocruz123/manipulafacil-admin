import React, { useState, ReactNode, useEffect } from 'react'
import Box from '@mui/material/Box'
import { Toolbar, List, Typography, IconButton, Badge, Container } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import MainListItems from './Menu/ListItems'
import { AppBar, Drawer } from '@/styles/general'
import { LoadingComponent, SignOutButton } from '@/components'
import { Skeleton, Tooltip } from '@mui/material'
import { useSelector } from 'react-redux'
import { AuthState } from '@/store/modules/auth/authReducers'
import Logo from '@/assets/logo_manipula.png'
import Image from 'next/image'
import { AccountBox, HeaderIcon } from './style'
import { LuBell } from 'react-icons/lu'
import { PageSettingsState } from '@/store/modules/pageSettings/pageSettingsReducers'
import { useMsalAuthentication } from '@azure/msal-react'
import { useAppDispatch } from '@/hooks/useRedux'
import { InteractionType } from '@azure/msal-browser'
import { getFullProfileAccount } from '@/store/modules/auth/authActions'

export function Dashboard({ children }: { children: ReactNode }) {
  useMsalAuthentication(InteractionType.Redirect)
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(true)
  // eslint-disable-next-line
  const [newNotificarion, setNewNotificarion] = useState(true)
  const state = useSelector(AuthState)
  const { page } = useSelector(PageSettingsState)
  const userName = (state.profile && state.profile.fullName) || ''
  const userEmail = (state.profile && state.profile.email) || ''
  const [isLoading, setIsLoading] = useState(true)
  const toggleDrawer = () => setOpen(!open)


  useEffect(() => {
    setTimeout(() => dispatch(getFullProfileAccount())
      .then(() => setIsLoading(false))
    , 2000)
  }, [dispatch])

  return (
    <>
     {isLoading ? 
      <LoadingComponent loading={true} color='#96C12B' text='' /> :
      <Box sx={{ display: 'flex' }}>
      <AppBar position='absolute' open={open}>
        <Toolbar sx={{ pr: '24px' }}>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={toggleDrawer}
            sx={{ marginRight: '36px' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component='h1'
            variant='h5'
            color='inherit'
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {page?.namePage}
          </Typography>
          <Tooltip title='Notificações' placement='bottom' arrow>
            <HeaderIcon color='inherit'>
              <Badge variant='dot' invisible={newNotificarion} color='secondary'>
                <LuBell />
              </Badge>
            </HeaderIcon>
          </Tooltip>
          <SignOutButton />
        </Toolbar>
      </AppBar>
      <Drawer variant='permanent' open={open}>
        <Toolbar sx={{ padding: '1rem 0 10rem 0' }}>
          <Box sx={{
            display: open ? 'flex' : 'none',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
          }}>
            <Image src={Logo} width={160} alt='Picture of the author' />
          </Box>
        </Toolbar>
        <List component='nav'>
          <MainListItems />
        </List>
        <Box sx={{
          display: open ? 'flex' : 'none',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          width: '100%',
          height: '100%'
        }}>
          <AccountBox>
            <Typography
              component='h1'
              variant='h6'
              color='inherit'
              noWrap
              sx={{ flexGrow: 1, fontWeight: 'bold', fontSize: '17px' }}
            >
              {userName ? userName : <Skeleton variant='rounded' width={180} height={20} />}
            </Typography>
            <Typography
              component='h1'
              variant='body1'
              color='inherit'
              noWrap
              sx={{ flexGrow: 1, color: '#939393', fontSize: '14px' }}
            >
              {userEmail ? userEmail : <Skeleton variant='rounded' width={210} height={10} sx={{ mt: 1 }} />}
            </Typography>
          </AccountBox>
        </Box>
      </Drawer >
      <Box
        component='main'
        sx={{
          backgroundColor: theme =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto'
        }}
      >
        <Toolbar />
        <Container maxWidth='xl' sx={{ mt: 4, mb: 4 }}>
          {children}
        </Container>
      </Box>
    </Box >}
    </>
    
  )
}