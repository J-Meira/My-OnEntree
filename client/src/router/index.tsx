import {
  Navigate,
  RouteObject,
  createBrowserRouter,
} from 'react-router-dom';

import { App } from '../App';
import { Layout } from '../Layout';
import { RequireAuth } from './RequireAuth';

import { NotFound, SignIn, SignOut, SignUp } from '../pages';

import { privateRoutes } from './PrivateRoutes';

const mapPrivateRoutes = (): RouteObject[] => {
  const valueReturn: RouteObject[] = [];
  privateRoutes.map((item) => {
    if (item.children) {
      item.children.map((child) => {
        valueReturn.push({
          path: child.path,
          element: child.element,
        });
        if (child.children) {
          child.children.map((c) => {
            valueReturn.push({
              path: c.path,
              element: c.element,
            });
          });
        }
      });
    } else {
      valueReturn.push({
        path: item.path,
        element: item.element,
      });
    }
  });
  return valueReturn;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          {
            element: <Layout />,
            children: mapPrivateRoutes(),
          },
        ],
      },
      { path: '/login', element: <SignIn /> },
      { path: '/cadastro', element: <SignUp /> },
      { path: '/sair', element: <SignOut /> },
      { path: '/not-found', element: <NotFound /> },
      { path: '*', element: <Navigate replace to='/not-found' /> },
    ],
  },
]);
