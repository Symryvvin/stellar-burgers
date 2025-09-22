import { rootReducer } from '../../store';
import { initialState as constructorInitial } from '../constructorSlice';
import { initialState as feedInitial } from '../feedSlice';
import { initialState as orderInitial } from '../orderSlice';
import { initialState as ingredientsInitial } from '../ingredientsSlice';
import { initialState as userInitial } from '../userSlice';

describe('Проверяется правильная инициализация rootReducer', () => {
  test('должен вернуть начальное состояние при неизвестном action', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      order: orderInitial,
      user: userInitial,
      feed: feedInitial,
      ingredients: ingredientsInitial,
      burgerConstructor: constructorInitial
    });
  });
});
