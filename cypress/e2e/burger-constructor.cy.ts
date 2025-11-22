describe('Burger Constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
    cy.intercept('POST', 'api/orders', { fixture: 'order' });

    window.localStorage.setItem('refreshToken', 'test-refresh-token');
    cy.setCookie('accessToken', 'test-access-token');

    cy.visit('/');
  });

  afterEach(() => {
    window.localStorage.removeItem('refreshToken');
    cy.clearCookie('accessToken');
  });

  it('should display ingredients list', () => {
    cy.contains('Краторная булка N-200i').should('be.visible');
    cy.contains('Биокотлета из марсианской Магнолии').should('be.visible');
  });

  it('should add bun to constructor', () => {
    cy.addBunToConstructor();
    cy.get('[data-testid="burger-constructor"], .burger_constructor')
      .should('contain', 'Краторная булка N-200i');
  });

  it('should add ingredient to constructor', () => {
    cy.addBunToConstructor();
    cy.addIngredientToConstructor(1);
    cy.get('[data-testid="burger-constructor"], .burger_constructor')
      .should('contain', 'Биокотлета из марсианской Магнолии');
  });

  it('should open and close ingredient modal', () => {
    cy.openIngredientModal('Краторная булка N-200i');
    cy.get('[data-testid="modal"], .modal, [class*="modal"]')
      .should('be.visible')
      .should('contain', 'Детали ингредиента');
    cy.closeModal();
    cy.get('[data-testid="modal"], .modal, [class*="modal"]')
      .should('not.exist');
  });

  it('should display correct ingredient data in modal', () => {
    cy.openIngredientModal('Краторная булка N-200i');
    cy.get('[data-testid="modal"], .modal, [class*="modal"]')
      .should('be.visible')
      .should('contain', 'Краторная булка N-200i');
  });

  it('should create order when burger is constructed', () => {
    cy.addBunToConstructor();
    cy.addIngredientToConstructor(1);
    cy.get('[data-testid="burger-constructor"], .burger_constructor')
      .should('contain', 'Краторная булка N-200i')
      .and('contain', 'Биокотлета из марсианской Магнолии');
    cy.createOrder();
    cy.get('[data-testid="modal"], .modal, [class*="modal"]')
      .should('be.visible')
      .should('contain', 'идентификатор заказа');
    cy.closeModal();
    cy.get('[data-testid="modal"], .modal, [class*="modal"]')
      .should('not.exist');
  });

  it('should close modal by overlay click', () => {
    cy.openIngredientModal('Краторная булка N-200i');
    cy.get('[data-testid="modal"], .modal, [class*="modal"]')
      .should('be.visible');
    cy.get('body').click(10, 10);
    cy.get('[data-testid="modal"], .modal, [class*="modal"]')
      .should('not.exist');
  });

  it('should close modal by escape key', () => {
    cy.openIngredientModal('Краторная булка N-200i');
    cy.get('[data-testid="modal"], .modal, [class*="modal"]')
      .should('be.visible');
    cy.get('body').type('{esc}');
    cy.get('[data-testid="modal"], .modal, [class*="modal"]')
      .should('not.exist');
  });

  it('should clear constructor after order creation', () => {
    cy.addBunToConstructor();
    cy.addIngredientToConstructor(1);
    cy.get('[data-testid="burger-constructor"], .burger_constructor')
      .should('contain', 'Краторная булка N-200i')
      .and('contain', 'Биокотлета из марсианской Магнолии');
    cy.createOrder();
    cy.get('[data-testid="modal"], .modal, [class*="modal"]')
      .should('be.visible')
      .should('contain', 'идентификатор заказа');
    cy.closeModal();
    cy.get('[data-testid="burger-constructor"], .burger_constructor')
      .should('not.contain', 'Краторная булка N-200i')
      .and('not.contain', 'Биокотлета из марсианской Магнолии');
    cy.get('[data-testid="order-button"], button:contains("Оформить заказ")')
      .should('be.disabled');
  });

  it('should handle empty constructor gracefully', () => {
    cy.get('[data-testid="burger-constructor"], .burger_constructor')
      .should('contain', 'Выберите булки')
      .and('contain', 'Выберите начинку');
    cy.get('[data-testid="order-button"], button:contains("Оформить заказ")')
      .should('be.disabled');
  });

  it('should not create order without bun', () => {
    cy.addIngredientToConstructor(1);
    cy.get('[data-testid="burger-constructor"], .burger_constructor')
      .should('contain', 'Биокотлета из марсианской Магнолии');
    cy.get('[data-testid="order-button"], button:contains("Оформить заказ")')
      .should('be.disabled');
  });
});
