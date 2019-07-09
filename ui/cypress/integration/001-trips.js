/// <reference types="Cypress" />

describe('Test the /trips route', () => {
  beforeEach(() => {
    cy.server();
    cy.fixture('trips.json').as('fixture-trips');
    cy.route('GET', '/api/trips', '@fixture-trips').as('route-trips');
    cy.visit('/');
    cy.wait('@route-trips');
  });

  it('The page should automatically redirect from / to /trips', () => {
    cy.url().should('eq', 'http://localhost:3000/trips');
  });

  it('It should render the navbar with two links', () => {
    cy.get('[data-testid="navbar"]')
      .should('be.visible')
      .within(() => {
        cy.get('[data-testid="link-home"]').should('be.visible');
        cy.get('[data-testid="link-create-new-trip"]').should('be.visible');
      });
  });

  it('"Create new trip" in navbar should link to /trips/new', () => {
    cy.get('[data-testid="link-create-new-trip"]').click();
    cy.url().should('contain', '/trips/new');
  });

  it('There should be 3 trips visible', () => {
    cy.get('[data-testid="trip"]')
      .as('trips')
      .should('have.length', 3);
    cy.get('@trips').contains('Croatia 2019');
    cy.get('@trips').contains('Mallorca 2018');
    cy.get('@trips').contains('Munich 2017');

    cy.get('@trips').contains('10.04.2019 - 20.04.2019');
    cy.get('@trips').contains('10.06.2018 - 16.06.2018');
    cy.get('@trips').contains('02.04.2017 - 05.04.2017');

    // testing for monetary values is tricky since 445,20 € will not be found since the space is a special
    // white space &#160; - but cypress does not replace &#160; correctly. This is why we omit testing for the currency
    // symbol here
    cy.get('@trips').contains('445,20');
    cy.get('@trips').contains('0,00');
    cy.get('@trips').contains('500,60');
  });

  it('There should be a "Create new trip" button visible and it should link to "/trips/new"', () => {
    cy.get('[data-testid="btn-create-new-trip"]')
      .should('be.visible')
      .click();
    cy.url().should('contain', '/trips/new');
  });
});

describe('Test edge cases', () => {
  it('There should be a spinner while the request is loading', () => {
    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/trips',
      response: 'fixture:trips.json',
      delay: 500
    }).as('route-trips');
    cy.visit('/trips');
    cy.get('.bp3-spinner').should('be.visible');
    cy.wait('@route-trips');
    cy.get('[data-testid="trip"]')
      .as('trips')
      .should('have.length', 3);
  });

  it('There should be an error when the request fails', () => {
    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/trips',
      status: 400,
      response: 'Bad Request'
    }).as('route-trips');
    cy.visit('/trips');
    cy.wait('@route-trips');
    cy.get('.bp3-non-ideal-state').should('be.visible');
  });
});

describe('Test document title', () => {
  beforeEach(() => {
    cy.server();
    cy.fixture('trips.json').as('fixture-trips');
    cy.route('GET', '/api/trips', '@fixture-trips').as('route-trips');
    cy.visit('/');
    cy.wait('@route-trips');
  });

  it('should have the title "travel-expenses | All trips"', () => {
    cy.title().should('equal', 'travel-expenses | All trips');
  });
});
