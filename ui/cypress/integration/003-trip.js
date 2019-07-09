/// <reference types="Cypress" />

describe('Test the /trip/:tripId route', () => {
  beforeEach(() => {
    cy.server();
    cy.route('/api/trips', 'fixture:trips.json').as('route-trips');
    cy.route('/api/trip/*', 'fixture:trip.json').as('route-trip');
    cy.route('/api/categories', 'fixture:categories.json').as(
      'route-categories'
    );
    cy.route('/api/payment_types', 'fixture:paymentTypes.json').as(
      'route-payment-types'
    );
  });

  describe('Selecting a trip', () => {
    it('It should be possible to reach a trip from the list of trips', () => {
      cy.visit('/');
      cy.url().should('contain', '/trips');
      cy.get('[data-testid="trip"]')
        .contains('Munich')
        .click();
      cy.url().should('contain', '/trip');
      cy.url().should('contain', '/all');
    });

    it('It should redirect from /trip/:tripId to /trip/:tripId/all', () => {
      cy.visit('/trip/bd2ec230-a14e-11e9-96b8-2b7def96e055');
      cy.url().should('contain', '/all');
    });
  });

  describe('Test the single trip page', () => {
    beforeEach(() => {
      cy.visit('/trip/bd2ec230-a14e-11e9-96b8-2b7def96e055/all');
      cy.wait(['@route-trip', '@route-categories', '@route-payment-types']);
    });

    it('There should be 4 days + "all" in the navigation', () => {
      cy.get('[data-testid="link-navigation-day"]')
        .should('have.length', 4)
        .as('days');
      cy.get('[data-testid="link-navigation-all"]').should('be.visible');

      cy.get('@days').contains('Apr');
      cy.get('@days').contains('02');
      cy.get('@days').contains('03');
      cy.get('@days').contains('04');
      cy.get('@days').contains('05');
    });

    it('There should be 3 days and 7 expenses visible in the main view', () => {
      cy.get('[data-testid="expenses-group"]')
        .should('have.length', 3)
        .as('group');
      cy.get('@group').contains('02.04.2017');
      cy.get('@group').contains('03.04.2017');
      cy.get('@group')
        .contains('04.04.2017')
        .should('not.be.visible');
      cy.get('@group').contains('05.04.2017');

      cy.get('[data-testid="expense"]')
        .should('have.length', 7)
        .as('expenses');
      cy.get('@expenses').contains('Train');
      cy.get('@expenses').contains('Subway');
      cy.get('@expenses').contains('Supper');
      cy.get('@expenses').contains('Breakfast');
      cy.get('@expenses').contains('Shopping');
      cy.get('@expenses').contains('Lunch');
      cy.get('@expenses').contains('HD -> M');
      cy.get('@expenses').contains('Main station -> Hotel');
      cy.get('@expenses').contains('Schnitzel');
      cy.get('@expenses').contains('Bakery');
      cy.get('@expenses').contains('Clothes & stuff');
      cy.get('@expenses').contains('M -> HD');
      cy.get('@expenses').contains('Beer garden');
      cy.get('@expenses').contains('135,50');
      cy.get('@expenses').contains('5,00');
      cy.get('@expenses').contains('36,00');
      cy.get('@expenses').contains('7,60');
      cy.get('@expenses').contains('138,50');
      cy.get('@expenses').contains('135,50');
      cy.get('@expenses').contains('42,50');
    });

    it('The total amount and "Add new expense" button should be visible', () => {
      cy.get('[data-testid="total-amount"]')
        .should('be.visible')
        .contains('500,60');

      cy.get('[data-testid="btn-add-new-expense"]').should('be.visible');
    });
  });

  describe('Select single dates on trip', () => {
    beforeEach(() => {
      cy.visit('/trip/bd2ec230-a14e-11e9-96b8-2b7def96e055/all');
      cy.wait(['@route-trip', '@route-categories', '@route-payment-types']);
    });

    it('It should show 3 expenses for 2nd of April', () => {
      cy.get('[data-testid="link-navigation-day"]')
        .contains('02')
        .click();

      cy.url().should('contain', '20170402');
      cy.get('[data-testid="expenses-group"]').should('have.length', 1);

      cy.get('[data-testid="expense"]')
        .should('have.length', 3)
        .as('expenses');

      cy.get('@expenses').contains('Train');
      cy.get('@expenses').contains('Subway');
      cy.get('@expenses').contains('Supper');
      cy.get('@expenses').contains('HD -> M');
      cy.get('@expenses').contains('Main station -> Hotel');
      cy.get('@expenses').contains('Schnitzel');
      cy.get('@expenses').contains('135,50');
      cy.get('@expenses').contains('5,00');
      cy.get('@expenses').contains('36,00');
      cy.get('[data-testid="total-amount"]').as('total');
      cy.get('@total').contains('176,50');
      cy.get('@total').contains('500,60');
    });

    it('It should show 2 expenses for 3rd of April', () => {
      cy.get('[data-testid="link-navigation-day"]')
        .contains('03')
        .click();
      cy.url().should('contain', '20170403');
      cy.get('[data-testid="expenses-group"]').should('have.length', 1);

      cy.get('[data-testid="expense"]')
        .should('have.length', 2)
        .as('expenses');

      cy.get('@expenses').contains('Breakfast');
      cy.get('@expenses').contains('Shopping');
      cy.get('@expenses').contains('Bakery');
      cy.get('@expenses').contains('Clothes & stuff');
      cy.get('@expenses').contains('7,60');
      cy.get('@expenses').contains('138,50');

      cy.get('[data-testid="total-amount"]').as('total');
      cy.get('@total').contains('146,10');
      cy.get('@total').contains('500,60');
    });

    it('It should show no expenses for 4th of April', () => {
      cy.get('[data-testid="link-navigation-day"]')
        .contains('04')
        .click();
      cy.url().should('contain', '20170404');
      cy.get('[data-testid="expenses-group"]').should('have.length', 1);
      cy.get('[data-testid="expense"]').should('have.length', 0);
      cy.get('[data-testid="no-expenses"]')
        .should('be.visible')
        .contains('There are no expenses yet for');

      cy.get('[data-testid="total-amount"]').as('total');
      cy.get('@total').contains('0,00');
      cy.get('@total').contains('500,60');
    });

    it('It should show 2 expenses for 5th of April', () => {
      cy.get('[data-testid="link-navigation-day"]')
        .contains('05')
        .click();
      cy.url().should('contain', '20170405');

      cy.get('[data-testid="expenses-group"]').should('have.length', 1);

      cy.get('[data-testid="expense"]')
        .should('have.length', 2)
        .as('expenses');

      cy.get('@expenses').contains('Train');
      cy.get('@expenses').contains('Lunc');
      cy.get('@expenses').contains('M -> HD');
      cy.get('@expenses').contains('Beer garden');
      cy.get('@expenses').contains('135,50');
      cy.get('@expenses').contains('42,50');

      cy.get('[data-testid="total-amount"]').as('total');
      cy.get('@total').contains('178,00');
      cy.get('@total').contains('500,60');
    });
  });
});

