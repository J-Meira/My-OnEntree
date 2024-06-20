import {
  Container as MuiContainer,
  ContainerProps,
  Paper,
  Grid,
} from '@mui/material';
import { ReactNode } from 'react';
import { BreadcrumbBar } from './BreadcrumbBar';
import { useAppSelector } from '../redux/hooks';

interface Props {
  showHeader?: boolean;
  hasCard?: boolean;
  subTitle?: string;
  size?: ContainerProps['maxWidth'];
  children: ReactNode;
}

export const Container = ({
  showHeader = false,
  hasCard = false,
  subTitle,
  size = 'lg',
  children,
}: Props) => {
  const { isDark } = useAppSelector((state) => state.system);
  return (
    <MuiContainer
      maxWidth={size}
      sx={{
        paddingTop: 6,
        paddingBottom: 6,
      }}
    >
      {showHeader && subTitle && <BreadcrumbBar subTitle={subTitle} />}
      {hasCard ? (
        <Paper
          sx={{
            padding: '2rem 1.2rem',
            backgroundColor: isDark ? '#10141D' : undefined,
            backgroundImage: isDark ? 'none' : undefined,
            borderRadius: '20px',
          }}
          elevation={4}
        >
          <Grid container spacing={2}>
            {children}
          </Grid>
        </Paper>
      ) : (
        children
      )}
    </MuiContainer>
  );
};
