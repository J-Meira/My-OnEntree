import { Link } from 'react-router-dom';

import { Button, Typography } from '@mui/material';

import { PublicContainer } from '../../components';

export const NotFound = () => (
  <PublicContainer size='md'>
    <Typography sx={{ fontWeight: 600, fontSize: '2.2rem' }} variant='h2'>
      Não encontrado
    </Typography>
    <Typography variant='body1'>
      Oops - Não encontramos o que você estava tentando acessar!
    </Typography>
    <Button
      color='secondary'
      sx={{ mt: 4 }}
      component={Link}
      to='/'
      fullWidth
    >
      Voltar para o início
    </Button>
  </PublicContainer>
);
