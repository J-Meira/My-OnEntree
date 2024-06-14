import { Box, Heading, Spinner } from '@chakra-ui/react';

import { useAppSelector } from '../redux/hooks';
import { getLoading } from '../redux/slices';

export const Loading = () => {
  const isLoading = useAppSelector(getLoading);
  return (
    <>
      <Box
        sx={{
          display: isLoading ? 'flex' : 'none',
          position: 'fixed',
          width: '100%',
          height: '100%',
          top: 0,
          right: 0,
          zIndex: 9998,
          opacity: [0.9, 0.8, 0.7],
        }}
      />
      <Box
        sx={{
          display: isLoading ? 'flex' : 'none',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          width: '100%',
          height: '100%',
          top: 0,
          right: 0,
          zIndex: 9999,
          backgroundColor: 'transparent',
        }}
      >
        <Box
          sx={{
            m: 1,
            position: 'relative',
            width: 120,
            height: 120,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            style={{
              width: '80px',
            }}
            src='/assets/favicon.svg'
            alt='Icon Sigep'
          />
          <Spinner
            thickness='8px'
            speed='0.65s'
            color='secondary'
            sx={{
              width: 100,
              height: 100,
              position: 'absolute',
              zIndex: 1,
            }}
          />
        </Box>
        <Heading
          as='h3'
          color='primary'
          sx={{
            fontSize: '1.5rem',
            fontWeight: '500',
          }}
        >
          Carregando...
        </Heading>
      </Box>
    </>
  );
};
