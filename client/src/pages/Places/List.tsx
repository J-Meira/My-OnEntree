import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MdMoreVert } from 'react-icons/md';
import { Grid, Typography, useMediaQuery } from '@mui/material';

import {
  Button,
  Container,
  DataTable,
  ListActions,
  Pagination,
  SEO,
  TableActions,
} from '../../components';

import { IElement, IPlace } from '../../@types';
import { useAppDispatch, useAppSelector } from '../../redux';
import {
  clearDialog,
  deletePlace,
  getAllPlaces,
  openDialog,
} from '../../redux/slices';
import { dateToScreen } from '../../utils/functions';

const initialElement: IElement<IPlace> = {
  anchorEl: null,
};

export const PlaceList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery('(max-width:899px)');
  const [totalOfPages, setTotalOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [element, setElement] = useState<IElement<IPlace>>(initialElement);
  const [recordToDelete, setRecordToDelete] = useState<IPlace | undefined>(
    undefined,
  );

  const { rowsPerPage, dialog } = useAppSelector((state) => state.system);
  const { records, totalOfRecords } = useAppSelector(
    (state) => state.places,
  );

  const openActions = (
    event: React.MouseEvent<HTMLElement>,
    row: IPlace,
  ) => {
    setElement({
      anchorEl: event.currentTarget,
      row,
    });
  };

  const closeAction = () => setElement(initialElement);

  const editAction = (row: IPlace) => {
    navigate(`/locais/editar/${row.id}`);
  };

  const deleteAction = (row: IPlace) => {
    setRecordToDelete(row);
    closeAction();
  };

  const getRecords = () => {
    dispatch(
      getAllPlaces({
        limit: rowsPerPage,
        page: currentPage,
        searchTerm: searchTerm === '' ? null : searchTerm,
        orderBy,
      }),
    );
  };

  useEffect(() => {
    if (
      recordToDelete &&
      !dialog.isOpen &&
      dialog.return.origin === 'deletePlace'
    ) {
      if (dialog.return.status) {
        dispatch(deletePlace(recordToDelete.id, getRecords));
      }
      setRecordToDelete(undefined);
      dispatch(clearDialog());
    }

    // eslint-disable-next-line
  }, [dialog]);

  useEffect(() => {
    if (recordToDelete && !dialog.isOpen) {
      dispatch(
        openDialog({
          isOpen: true,
          cancel: true,
          title: 'Apagar local',
          message: `Você tem certeza que deseja apagar o local “${recordToDelete.name}”?`,
          origin: 'deletePlace',
          successLabel: 'Apagar',
          return: {},
        }),
      );
    }

    // eslint-disable-next-line
  }, [recordToDelete]);

  useEffect(() => {
    const newTotal = Math.ceil(totalOfRecords / rowsPerPage);
    setTotalOfPages(newTotal);
    if (currentPage > newTotal && newTotal !== 0) setCurrentPage(newTotal);

    // eslint-disable-next-line
  }, [totalOfRecords, rowsPerPage]);

  useEffect(() => {
    getRecords();

    // eslint-disable-next-line
  }, [currentPage, orderBy, searchTerm]);

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
          onSearch={setSearchTerm}
          addLabel='Adicionar local'
        />
        {searchTerm !== '' && (
          <Grid item xs={12}>
            <Typography>
              {`${totalOfRecords} Resultados encontrados para “${searchTerm}”`}
            </Typography>
          </Grid>
        )}
        {totalOfRecords > 0 && (
          <DataTable<IPlace>
            title='clients'
            showHeader
            onHandleOrder={setOrderBy}
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
              {
                key: 'actions',
                label: '',
                disablePadding: true,
                render: (row) => (
                  <Button
                    model='icon'
                    onClick={(e) => openActions(e, row)}
                    color='info'
                  >
                    <MdMoreVert />
                  </Button>
                ),
              },
            ]}
            rows={records}
            defaultOrderBy='name'
          />
        )}
        {totalOfPages > 1 && (
          <Pagination
            count={totalOfPages}
            page={currentPage}
            onChange={(_e, page) => setCurrentPage(page)}
          />
        )}
      </Container>
      <TableActions
        element={element}
        editAction={editAction}
        deleteAction={deleteAction}
        onClose={closeAction}
      />
    </>
  );
};
