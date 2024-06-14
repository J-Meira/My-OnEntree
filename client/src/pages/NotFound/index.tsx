import { useNavigate } from 'react-router-dom';

import { Button, Heading, Text } from '@chakra-ui/react';
import { PublicContainer } from '../../components';

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <PublicContainer size='md'>
      <Heading as='h2'>Não encontrado</Heading>
      <Text variant='body1'>
        Oops - Não encontramos o que você estava tentando acessar!
      </Text>
      <Button color='secondary' mt={4} onClick={() => navigate('/')}>
        Voltar para o início
      </Button>
    </PublicContainer>
  );
};
