import { burgerConstructorSlice } from '../burgerConstructorSlice';
import { TIngredient } from '@utils-types';

const mockIngredient: TIngredient = {
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
};

const mockBun: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

describe('burgerConstructor slice', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  it('should handle addIngredient for bun', () => {
    const action = burgerConstructorSlice.actions.addIngredient(mockBun);
    const state = burgerConstructorSlice.reducer(initialState, action);

    expect(state.bun).toMatchObject(mockBun);
    expect(state.bun).toHaveProperty('id', expect.any(String));
    expect(state.ingredients).toHaveLength(0);
  });

  it('should handle addIngredient for main ingredient', () => {
    const action = burgerConstructorSlice.actions.addIngredient(mockIngredient);
    const state = burgerConstructorSlice.reducer(initialState, action);

    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toMatchObject(mockIngredient);
    expect(state.ingredients[0]).toHaveProperty('id', expect.any(String));
  });

  it('should handle removeIngredient', () => {
    const stateWithIngredient = {
      bun: null,
      ingredients: [{ ...mockIngredient, id: 'test-id' }]
    };

    const action = burgerConstructorSlice.actions.removeIngredient('test-id');
    const state = burgerConstructorSlice.reducer(stateWithIngredient, action);

    expect(state.ingredients).toHaveLength(0);
  });

  it('should handle moveUp', () => {
    const ingredients = [
      { ...mockIngredient, id: '1' },
      { ...mockIngredient, id: '2' },
      { ...mockIngredient, id: '3' }
    ];

    const state = {
      bun: null,
      ingredients
    };

    const action = burgerConstructorSlice.actions.moveUp(1);
    const newState = burgerConstructorSlice.reducer(state, action);

    expect(newState.ingredients[0].id).toBe('2');
    expect(newState.ingredients[1].id).toBe('1');
    expect(newState.ingredients[2].id).toBe('3');
  });

  it('should handle moveDown', () => {
    const ingredients = [
      { ...mockIngredient, id: '1' },
      { ...mockIngredient, id: '2' },
      { ...mockIngredient, id: '3' }
    ];

    const state = {
      bun: null,
      ingredients
    };

    const action = burgerConstructorSlice.actions.moveDown(0);
    const newState = burgerConstructorSlice.reducer(state, action);

    expect(newState.ingredients[0].id).toBe('2');
    expect(newState.ingredients[1].id).toBe('1');
    expect(newState.ingredients[2].id).toBe('3');
  });

  it('should handle clearConstructor', () => {
    const stateWithItems = {
      bun: mockBun,
      ingredients: [{ ...mockIngredient, id: 'test-id' }]
    };

    const action = burgerConstructorSlice.actions.clearConstructor();
    const newState = burgerConstructorSlice.reducer(stateWithItems, action);

    expect(newState.bun).toBeNull();
    expect(newState.ingredients).toHaveLength(0);
  });
});
