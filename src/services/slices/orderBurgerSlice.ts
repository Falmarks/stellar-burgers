import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

type TOrderBurgerState = {
  isLoading: boolean;
  orderData: TOrder | null;
  orderByNumber: TOrder | null;
  isOrderSuccess: boolean;
};

const initialState: TOrderBurgerState = {
  isLoading: false,
  orderData: null,
  orderByNumber: null,
  isOrderSuccess: false
};

export const orderBurger = createAsyncThunk(
  'orderBurger/send',
  async (ingredients: string[]) => await orderBurgerApi(ingredients)
);

export const getOrderByNumber = createAsyncThunk(
  'order/getByNumber',
  async (orderNumber: number) => await getOrderByNumberApi(orderNumber)
);

export const orderBurgerSlice = createSlice({
  name: 'orderBurger',
  initialState,
  reducers: {
    clearOrder: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(orderBurger.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(orderBurger.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.error.message);
    });
    builder.addCase(orderBurger.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isOrderSuccess = true;
      state.orderData = action.payload.order;
    });

    builder.addCase(getOrderByNumber.rejected, (_, action) => {
      console.log(action.error.message);
    });
    builder.addCase(getOrderByNumber.fulfilled, (state, action) => {
      state.orderByNumber = action.payload.orders[0];
    });
  }
});

export const { clearOrder } = orderBurgerSlice.actions;
