declare namespace Cypress {
  interface Chainable {
    /**
     * Находит первый ингредиент в категории и сохраняет как alias
     * @param category Название категории ("Булки", "Начинки", "Соусы")
     * @param alias Имя алиаса (например, "bun")
     */
    getFirstIngredientInCategory(category: string, alias: string): Chainable<JQuery<HTMLElement>>;

    /**
     * Находит конструткор бургера
     */
    getBurgerConstructor(): Chainable<JQuery<HTMLElement>>;

    /**
     * Открывает модалку для ингредиента по alias
     * @param alias Имя алиаса
     */
    openModalForIngredient(alias: string): Chainable<JQuery<HTMLElement>>;

    /**
     * Закрывает модальное окно с любым контентом и проверяет что он закрыто
     */
    closeModal(): Chainable<JQuery<HTMLElement>>;
  }
}
