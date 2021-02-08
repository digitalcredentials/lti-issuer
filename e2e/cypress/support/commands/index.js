require("./login");

Cypress.Commands.add("visitRedirect", response =>
  cy.visit(response.redirectedToUrl)
);
