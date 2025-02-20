export class HomePage {
  elements = {
    onLineShopLink: () => cy.get("#onlineshoplink", { timeout: 30000 }),
  };
  goToOnlineShop() {
    this.elements.onLineShopLink().click();
  }
}
