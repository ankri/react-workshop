/// <reference types="Cypress" />

describe('Test the /trips/new route', () => {
  beforeEach(() => {
    cy.visit('/trips/new');
  });

  describe('Title', () => {
    it('The title should automatically be focused', () => {
      cy.focused().should('have.id', 'trip-title');
    });

    it('The title should be empty', () => {
      cy.get('#trip-title')
        .should('have.attr', 'type', 'text')
        .should('have.value', '');
    });

    it('It should be possible to enter text', () => {
      const value = 'Hello World';
      cy.get('#trip-title').type(value);
      cy.get('#trip-title').should('have.value', value);
    });
  });

  describe('Test date selection', () => {
    beforeEach(() => {
      // we need to make sure that we are always in the correct year and month
      cy.get('.bp3-datepicker-year-select select').each(select => {
        select.select('2019');
      });
      // TODO this will wail when the locale changes
      cy.get('.bp3-datepicker-month-select select')
        .first()
        .select('July');
      cy.get('.bp3-datepicker-month-select select')
        .last()
        .select('August');
    });

    it('It should be possible to select a date range', () => {
      cy.get('[aria-label="Mon Jul 01 2019"').click();
      cy.get('[aria-label="Wed Jul 10 2019"').click();
    });

    it('It should be possible to select the same day', () => {
      cy.get('[aria-label="Wed Jul 10 2019"').click();
      cy.get('[aria-label="Wed Jul 10 2019"').click();
    });
  });

  describe('Test the country selection', () => {
    beforeEach(() => {
      cy.get('[data-testid="select-country"]').as('select');
    });

    it('the initially selected country should be "Germany"', () => {
      cy.get('@select').contains('Germany');
    });

    it('It should be possible to select a different country', () => {
      cy.get('@select').click();
      cy.get('.bp3-portal').within(() => {
        cy.get('.bp3-menu-item')
          .contains('Spain')
          .click();
      });
      cy.get('@select').contains('Spain');
    });
  });

  describe('Test form submission', () => {
    beforeEach(() => {
      cy.get('.bp3-datepicker-year-select select').each(select => {
        select.select('2019');
      });
      cy.get('.bp3-datepicker-month-select select')
        .first()
        .select('July');
      cy.get('.bp3-datepicker-month-select select')
        .last()
        .select('August');

      cy.get('[data-testid="select-country"]').as('select');
    });

    it('It should be possible to save the form', () => {
      const title = 'Crete 2019';
      const id = 'this-is-a-fake-id';

      cy.server();
      cy.route({
        url: '/api/trip',
        method: 'POST',
        response: {
          title,
          id,
          country: 'GRC',
          dateFrom: new Date(2019, 6, 1).toJSON(),
          dateTo: new Date(2019, 6, 10).toJSON(),
          expenses: []
        }
      }).as('route-new-trip');

      cy.get('#trip-title').type(title);

      cy.get('[aria-label="Mon Jul 01 2019"').click();
      cy.get('[aria-label="Wed Jul 10 2019"').click();

      cy.get('@select').click();
      cy.get('.bp3-portal').within(() => {
        cy.get('.bp3-menu-item')
          .contains('Greece')
          .click();
      });

      cy.get('button')
        .contains('Confirm and create new trip')
        .click();
      cy.wait('@route-new-trip');

      cy.get('[data-testid="success-message"]').should('be.visible');
    });
  });

  describe('Test document title', () => {
    it('should have the title "travel-expenses | Create new trip"', () => {
      cy.title().should('equal', 'travel-expenses | Create new trip');
    });
  });
});
