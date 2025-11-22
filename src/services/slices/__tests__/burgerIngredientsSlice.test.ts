import {
  burgerIngredientsSlice,
  getIngredients
} from '../burgerIngredientsSlice';
import { TIngredient } from '@utils-types';

const mockIngredients: TIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  }
];

describe('burgerIngredients slice', () => {
  const initialState = {
    ingredients: [],
    isLoading: false,
    error: null
  };

  it('should handle getIngredients.pending', () => {
    const action = { type: getIngredients.pending.type };
    const state = burgerIngredientsSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle getIngredients.fulfilled', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = burgerIngredientsSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.error).toBeNull();
  });

  it('should handle getIngredients.rejected', () => {
    const errorMessage = 'Failed to fetch ingredients';
    const action = {
      type: getIngredients.rejected.type,
      payload: errorMessage
    };
    const state = burgerIngredientsSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.ingredients).toEqual([]);
  });
});
