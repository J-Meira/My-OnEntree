import { RouteProps } from 'react-router-dom';

import {
  EventForm,
  EventList,
  Home,
  PlaceForm,
  PlaceList,
  Settings,
} from '../pages';

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
  {
    path: '/eventos',
    name: 'Eventos',
    main: 'Eventos',
    element: <EventList />,
    children: [
      {
        path: '/eventos/adicionar',
        name: 'Adicionar novo evento',
        main: 'Eventos',
        element: <EventForm />,
      },
      {
        path: '/eventos/editar/:id',
        name: 'Editar evento',
        main: 'Eventos',
        element: <EventForm />,
      },
    ],
  },
  {
    path: '/locais',
    name: 'Locais',
    main: 'Locais',
    element: <PlaceList />,
    children: [
      {
        path: '/locais/adicionar',
        name: 'Adicionar novo local',
        main: 'Locais',
        element: <PlaceForm />,
      },
      {
        path: '/locais/editar/:id',
        name: 'Editar local',
        main: 'Locais',
        element: <PlaceForm />,
      },
    ],
  },
  {
    path: '/config',
    name: 'Configurações',
    main: 'Configurações',
    element: <Settings />,
  },
];
