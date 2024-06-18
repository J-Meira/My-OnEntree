import { Box, Button, Paper, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  icon: ReactNode;
  title: string;
  subTitle: string;
  destiny: string;
  color: string;
  label: string;
}

export const CardHome = ({
  icon,
  title,
  subTitle,
  destiny,
  color,
  label,
}: Props) => {
  return (
    <Paper elevation={2} className={`card-home ${color}`}>
      <Box>
        <Typography variant='h2' fontWeight={600} fontSize={28}>
          {icon} {title}
        </Typography>
        <Typography fontSize={12}>{subTitle}</Typography>
      </Box>
      <Button component={Link} to={destiny} variant='contained'>
        {label}
      </Button>
    </Paper>
  );
};
