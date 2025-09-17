// Протестировано добавление ингредиента из списка в конструктор.
// Минимальные требования — добавление одного ингредиента,
// в идеале — добавление булок и добавление начинок.
import { TIngredient } from '@utils-types';

describe('Проверка страницы конструктора бургеров', function () {
  it('добавление ингредиента из списка в конструктор', () => {
    cy.getFirstIngredientInCategory('Булки', 'bun');
    cy.getFirstIngredientInCategory('Начинки', 'main');
    cy.getFirstIngredientInCategory('Соусы', 'sauce');

    cy.get('@bun').find('button').click({ force: true });
    cy.get('@main').find('button').click({ force: true });
    cy.get('@sauce').find('button').click({ force: true });

    cy.fixture('ingredients.json').then((data) => {
      const bun = data.data.find((i: TIngredient) => i.type === 'bun');
      const main = data.data.find((i: TIngredient) => i.type === 'main');
      const sauce = data.data.find((i: TIngredient) => i.type === 'sauce');

      cy.getBurgerConstructor().within(() => {
        cy.contains(bun.name).should('exist');
        cy.contains(main.name).should('exist');
        cy.contains(sauce.name).should('exist');
      });
    });
  });
});
