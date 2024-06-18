import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '..';

export interface IDialogReturn {
  origin?: string;
  status?: boolean;
}

interface IDialog {
  isOpen: boolean;
  cancel?: boolean;
  title: string;
  message: string | React.ReactNode;
  successLabel: string;
  origin: string;
  return: IDialogReturn;
}

interface ISystemState {
  backgroundColor: string;
  dialog: IDialog;
  isDark: boolean;
  pendingActions: string[];
  rowsPerPage: number;
}

const localRows = localStorage.getItem('SG_P_RP') || '5';
const localIsDark = localStorage.getItem('SG_P_ID')
  ? localStorage.getItem('SG_P_ID') === 'true'
    ? true
    : false
  : window.matchMedia('(prefers-color-scheme: dark)').matches;

const initialDialog: IDialog = {
  isOpen: false,
  cancel: true,
  title: '',
  message: '',
  origin: '',
  successLabel: 'Ok',
  return: {},
};

const initialState: ISystemState = {
  dialog: initialDialog,
  backgroundColor: localIsDark ? '#191E28' : '#EDF2F7',
  isDark: localIsDark,
  pendingActions: [],
  rowsPerPage: JSON.parse(localRows),
};

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    handleTheme: (state) => {
      const newValue = !state.isDark;
      localStorage.setItem('SG_P_ID', JSON.stringify(newValue));
      state.isDark = newValue;
      state.backgroundColor = newValue ? '#191E28' : '#EDF2F7';
    },
    handleRows: (state, { payload }: PayloadAction<number>) => {
      localStorage.setItem('SG_P_RP', JSON.stringify(payload));
      state.rowsPerPage = payload;
    },
    openDialog: (state, { payload }: PayloadAction<IDialog>) => {
      state.dialog = payload;
    },
    closeDialog: (state, { payload }: PayloadAction<boolean>) => {
      state.dialog = {
        ...initialDialog,
        return: {
          origin: state.dialog.origin,
          status: payload,
        },
      };
    },
    setLoading: (state, { payload }: PayloadAction<string>) => {
      state.pendingActions = [...state.pendingActions, payload];
    },
    removeLoading: (state, { payload }: PayloadAction<string>) => {
      if (state.pendingActions.length > 1) {
        const indexOf = state.pendingActions.findIndex(
          (i) => i === payload,
        );
        state.pendingActions = state.pendingActions.splice(indexOf, 1);
      } else {
        state.pendingActions = [];
      }
    },
  },
});

export const {
  closeDialog,
  handleRows,
  handleTheme,
  openDialog,
  removeLoading,
  setLoading,
} = systemSlice.actions;

export const getLoading = (state: RootState): boolean =>
  state.system.pendingActions.length > 0;
