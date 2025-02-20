import { HomePage } from "../support/pages/homepage";
import { OnlineShopPage } from "../support/pages/onlineshoppage";

describe("API Login Test", () => {
  let productFixture, productToDeleteId, updateProductFixture;
  const homepage = new HomePage();
  const onlineshoppage = new OnlineShopPage();

  beforeEach(() => {
    cy.fixture("products").then((data) => {
      productFixture = data;
    });

    cy.fixture("updateProduct").then((data) => {
      updateProductFixture = data;
    });
    cy.login();
  });
  it("Desafio 2", () => {
    cy.apiGetProduct(productFixture.id).then((response) => {
      if (response.body.products.docs.length > 0) {
        productToDeleteId = response.body.products.docs[0]._id;
        cy.apiDeleteProduct(productToDeleteId);
      }
      cy.apiPostProduct(productFixture).then((response) => {
        productToDeleteId = response.body.product._id;
        cy.apiPutProduct(updateProductFixture, productToDeleteId);
      });
    });

    cy.visit("/");
    homepage.goToOnlineShop();
    onlineshoppage.searchNewProductBy("id", `${productFixture.id}`);
    onlineshoppage.elements
      .productNameLabel()
      .should("have.text", updateProductFixture.productName);

    onlineshoppage.elements
      .productPriceLabel()
      .should("have.text", updateProductFixture.productPrice);

    onlineshoppage.elements
      .productImage()
      .should("have.attr", "src", updateProductFixture.imageUrl);
  });
});
