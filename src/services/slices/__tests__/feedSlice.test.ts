// Мокаем API модуль с правильным путем
jest.mock('../../../utils/burger-api', () => ({
  getFeedsApi: jest.fn()
}));

import { feedSlice, getFeed } from '../feedSlice';
import { TOrder } from '@utils-types';

const mockOrders: TOrder[] = [
  {
    _id: '1',
    ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941'],
    status: 'done',
    name: 'Space флюоресцентный бургер',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
    number: 12345
  }
];

describe('feed slice', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isLoading: false
  };

  it('should handle getFeed.fulfilled', () => {
    const action = {
      type: getFeed.fulfilled.type,
      payload: {
        orders: mockOrders,
        total: 100,
        totalToday: 10
      }
    };
    const state = feedSlice.reducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(10);
  });

  it('should handle getFeed.rejected', () => {
    const action = {
      type: getFeed.rejected.type
    };
    const state = feedSlice.reducer(initialState, action);

    expect(state.isLoading).toBe(false);
  });
});
