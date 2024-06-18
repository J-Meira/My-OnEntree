import { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Formik, FormikProps } from 'formik';

import { Button, Input, PublicContainer, SEO } from '../../components';

import { ISignInData } from '../../@types';
import { signInSchema } from '../../utils/schemas';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAuthenticated, signIn } from '../../redux/slices';
import { Grid, Typography } from '@mui/material';

export const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();
  const isAuthenticated = useAppSelector(getAuthenticated);
  const formRef = useRef<FormikProps<ISignInData>>(null);

  const onSubmit = (data: ISignInData) => {
    dispatch(signIn(data));
  };

  useEffect(() => {
    if (isAuthenticated) navigate(state?.from || '/');
    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <>
      <SEO title='My OnEntrée - Login' />
      <PublicContainer>
        <Formik
          initialValues={{
            userName: '',
            password: '',
          }}
          validationSchema={signInSchema}
          onSubmit={(values) => onSubmit(values)}
          enableReinitialize
          innerRef={formRef}
        >
          {({ handleSubmit }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid xs={12}>
                  <Typography sx={{ fontSize: '1.4rem' }} variant='h2'>
                    Login:
                  </Typography>
                </Grid>
                <Input
                  label='Login'
                  name='userName'
                  autoComplete='userName'
                  autoFocus
                  required
                  grid={{ lg: 12 }}
                />
                <Input
                  model='password'
                  name='password'
                  autoComplete='password'
                  label='Senha'
                  id='password'
                  required
                  grid={{ lg: 12 }}
                />
                <Grid item xs={12}>
                  <Typography variant='caption'>
                    Não tem cadasto?
                    <br />
                    <Typography
                      component={Link}
                      variant='caption'
                      color='info.main'
                      to='/cadastro'
                    >
                      Clique aqui
                    </Typography>{' '}
                    para se cadastrar.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button sx={{ mt: 2 }} color='secondary' type='submit'>
                    Entrar
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </PublicContainer>
    </>
  );
};
