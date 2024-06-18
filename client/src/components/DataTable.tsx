import { ReactNode, useState } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow as MuiTableRow,
  TableCell as MuiTableCell,
  TableSortLabel,
  TableBody,
  Grid,
  styled,
  tableCellClasses,
} from '@mui/material';

export type IOrder = 'asc' | 'desc';

interface IColumn<T extends object> {
  align?: 'center' | 'inherit' | 'justify' | 'left' | 'right';
  className?: string;
  disablePadding?: boolean;
  isSortable?: boolean;
  key: keyof T | 'actions';
  label?: string;
  limit?: number;
  maxWidth?: number;
  minWidth?: number;
  objectKey?: string;
  render?: (row: T, index?: number) => ReactNode;
  width?: number;
}

interface Props<T extends object> {
  columns: IColumn<T>[];
  rows: T[];
  defaultOrderBy: keyof T;
  defaultDesc?: boolean;
  maxHeight?: number;
  minHeight?: number;
  tabHeight?: number;
  title: string;
  showHeader?: boolean;
  uniqueCol?: string;
  onHandleOrder: (order: string) => void;
}

const TableRow = styled(MuiTableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
    border: 0,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const TableCell = styled(MuiTableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    border: 0,
  },
  [`&.${tableCellClasses.body}`]: {
    border: 0,
  },
}));

export const DataTable = <T extends object>({
  columns,
  rows,
  defaultOrderBy,
  defaultDesc,
  maxHeight,
  minHeight,
  tabHeight,
  title,
  showHeader,
  uniqueCol,
  onHandleOrder,
}: Props<T>) => {
  const [orderBy, setOrderBy] = useState<keyof T>(defaultOrderBy);
  const [order, setOrder] = useState<IOrder>(defaultDesc ? 'desc' : 'asc');

  const onRequestSort = (key: keyof T) => {
    const isAsc = orderBy === key && order === 'asc';
    const newOrder = isAsc ? 'desc' : 'asc';
    setOrder(newOrder);
    setOrderBy(key);
    onHandleOrder(`${order === 'desc' ? '-' : ''}${orderBy as string}`);
  };

  const compressedString = (value: string, limit: number) => {
    return value.length > limit ? value.slice(0, limit) + '...' : value;
  };

  return (
    <Grid item xs={12}>
      <TableContainer
        sx={
          tabHeight || maxHeight || minHeight
            ? {
                maxHeight: maxHeight || tabHeight,
                minHeight: minHeight || tabHeight,
              }
            : undefined
        }
      >
        <Table
          stickyHeader={tabHeight || maxHeight || minHeight ? true : false}
          aria-labelledby={`table-${title}`}
          // size='small'
          aria-label={`table-${title}`}
        >
          {showHeader && (
            <TableHead>
              <MuiTableRow>
                {columns.map((col, index) =>
                  col.key === 'actions' && !col.render ? null : (
                    <TableCell
                      key={`t-header-${col.key.toString()}${index}`}
                      align={col.align}
                      padding={col.disablePadding ? 'none' : 'normal'}
                      sortDirection={orderBy === col.key ? order : false}
                      style={
                        col.minWidth || col.maxWidth || col.width
                          ? {
                              maxWidth: col.maxWidth,
                              minWidth: col.minWidth,
                              width: col.width,
                            }
                          : undefined
                      }
                    >
                      {col.isSortable && col.key !== 'actions' ? (
                        <TableSortLabel
                          active={orderBy === col.key}
                          direction={orderBy === col.key ? order : 'asc'}
                          onClick={() => onRequestSort(col.key as keyof T)}
                        >
                          {col.label}
                        </TableSortLabel>
                      ) : (
                        col.label
                      )}
                    </TableCell>
                  ),
                )}
              </MuiTableRow>
            </TableHead>
          )}
          <TableBody>
            {uniqueCol && (
              <TableRow hover tabIndex={-1}>
                <TableCell
                  align='center'
                  padding='normal'
                  colSpan={columns.length}
                >
                  {uniqueCol}
                </TableCell>
              </TableRow>
            )}
            {rows &&
              rows.map((row, index) => {
                const labelId = `data-table-${title}-row-${index}`;
                return (
                  <TableRow tabIndex={-1} key={labelId}>
                    {columns &&
                      columns.map((col, cIndex) => {
                        const key = col.key;
                        if (key === 'actions' || col.render) {
                          if (!col.render) return;
                          col.className =
                            key === 'actions' && !col.className
                              ? 'data-table-col-actions'
                              : col.className;
                          return (
                            <TableCell
                              key={index + key.toString() + cIndex}
                              align={col.align}
                              padding={
                                col.disablePadding ? 'none' : 'normal'
                              }
                              className={col.className}
                            >
                              {col.render(row, index)}
                            </TableCell>
                          );
                        } else if (col.limit) {
                          return (
                            <TableCell
                              key={index + key.toString() + cIndex}
                              align={col.align}
                              padding={
                                col.disablePadding ? 'none' : 'normal'
                              }
                              className={col.className}
                            >
                              {compressedString(
                                row[key] as string,
                                col.limit,
                              )}
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell
                              key={index + key.toString() + cIndex}
                              align={col.align}
                              padding={
                                col.disablePadding ? 'none' : 'normal'
                              }
                              className={col.className}
                            >
                              {row[key] as string}
                            </TableCell>
                          );
                        }
                      })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};
