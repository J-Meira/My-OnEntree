import { useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FormikProps, Formik } from 'formik';

import { Divider, Grid, Typography } from '@mui/material';

import {
  Button,
  Container,
  Input,
  ListInput,
  SEO,
  SearchCity,
} from '../../components';

import { IPlaceForm } from '../../@types';
import { useAppDispatch, useAppSelector } from '../../redux';
import {
  setLoading,
  removeLoading,
  getAllPlacesTypes,
} from '../../redux/slices';
import { placeServices, initialPlace } from '../../services';
import { placeMappers, msgsDict } from '../../utils/functions';
import { useToast } from '../../utils/hooks';
import { placeSchema } from '../../utils/schemas';

export const PlaceForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { pathname } = useLocation();
  const { types } = useAppSelector((state) => state.places);
  const formRef = useRef<FormikProps<IPlaceForm>>(null);
  const [initialCity, setInitialCity] = useState(-1);

  const onSubmit = async (data: IPlaceForm) => {
    const record = placeMappers.toAPI(data);

    dispatch(setLoading('createUpdatePlace'));
    const result = id
      ? await placeServices.updateById(id, record)
      : await placeServices.create(record);
    dispatch(removeLoading('createUpdatePlace'));

    if (result.success && result.data) {
      useToast.success(
        `Local ${id ? 'editado' : 'adicionado'} com sucesso`,
      );
      backToList();
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

  const validate = (formik: FormikProps<IPlaceForm>) => {
    if (!formik.isValid) useToast.error(msgsDict('form'));
    formik.handleSubmit();
  };

  const backToList = () => {
    return navigate('/locais');
  };

  useEffect(() => {
    if (id) {
      dispatch(setLoading('getPlace'));
      placeServices.getById(id).then((r) => {
        dispatch(removeLoading('getPlace'));
        if (r) {
          setInitialCity(r.location.city.id);
          formRef?.current?.setValues(placeMappers.toForm(r));
        } else {
          backToList();
        }
      });
    } else {
      if (pathname === '/locais/editar') {
        return backToList();
      }
      setInitialCity(-1);
    }
    if (types.length === 0) dispatch(getAllPlacesTypes());

    // eslint-disable-next-line
  }, [id]);

  return (
    <>
      <SEO
        title={`My OnEntrée - ${id ? 'Editar' : 'Adicionar novo'} local`}
      />
      <Formik
        enableReinitialize
        initialValues={initialPlace}
        innerRef={formRef}
        onSubmit={(values) => onSubmit(values)}
        validationSchema={placeSchema}
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
                label='Nome do local'
                grid={{ lg: 6 }}
                name='name'
                placeholder='Informe o nome do local'
              />
              <Input
                label='Apelido'
                grid={{ lg: 6 }}
                name='nickname'
                placeholder='Informe um apelido (caso exista)'
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
              <Input
                label='CNPJ'
                model='mask'
                maskModel='cnpj'
                grid={{ lg: 6 }}
                name='document'
                placeholder='Informe um CNPJ (caso exista)'
              />
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography>Localização</Typography>
              </Grid>
              <SearchCity
                required
                grid={{ lg: 6 }}
                name='location.cityId'
                initialSelected={initialCity}
                placeholder='Informe a cidade'
              />
              <Input
                required
                label='CEP'
                model='mask'
                maskModel='postalCode'
                grid={{ lg: 6 }}
                name='location.postalCode'
                placeholder='Informe o CEP'
              />
              <Input
                required
                label='Endereço'
                grid={{ lg: 6 }}
                name='location.address'
                placeholder='Informe o endereço'
              />
              <Input
                label='Complemento'
                grid={{ lg: 6 }}
                name='location.complement'
                placeholder='Informe o complemento'
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
              <Grid item xs={12}>
                <Typography>Cadastro de entradas e catracas</Typography>
              </Grid>
              <ListInput
                label='Cadastre as entradas'
                required
                grid={{ lg: 6 }}
                name='gates'
                placeholder='Insira as entradas'
              />
              <ListInput
                label='Cadastre as catracas'
                required
                grid={{ lg: 6 }}
                name='turnstiles'
                placeholder='Insira as catracas'
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
