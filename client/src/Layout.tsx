import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import { Paper } from '@mui/material';

import { Header } from './components';

import { useAppDispatch, useAppSelector } from './redux/hooks';
import { getLoading, refresh } from './redux/slices';
import { useToast } from './utils/hooks';

export const Layout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { backgroundColor } = useAppSelector((state) => state.system);
  const { expiresIn } = useAppSelector((state) => state.auth);
  const isLoading = useAppSelector(getLoading);

  useEffect(() => {
    if (!isLoading) {
      const now = dayjs.utc();
      const tRefresh = dayjs.utc(expiresIn).subtract(5, 'minutes');
      const tExpire = dayjs.utc(expiresIn);
      if (now > tRefresh && now < tExpire) {
        dispatch(refresh());
      } else if (now > tExpire) {
        useToast.error('Sessão Expirada');
        navigate('/sair', { state: { from: location } });
      }
    }

    // eslint-disable-next-line
  }, [isLoading]);

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
      className='scroll-y'
      square
      elevation={0}
    >
      <Header />
      <Outlet />
    </Paper>
  );
};
