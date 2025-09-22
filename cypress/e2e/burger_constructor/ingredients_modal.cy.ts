// Протестирована работа модальных окон:
// - открытие модального окна ингредиента;
// - закрытие по клику на крестик;
// - закрытие по клику на оверлей (желательно);
import { TIngredient } from '@utils-types';

describe('Работа модальных окон', function () {
  it('открытие модального окна ингредиента (булки)', () => {
    const bunAlias = 'bun';
    cy.getFirstIngredientInCategory('Булки', bunAlias);
    cy.openModalForIngredient(bunAlias);

    cy.get('[data-cy="ingredient-details"]').within(() => {
      cy.fixture('ingredients.json').then((data) => {
        const bun = data.data.find((i: TIngredient) => i.type === bunAlias);
        cy.get('h3').should('have.text', bun.name);
        cy.get('ul li').eq(0).should('contain.text', bun.calories);
        cy.get('ul li').eq(1).should('contain.text', bun.proteins);
        cy.get('ul li').eq(2).should('contain.text', bun.fat);
        cy.get('ul li').eq(3).should('contain.text', bun.carbohydrates);
      });
    });
  });

  it('закрытие модального окна по клику на крестик', () => {
    const bunAlias = 'bun';
    cy.getFirstIngredientInCategory('Булки', bunAlias);
    cy.openModalForIngredient(bunAlias);

    cy.closeModal();
  });

  it('закрытие модального окна по клику на оверлей', () => {
    const bunAlias = 'bun';
    cy.getFirstIngredientInCategory('Булки', bunAlias);
    cy.openModalForIngredient(bunAlias);

    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
  });
});
