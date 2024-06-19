import {
  Button,
  Grid,
  GridProps,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { useField } from 'formik';
import { useState } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';

type Props = TextFieldProps & {
  className?: string;
  grid?: GridProps;
  name: string;
  readOnly?: boolean;
};

const defaultGrid: GridProps = {
  xs: 12,
  sm: 12,
  lg: 8,
};

export const ListInput = ({
  name,
  readOnly,
  grid = defaultGrid,
  ...rest
}: Props) => {
  const [field, meta, helper] = useField<string[]>(name);
  const { touched, error } = meta;
  const [value, setValue] = useState('');

  const getGrid = {
    ...defaultGrid,
    ...grid,
    md: grid.md || grid.lg || defaultGrid.lg,
  };

  const addItem = () => {
    const fV = field.value;

    const test = fV.find((i) => i === value);
    if (test) {
      helper.setError('Item já inserido');
      return;
    }
    if (value === '') return;
    field.onChange({ target: { name, value: [...fV, value] } });
    setValue('');
  };

  const deleteItem = (v: string) => {
    const fV = field.value;
    helper.setTouched(true);

    field.onChange({
      target: { name, value: fV.filter((i) => i !== v) },
    });
  };

  const keyCheck = (
    e: React.KeyboardEvent<
      | HTMLInputElement
      | HTMLButtonElement
      | HTMLDivElement
      | HTMLTextAreaElement
    >,
  ) => {
    if (e.key === 'Enter' || e.key === 'NumpadEnter') {
      addItem();
    }
  };

  return (
    <Grid item {...getGrid}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            {...rest}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            margin='normal'
            size='small'
            variant='outlined'
            error={touched && !!error}
            helperText={
              touched && error ? error : 'Precione "Enter" para inserir'
            }
            id={name}
            name={name}
            onBlur={() => helper.setTouched(true)}
            value={value}
            onKeyDown={keyCheck}
            onChange={(e) => {
              helper.setTouched(true);
              setValue(e.target.value.toUpperCase().slice(0, 3));
            }}
            InputProps={{
              readOnly,
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='input action Adicionar'
                    onClick={addItem}
                    edge='end'
                    tabIndex={-1}
                    title='Adicionar'
                    sx={{
                      borderRadius: '4px',
                      backgroundColor: 'info.dark',
                      marginRight: '-13px',
                    }}
                  >
                    <MdAdd />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          {field.value.map((v) => (
            <Button
              key={v}
              variant='contained'
              color='info'
              size='small'
              onClick={() => deleteItem(v)}
              endIcon={<MdClose />}
              sx={{
                minWidth: '10px',
                margin: '0.25rem',
              }}
            >
              {v}
            </Button>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
