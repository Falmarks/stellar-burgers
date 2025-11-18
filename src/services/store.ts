import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { burgerIngredientsSlice } from './slices/burgerIngredientsSlice';
import { burgerConstructorSlice } from './slices/burgerConstructorSlice';
import { feedSlice } from './slices/feedSlice';
import { userSlice } from './slices/userSlice';
import { orderBurgerSlice } from './slices/orderBurgerSlice';

const rootReducer = combineSlices(
  burgerIngredientsSlice,
  burgerConstructorSlice,
  feedSlice,
  userSlice,
  orderBurgerSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