describe('Test edge cases for /trip/:tripId', () => {
  it('It should show an error for an unknown tripId', () => {
    cy.server();
    cy.route('/api/trips', 'fixture:trips.json').as('route-trips');
    cy.route({ url: '/api/trip/*', status: 404, response: {} }).as(
      'route-trip'
    );

    cy.route('/api/categories', 'fixture:categories.json').as(
      'route-categories'
    );
    cy.route('/api/payment_types', 'fixture:paymentTypes.json').as(
      'route-payment-types'
    );

    // unknown is not a valid tripid - the get request will fail
    cy.visit('/trip/unknown');
    cy.get('[data-testid="error-message"').should('be.visible');
  });

  it('It should display a "not found" message for unknown dates', () => {
    cy.server();

    cy.route('/api/trip/*', 'fixture:trip.json').as('route-trip');
    cy.route('/api/categories', 'fixture:categories.json').as(
      'route-categories'
    );
    cy.route('/api/payment_types', 'fixture:paymentTypes.json').as(
      'route-payment-types'
    );

    // 201804 is not a valid date (missing day) -> not found
    cy.visit('/trip/bd2ec230-a14e-11e9-96b8-2b7def96e055/201804');
    cy.get('[data-testid="not-found"]').should('be.visible');

    // hello -> not found
    cy.visit('/trip/bd2ec230-a14e-11e9-96b8-2b7def96e055/hello');
    cy.get('[data-testid="not-found"]').should('be.visible');

    // /all should work
    cy.visit('/trip/bd2ec230-a14e-11e9-96b8-2b7def96e055/all');
    cy.wait(['@route-trip', '@route-categories', '@route-payment-types']);
    cy.url().should('contain', 'all');
  });

  it('It should show the loading spinner', () => {
    cy.server();
    cy.route('/api/trips', 'fixture:trips.json').as('route-trips');
    cy.route('/api/trip/*', 'fixture:trip.json').as('route-trip');
    cy.route('/api/categories', 'fixture:categories.json').as(
      'route-categories'
    );
    cy.route('/api/payment_types', 'fixture:paymentTypes.json').as(
      'route-payment-types'
    );
    cy.visit('/trip/bd2ec230-a14e-11e9-96b8-2b7def96e055');
    cy.get('[data-testid="loading-spinner"]').should('be.visible');
    cy.wait(['@route-trip', '@route-categories', '@route-payment-types']);
    cy.get('[data-testid="loading-spinner"]').should('not.be.visible');
  });
});

describe('Test document title', () => {
  beforeEach(() => {
    cy.server();
    cy.route('/api/trips', 'fixture:trips.json').as('route-trips');
    cy.route('/api/trip/*', 'fixture:trip.json').as('route-trip');
    cy.route('/api/categories', 'fixture:categories.json').as(
      'route-categories'
    );
    cy.route('/api/payment_types', 'fixture:paymentTypes.json').as(
      'route-payment-types'
    );
    cy.visit('/trip/bd2ec230-a14e-11e9-96b8-2b7def96e055/all');
    cy.wait(['@route-trip', '@route-categories', '@route-payment-types']);
  });

  it('should have the title "travel-expenses | Munich 2017"', () => {
    cy.title().should('equal', 'travel-expenses | Munich 2017');
  });
});
