import { Paper } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './components';
import { useAppSelector } from './redux/hooks';

export const Layout = () => {
  const { pathname } = useLocation();
  const { backgroundColor } = useAppSelector((state) => state.system);

  return (
    <Paper
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        backgroundImage:
          pathname === '/' ? `url(/assets/bg.png)` : undefined,
        backgroundColor: backgroundColor,
        backgroundPositionY: -20,
        backgroundPositionX: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
      square
      elevation={0}
    >
      <Header />
      <Outlet />
    </Paper>
  );
};
