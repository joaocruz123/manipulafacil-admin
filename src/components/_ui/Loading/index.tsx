import { Container } from '@mui/material'
import { BounceLoader } from 'react-spinners'
import { Typography } from '@mui/material'

export const LoadingComponent = ({ loading, color, text }: PropsLoading) => {

  return (
    <Container component='main' maxWidth='xs'
      sx={customStyles} >
      <BounceLoader
        color={color}
        loading={loading}
        cssOverride={{}}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
      {text && <Typography mt={2}>{text}</Typography>}
    </Container >
  )
}

interface PropsLoading {
  loading: boolean;
  color: string;
  text: string;
}

const customStyles = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  height: '100vh'
}

export default LoadingComponent
