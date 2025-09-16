// Протестирована работа модальных окон:
// - открытие модального окна ингредиента;
// - закрытие по клику на крестик;
// - закрытие по клику на оверлей (желательно);
describe('Работа модальных окон', function () {
  it('открытие модельного окна ингредиента (булки)', () => {
    cy.contains('[data-cy="ingredient-category-title"]', 'Булки')
      .next('[data-cy="ingredient-category"]')
      .within(() => {
        cy.get('[data-cy="burger-constructor-ingredient"]')
          .first()
          .find('a')
          .click({ force: true });
      });

    cy.get('[data-cy="modal"]').should('exist');

    cy.get('[data-cy="ingredient-details"]').within(() => {
      cy.fixture('ingredients.json').then((data) => {
        const bun = data.data.find((i: any) => i.type === 'bun');
        cy.get('h3').should('have.text', bun.name);
        cy.get('ul li').eq(0).should('contain.text', bun.calories);
        cy.get('ul li').eq(1).should('contain.text', bun.proteins);
        cy.get('ul li').eq(2).should('contain.text', bun.fat);
        cy.get('ul li').eq(3).should('contain.text', bun.carbohydrates);
      });
    });
  });

  it('закрытие модального окна по клику на крестик', () => {
    cy.contains('[data-cy="ingredient-category-title"]', 'Булки')
      .next('[data-cy="ingredient-category"]')
      .within(() => {
        cy.get('[data-cy="burger-constructor-ingredient"]')
          .first()
          .find('a')
          .click({ force: true });
      });

    cy.get('[data-cy="modal"]').should('exist');

    cy.get('[data-cy="modal-close-button"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('закрытие модального окна по клику на оверлей', () => {
    cy.contains('[data-cy="ingredient-category-title"]', 'Булки')
      .next('[data-cy="ingredient-category"]')
      .within(() => {
        cy.get('[data-cy="burger-constructor-ingredient"]')
          .first()
          .find('a')
          .click({ force: true });
      });

    cy.get('[data-cy="modal"]').should('exist');

    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
  });
});
