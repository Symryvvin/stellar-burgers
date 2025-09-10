import {
  createAsyncThunk,
  createSelector,
  createSlice
} from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

type IngredientsState = {
  ingredients: TIngredient[];
  error: string | null;
  status: 'success' | 'error' | 'loading';
};

const initialState: IngredientsState = {
  ingredients: [],
  error: null,
  status: 'loading'
};

export type TIngredientTypes = 'bun' | 'sauce' | 'main';

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => await getIngredientsApi()
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    ingredientsSelector: (state) => state.ingredients,
    ingredientByTypeSelector: createSelector(
      (state: IngredientsState) => state.ingredients,
      (_: any, type: TIngredientTypes) => type,
      (ingredients, type) =>
        ingredients.filter((ingredient) => ingredient.type === type)
    ),
    ingredientByIdSelector: createSelector(
      (state: IngredientsState) => state.ingredients,
      (_: any, id: string) => id,
      (ingredients, id) =>
        ingredients.find((ingredient) => ingredient._id === id)
    ),
    errorSelector: (state) => state.error,
    statusSelector: (state) => state.status
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.status = 'success';
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.status = 'error';
        state.error =
          action.error.message ?? 'Ошибка при получении списка ингредиентов';
      });
  }
});

export const {
  ingredientsSelector,
  ingredientByTypeSelector,
  ingredientByIdSelector,
  errorSelector,
  statusSelector
} = ingredientsSlice.selectors;
