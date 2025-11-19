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
  refreshToken: string;
  accessToken: string;
  user: TUser | null;
  userOrders: TOrder[];
  isRegisterSuccess: boolean;
  isLoginSuccess: boolean;
  isUpdateSuccess: boolean;
  isAuthChecked: boolean;
  errorText: string | undefined;
};

const initialState: TUserState = {
  refreshToken: '',
  accessToken: '',
  user: null,
  userOrders: [],
  isRegisterSuccess: false,
  isLoginSuccess: false,
  isUpdateSuccess: false,
  isAuthChecked: false,
  errorText: ''
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
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isRegisterSuccess = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isRegisterSuccess = false;
      state.errorText = action.error.message;
      console.log(action.error.message);
    });
    builder.addCase(registerUser.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
      isRegisterSuccess: true,
      errorText: ''
    }));

    builder.addCase(loginUser.pending, (state) => {
      state.isLoginSuccess = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoginSuccess = false;
      state.errorText = action.error.message;
      console.log(action.error.message);
    });
    builder.addCase(loginUser.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
      isLoginSuccess: true,
      errorText: ''
    }));

    builder.addCase(updateUser.pending, (state) => {
      state.isUpdateSuccess = false;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isUpdateSuccess = false;
      console.log(action.error.message);
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isUpdateSuccess = true;
      state.user = action.payload.user;
    });

    builder.addCase(getUserOrders.rejected, (_, action) => {
      console.log(action.error.message);
    });
    builder.addCase(getUserOrders.fulfilled, (state, action) => {
      state.userOrders = action.payload;
    });

    builder.addCase(userLogout.rejected, (_, action) => {
      console.log(action.error.message);
    });
    builder.addCase(userLogout.fulfilled, () => ({
      ...initialState,
      isAuthChecked: true
    }));
  }
});

export const { setUser, setIsAuthChecked } = userSlice.actions;
