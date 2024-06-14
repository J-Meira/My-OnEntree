import { FallbackProps, useErrorBoundary } from 'react-error-boundary';

import { Button, Heading, Text } from '@chakra-ui/react';

import { PublicContainer } from '../../components';

export const GlobalError = ({ error }: FallbackProps) => {
  const { resetBoundary } = useErrorBoundary();
  return (
    <PublicContainer size='md'>
      <Heading as='h2'>Ocorreu um error</Heading>
      <Text fontSize='md'>
        <b>Detalhes: </b>
        {error.message}
      </Text>
      <Button
        color='primary'
        mt={4}
        onClick={resetBoundary}
        colorScheme='whiteAlpha'
      >
        Tentar novamente
      </Button>
    </PublicContainer>
  );
};
