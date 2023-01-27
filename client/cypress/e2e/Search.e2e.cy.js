describe('Search', () => {
  it('should show images after searching', () => {
    cy.visit('http://localhost:3001/search');

    cy.get('#inp').type('mama');
    cy.get("button[type='submit']").click();
    cy.get("button[type='submit']").click();
    cy.get('.col-12').find('img').should('exist');
  });
});
