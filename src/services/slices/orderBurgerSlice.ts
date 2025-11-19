import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

type TOrderBurgerState = {
  isLoading: boolean;
  orderData: TOrder | null;
  orderByNumber: TOrder | null;
  isOrderSuccess: boolean;
  error: string | null;
};

const initialState: TOrderBurgerState = {
  isLoading: false,
  orderData: null,
  orderByNumber: null,
  isOrderSuccess: false,
  error: null
};

export const orderBurger = createAsyncThunk(
  'orderBurger/send',
  async (ingredients: string[], { rejectWithValue }) => {
    try {
      return await orderBurgerApi(ingredients);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
);

export const getOrderByNumber = createAsyncThunk(
  'order/getByNumber',
  async (orderNumber: number, { rejectWithValue }) => {
    try {
      return await getOrderByNumberApi(orderNumber);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
);

export const orderBurgerSlice = createSlice({
  name: 'orderBurger',
  initialState,
  reducers: {
    clearOrder: () => initialState,
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isOrderSuccess = false;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.isLoading = false;
        state.isOrderSuccess = false;
        state.error = action.payload as string;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isOrderSuccess = true;
        state.orderData = action.payload.order;
        state.error = null;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderByNumber = action.payload;
        state.error = null;
      });
  }
});

export const { clearOrder, clearError } = orderBurgerSlice.actions;

export default orderBurgerSlice.reducer;
