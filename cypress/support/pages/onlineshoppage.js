export class OnlineShopPage {
  elements = {
    searchTypeSelect: () => cy.get('[data-cy="search-type"]'),
    searchInput: () => cy.get('[data-cy="search-bar"]'),
    productNameLabel: () => cy.get('[data-cy="name"]'),
    productPriceLabel: () => cy.get('[data-cy="price"]'),
    productImage: () => cy.get('img[class^="chakra-image"]'),
  };

  searchNewProductBy(searchType, value) {
    this.elements.searchTypeSelect().select(searchType);
    this.elements.searchInput().type(value + "{enter}");
  }
}
