import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { deleteCookie, setCookie } from '../../utils/cookie';

type TUserState = {
  user: TUser | null;
  userOrders: TOrder[];
  isAuthChecked: boolean;
  errorText: string | undefined;
  isRegisterSuccess: boolean;
  isLoginSuccess: boolean;
};

const initialState: TUserState = {
  user: null,
  userOrders: [],
  isAuthChecked: false,
  errorText: undefined,
  isRegisterSuccess: false,
  isLoginSuccess: false
};

export const registerUser = createAsyncThunk(
  'user/register',
  async (registerData: TRegisterData) => {
    const res = await registerUserApi(registerData);
    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', res.accessToken);
    return res;
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (loginData: TLoginData) => {
    const res = await loginUserApi(loginData);
    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', res.accessToken);
    return res;
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (userData: Partial<TRegisterData>) => await updateUserApi(userData)
);

export const getUserOrders = createAsyncThunk(
  'user/getOrders',
  async () => await getOrdersApi()
);

export const userLogout = createAsyncThunk('user/logout', async () => {
  const res = await logoutApi();
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
  return res;
});

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    try {
      const res = await getUserApi();
      dispatch(setUser(res.user));
    } finally {
      dispatch(setIsAuthChecked(true));
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    clearError: (state) => {
      state.errorText = undefined;
    },
    clearAuthFlags: (state) => {
      state.isRegisterSuccess = false;
      state.isLoginSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isRegisterSuccess = false;
        state.errorText = undefined;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isRegisterSuccess = false;
        state.errorText = action.error.message || 'Registration failed';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isRegisterSuccess = true;
        state.user = action.payload.user;
        state.errorText = undefined;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoginSuccess = false;
        state.errorText = undefined;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoginSuccess = false;
        state.errorText = action.error.message || 'Login failed';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoginSuccess = true;
        state.user = action.payload.user;
        state.errorText = undefined;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.errorText = action.error.message || 'Update failed';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.errorText = undefined;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.errorText = action.error.message || 'Failed to get orders';
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload;
        state.errorText = undefined;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.errorText = action.error.message || 'Logout failed';
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.user = null;
        state.userOrders = [];
        state.isRegisterSuccess = false;
        state.isLoginSuccess = false;
        state.errorText = undefined;
      })
      .addCase(checkUserAuth.rejected, (state, action) => {
        state.errorText = action.error.message || 'Auth check failed';
      });
  }
});

export const { setUser, setIsAuthChecked, clearError, clearAuthFlags } =
  userSlice.actions;

export default userSlice.reducer;
