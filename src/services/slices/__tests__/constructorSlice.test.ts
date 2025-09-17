import {
  addIngredientToConstructor,
  clearConstructor,
  constructorSlice,
  initialState,
  moveIngredientDown,
  moveIngredientUp,
  removeIngredientFromConstructor
} from '../constructorSlice';
import { bun, main, sauce } from '../mocks/constructorIngredients';

const reducer = constructorSlice.reducer;

describe('constructorSlice reducer', () => {
  it('должен добавлять булку в конструктор', () => {
    const state = reducer(initialState, addIngredientToConstructor(bun));

    expect(state.bun).toEqual(bun);
    expect(state.ingredients).toEqual([]);
  });

  it('должен добавлять начинку в конструктор', () => {
    const state = reducer(initialState, addIngredientToConstructor(main));

    expect(state.ingredients).toEqual([main]);
  });

  it('должен удалять ингредиент по id из конструктор', () => {
    const startState = { bun: null, ingredients: [main, sauce] };
    const state = reducer(startState, removeIngredientFromConstructor('main1'));

    expect(state.ingredients).toEqual([sauce]);
  });

  it('должен менять порядок ингредиентов (вверх) в конструкторе', () => {
    const startState = { bun: null, ingredients: [main, sauce] };
    const state = reducer(startState, moveIngredientUp(1));

    expect(state.ingredients).toEqual([sauce, main]);
  });

  it('должен менять порядок ингредиентов (вниз) в конструкторе', () => {
    const startState = { bun: null, ingredients: [main, sauce] };
    const state = reducer(startState, moveIngredientDown(0));

    expect(state.ingredients).toEqual([sauce, main]);
  });

  it('должен очищать конструктор', () => {
    const startState = { bun: bun, ingredients: [main, sauce] };
    const state = reducer(startState, clearConstructor());

    expect(state.ingredients).toEqual([]);
  });
});
