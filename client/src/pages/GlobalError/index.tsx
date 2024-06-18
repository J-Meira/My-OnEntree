import { FallbackProps, useErrorBoundary } from 'react-error-boundary';

import { Button, Typography } from '@mui/material';

import { PublicContainer } from '../../components';

export const GlobalError = ({ error }: FallbackProps) => {
  const { resetBoundary } = useErrorBoundary();
  return (
    <PublicContainer size='md'>
      <Typography
        sx={{ fontWeight: 600, fontSize: '2.2rem' }}
        variant='h2'
      >
        Ocorreu um error
      </Typography>
      <Typography variant='body1'>
        <b>Detalhes: </b>
        {error.message}
      </Typography>
      <Button
        color='secondary'
        sx={{ mt: 4 }}
        onClick={resetBoundary}
        fullWidth
      >
        Tentar novamente
      </Button>
    </PublicContainer>
  );
};
