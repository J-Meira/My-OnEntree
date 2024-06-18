import { Grid, useMediaQuery } from '@mui/material';
import { Container, DataTable, ListActions, SEO } from '../../components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux';
import { IPlace } from '../../@types';
import { getAllPlaces } from '../../redux/slices';
import { useEffect } from 'react';
import { dateToScreen } from '../../utils/functions';

export const PlaceList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery('(max-width:899px)');
  const { records } = useAppSelector((state) => state.places);

  useEffect(() => {
    dispatch(
      getAllPlaces({
        limit: 10,
        page: 1,
        searchTerm: null,
        orderBy: '',
      }),
    );
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <SEO title='My OnEntrée - Locais' />
      <Container
        showHeader
        subTitle='Confira a lista de todo os locais cadastrados'
        hasCard
      >
        <ListActions
          onAdd={() => navigate('/locais/adicionar')}
          searchLabel='Pesquise por nome do local'
          onSearch={(e) => console.log(e)}
          addLabel='Adicionar local'
        />
        <DataTable<IPlace>
          title='clients'
          showHeader
          onHandleOrder={(e) => console.log(e)}
          columns={[
            {
              key: 'name',
              label: 'Nome do Local',
              limit: isMobile ? 10 : 18,
              isSortable: true,
            },
            {
              key: 'location',
              label: 'Endereço',
              disablePadding: true,
              render: (row) => row.location.address.slice(0, 30) + '...',
            },
            {
              key: 'location',
              label: 'Cidade e Estado',
              isSortable: true,
              disablePadding: true,
              render: (row) => row.location.city.name,
            },
            {
              key: 'gates',
              label: 'Portões cadastrados',
              render: (row) => row.gates.join(', '),
            },
            {
              key: 'updatedAt',
              label: 'Atualização',
              render: (row) => dateToScreen(row.updatedAt),
            },
          ]}
          rows={records}
          defaultOrderBy='name'
        />
        <Grid item xs={12}>
          <h1>table here</h1>
        </Grid>
      </Container>
    </>
  );
};
