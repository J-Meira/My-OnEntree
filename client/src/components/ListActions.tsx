import { ReactNode, useEffect, useState } from 'react';
import { useDebounce } from '../utils/hooks';
import { Box, Collapse, Grid } from '@mui/material';
import {
  MdFilterList as FilterListIcon,
  MdSearch as SearchIcon,
} from 'react-icons/md';
import { Input } from './Input';
import { Button } from './Button';

interface Props {
  onSearch: (value: string) => void;
  filters?: () => ReactNode;
  onClearFilters?: () => void;
  onApplyFilters?: () => void;
  onAdd: () => void;
  addLabel: string;
  searchLabel: string;
}
export const ListActions = ({
  onSearch,
  filters,
  onClearFilters,
  onApplyFilters,
  onAdd,
  addLabel,
  searchLabel,
}: Props) => {
  const { debounce } = useDebounce(300, false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const clearFilters = () => {
    onClearFilters?.();
    setIsFiltersOpen(false);
  };

  useEffect(() => {
    debounce(() => {
      onSearch(searchTerm);
    });

    // eslint-disable-next-line
  }, [searchTerm]);
  return (
    <>
      <Grid
        item
        xs={12}
        sx={{
          paddingTop: '0!important',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Box display='flex' flexGrow={1} alignItems='center'>
          <Input
            localControl
            name='data-table-search'
            model='icon'
            placeholder={searchLabel}
            start
            icon={<SearchIcon />}
            action={() => onSearch(searchTerm)}
            actionTitle='Pesquisar'
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            grid={{
              lg: 5,
            }}
          />
          {filters && (
            <Button
              contained
              model='icon'
              title={`${isFiltersOpen ? 'Ocultar' : 'Mostar'} filtros`}
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            >
              <FilterListIcon />
            </Button>
          )}
        </Box>
        <Button contained color='primary' onClick={onAdd}>
          {addLabel}
        </Button>
      </Grid>
      {filters && onApplyFilters && (
        <Grid item xs={12} className='filters'>
          <Collapse in={isFiltersOpen} timeout='auto' unmountOnExit>
            <Grid container spacing={2}>
              {filters()}
              <Grid item xs={12} className='filters-actions'>
                <Button contained onClick={clearFilters} color='warning'>
                  Limpar
                </Button>
                <Button contained onClick={onApplyFilters}>
                  Filtrar
                </Button>
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
      )}
    </>
  );
};
