import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  IGetAllParams,
  IList,
  IOption,
  IPlace,
  IType,
} from '../../@types';
import { placeServices } from '../../services';

import { AppThunk } from '..';
import { removeLoading, setLoading } from '.';

interface IPlacesState extends IList<IPlace> {
  types: IOption[];
}

const initialState: IPlacesState = {
  totalOfRecords: 0,
  records: [],
  types: [],
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

export const getAllPlacesTypes = (): AppThunk => (dispatch) => {
  dispatch(setLoading('getAllPlaces'));
  placeServices.getTypes().then((r) => {
    dispatch(removeLoading('getAllPlaces'));

    if (r) dispatch(placesSlice.actions.setTypes(r));
  });
};

export const deletePlace =
  (payload: number, callback: () => void): AppThunk =>
  (dispatch) => {
    dispatch(setLoading('deletePlace'));
    placeServices.deleteById(payload).then((r) => {
      dispatch(removeLoading('deletePlace'));

      if (r) callback();
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
    setTypes: (state, { payload }: PayloadAction<IList<IType>>) => {
      state.types = payload.records.map((r) => ({
        value: r.id,
        label: r.label,
      }));
    },
  },
});
