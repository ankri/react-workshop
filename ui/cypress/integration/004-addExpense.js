/// <reference types="Cypress" />

describe('Test the /trips/:tripId/:day/expenses route', () => {
  beforeEach(() => {
    cy.server();
    cy.route('/api/trips', 'fixture:trips.json').as('route-trips');
    cy.route({
      url: '/api/trip/aefda410-a14e-11e9-9e5f-7799edfbec9f/expenses',
      method: 'POST',
      response: {}
    }).as('new-expense');
    cy.route('/api/trip/*', 'fixture:tripAddExpense.json').as('route-trip');
    cy.route('/api/categories', 'fixture:categories.json').as(
      'route-categories'
    );
    cy.route('/api/payment_types', 'fixture:paymentTypes.json').as(
      'route-payment-types'
    );
  });

  describe('Testing the form witn the /all route', () => {
    beforeEach(() => {
      cy.visit('/trip/aefda410-a14e-11e9-9e5f-7799edfbec9f/all/expenses');
      cy.wait(['@route-trip', '@route-categories', '@route-payment-types']);

      cy.get('[name="title"]').as('title');
      cy.get('[name="description"]').as('description');
      // the date input is a bit tricky to select
      cy.get('[for="expense-date"] + div input').as('date');
      cy.get('[name="amount"]').as('amount');

      cy.get('button')
        .contains('Confirm and add new expense')
        .as('submit-button');
    });

    it('The form should have all the inputs', () => {
      cy.get('@title').should('be.visible');
      cy.get('@description').should('be.visible');
      // the date input is a bit tricky to select
      cy.get('@date').should('be.visible');
      cy.get('@amount').should('be.visible');

      cy.get('@submit-button').should('be.visible');
    });

    it('The form should have all the categories and paymentTypes', () => {
      cy.get('[data-testid="category"]').should('have.length', 5);
      cy.get('[data-testid="category"].bp3-intent-primary').should(
        'have.length',
        1
      );
      cy.get('[data-testid="paymentType"]').should('have.length', 3);
      cy.get('[data-testid="paymentType"].bp3-intent-primary').should(
        'have.length',
        1
      );
    });

    it('The form should have all the defaults', () => {
      cy.get('@date').should('have.value', '16.06.2018');
      cy.get('[data-testid="category"]')
        .contains('Misc')
        .parent()
        .should('have.class', 'bp3-intent-primary');
      cy.get('[data-testid="paymentType"]')
        .contains('Cash')
        .parent()
        .should('have.class', 'bp3-intent-primary');
    });

    it('The form should show all the errors on blur', () => {
      cy.get('@title').blur();
      cy.get('.bp3-intent-danger').contains('Please enter the title');
      cy.get('@amount')
        .focus()
        .blur();
      cy.get('.bp3-intent-danger').contains(
        'Please enter an amount greater than 0,00'
      );
      cy.get('@date')
        .clear()
        .blur();
      cy.get('.bp3-intent-danger').contains('Please select a date');
    });

    it('It should be possible to trigger the errors on empty submit', () => {
      cy.get('@submit-button').click();
      cy.get('.bp3-intent-danger').contains('Please enter the title');
      cy.get('.bp3-intent-danger').contains(
        'Please enter an amount greater than 0,00'
      );
    });

    it('The date picker should only enable the correct dates', () => {
      // TODO
    });

    it('It should be possible to submit a new expense', () => {
      const title = 'Lunch';
      const description = 'Seafood';
      const amount = '60.50';

      cy.get('@title').type(title);
      cy.get('@description').type(description);
      cy.get('@amount')
        .clear()
        .type(amount);
      cy.get('[data-testid="category"]')
        .contains('Food')
        .click();
      cy.get('[data-testid="paymentType"]')
        .contains('Credit Card')
        .click();
      cy.get('@submit-button').click();

      cy.wait('@new-expense')
        .its('request.body')
        .then(body => {
          expect(body.amount).to.equal(6050);
          expect(body.currency).to.equal('EUR');
          expect(body.category).to.equal(
            'c5c42d40-a14e-11e9-bfef-a7ff78712f07'
          );
          expect(body.paymentType).to.equal(
            'f61b3510-a14e-11e9-9b9c-bb1df3696be1'
          );
          expect(body.title).to.equal(title);
          expect(body.description).to.equal(description);
          expect(body.date).to.equal('2018-06-15T22:00:00.000Z');
        });

      cy.get('[data-testid="success-message"]').should('be.visible');
    });

    it('When entering an amount into the amount field the amount should be fixed to 2 decimals', () => {
      cy.get('@amount')
        .clear()
        .type('5')
        .blur()
        .should('have.value', '5.00');

      cy.get('@amount')
        .clear()
        .type('5.5')
        .blur()
        .should('have.value', '5.50');

      cy.get('@amount')
        .clear()
        .type('5.55')
        .blur()
        .should('have.value', '5.55');

      cy.get('@amount')
        .clear()
        .type('5.551')
        .blur()
        .should('have.value', '5.55');

      cy.get('@amount')
        .clear()
        .type('5.556')
        .blur()
        .should('have.value', '5.56');
    });
  });

  describe('Testing the form with different /day routes', () => {
    it('should automatically select the correct date for /20180613', () => {
      cy.visit('/trip/aefda410-a14e-11e9-9e5f-7799edfbec9f/20180613/expenses');
      cy.wait(['@route-trip', '@route-categories', '@route-payment-types']);

      cy.get('[for="expense-date"] + div input').as('date');
      cy.get('@date').should('have.value', '13.06.2018');
    });

    it('should automatically select the correct date for /20180614', () => {
      cy.visit('/trip/aefda410-a14e-11e9-9e5f-7799edfbec9f/20180614/expenses');
      cy.wait(['@route-trip', '@route-categories', '@route-payment-types']);

      cy.get('[for="expense-date"] + div input').as('date');
      cy.get('@date').should('have.value', '14.06.2018');
    });

    it('should automatically select the correct date for /20191231', () => {
      cy.visit('/trip/aefda410-a14e-11e9-9e5f-7799edfbec9f/20191231/expenses');
      cy.wait(['@route-trip', '@route-categories', '@route-payment-types']);

      cy.get('[for="expense-date"] + div input').as('date');
      cy.get('@date').should('have.value', '16.06.2018');
    });
  });

  describe('Test document title', () => {
    it('should have the title "travel-expenses | Add expense"', () => {
      cy.visit('/trip/aefda410-a14e-11e9-9e5f-7799edfbec9f/all/expenses');
      cy.wait(['@route-trip', '@route-categories', '@route-payment-types']);
      cy.title().should('equal', 'travel-expenses | Add expense');
    });
  });
});
