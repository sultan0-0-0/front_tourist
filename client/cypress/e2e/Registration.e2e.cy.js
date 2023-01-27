describe('Registration', () => {
  const user = (Math.random() + 1).toString(36).substring(7);

  it('should register', () => {
    cy.visit('http://localhost:3001/register');

    cy.get("input[type='text']").type(user);
    cy.get("input[type='email']").type(user + '@mail.ru');
    cy.get("input[type='password']").type('admin');
    cy.get("input[type='submit']").click();
    cy.url().should('include', '/login');
  });

  it('should login', () => {
    cy.visit('http://localhost:3001/login');

    cy.get("input[type='text']").type(user);
    cy.get("input[type='password']").type('admin');
    cy.get("input[type='submit']").click();
    cy.url().should('include', '/blog');
  });
});
