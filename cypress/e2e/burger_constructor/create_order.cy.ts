// Создание заказа:
//   Созданы mocks-данные ответа на запрос данных пользователя.
//   Созданы mocks-данные ответа на запрос создания заказа.
//   Подставляются mocks-токены авторизации.
//   Собирается бургер.
//   Вызывается клик по кнопке «Оформить заказ».
// Проверяется, что модальное окно открылось и номер заказа верный.
//   Закрывается модальное окно и проверяется успешность закрытия.
//   Проверяется, что конструктор пуст.
describe('Проверка создания заказа', function () {
  beforeEach(() => {
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );

    window.localStorage.setItem('refreshToken', 'mockRefreshToken');
    cy.setCookie('accessToken', 'mockAccessToken');

    cy.visit('/');

    cy.wait('@getUser');
  });

  afterEach(() => {
    window.localStorage.removeItem('refreshToken');
    cy.clearCookie('accessToken');
  });

  it('создание нового заказа', () => {
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    cy.getFirstIngredientInCategory('Булки', 'bun');
    cy.getFirstIngredientInCategory('Начинки', 'main');
    cy.getFirstIngredientInCategory('Соусы', 'sauce');

    cy.get('@bun').find('button').click({ force: true });
    cy.get('@main').find('button').click({ force: true });
    cy.get('@sauce').find('button').click({ force: true });

    cy.get('[data-cy="place-order"]').click({ force: true });
    cy.wait('@createOrder').its('response.statusCode').should('eq', 200);

    cy.get('[data-cy="modal"]').should('exist');

    cy.fixture('order.json').then((res) => {
      cy.get('[data-cy="order-number"]').should('have.text', res.order.number);
    });

    cy.closeModal();

    cy.getBurgerConstructor().within(() => {
      cy.get('[data-cy="burger-constructor-item"]').should(
        'contain.text',
        'Выберите '
      );
    });
  });
});
