import { userOrdersSlice, setUserOrders } from '../userOrdersSlice';
import { TOrder } from '@utils-types';

const mockOrders: TOrder[] = [
  {
    _id: '1',
    ingredients: ['643d69a5c3f7b9001cfa093c'],
    status: 'done',
    name: 'Test burger',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
    number: 12345
  }
];

describe('userOrders slice', () => {
  const initialState = {
    orders: []
  };

  it('should handle setUserOrders', () => {
    const action = setUserOrders(mockOrders);
    const state = userOrdersSlice.reducer(initialState, action);

    expect(state.orders).toEqual(mockOrders);
  });
});
