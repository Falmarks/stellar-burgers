import '@testing-library/jest-dom';

// Глобальный мок для алиаса @api - решает проблему раз и навсегда
jest.mock(
  '@api',
  () => ({
    getIngredientsApi: jest.fn(),
    getFeedsApi: jest.fn(),
    getOrdersApi: jest.fn(),
    getUserApi: jest.fn(),
    loginUserApi: jest.fn(),
    logoutApi: jest.fn(),
    registerUserApi: jest.fn(),
    updateUserApi: jest.fn(),
    orderBurgerApi: jest.fn(),
    getOrderByNumberApi: jest.fn(),
    forgotPasswordApi: jest.fn(),
    resetPasswordApi: jest.fn(),
    refreshToken: jest.fn(),
    fetchWithRefresh: jest.fn()
  }),
  { virtual: true }
); // virtual: true создает виртуальный модуль

// Полифилл для crypto.randomUUID
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: () => 'test-uuid-' + Math.random().toString(36).substring(2, 9)
  }
});

// Мокаем ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}));

// Мокаем window.scrollTo
window.scrollTo = jest.fn();

// Мокаем matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});
