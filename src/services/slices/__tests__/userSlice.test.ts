// Мокаем API модуль с правильным путем
jest.mock('../../../utils/burger-api', () => ({
  getOrdersApi: jest.fn(),
  getUserApi: jest.fn(),
  loginUserApi: jest.fn(),
  logoutApi: jest.fn(),
  registerUserApi: jest.fn(),
  updateUserApi: jest.fn()
}));

import {
  userSlice,
  loginUser,
  checkUserAuth,
  userLogout,
  registerUser,
  updateUser,
  getUserOrders
} from '../userSlice';
import { TUser, TOrder } from '@utils-types';

const mockUser: TUser = {
  email: 'test@example.com',
  name: 'Test User'
};

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

describe('user slice', () => {
  const initialState = {
    user: null,
    userOrders: [],
    isAuthChecked: false,
    errorText: undefined,
    isRegisterSuccess: false,
    isLoginSuccess: false
  };

  it('should handle loginUser.fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: { user: mockUser }
    };
    const state = userSlice.reducer(initialState, action);

    expect(state.isLoginSuccess).toBe(true);
    expect(state.user).toEqual(mockUser);
    expect(state.errorText).toBeUndefined();
  });

  it('should handle loginUser.rejected', () => {
    const errorMessage = 'Login failed';
    const action = {
      type: loginUser.rejected.type,
      error: { message: errorMessage }
    };
    const state = userSlice.reducer(initialState, action);

    expect(state.isLoginSuccess).toBe(false);
    expect(state.errorText).toBe(errorMessage);
    expect(state.user).toBeNull();
  });

  it('should handle registerUser.pending', () => {
    const action = { type: registerUser.pending.type };
    const state = userSlice.reducer(initialState, action);

    expect(state.isRegisterSuccess).toBe(false);
    expect(state.errorText).toBeUndefined();
  });

  it('should handle registerUser.fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: { user: mockUser }
    };
    const state = userSlice.reducer(initialState, action);

    expect(state.isRegisterSuccess).toBe(true);
    expect(state.user).toEqual(mockUser);
    expect(state.errorText).toBeUndefined();
  });

  it('should handle registerUser.rejected', () => {
    const errorMessage = 'Registration failed';
    const action = {
      type: registerUser.rejected.type,
      error: { message: errorMessage }
    };
    const state = userSlice.reducer(initialState, action);

    expect(state.isRegisterSuccess).toBe(false);
    expect(state.errorText).toBe(errorMessage);
    expect(state.user).toBeNull();
  });

  it('should handle updateUser.fulfilled', () => {
    const updatedUser = { ...mockUser, name: 'Updated User' };
    const action = {
      type: updateUser.fulfilled.type,
      payload: { user: updatedUser }
    };
    const state = userSlice.reducer(
      { ...initialState, user: mockUser },
      action
    );

    expect(state.user).toEqual(updatedUser);
    expect(state.errorText).toBeUndefined();
  });

  it('should handle updateUser.rejected', () => {
    const errorMessage = 'Update failed';
    const action = {
      type: updateUser.rejected.type,
      error: { message: errorMessage }
    };
    const state = userSlice.reducer(initialState, action);

    expect(state.errorText).toBe(errorMessage);
  });

  it('should handle getUserOrders.fulfilled', () => {
    const action = {
      type: getUserOrders.fulfilled.type,
      payload: mockOrders
    };
    const state = userSlice.reducer(initialState, action);

    expect(state.userOrders).toEqual(mockOrders);
    expect(state.errorText).toBeUndefined();
  });

  it('should handle getUserOrders.rejected', () => {
    const errorMessage = 'Failed to get orders';
    const action = {
      type: getUserOrders.rejected.type,
      error: { message: errorMessage }
    };
    const state = userSlice.reducer(initialState, action);

    expect(state.errorText).toBe(errorMessage);
  });

  it('should handle userLogout.fulfilled', () => {
    const stateWithUser = {
      ...initialState,
      user: mockUser,
      userOrders: mockOrders,
      isLoginSuccess: true,
      isRegisterSuccess: true
    };

    const action = {
      type: userLogout.fulfilled.type
    };
    const state = userSlice.reducer(stateWithUser, action);

    expect(state.user).toBeNull();
    expect(state.userOrders).toEqual([]);
    expect(state.isLoginSuccess).toBe(false);
    expect(state.isRegisterSuccess).toBe(false);
    expect(state.errorText).toBeUndefined();
  });

  it('should handle userLogout.rejected', () => {
    const errorMessage = 'Logout failed';
    const action = {
      type: userLogout.rejected.type,
      error: { message: errorMessage }
    };
    const state = userSlice.reducer(initialState, action);

    expect(state.errorText).toBe(errorMessage);
  });

  // Тесты для синхронных экшенов
  it('should handle setUser', () => {
    const action = userSlice.actions.setUser(mockUser);
    const state = userSlice.reducer(initialState, action);

    expect(state.user).toEqual(mockUser);
  });

  it('should handle setIsAuthChecked', () => {
    const action = userSlice.actions.setIsAuthChecked(true);
    const state = userSlice.reducer(initialState, action);

    expect(state.isAuthChecked).toBe(true);
  });

  it('should handle clearError', () => {
    const stateWithError = {
      ...initialState,
      errorText: 'Some error'
    };

    const action = userSlice.actions.clearError();
    const state = userSlice.reducer(stateWithError, action);

    expect(state.errorText).toBeUndefined();
  });

  it('should handle clearAuthFlags', () => {
    const stateWithFlags = {
      ...initialState,
      isLoginSuccess: true,
      isRegisterSuccess: true
    };

    const action = userSlice.actions.clearAuthFlags();
    const state = userSlice.reducer(stateWithFlags, action);

    expect(state.isLoginSuccess).toBe(false);
    expect(state.isRegisterSuccess).toBe(false);
  });
});
