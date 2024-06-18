import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { authSlice, placesSlice, systemSlice } from './slices';

export const store = configureStore({
  reducer: {
    system: systemSlice.reducer,
    auth: authSlice.reducer,
    places: placesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
