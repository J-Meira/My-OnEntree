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
  dialog: IDialog;
  pendingActions: string[];
  rowsPerPage: number;
}

const localRows = localStorage.getItem('SG_P_RP') || '5';

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
  pendingActions: [],
  rowsPerPage: JSON.parse(localRows),
};

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
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
  openDialog,
  removeLoading,
  setLoading,
} = systemSlice.actions;

export const getLoading = (state: RootState): boolean =>
  state.system.pendingActions.length > 0;
