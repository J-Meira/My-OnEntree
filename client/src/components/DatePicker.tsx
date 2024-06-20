import { useField } from 'formik';

import { Dayjs } from 'dayjs';
import { Grid, GridProps, TextFieldProps } from '@mui/material';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers';

import { defaultGrid } from './defaultGrid';

type Props = Omit<TextFieldProps, 'value' | 'onChange'> & {
  grid?: GridProps;
  className?: string;
  name: string;
  readOnly?: boolean;
  disableFuture?: boolean;
  disablePast?: boolean;
  showTodayButton?: boolean;
  onChange?: (newValue: Dayjs | null) => void;
};

export const DatePicker = ({
  grid = defaultGrid,
  className,
  name,
  readOnly,
  required,
  placeholder,
  disabled,
  disableFuture,
  disablePast,
  showTodayButton,
  label,
}: Props) => {
  const [field, meta, helper] = useField<Dayjs | null>(name);
  const { touched, error } = meta;

  const getGrid = {
    ...defaultGrid,
    ...grid,
    md: grid.md || grid.lg || defaultGrid.lg,
  };

  const onBlur = () => {
    helper.setTouched(true);
  };

  const onChange = (value: Dayjs | null) => {
    field.onChange({ target: { name, value: value } });
  };

  const inputProps: TextFieldProps = {
    InputLabelProps: {
      shrink: true,
    },
    fullWidth: true,
    margin: 'normal',
    size: 'small',
    variant: 'outlined',
    required: required,
    disabled: disabled,
    error: touched && !!error,
    helperText: touched && error ? error : undefined,
    onBlur: onBlur,
    placeholder: placeholder,
  };

  const dateProps = {
    disableFuture: disableFuture,
    disablePast: disablePast,
    readOnly: readOnly,
    disabled: disabled,
  };

  return (
    <Grid item className={className} {...getGrid}>
      <MuiDatePicker
        {...dateProps}
        format='DD/MM/YYYY'
        onChange={onChange}
        value={field.value}
        label={label}
        showDaysOutsideCurrentMonth
        slotProps={{
          textField: {
            ...inputProps,
          },
          actionBar: () => ({
            actions: showTodayButton ? ['today'] : [],
          }),
        }}
      />
    </Grid>
  );
};
