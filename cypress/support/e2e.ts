import './commands';

// Глобальные настройки
beforeEach(() => {
  // Мокаем API запросы
  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
  cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('createOrder');
  cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('getUser');
});
