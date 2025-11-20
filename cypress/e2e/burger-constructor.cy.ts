describe('Burger Constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('createOrder');

    window.localStorage.setItem('refreshToken', 'test-refresh-token');
    cy.setCookie('accessToken', 'test-access-token');

    cy.visit('/');
    cy.wait('@getIngredients');
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
    cy.get('button:contains("Добавить")')
      .first()
      .click();

    cy.wait(500);
    cy.get('[data-testid="burger-constructor"], .burger_constructor')
      .should('contain', 'Краторная булка N-200i');
  });

  it('should add ingredient to constructor', () => {
    cy.get('button:contains("Добавить")')
      .first()
      .click();

    cy.wait(500);

    cy.get('button:contains("Добавить")')
      .eq(1)
      .click();

    cy.wait(500);

    cy.get('[data-testid="burger-constructor"], .burger_constructor')
      .should('contain', 'Биокотлета из марсианской Магнолии');
  });

  it('should open and close ingredient modal', () => {
    cy.contains('Краторная булка N-200i').click();

    cy.get('[data-testid="modal"], .modal, [class*="modal"]')
      .should('be.visible')
      .should('contain', 'Детали ингредиента');

    cy.get('[data-testid="modal-close-button"], .close_button, button:contains("✕")')
      .click({ force: true });

    cy.get('[data-testid="modal"], .modal, [class*="modal"]')
      .should('not.exist');
  });

  it('should display correct ingredient data in modal', () => {
    cy.contains('Краторная булка N-200i').click();

    cy.get('[data-testid="modal"], .modal, [class*="modal"]')
      .should('be.visible');

    cy.get('[data-testid="modal"], .modal, [class*="modal"]')
      .invoke('text')
      .then((text) => {
        cy.log('Modal text content:', text);
      });

    cy.get('[data-testid="modal"], .modal, [class*="modal"]')
      .should('contain', 'Краторная булка N-200i');
  });

  it('should create order when burger is constructed', () => {
    cy.get('button:contains("Добавить")')
      .first()
      .click();

    cy.wait(500);

    cy.get('button:contains("Добавить")')
      .eq(1)
      .click();

    cy.wait(500);

    cy.get('[data-testid="burger-constructor"], .burger_constructor')
      .should('contain', 'Краторная булка N-200i')
      .and('contain', 'Биокотлета из марсианской Магнолии');

    cy.get('[data-testid="order-button"], button:contains("Оформить заказ")')
      .should('not.be.disabled')
      .click();

    cy.wait('@getUser');
    cy.wait('@createOrder');

    cy.get('[data-testid="modal"], .modal, [class*="modal"]')
      .should('be.visible')
      .should('contain', 'идентификатор заказа');

    cy.get('[data-testid="modal-close-button"], .close_button, button:contains("✕")')
      .click({ force: true });

    cy.get('[data-testid="modal"], .modal, [class*="modal"]')
      .should('not.exist');
  });

  it('should close modal by overlay click', () => {
    cy.contains('Краторная булка N-200i').click();

    cy.get('[data-testid="modal"], .modal, [class*="modal"]')
      .should('be.visible');

    cy.get('body').type('{esc}');

    cy.get('[data-testid="modal"], .modal, [class*="modal"]')
      .should('not.exist');
  });

  it('should clear constructor after order creation', () => {
    cy.get('button:contains("Добавить")').first().click();
    cy.wait(500);
    cy.get('button:contains("Добавить")').eq(1).click();
    cy.wait(500);

    cy.get('[data-testid="burger-constructor"], .burger_constructor')
      .should('contain', 'Краторная булка N-200i')
      .and('contain', 'Биокотлета из марсианской Магнолии');

    cy.get('[data-testid="order-button"], button:contains("Оформить заказ")')
      .should('not.be.disabled')
      .click();

    cy.wait('@getUser');
    cy.wait('@createOrder');

    cy.get('[data-testid="modal"], .modal, [class*="modal"]')
      .should('be.visible')
      .should('contain', 'идентификатор заказа');

    cy.get('[data-testid="modal-close-button"], .close_button, button:contains("✕")')
      .click({ force: true });

    cy.get('[data-testid="modal"], .modal, [class*="modal"]')
      .should('not.exist');

    cy.get('[data-testid="burger-constructor"], .burger_constructor')
      .should('not.contain', 'Краторная булка N-200i')
      .and('not.contain', 'Биокотлета из марсианской Магнолии');

    cy.get('[data-testid="order-button"], button:contains("Оформить заказ")')
      .should('be.disabled');
  });
});
