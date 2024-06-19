import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {
  authSlice,
  eventsSlice,
  placesSlice,
  systemSlice,
} from './slices';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    events: eventsSlice.reducer,
    places: placesSlice.reducer,
    system: systemSlice.reducer,
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
