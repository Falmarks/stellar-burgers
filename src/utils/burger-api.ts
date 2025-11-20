import { setCookie, getCookie } from './cookie';
import { TIngredient, TOrder, TUser } from './types';

const BASE_URL =
  process.env.REACT_APP_BURGER_API_URL ||
  process.env.BURGER_API_URL ||
  'https://norma.education-services.ru/api';

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

const checkSuccess = <T>(res: T & { success: boolean }): T => {
  if (res && res.success) {
    return res;
  }
  throw new Error('Response not success');
};

const request = <T>(endpoint: string, options?: RequestInit): Promise<T> =>
  fetch(`${BASE_URL}/${endpoint}`, options)
    .then((res) => checkResponse<T & { success: boolean }>(res))
    .then(checkSuccess);

type TServerResponse<T> = {
  success: boolean;
} & T;

type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;

export const refreshToken = (): Promise<TRefreshResponse> =>
  request<TRefreshResponse>('auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  }).then((refreshData) => {
    localStorage.setItem('refreshToken', refreshData.refreshToken);
    setCookie('accessToken', refreshData.accessToken);
    return refreshData;
  });

export const fetchWithRefresh = async <T>(
  endpoint: string,
  options: RequestInit
): Promise<T> => {
  try {
    return await request<T>(endpoint, options);
  } catch (err) {
    if ((err as { message: string }).message === 'jwt expired') {
      const refreshData = await refreshToken();

      const updatedOptions = {
        ...options,
        headers: {
          ...options.headers,
          authorization: refreshData.accessToken
        } as HeadersInit
      };

      return request<T>(endpoint, updatedOptions);
    }
    return Promise.reject(err);
  }
};

type TIngredientsResponse = TServerResponse<{
  data: TIngredient[];
}>;

type TFeedsResponse = TServerResponse<{
  orders: TOrder[];
  total: number;
  totalToday: number;
}>;

type TOrdersResponse = TServerResponse<{
  orders: TOrder[];
}>;

export const getIngredientsApi = (): Promise<TIngredient[]> =>
  request<TIngredientsResponse>('ingredients').then((data) => data.data);

export const getFeedsApi = (): Promise<TFeedsResponse> =>
  request<TFeedsResponse>('orders/all');

export const getOrdersApi = (): Promise<TOrder[]> =>
  fetchWithRefresh<TFeedsResponse>('orders', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken')
    } as HeadersInit
  }).then((data) => data.orders);

type TNewOrderResponse = TServerResponse<{
  order: TOrder;
  name: string;
}>;

export const orderBurgerApi = (data: string[]): Promise<TNewOrderResponse> =>
  fetchWithRefresh<TNewOrderResponse>('orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken')
    } as HeadersInit,
    body: JSON.stringify({
      ingredients: data
    })
  });

export const getOrderByNumberApi = (number: number): Promise<TOrder> =>
  request<TOrdersResponse>(`orders/${number}`).then((data) => {
    if (data.orders.length > 0) return data.orders[0];
    throw new Error('Order not found');
  });

export type TRegisterData = {
  email: string;
  name: string;
  password: string;
};

type TAuthResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
  user: TUser;
}>;

export const registerUserApi = (data: TRegisterData): Promise<TAuthResponse> =>
  request<TAuthResponse>('auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });

export type TLoginData = {
  email: string;
  password: string;
};

export const loginUserApi = (data: TLoginData): Promise<TAuthResponse> =>
  request<TAuthResponse>('auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });

export const forgotPasswordApi = (data: {
  email: string;
}): Promise<TServerResponse<{}>> =>
  request<TServerResponse<{}>>('password-reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });

export const resetPasswordApi = (data: {
  password: string;
  token: string;
}): Promise<TServerResponse<{}>> =>
  request<TServerResponse<{}>>('password-reset/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });

type TUserResponse = TServerResponse<{ user: TUser }>;

export const getUserApi = (): Promise<TUserResponse> =>
  fetchWithRefresh<TUserResponse>('auth/user', {
    headers: {
      authorization: getCookie('accessToken')
    } as HeadersInit
  });

export const updateUserApi = (
  user: Partial<TRegisterData>
): Promise<TUserResponse> =>
  fetchWithRefresh<TUserResponse>('auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken')
    } as HeadersInit,
    body: JSON.stringify(user)
  });

export const logoutApi = (): Promise<TServerResponse<{}>> =>
  request<TServerResponse<{}>>('auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  });
