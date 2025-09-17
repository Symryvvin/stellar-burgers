export const constructorSelectors = {
  categoryTitle: '[data-cy="ingredient-category-title"]',
  category: '[data-cy="ingredient-category"]',
  ingredient: '[data-cy="burger-constructor-ingredient"]',
  burgerConstructor: '[data-cy="burger-constructor"]',

  ingredientByCategory: (category: string) =>
    cy
      .contains(constructorSelectors.categoryTitle, category)
      .next(constructorSelectors.category)
      .find(constructorSelectors.ingredient)
      .first()
};

export const modalSelectors = {
  modal: '[data-cy="modal"]',
  modalContent: '[data-cy="modal-content"]',
  modalOverlay: '[data-cy="modal-overlay"]',
  modalCloseButton: '[data-cy="modal-close-button"]'
};
