import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TConstructorItems } from '@utils-types';

export const initialState: TConstructorItems = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredientToConstructor: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const ingredient = action.payload;

      if (ingredient.type === 'bun') {
        state.bun = ingredient;
      } else {
        state.ingredients.push(ingredient);
      }
    },
    removeIngredientFromConstructor: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0) {
        const temp = state.ingredients[index - 1];
        state.ingredients[index - 1] = state.ingredients[index];
        state.ingredients[index] = temp;
      }
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < state.ingredients.length - 1) {
        const temp = state.ingredients[index + 1];
        state.ingredients[index + 1] = state.ingredients[index];
        state.ingredients[index] = temp;
      }
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    getConstructorItemsSelector: (state: TConstructorItems) => state
  }
});

export const {
  addIngredientToConstructor,
  removeIngredientFromConstructor,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} = constructorSlice.actions;

export const { getConstructorItemsSelector } = constructorSlice.selectors;
