import { Chip, ChipOwnProps } from '@mui/material';
import { IType } from '../@types';

interface Props {
  type: IType;
}

const getColor = (id: number): ChipOwnProps['color'] => {
  switch (id) {
    case 2:
      return 'error';
    case 3:
      return 'info';
    case 4:
      return 'success';
    case 5:
      return 'warning';
    default:
      return 'primary';
  }
};

export const TypeChip = ({ type }: Props) => (
  <Chip
    label={type.label}
    color={getColor(type.id)}
    sx={{
      borderRadius: '6px',
      fontWeight: 600,
      height: 'auto',
      padding: '0.15rem 0',
    }}
  />
);
