import { ReactNode } from 'react';

import { Box, Paper } from '@mui/material';
import { useAppSelector } from '../redux';
import { ThemeSwitch } from '.';

interface Props {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLogo?: boolean;
}

export const PublicContainer = ({
  children,
  className = '',
  size = 'sm',
  showLogo = true,
}: Props) => {
  const { backgroundColor, isDark } = useAppSelector(
    (state) => state.system,
  );
  return (
    <Paper
      square
      elevation={0}
      sx={{ backgroundColor: backgroundColor }}
      className={'public-container scroll-y ' + className}
    >
      <Box className={'container-box container-box-' + size}>
        {showLogo && (
          <Box className='logo'>
            <img
              src={`/assets/logos/variation${isDark ? '-dark' : ''}.svg`}
              alt='Logo My OnEntrée'
            />
          </Box>
        )}
        <Paper elevation={4} className={'container-content'}>
          {children}
        </Paper>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          left: 20,
        }}
      >
        <ThemeSwitch />
      </Box>
    </Paper>
  );
};
