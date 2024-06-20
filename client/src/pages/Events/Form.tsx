import { useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FormikProps, Formik } from 'formik';

import { Divider, Grid, Typography } from '@mui/material';

import {
  Button,
  Container,
  DateTimeGroup,
  Input,
  SEO,
  SearchPlace,
} from '../../components';

import { IEventForm } from '../../@types';
import { useAppDispatch, useAppSelector } from '../../redux';
import {
  setLoading,
  removeLoading,
  getAllEventsTypes,
  clearLatest,
} from '../../redux/slices';
import { eventServices, initialEvent } from '../../services';
import { eventMappers, msgsDict } from '../../utils/functions';
import { useToast } from '../../utils/hooks';
import { eventSchema } from '../../utils/schemas';

export const EventForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { pathname } = useLocation();
  const { types } = useAppSelector((state) => state.events);
  const formRef = useRef<FormikProps<IEventForm>>(null);
  const [initialPlace, setInitialPlace] = useState(-1);

  const onSubmit = async (data: IEventForm) => {
    const record = eventMappers.toAPI(data);

    dispatch(setLoading('createUpdateEvent'));
    const result = id
      ? await eventServices.updateById(id, record)
      : await eventServices.create(record);
    dispatch(removeLoading('createUpdateEvent'));

    if (result.success && result.data) {
      useToast.success(
        `Evento ${id ? 'editado' : 'adicionado'} com sucesso`,
      );
      backToList();
      if (!id) dispatch(clearLatest());
    } else if (!result.success && result.errors) {
      let i = 0;
      Object.entries(result.errors).forEach(([key, value]) => {
        i++;
        formRef?.current?.setFieldError(key, value as string);
      });
      if (i > 0) useToast.error(msgsDict('form'));
    } else {
      useToast.error(msgsDict('network'));
    }
  };

  const validate = (formik: FormikProps<IEventForm>) => {
    if (!formik.isValid) useToast.error(msgsDict('form'));
    formik.handleSubmit();
  };

  const backToList = () => {
    return navigate('/eventos');
  };

  useEffect(() => {
    if (id) {
      dispatch(setLoading('getEvent'));
      eventServices.getById(id).then((r) => {
        dispatch(removeLoading('getEvent'));
        if (r) {
          setInitialPlace(r.schedule.place.id);
          formRef?.current?.setValues(eventMappers.toForm(r));
        } else {
          backToList();
        }
      });
    } else {
      if (pathname === '/eventos/editar') {
        return backToList();
      }
      setInitialPlace(-1);
    }
    if (types.length === 0) dispatch(getAllEventsTypes());

    // eslint-disable-next-line
  }, [id]);

  return (
    <>
      <SEO
        title={`My OnEntrée - ${id ? 'Editar' : 'Adicionar novo'} evento`}
      />
      <Formik
        enableReinitialize
        initialValues={initialEvent}
        innerRef={formRef}
        onSubmit={(values) => onSubmit(values)}
        validationSchema={eventSchema}
      >
        {(formik) => (
          <form noValidate>
            <Container
              hasCard
              size='sm'
              showHeader
              subTitle='*Campos obrigatórios'
            >
              <Grid item xs={12}>
                <Typography>Informações básicas</Typography>
              </Grid>
              <Input
                required
                label='Nome do evento'
                grid={{ lg: 6 }}
                name='name'
                placeholder='Informe o nome do evento'
              />
              <Input
                label='Selecione um tipo'
                required
                grid={{ lg: 6 }}
                name='typeId'
                model='select'
                options={types}
                menuOptions
                defaultOption='Selecione um tipo'
              />
              <DateTimeGroup
                name='schedule.startAt'
                required
                disablePast
                timeGrid={{ lg: 6 }}
                dateGrid={{ lg: 6 }}
                dateLabel='Data do evento'
                timeLabel='Horário do evento'
                datePlaceholder='00/00/0000'
                timePlaceholder='Adicione o horário do evento'
              />
              <Input
                required
                label='Duração'
                type='number'
                grid={{ lg: 6 }}
                name='schedule.duration'
                placeholder='Informe a duração do evento'
              />
              <SearchPlace
                required
                grid={{ lg: 6 }}
                name='schedule.placeId'
                initialSelected={initialPlace}
                placeholder='Selecione um local'
              />

              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography>Contato</Typography>
              </Grid>
              <Input
                required
                label='email'
                type='email'
                grid={{ lg: 6 }}
                name='contact.email'
                placeholder='Informe um email'
              />
              <Input
                label='Telefone'
                model='mask'
                maskModel='phone'
                grid={{ lg: 6 }}
                name='contact.phone'
                placeholder='Informe um telefone'
              />
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  sx={{ mr: 2, width: 145 }}
                  contained
                  variant='outlined'
                  onClick={backToList}
                >
                  Cancelar
                </Button>
                <Button
                  sx={{ width: 145 }}
                  contained
                  onClick={() => validate(formik)}
                >
                  {id ? 'Salvar' : 'Cadastrar'}
                </Button>
              </Grid>
            </Container>
          </form>
        )}
      </Formik>
    </>
  );
};
