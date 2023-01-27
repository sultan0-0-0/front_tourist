describe('Blog logout', () => {
  const user = (Math.random() + 1).toString(36).substring(7);
  let cookie;

  it('should register and login', () => {
    cy.visit('http://localhost:3001/register');

    cy.get("input[type='text']").type(user);
    cy.get("input[type='email']").type(user + '@mail.ru');
    cy.get("input[type='password']").type('admin');
    cy.get("input[type='submit']").click();
    cy.url().should('include', '/login');

    cy.visit('http://localhost:3001/login');
    cy.get("input[type='text']").type(user);
    cy.get("input[type='password']").type('admin');
    cy.get("input[type='submit']").click();
    cy.url().should('include', '/blog');
    cy.getCookie('access_tourist_token')
      .then((c) => {
        cookie = c.value;
      });
  });

  it('should have button logout', () => {
    cy.setCookie('access_tourist_token', cookie);
    cy.visit('http://localhost:3001/blog');

    cy.get("input[type='submit']").should('exist');
  });

  it('should logout', () => {
    cy.setCookie('access_tourist_token', cookie);
    cy.visit('http://localhost:3001/blog');

    cy.get("input[type='submit']").click();
    cy.url().should('include', '/login');
  });
});
