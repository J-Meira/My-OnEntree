import { RouteProps } from 'react-router-dom';

import { Home } from '../pages';

export type IRoutesProps = Omit<RouteProps, 'children'> & {
  children?: IRoutesProps[];
  name: string;
  main: string;
  path: string;
};

export const privateRoutes: IRoutesProps[] = [
  {
    path: '/',
    name: 'Home',
    main: 'Home',
    element: <Home />,
  },
  // {
  //   path: '/locais',
  //   name: 'Locais',
  //   main: 'Locais',
  //   element: <PlaceList />,
  //   children: [
  //     {
  //       path: '/locais/adicionar',
  //       name: 'Adicionar novo',
  //       main: 'Locais',
  //       element: <PlaceForm />,
  //     },
  //     {
  //       path: '/locais/editar/:id',
  //       name: 'Editar',
  //       main: 'Locais',
  //       element: <PlaceForm />,
  //     },
  //   ],
  // },
];
