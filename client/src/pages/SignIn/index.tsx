import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Formik, FormikProps } from 'formik';

import { Button, Input, PublicContainer, SEO } from '../../components';

import { ISignInData } from '../../@types';
import { signInSchema } from '../../utils/schemas';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAuthenticated, signIn } from '../../redux/slices';
import { Grid } from '@mui/material';

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
      <PublicContainer className='sign-in'>
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
                  <Button color='secondary' type='submit'>
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
