import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IGetAllParams, IList, IPlace } from '../../@types';
import { placeServices } from '../../services';

import { AppThunk } from '..';
import { removeLoading, setLoading } from '.';

interface IPlacesState extends IList<IPlace> {}

const initialState: IPlacesState = {
  totalOfRecords: 0,
  records: [],
};

export const getAllPlaces =
  (payload: IGetAllParams): AppThunk =>
  (dispatch) => {
    dispatch(setLoading('getAllPlaces'));
    placeServices.getAll(payload).then((r) => {
      dispatch(removeLoading('getAllPlaces'));

      if (r) dispatch(placesSlice.actions.setRecords(r));
    });
  };

export const deletePlace =
  (payload: number): AppThunk =>
  (dispatch) => {
    dispatch(setLoading('deletePlace'));
    placeServices.deleteById(payload).then((r) => {
      dispatch(removeLoading('deletePlace'));

      if (r) dispatch(placesSlice.actions.delete(payload));
    });
  };

export const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    setRecords: (state, { payload }: PayloadAction<IList<IPlace>>) => {
      state.records = payload.records;
      state.totalOfRecords = payload.totalOfRecords;
    },
    delete: (state, { payload }: PayloadAction<number>) => {
      state.records = state.records.filter((r) => r.id !== payload);
    },
  },
});
