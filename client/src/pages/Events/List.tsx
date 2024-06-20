import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MdMoreVert } from 'react-icons/md';
import { Grid, Typography, useMediaQuery } from '@mui/material';

import {
  Button,
  Container,
  DataTable,
  DatePicker,
  ListActions,
  Pagination,
  SEO,
  SearchPlace,
  TableActions,
  TypeChip,
} from '../../components';

import { IElement, IEvent, IFilters } from '../../@types';
import { useAppDispatch, useAppSelector } from '../../redux';
import {
  clearDialog,
  deleteEvent,
  getAllEvents,
  openDialog,
} from '../../redux/slices';
import { dateToScreen } from '../../utils/functions';

const initialElement: IElement<IEvent> = {
  anchorEl: null,
};

export const EventList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery('(max-width:899px)');
  const [totalOfPages, setTotalOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState('name');
  const [element, setElement] = useState<IElement<IEvent>>(initialElement);
  const [recordToDelete, setRecordToDelete] = useState<IEvent | undefined>(
    undefined,
  );

  const { rowsPerPage, dialog } = useAppSelector((state) => state.system);
  const { records, totalOfRecords } = useAppSelector(
    (state) => state.events,
  );

  const openActions = (
    event: React.MouseEvent<HTMLElement>,
    row: IEvent,
  ) => {
    setElement({
      anchorEl: event.currentTarget,
      row,
    });
  };

  const closeAction = () => setElement(initialElement);

  const editAction = (row: IEvent) => {
    navigate(`/eventos/editar/${row.id}`);
  };

  const deleteAction = (row: IEvent) => {
    setRecordToDelete(row);
    closeAction();
  };

  const getRecords = (filters?: IFilters) => {
    dispatch(
      getAllEvents({
        limit: rowsPerPage,
        page: currentPage,
        searchTerm: searchTerm === '' ? null : searchTerm,
        orderBy,
        dateEnd: filters?.dateEnd ? filters.dateEnd.toISOString() : null,
        dateStart: filters?.dateStart
          ? filters.dateStart.toISOString()
          : null,
        placeId: filters?.id && filters.id > 0 ? filters.id : null,
      }),
    );
  };

  useEffect(() => {
    if (
      recordToDelete &&
      !dialog.isOpen &&
      dialog.return.origin === 'deleteEvent'
    ) {
      if (dialog.return.status) {
        dispatch(deleteEvent(recordToDelete.id, getRecords));
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
          title: 'Apagar evento',
          message: `Você tem certeza que deseja apagar o evento “${recordToDelete.name}”?`,
          origin: 'deleteEvent',
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
      <SEO title='My OnEntrée - Eventos' />
      <Container
        showHeader
        subTitle='Confira a lista de todo os eventos cadastrados'
        hasCard
      >
        <ListActions
          onAdd={() => navigate('/eventos/adicionar')}
          searchLabel='Pesquise por nome do evento'
          onSearch={setSearchTerm}
          addLabel='Adicionar evento'
          onApplyFilters={getRecords}
          filters={() => (
            <>
              <SearchPlace grid={{ lg: 4 }} name='id' />
              <DatePicker
                name='dateStart'
                label='Data inicial'
                showTodayButton
                grid={{ lg: 4 }}
              />
              <DatePicker
                name='dateEnd'
                label='Data final'
                showTodayButton
                grid={{ lg: 4 }}
              />
            </>
          )}
        />
        {searchTerm !== '' && (
          <Grid item xs={12}>
            <Typography>
              {`${totalOfRecords} Resultados encontrados para “${searchTerm}”`}
            </Typography>
          </Grid>
        )}
        {totalOfRecords > 0 && (
          <DataTable<IEvent>
            title='events'
            showHeader
            onHandleOrder={setOrderBy}
            columns={[
              {
                key: 'name',
                label: 'Nome do Evento',
                limit: isMobile ? 10 : 18,
                sortKey: 'name',
              },
              {
                key: 'type',
                label: 'Tipo',
                sortKey: 'type',
                render: (row) => <TypeChip type={row.type} />,
              },
              {
                key: 'schedule',
                label: 'Local associado',
                sortKey: 'place',
                disablePadding: true,
                render: (row) =>
                  row.schedule.place.name.slice(0, 10) + '...',
              },
              {
                key: 'schedule',
                label: 'Portões cadastrados',
                render: (row) => row.schedule.place.gates.join(', '),
              },
              {
                key: 'schedule',
                label: 'Data',
                sortKey: 'startAt',
                render: (row) => dateToScreen(row.schedule.startAt),
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
