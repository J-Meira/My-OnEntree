import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '..';
import { ILatest, IList, IOption, IState } from '../../@types';
import { latestServices, locationServices } from '../../services';

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
  states: IOption[];
  latest?: ILatest;
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
  states: [],
};

export const getAllStates = (): AppThunk => (dispatch) => {
  dispatch(setLoading('getAllStates'));
  locationServices.getAllStates().then((r) => {
    dispatch(removeLoading('getAllStates'));

    if (r) dispatch(systemSlice.actions.setStates(r));
  });
};

export const getLatest = (): AppThunk => (dispatch) => {
  dispatch(setLoading('getLatest'));
  latestServices.get().then((r) => {
    dispatch(removeLoading('getLatest'));

    if (r) dispatch(systemSlice.actions.setLatest(r));
  });
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
    clearDialog: (state) => {
      state.dialog = initialDialog;
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
    setStates: (state, { payload }: PayloadAction<IList<IState>>) => {
      state.states = payload.records.map((r) => ({
        value: r.id,
        label: r.name,
      }));
    },
    setLatest: (state, { payload }: PayloadAction<ILatest>) => {
      state.latest = payload;
    },
    clearLatest: (state) => {
      state.latest = undefined;
    },
  },
});

export const {
  clearDialog,
  closeDialog,
  handleRows,
  handleTheme,
  openDialog,
  removeLoading,
  setLoading,
  clearLatest,
} = systemSlice.actions;

export const getLoading = (state: RootState): boolean =>
  state.system.pendingActions.length > 0;
