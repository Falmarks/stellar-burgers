import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TConstructorState = {
  ingredients: TConstructorIngredient[];
  bun: TIngredient | null;
};

const initialState: TConstructorState = {
  ingredients: [],
  bun: null
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients = [...state.ingredients, action.payload];
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = crypto.randomUUID();
        return { payload: { ...ingredient, id: id } };
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveUp: (state, action: PayloadAction<number>) => {
      const currentElement = action.payload;
      const upperElement = action.payload - 1;
      [state.ingredients[currentElement], state.ingredients[upperElement]] = [
        state.ingredients[upperElement],
        state.ingredients[currentElement]
      ];
    },
    moveDown: (state, action: PayloadAction<number>) => {
      const currentElement = action.payload;
      const downElement = action.payload + 1;
      [state.ingredients[currentElement], state.ingredients[downElement]] = [
        state.ingredients[downElement],
        state.ingredients[currentElement]
      ];
    },
    clearConstructor: () => initialState
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveUp,
  moveDown,
  clearConstructor
} = burgerConstructorSlice.actions;
