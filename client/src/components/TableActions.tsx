import { Menu, MenuItem } from '@mui/material';
import { IElement } from '../@types';

interface Props<T extends object> {
  element: IElement<T>;
  editAction: (row: T) => void;
  deleteAction: (row: T) => void;
  onClose: () => void;
}

export const TableActions = <T extends object>({
  element,
  editAction,
  deleteAction,
  onClose,
}: Props<T>) => {
  return (
    <Menu
      id='simple-menu'
      anchorEl={element.anchorEl}
      keepMounted
      open={element.anchorEl != null && !!element.row}
      onClose={onClose}
    >
      <MenuItem onClick={() => editAction(element.row!)}>Editar</MenuItem>
      <MenuItem onClick={() => deleteAction(element.row!)}>
        Apagar
      </MenuItem>
    </Menu>
  );
};
