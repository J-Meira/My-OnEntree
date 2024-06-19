import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  IGetAllParams,
  IList,
  IOption,
  IEvent,
  IType,
} from '../../@types';
import { eventServices } from '../../services';

import { AppThunk } from '..';
import { removeLoading, setLoading } from '.';

interface IEventsState extends IList<IEvent> {
  types: IOption[];
}

const initialState: IEventsState = {
  totalOfRecords: 0,
  records: [],
  types: [],
};

export const getAllEvents =
  (payload: IGetAllParams): AppThunk =>
  (dispatch) => {
    dispatch(setLoading('getAllEvents'));
    eventServices.getAll(payload).then((r) => {
      dispatch(removeLoading('getAllEvents'));

      if (r) dispatch(eventsSlice.actions.setRecords(r));
    });
  };

export const getAllEventsTypes = (): AppThunk => (dispatch) => {
  dispatch(setLoading('getAllEvents'));
  eventServices.getTypes().then((r) => {
    dispatch(removeLoading('getAllEvents'));

    if (r) dispatch(eventsSlice.actions.setTypes(r));
  });
};

export const deleteEvent =
  (payload: number, callback: () => void): AppThunk =>
  (dispatch) => {
    dispatch(setLoading('deleteEvent'));
    eventServices.deleteById(payload).then((r) => {
      dispatch(removeLoading('deleteEvent'));

      if (r) callback();
    });
  };

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setRecords: (state, { payload }: PayloadAction<IList<IEvent>>) => {
      state.records = payload.records;
      state.totalOfRecords = payload.totalOfRecords;
    },
    setTypes: (state, { payload }: PayloadAction<IList<IType>>) => {
      state.types = payload.records.map((r) => ({
        value: r.id,
        label: r.label,
      }));
    },
  },
});
