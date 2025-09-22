import { constructorSelectors, modalSelectors } from './selectors';

Cypress.Commands.add(
  'getFirstIngredientInCategory',
  (category: string, alias: string) => {
    cy.contains(constructorSelectors.categoryTitle, category)
      .next(constructorSelectors.category)
      .find(constructorSelectors.ingredient)
      .first()
      .as(alias);
  }
);

Cypress.Commands.add('getBurgerConstructor', () => {
  cy.get(constructorSelectors.burgerConstructor);
});

Cypress.Commands.add('openModalForIngredient', (alias: string) => {
  cy.get(`@${alias}`).find('a').click({ force: true });
  cy.get(modalSelectors.modal).should('exist');
});

Cypress.Commands.add('closeModal', () => {
  cy.get(modalSelectors.modalCloseButton).click();
  cy.get(modalSelectors.modal).should('not.exist');
});
