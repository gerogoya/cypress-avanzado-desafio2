// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
Cypress.Commands.add("apiDeleteProduct", (productToDeleteId) => {
  cy.request({
    method: "DELETE",
    url: `https://pushing-it-3.onrender.com/api/product/${productToDeleteId}`,
    headers: {
      authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  });
});

Cypress.Commands.add("apiPostProduct", (productFixture) => {
  cy.request({
    method: "POST",
    url: "https://pushing-it-3.onrender.com/api/create-product",
    headers: {
      authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    body: {
      name: productFixture.productName,
      price: productFixture.productPrice,
      img: productFixture.imageUrl,
      id: productFixture.id,
    },
  });
});

Cypress.Commands.add("login", () => {
  cy.request({
    method: "POST",
    url: "https://pushing-it-3.onrender.com/api/login",
    body: {
      username: `${Cypress.env("username")}`,
      password: `${Cypress.env("password")}`,
    },
  })
    .then((response) => {
      expect(response.status).to.equal(201);
    })
    .then((response) => {
      window.localStorage.setItem("token", response.body.token);
      window.localStorage.setItem("user", response.body.user.username);
      cy.log(window.localStorage.getItem("token"));
    });
});

Cypress.Commands.add("apiGetProduct", (productId) => {
  cy.request({
    method: "GET",
    url: `https://pushing-it-3.onrender.com/api/products/?id=${productId}`,
    headers: {
      authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  });
});

Cypress.Commands.add(
  "apiPutProduct",
  (updateProductFixture, productToDeleteId) => {
    cy.request({
      method: "PUT",
      url: `https://pushing-it-3.onrender.com/api/product/${productToDeleteId}`,
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      body: {
        name: updateProductFixture.productName,
        price: updateProductFixture.productPrice,
        img: updateProductFixture.imageUrl,
      },
    });
  }
);

//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
