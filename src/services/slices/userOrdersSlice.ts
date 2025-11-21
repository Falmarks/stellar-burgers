import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TUserOrdersState = {
  orders: TOrder[];
};

const initialState: TUserOrdersState = {
  orders: []
};

export const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {
    setUserOrders: (state, action) => {
      state.orders = action.payload;
    }
  }
});

export const { setUserOrders } = userOrdersSlice.actions;
export default userOrdersSlice.reducer;
