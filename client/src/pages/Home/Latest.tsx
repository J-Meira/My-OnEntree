import { Grid, Menu, MenuItem, Paper, Typography } from '@mui/material';
import { IEvent, IPlace } from '../../@types';
import { useAppSelector } from '../../redux/hooks';
import { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, DataTable, TypeChip } from '../../components';
import { MdMoreVert } from 'react-icons/md';

interface Props {
  events: IEvent[];
  places: IPlace[];
}

interface IContainer {
  children: ReactNode;
  label: string;
}

const Container = ({ children, label }: IContainer) => {
  const { isDark } = useAppSelector((state) => state.system);
  return (
    <Grid item xs={12} sm={12} md={6}>
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
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Typography>{`Ultimos ${label} adicionados`}</Typography>
            <Typography
              component={Link}
              color='info.main'
              to={'/' + label}
            >
              Ver todos
            </Typography>
          </Grid>
          {children}
        </Grid>
      </Paper>
    </Grid>
  );
};

export const Latest = ({ events, places }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [destiny, setDestiny] = useState('');

  const openActions = (
    e: React.MouseEvent<HTMLElement>,
    rDestiny: string,
  ) => {
    setAnchorEl(e.currentTarget);
    setDestiny(rDestiny);
  };

  const onCloseActions = () => {
    setAnchorEl(null);
    setDestiny('');
  };

  return (
    <>
      <Container label='locais'>
        <DataTable<IPlace>
          title='places'
          columns={[
            {
              key: 'name',
              label: 'Nome do Local',
              limit: 15,
            },
            {
              key: 'location',
              label: 'Endereço',
              disablePadding: true,
              render: (row) => row.location.address.slice(0, 10) + '...',
            },
            {
              key: 'gates',
              label: 'Portões cadastrados',
              render: (row) => row.gates.join(', ').slice(0, 10),
            },
            {
              key: 'actions',
              label: '',
              disablePadding: true,
              render: (row) => (
                <Button
                  model='icon'
                  onClick={(e) =>
                    openActions(e, `/locais/editar/${row.id}`)
                  }
                  color='info'
                >
                  <MdMoreVert />
                </Button>
              ),
            },
          ]}
          rows={places}
          defaultOrderBy='createdAt'
        />
      </Container>
      <Container label='eventos'>
        <DataTable<IEvent>
          title='events'
          columns={[
            {
              key: 'name',
              label: 'Nome do Evento',
              limit: 15,
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
              key: 'actions',
              label: '',
              disablePadding: true,
              render: (row) => (
                <Button
                  model='icon'
                  onClick={(e) =>
                    openActions(e, `/eventos/editar/${row.id}`)
                  }
                  color='info'
                >
                  <MdMoreVert />
                </Button>
              ),
            },
          ]}
          rows={events}
          defaultOrderBy='createdAt'
        />
      </Container>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={anchorEl != null}
        onClose={onCloseActions}
      >
        <MenuItem component={Link} to={destiny}>
          Editar
        </MenuItem>
      </Menu>
    </>
  );
};
