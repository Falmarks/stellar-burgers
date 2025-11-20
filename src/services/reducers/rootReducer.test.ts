import { store } from '../store';

describe('rootReducer', () => {
  it('should properly initialize store with all reducers', () => {
    const state = store.getState();

    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('burgerIngredients');
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('orderBurger');
  });

  it('should handle unknown action types', () => {
    const initialState = store.getState();
    store.dispatch({ type: 'UNKNOWN_ACTION' });
    const newState = store.getState();

    expect(newState).toEqual(initialState);
  });
});
