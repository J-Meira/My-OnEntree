import { ReactNode } from 'react';
import {
  ButtonProps as MuiButtonProps,
  Button as MuiButton,
  Typography,
  IconButtonProps,
  IconButton,
} from '@mui/material';

import { MdEdit as DefaultIcon } from 'react-icons/md';

export interface ButtonProps extends MuiButtonProps {
  model?: 'custom' | 'icon' | 'responsive';
  contained?: boolean;
}

export interface ResponsiveButtonProps {
  icon?: ReactNode;
}

type Props = ButtonProps & ResponsiveButtonProps;

const Basic = ({ children, ...rest }: ButtonProps) => (
  <MuiButton {...rest}>{children}</MuiButton>
);

const Icon = ({ children, size = 'small', ...rest }: IconButtonProps) => (
  <IconButton size={size} {...rest}>
    {children}
  </IconButton>
);

const Responsive = ({
  children,
  icon = <DefaultIcon />,
  ...rest
}: Omit<Props, 'model'>) => (
  <MuiButton className='responsive-btn' {...rest}>
    <Typography variant='button'>{icon}</Typography>
    <Typography
      sx={{ ml: 1, display: { xs: 'none', sm: 'block' } }}
      variant='button'
    >
      {children}
    </Typography>
  </MuiButton>
);

export const Button = ({
  children,
  icon,
  model,
  contained = false,
  variant = 'contained',
  ...rest
}: Props) => {
  switch (model) {
    case 'icon':
      return <Icon {...rest}>{children}</Icon>;
    case 'responsive':
      return (
        <Responsive
          fullWidth={!contained}
          icon={icon}
          variant={variant}
          {...rest}
        >
          {children}
        </Responsive>
      );
    default:
      return (
        <Basic fullWidth={!contained} variant={variant} {...rest}>
          {children}
        </Basic>
      );
  }
};
