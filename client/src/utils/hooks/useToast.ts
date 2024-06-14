export interface UseToastOptionsProps {
  autoHideDuration?: number | null;
  persist?: boolean;
  onClose?: () => void;
  toastId?: string;
}

const basic = (msg: string, options?: UseToastOptionsProps) => {
  return console.log(msg, {
    ...options,
    variant: 'default',
    key: options?.toastId,
  });
};

const error = (msg: string, options?: UseToastOptionsProps) => {
  return console.log(msg, {
    ...options,
    variant: 'error',
    key: options?.toastId,
  });
};

const info = (msg: string, options?: UseToastOptionsProps) => {
  return console.log(msg, {
    ...options,
    variant: 'info',
    key: options?.toastId,
  });
};

const success = (msg: string, options?: UseToastOptionsProps) => {
  return console.log(msg, {
    ...options,
    variant: 'success',
    key: options?.toastId,
  });
};

const warning = (msg: string, options?: UseToastOptionsProps) => {
  return console.log(msg, {
    ...options,
    variant: 'warning',
    key: options?.toastId,
  });
};

export const useToast = {
  basic,
  error,
  info,
  success,
  warning,
};
