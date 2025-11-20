Cypress.Commands.add('getByTestId', (testId: string) =>
  cy.get(`[data-testid="${testId}"]`)
);

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('[data-testid=email-input]').type(email);
  cy.get('[data-testid=password-input]').type(password);
  cy.get('[data-testid=login-button]').click();
});
