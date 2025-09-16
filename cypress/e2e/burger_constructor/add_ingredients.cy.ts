// Протестировано добавление ингредиента из списка в конструктор.
// Минимальные требования — добавление одного ингредиента,
// в идеале — добавление булок и добавление начинок.
describe('Проверка страницы конструктора бургеров', function () {
  it('добавление ингредиента из списка в конструктор', () => {
    cy.contains('[data-cy="ingredient-category-title"]', 'Булки')
      .next('[data-cy="ingredient-category"]')
      .within(() => {
        cy.get('[data-cy="burger-constructor-ingredient"]').first().as('bun');
      });

    cy.contains('[data-cy="ingredient-category-title"]', 'Начинки')
      .next('[data-cy="ingredient-category"]')
      .within(() => {
        cy.get('[data-cy="burger-constructor-ingredient"]').first().as('main');
      });

    cy.contains('[data-cy="ingredient-category-title"]', 'Соусы')
      .next('[data-cy="ingredient-category"]')
      .within(() => {
        cy.get('[data-cy="burger-constructor-ingredient"]').first().as('sauce');
      });

    cy.get('@bun').find('button').click({ force: true });
    cy.get('@main').find('button').click({ force: true });
    cy.get('@sauce').find('button').click({ force: true });

    cy.fixture('ingredients.json').then((data) => {
      const bun = data.data.find((i: any) => i.type === 'bun');
      const main = data.data.find((i: any) => i.type === 'main');
      const sauce = data.data.find((i: any) => i.type === 'sauce');

      cy.get('[data-cy="burger-constructor"]').within(() => {
        cy.contains(bun.name).should('exist');
        cy.contains(main.name).should('exist');
        cy.contains(sauce.name).should('exist');
      });
    });
  });
});
