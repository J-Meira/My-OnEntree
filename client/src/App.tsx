import 'dayjs/locale/pt-br';
import { useMemo } from 'react';
import { Outlet } from 'react-router-dom';

import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';

import { closeSnackbar, SnackbarProvider } from 'notistack';
import { MdClose as CloseIcon } from 'react-icons/md';

import { CssBaseline } from '@mui/material';
import { ptBR as corePtBR } from '@mui/material/locale';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ptBR as datePtBR } from '@mui/x-date-pickers/locales';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { Button, Loading, PWABadge } from './components';

import { GlobalError } from './pages';

import { useAppSelector } from './redux/hooks';

export const App = () => {
  const { isDark } = useAppSelector((state) => state.system);

  const theme = useMemo(
    () =>
      createTheme(
        {
          palette: isDark
            ? {
                mode: 'dark',
                primary: { main: '#EBF0F9' },
                secondary: { main: '#FFFFFF' },
                error: { main: '#F6285F' },
                success: { main: '#99C766' },
                warning: { main: '#F79E1B' },
                info: { main: '#6d99fb' },
              }
            : {
                mode: 'light',
                primary: { main: '#333B49' },
                secondary: { main: '#10141D' },
                error: { main: '#F6285F' },
                success: { main: '#99C766' },
                warning: { main: '#F79E1B' },
                info: { main: '#6d99fb' },
              },
          typography: {
            fontFamily: `"Open Sans", sans-serif`,
          },
        },
        datePtBR,
        corePtBR,
      ),
    [isDark],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
        autoHideDuration={3000}
        maxSnack={5}
        action={(snackbarId) => (
          <Button model='icon' onClick={() => closeSnackbar(snackbarId)}>
            <CloseIcon />
          </Button>
        )}
      >
        <LocalizationProvider
          adapterLocale='pt-BR'
          dateAdapter={AdapterDayjs}
          localeText={
            datePtBR.components.MuiLocalizationProvider.defaultProps
              .localeText
          }
        >
          <ErrorBoundary FallbackComponent={GlobalError}>
            <HelmetProvider>
              <Outlet />
              <Loading />
              <PWABadge />
            </HelmetProvider>
          </ErrorBoundary>
        </LocalizationProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};
