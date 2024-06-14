import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { authSlice, systemSlice } from './slices';

export const store = configureStore({
  reducer: {
    system: systemSlice.reducer,
    auth: authSlice.reducer,
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
