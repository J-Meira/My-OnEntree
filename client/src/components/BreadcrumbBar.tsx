import { Typography, Breadcrumbs, Link, Box } from '@mui/material';
import { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { privateRoutes } from '../router/PrivateRoutes';

export interface BreadcrumbsListProps {
  link?: string;
  label: string;
}

interface Props {
  subTitle: string;
}

export const BreadcrumbBar = ({ subTitle }: Props) => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('Home');
  const [list, setList] = useState<BreadcrumbsListProps[]>([]);

  const arrangeList = useCallback(() => {
    const { pathname } = location;
    if (pathname === '/') {
      setPageTitle('Home');
      setList([{ label: 'Home' }]);
    } else {
      const paths = pathname.split('/');
      console.log(paths);

      if (paths.length === 2) {
        const route = privateRoutes.find((r) => r.path === pathname);
        if (route) {
          setPageTitle(route.name);
          setList([{ label: 'Home', link: '/' }, { label: route.name }]);
        }
      } else {
        const route = privateRoutes.find((r) => r.path === '/' + paths[1]);
        if (route && route.children) {
          console.log(route);

          const subRoute = route.children.find((r) =>
            r.path.includes('/' + paths[1] + '/' + paths[2]),
          );
          if (subRoute) {
            setPageTitle(subRoute.name);
            setList([
              { label: 'Home', link: '/' },
              { label: subRoute.main },
            ]);
          }
        }
      }
    }
  }, [location]);

  useEffect(() => {
    arrangeList();
  }, [location, arrangeList]);

  return (
    <Box className='header-bar'>
      <Breadcrumbs aria-label='breadcrumb'>
        {list &&
          list.map((item, index) => {
            if (index !== list.length - 1) {
              return item.link ? (
                <Link key={index} color='inherit' href={item.link}>
                  {item.label}
                </Link>
              ) : (
                <Typography key={index}>{item.label}</Typography>
              );
            } else {
              return (
                <Typography key={index} color='info.main'>
                  {item.label}
                </Typography>
              );
            }
          })}
      </Breadcrumbs>
      <Box>
        <Typography variant='h2' fontWeight={600} fontSize={28}>
          {pageTitle}
        </Typography>
        <Typography fontSize={12}>{subTitle}</Typography>
      </Box>
    </Box>
  );
};
