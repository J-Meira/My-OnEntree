import { useParams } from 'react-router-dom';

import { Container, Input, SEO } from '../../components';
import { Grid } from '@mui/material';

export const PlaceForm = () => {
  const { id } = useParams();
  return (
    <>
      <SEO
        title={`My OnEntrée - ${id ? 'Editar' : 'Adicionar novo'} local`}
      />
      <Container
        hasCard
        size='sm'
        showHeader
        subTitle='*Campos obrigatórios'
      >
        <Input name='test' label='test' localControl />
        <Input name='test' label='test' localControl />
        <Grid item xs={12}>
          <h1>form here</h1>
        </Grid>
      </Container>
    </>
  );
};
