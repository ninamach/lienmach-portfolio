describe('User Management Page', () => {
  beforeEach(() => {
    // Visit the User Management page before each test
    cy.visit('/user-management');
  });

  it('should display the User Management page correctly', () => {
    // Check if the page title is correct
    cy.get('h1').contains('User Data Management').should('be.visible');

    // Check if the search input is visible
    cy.get('input#search-users').should('be.visible');
  });

  it('should display a list of users', () => {
    // Check if the user list is visible
    cy.get('.flex').should('be.visible');

    // Check if at least one user is displayed
    cy.get('.flex > div').should('have.length.greaterThan', 2);
  });

  it('should filter users based on search input', () => {
    // Type a search term into the search input
    cy.get('input#search-users').clear().type('emily.johnson');

    // Check if the filtered user list is displayed
    cy.get('.text-sm').contains('emily.johnson@x.dummyjson.com').should('be.visible');
    cy.get('.flex.flex-col.items-center.gap-4').should('have.length', 1);
    //cy.get('.text-sm').each(($el) => {
//      cy.log(`Item ${$el.text()}`);
  //    cy.get($el).contains('emily.johnson@x.dummyjson.com').should('be.visible');
    //});
  });

  it('should navigate to the next page of users', () => {
    // Click the "Next" button
    cy.get('.flex.items-center.gap-2').contains('Next').click();

    // Check if the current page number is updated
    cy.get('span').contains('Page 2 of 18').should('be.visible');
  });

  it('should display user profile on "View Profile" button click', () => {
    // Click the "View Profile" button of the first user
    cy.get('.w-full').contains('View Profile').click();

    // Check if the user profile modal is displayed
    cy.get('.fixed.inset-0').should('be.visible');

    // Check if the user profile details are displayed
    cy.get('.fixed.inset-0').within(() => {
      cy.get('h2').contains('User Profile').should('be.visible');
      cy.get('button[aria-label="Close profile"]').should('be.visible');
    });
  });

  it('should close user profile on "Close Profile" button click', () => {
    // Click the "View Profile" button of the first user
    cy.get('.w-full').contains('View Profile').click();

    // Click the "Close Profile" button
    cy.get('.fixed.inset-0').find('button[aria-label="Close profile"]').first().click();

    // Check if the user profile modal is closed
    cy.get('.fixed.inset-0').should('not.exist');
  });
});