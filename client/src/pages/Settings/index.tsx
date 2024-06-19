import { Grid, Typography } from '@mui/material';
import { Container, Input, SEO, ThemeSwitch } from '../../components';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { handleRows } from '../../redux/slices';

export const Settings = () => {
  const dispatch = useAppDispatch();
  const { rowsPerPage, isDark } = useAppSelector((state) => state.system);

  return (
    <>
      <SEO title='Configurações' />
      <Container
        showHeader
        size='sm'
        subTitle='Configure suas preferências'
        hasCard
      >
        <Input
          label='Registros por página'
          name='rowsPerPage'
          value={rowsPerPage}
          required
          model='select'
          localControl
          onChange={(e) => dispatch(handleRows(Number(e.target.value)))}
          options={[
            { value: 5, label: '5' },
            { value: 10, label: '10' },
            { value: 15, label: '15' },
            { value: 20, label: '20' },
            { value: 25, label: '25' },
            { value: 30, label: '30' },
            { value: 35, label: '35' },
            { value: 40, label: '40' },
            { value: 45, label: '45' },
            { value: 50, label: '50' },
          ]}
          grid={{
            lg: 6,
          }}
        />
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          display='flex'
          alignItems='center'
          flexWrap='wrap'
        >
          <ThemeSwitch />
          <Typography sx={{ margin: '0 1rem' }} component='label'>
            {isDark ? 'Tema escuro' : 'Tema Claro'}
          </Typography>
        </Grid>
      </Container>
    </>
  );
};
