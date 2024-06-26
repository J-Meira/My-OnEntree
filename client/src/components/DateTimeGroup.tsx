import { ReactNode } from 'react';
import { useField } from 'formik';

import { Dayjs } from 'dayjs';
import { Grid, GridProps, TextFieldProps } from '@mui/material';
import { DatePicker, TimeField } from '@mui/x-date-pickers';

import { defaultGrid } from './defaultGrid';

type Props = Omit<TextFieldProps, 'value' | 'onChange'> & {
  dateGrid?: GridProps;
  timeGrid?: GridProps;
  dateClassName?: string;
  timeClassName?: string;
  dateLabel?: ReactNode;
  timeLabel?: ReactNode;
  datePlaceholder?: string;
  timePlaceholder?: string;
  name: string;
  readOnly?: boolean;
  disableFuture?: boolean;
  disablePast?: boolean;
  onChange?: (newValue: Dayjs | null) => void;
};

export const DateTimeGroup = ({
  dateGrid = defaultGrid,
  timeGrid = defaultGrid,
  dateClassName,
  timeClassName,
  dateLabel,
  timeLabel,
  datePlaceholder,
  timePlaceholder,
  name,
  readOnly,
  required,
  disabled,
  disableFuture,
  disablePast,
}: Props) => {
  const [field, meta, helper] = useField<Dayjs | null>(name);
  const { touched, error } = meta;

  const getGrid = (g: GridProps) => ({
    ...defaultGrid,
    ...g,
    md: g.md || g.lg || defaultGrid.lg,
  });

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
  };

  const dateProps = {
    disableFuture: disableFuture,
    disablePast: disablePast,
    readOnly: readOnly,
    disabled: disabled,
  };

  return (
    <>
      <Grid item className={dateClassName} {...getGrid(dateGrid)}>
        <DatePicker
          {...dateProps}
          format='DD/MM/YYYY'
          onChange={(value) => onChange(value)}
          value={field.value}
          label={dateLabel}
          timezone='UTC'
          showDaysOutsideCurrentMonth
          slotProps={{
            textField: {
              ...inputProps,
              placeholder: datePlaceholder,
            },
          }}
        />
      </Grid>
      <Grid item className={timeClassName} {...getGrid(timeGrid)}>
        <TimeField
          {...dateProps}
          value={field.value}
          timezone='UTC'
          onChange={(value) => onChange(value)}
          label={timeLabel}
          ampm={false}
          slotProps={{
            textField: {
              ...inputProps,
              placeholder: timePlaceholder,
            },
          }}
        />
      </Grid>
    </>
  );
};
