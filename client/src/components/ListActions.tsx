import { ReactNode, useEffect, useState } from 'react';

import { Box, Collapse, Grid } from '@mui/material';
import {
  MdFilterList as FilterOnIcon,
  MdFilterListOff as FilterOffIcon,
  MdSearch as SearchIcon,
} from 'react-icons/md';

import { Input, Button } from '.';

import { useDebounce } from '../utils/hooks';
import { filtersSchema } from '../utils/schemas';
import { IFilters } from '../@types';
import { Formik } from 'formik';

interface Props {
  onSearch: (value: string) => void;
  filters?: () => ReactNode;
  onApplyFilters?: (data: IFilters) => void;
  onAdd: () => void;
  addLabel: string;
  searchLabel: string;
}

const initialFilters: IFilters = {
  dateStart: null,
  dateEnd: null,
  id: -1,
};

export const ListActions = ({
  onSearch,
  filters,
  onApplyFilters,
  onAdd,
  addLabel,
  searchLabel,
}: Props) => {
  const { debounce } = useDebounce(300, false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const onHandleFilters = (data: IFilters) => {
    onApplyFilters?.(data);
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
              lg: 6,
            }}
          />
          {filters && (
            <Button
              contained
              model='icon'
              color='info'
              sx={{ ml: 2 }}
              title={`${isFiltersOpen ? 'Ocultar' : 'Mostar'} filtros`}
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            >
              {isFiltersOpen ? <FilterOnIcon /> : <FilterOffIcon />}
            </Button>
          )}
        </Box>
        <Button contained color='primary' onClick={onAdd}>
          {addLabel}
        </Button>
      </Grid>
      {filters && onApplyFilters && (
        <Grid item xs={12}>
          <Formik
            enableReinitialize
            initialValues={initialFilters}
            onSubmit={(values) => onHandleFilters(values)}
            validationSchema={filtersSchema}
          >
            {(formik) => (
              <form noValidate>
                <Collapse in={isFiltersOpen} timeout='auto' unmountOnExit>
                  <Grid container spacing={2}>
                    {filters()}
                    <Grid
                      item
                      xs={12}
                      sx={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                      <Button
                        sx={{ mr: 2, width: 145 }}
                        contained
                        variant='outlined'
                        onClick={() => {
                          onApplyFilters?.(initialFilters);
                          setIsFiltersOpen(false);
                          formik.handleReset();
                        }}
                      >
                        Limpar
                      </Button>
                      <Button
                        sx={{ width: 145 }}
                        contained
                        onClick={() => formik.handleSubmit()}
                      >
                        Filtrar
                      </Button>
                    </Grid>
                  </Grid>
                </Collapse>
              </form>
            )}
          </Formik>
        </Grid>
      )}
    </>
  );
};
