import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  Divider,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Avatar,
} from '@mui/material';
import { MdMenu, MdArrowDropDown } from 'react-icons/md';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { signOut } from '../redux/slices';
import { ThemeSwitch } from './ThemeSwitch';

const links = [
  { link: '/', label: 'Home' },
  { link: '/eventos', label: 'Eventos' },
  { link: '/locais', label: 'Locais' },
];

export const Header = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const matches = useMediaQuery('(max-width:899px)');
  const { isDark } = useAppSelector((state) => state.system);
  const { user } = useAppSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = () => {
    setAnchorEl(null);
    setIsOpen(false);
    dispatch(signOut());
  };
  const openMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const isActive = (item: string) => {
    if (pathname === '/' && item === '/') return true;
    return item !== '/' && pathname.indexOf(item) >= 0;
  };

  const getAvatar = (label: string) => {
    const s = label.split(' ');
    const v =
      s.length > 1 ? `${s[0][0]}${s[1][0]}` : `${s[0][0]}${s[0][1]}`;
    return v.toUpperCase();
  };

  useEffect(() => {
    if (isOpen && !matches) setIsOpen(false);
  }, [matches, isOpen]);

  return (
    <>
      <AppBar position='relative' color='transparent' component='nav'>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Link to='/'>
            <img
              width='180px'
              src={`/assets/logos/main${isDark ? '-dark' : ''}.svg`}
              alt='Logo My OnEntrée'
            />
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
            }}
          >
            {links.map((item) => (
              <Button
                key={item.link}
                sx={{
                  fontWeight: isActive(item.link) ? 700 : 300,
                  textDecoration: isActive(item.link)
                    ? 'underline'
                    : undefined,
                }}
                component={Link}
                to={item.link}
              >
                {item.label}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Box sx={{ mr: 1 }} display='flex' alignItems='center'>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  backgroundColor: 'info.light',
                  fontSize: '0.8rem',
                }}
              >
                {getAvatar(user?.name || 'usuário')}
              </Avatar>
              <Typography
                sx={{ cursor: 'pointer', ml: 1 }}
                onClick={openMenu}
              >
                {`Olá, ${user?.name || 'usuário'}`} <MdArrowDropDown />
              </Typography>
            </Box>
            <ThemeSwitch />
          </Box>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={() => setIsOpen(true)}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MdMenu />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={anchorEl != null}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </Menu>
      <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
        <Box
          sx={{ width: 250 }}
          role='presentation'
          onClick={() => setIsOpen(false)}
        >
          <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            padding={2}
          >
            <Avatar
              sx={{
                mb: 1,
                width: 80,
                height: 80,
                backgroundColor: 'info.light',
                fontSize: '2rem',
              }}
            >
              {getAvatar(user?.name || 'usuário')}
            </Avatar>
            <Typography>{`Olá, ${user?.name || 'usuário'}`}</Typography>
          </Box>
          <Divider />
          <List>
            {links.map((item) => (
              <ListItem key={'m' + item.link} disablePadding>
                <ListItemButton component={Link} to={item.link}>
                  <ListItemText color='inherit' primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={handleSignOut}>
                <ListItemText color='inherit' primary='Sair' />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};
