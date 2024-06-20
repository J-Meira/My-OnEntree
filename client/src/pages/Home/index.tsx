import { Box, Grid, Typography } from '@mui/material';
import { Container, SEO } from '../../components';
import { useAppSelector } from '../../redux/hooks';
import { CardHome } from './Card';
import { MdFestival, MdLocalActivity } from 'react-icons/md';
import { Latest } from './Latest';

export const Home = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { latest } = useAppSelector((state) => state.system);
  return (
    <>
      <SEO />
      <Container>
        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            display='flex'
            justifyContent='flex-start'
            alignItems='center'
          >
            <img src='/assets/pet.png' alt='Mascote My OnEntrée' />
            <Box>
              <Typography variant='h2' fontWeight={600} fontSize={32}>
                {`Olá, ${user?.name || 'usuário'}`}
              </Typography>
              <Typography fontSize={14}>
                Confira todos os seus eventos e locais em um só lugar!
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <CardHome
              icon={<MdFestival />}
              title='Locais'
              subTitle='Confira todos os locais cadastrados!'
              label='Conferir locais'
              destiny='/locais'
              color='success'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <CardHome
              icon={<MdLocalActivity />}
              title='Eventos'
              subTitle='Confira todos os eventos cadastrados!'
              label='Conferir eventos'
              destiny='/eventos'
              color='error'
            />
          </Grid>
          {latest && (
            <Latest events={latest.events} places={latest.places} />
          )}
        </Grid>
      </Container>
    </>
  );
};
