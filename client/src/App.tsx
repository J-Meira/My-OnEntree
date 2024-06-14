import { Outlet } from 'react-router-dom';

import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import { Loading, PWABadge } from './components';

import { GlobalError } from './pages';

const theme = extendTheme({
  colors: {
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac',
    },
  },
});

export const App = () => (
  <ChakraProvider theme={theme}>
    <ErrorBoundary FallbackComponent={GlobalError}>
      <HelmetProvider>
        <Outlet />
        <Loading />
        <PWABadge />
      </HelmetProvider>
    </ErrorBoundary>
  </ChakraProvider>
);
