import {
  getIngredients,
  ingredientsSlice,
  IngredientsState,
  initialState
} from '../ingredientsSlice';
import ingredientsMockJson from '../mocks/ingredients.json';
import { TIngredient } from '@utils-types';

const ingredientsMock: TIngredient[] = ingredientsMockJson;

describe('ingredientsSlice reducer', () => {
  const reducer = ingredientsSlice.reducer;

  it('должен установить status=loading при getIngredients.pending', () => {
    const state = reducer(initialState, { type: getIngredients.pending.type });

    expect(state.status).toBe('loading');
  });

  it('должен установить ingredients и status=success при getIngredients.fulfilled', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: ingredientsMock
    };
    const state = reducer(initialState, action);

    expect(state.status).toBe('success');
    expect(state.ingredients).toEqual(ingredientsMock);
  });

  it('должен установить status=error и error при getIngredients.rejected', () => {
    const action = {
      type: getIngredients.rejected.type,
      error: { message: 'Ошибка сети' }
    };
    const state = reducer(initialState, action);

    expect(state.status).toBe('error');
    expect(state.error).toBe('Ошибка сети');
  });
});

describe('ingredientsSlice selector', () => {
  it('ingredientsSelector должен возвращать массив ингредиентов', () => {
    const state: { ingredients: IngredientsState } = {
      ingredients: {
        ...initialState,
        ingredients: ingredientsMock
      }
    };

    expect(ingredientsSlice.selectors.ingredientsSelector(state)).toEqual(
      ingredientsMock
    );
  });

  it('ingredientByTypeSelector должен фильтровать ингредиенты по типу', () => {
    const state: { ingredients: IngredientsState } = {
      ingredients: {
        ...initialState,
        ingredients: ingredientsMock
      }
    };
    const buns = ingredientsSlice.selectors.ingredientByTypeSelector(
      state,
      'bun'
    );

    expect(buns).toEqual([ingredientsMock[0]]);
  });

  it('ingredientByIdSelector должен находить ингредиент по _id', () => {
    const state: { ingredients: IngredientsState } = {
      ingredients: {
        ...initialState,
        ingredients: ingredientsMock
      }
    };
    const ingredient = ingredientsSlice.selectors.ingredientByIdSelector(
      state,
      '643d69a5c3f7b9001cfa0941'
    );

    expect(ingredient).toEqual(ingredientsMock[1]);
  });

  it('errorSelector и statusSelector должны возвращать корректные значения', () => {
    const state: { ingredients: IngredientsState } = {
      ingredients: {
        ...initialState,
        error: 'Ошибка',
        status: 'error'
      }
    };

    expect(ingredientsSlice.selectors.errorSelector(state)).toBe('Ошибка');
    expect(ingredientsSlice.selectors.statusSelector(state)).toBe('error');
  });
});
