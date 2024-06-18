import { ReactNode, useState } from 'react';
import { Field, FieldProps } from 'formik';

import {
  GridProps,
  Grid,
  TextFieldProps,
  TextField,
  IconButton,
  InputAdornment as MuiInputAdornment,
  Typography,
} from '@mui/material';

import {
  MdVisibility as VisibilityIcon,
  MdVisibilityOff as VisibilityOffIcon,
} from 'react-icons/md';

export type IInputProps = TextFieldProps & {
  className?: string;
  grid?: GridProps;
  localControl?: boolean;
  name: string;
  noGrid?: boolean;
  model?:
    | 'checkBox'
    | 'icon'
    | 'mask'
    | 'number'
    | 'password'
    | 'radioGroup'
    | 'select';
  readOnly?: boolean;
};

interface IIconProps {
  action?: () => void;
  actionTitle?: string;
  icon?: ReactNode;
  label?: ReactNode;
  start?: boolean;
}

type Props = IInputProps & IIconProps;

const defaultGrid: GridProps = {
  xs: 12,
  sm: 12,
  lg: 8,
};

const InputAd = ({
  action,
  actionTitle,
  icon,
  label,
  start,
}: IIconProps) => (
  <MuiInputAdornment position={start ? 'start' : 'end'}>
    {label && <Typography variant='caption'>{label}</Typography>}
    <IconButton
      aria-label={`input action ${actionTitle || ''}`}
      onClick={action}
      edge={start ? false : 'end'}
      tabIndex={-1}
      title={actionTitle}
    >
      {icon}
    </IconButton>
  </MuiInputAdornment>
);

const Basic = ({
  helperText,
  name,
  readOnly,
  variant = 'outlined',
  ...rest
}: Omit<
  IInputProps,
  'className' | 'grid' | 'noGrid' | 'model' | 'localControl'
>) => (
  <TextField
    {...rest}
    error={!!helperText}
    helperText={helperText}
    id={name}
    name={name}
    fullWidth
    InputProps={{
      readOnly,
    }}
    margin='normal'
    size='small'
    variant={variant}
  />
);

const Password = ({
  helperText,
  name,
  variant = 'outlined',
  ...rest
}: Omit<
  IInputProps,
  'className' | 'grid' | 'noGrid' | 'model' | 'localControl'
>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      {...rest}
      error={!!helperText}
      helperText={helperText}
      id={name}
      name={name}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAd
            action={() => setShowPassword(!showPassword)}
            actionTitle={showPassword ? 'Ocultar Senha' : 'Mostrar Senha'}
            icon={
              showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />
            }
          />
        ),
      }}
      margin='normal'
      type={showPassword ? 'text' : 'password'}
      size='small'
      variant={variant}
    />
  );
};

const Icon = ({
  action,
  actionTitle,
  helperText,
  icon,
  name,
  readOnly,
  start,
  variant = 'outlined',
  ...rest
}: Omit<
  Props,
  'className' | 'grid' | 'noGrid' | 'model' | 'localControl'
>) => {
  const adornment = (
    <InputAd
      action={action}
      actionTitle={actionTitle}
      icon={icon}
      start={start}
    />
  );

  return (
    <TextField
      {...rest}
      error={!!helperText}
      helperText={helperText}
      id={name}
      name={name}
      fullWidth
      InputProps={{
        readOnly,
        endAdornment: !start && adornment,
        startAdornment: start && adornment,
      }}
      margin='normal'
      size='small'
      variant={variant}
    />
  );
};

const RenderInput = ({
  className,
  grid = defaultGrid,
  noGrid,
  model,

  //icon
  action,
  actionTitle,
  icon,
  start,

  ...rest
}: Omit<Props, 'localControl'>) => {
  const getGrid = {
    ...defaultGrid,
    ...grid,
    md: grid.md || grid.lg || defaultGrid.lg,
  };

  const render = (() => {
    // <FormControl isInvalid={!!helperText}>
    //   <FormLabel>
    //     {label}
    //     {required ? '*' : ''}
    //   </FormLabel>
    //   {renderType}
    //   {helperText && (
    //     <FormErrorMessage textAlign='right' justifyContent='flex-end'>
    //       {helperText}
    //     </FormErrorMessage>
    //   )}
    // </FormControl>
    switch (model) {
      // case 'checkBox':
      //   return <CheckBox localControl={localControl} {...rest} />;
      // case 'currency':
      //   return (
      //     <Currency
      //       localControl={localControl}
      //       hideSymbol={hideSymbol}
      //       symbol={symbol}
      //       {...rest}
      //     />
      //   );
      case 'icon':
        return (
          <Icon
            action={action}
            actionTitle={actionTitle}
            icon={icon}
            start={start}
            {...rest}
          />
        );
      // case 'mask':
      //   return (
      //     <Mask
      //       localControl={localControl}
      //       custom={custom}
      //       maskModel={maskModel}
      //       {...rest}
      //     />
      //   );
      // case 'number':
      //   return (
      //     <Number localControl={localControl} decimal={decimal} {...rest} />
      //   );
      case 'password':
        return <Password {...rest} />;
      // case 'radioGroup':
      //   return (
      //     <RadioGroup
      //       localControl={localControl}
      //       rowDirection={rowDirection}
      //       options={options}
      //       {...rest}
      //     />
      //   );
      // case 'search':
      //   return (
      //     <Search
      //       creatable={creatable}
      //       creatableLabel={creatableLabel}
      //       searchChange={searchChange}
      //       options={options}
      //       {...rest}
      //     />
      //   );
      // case 'searchRequest':
      //   return (
      //     <SearchRequest
      //       creatable={creatable}
      //       creatableLabel={creatableLabel}
      //       searchChange={searchChange}
      //       icon={icon}
      //       {...rest}
      //     />
      //   );
      // case 'select':
      //   return (
      //     <Select
      //       localControl={localControl}
      //       defaultOption={defaultOption}
      //       NoNativeOptions={NoNativeOptions}
      //       options={options}
      //       {...rest}
      //     />
      //   );
      default:
        return <Basic {...rest} />;
    }
  })();

  return noGrid ? (
    render
  ) : (
    <Grid item className={className} {...getGrid}>
      {render}
    </Grid>
  );
};

export const Input = ({
  helperText,
  localControl = false,
  name = '',
  onBlur,
  onChange,
  ...rest
}: Props) => {
  return localControl ? (
    <RenderInput
      {...rest}
      onBlur={onBlur}
      name={name}
      helperText={helperText}
      onChange={onChange}
    />
  ) : (
    <Field name={name}>
      {({ field, meta }: FieldProps) => {
        const { touched, error } = meta;
        return (
          <RenderInput
            {...rest}
            {...field}
            name={name}
            helperText={touched && error ? error : undefined}
            onChange={(e) => {
              field.onChange(e);
              onChange?.(e);
            }}
            onBlur={(e) => {
              field.onBlur(e);
              onBlur?.(e);
            }}
            {...rest}
          />
        );
      }}
    </Field>
  );
};
