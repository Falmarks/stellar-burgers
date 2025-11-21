declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string): Chainable;
      login(email: string, password: string): Chainable;
      addBunToConstructor(): Chainable;
      addIngredientToConstructor(index?: number): Chainable;
      openIngredientModal(ingredientName: string): Chainable;
      closeModal(): Chainable;
      createOrder(): Chainable;
    }
  }
}

Cypress.Commands.add('getByTestId', (testId: string) =>
  cy.get(`[data-testid="${testId}"]`)
);

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('[data-testid=email-input]').type(email);
  cy.get('[data-testid=password-input]').type(password);
  cy.get('[data-testid=login-button]').click();
});

Cypress.Commands.add('addBunToConstructor', () => {
  cy.get('button:contains("Добавить")').first().click();
});

Cypress.Commands.add('addIngredientToConstructor', (index = 1) => {
  cy.get('button:contains("Добавить")').eq(index).click();
});

Cypress.Commands.add('openIngredientModal', (ingredientName) => {
  cy.contains(ingredientName).click();
});

Cypress.Commands.add('closeModal', () => {
  cy.get('[data-testid="modal-close-button"], .close_button, button:contains("✕")')
    .click({ force: true });
});

Cypress.Commands.add('createOrder', () => {
  cy.get('[data-testid="order-button"], button:contains("Оформить заказ")')
    .should('not.be.disabled')
    .click();
  cy.wait('@getUser');
  cy.wait('@createOrder');
});

export {};
