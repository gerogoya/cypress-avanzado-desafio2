describe("API Login Test", () => {
  let productFixture;
  let productToDeleteId;

  beforeEach(() => {
    cy.fixture("products").then((data) => {
      productFixture = data;
      console.log(`${productFixture.id}`);
    });

    cy.request({
      method: "POST",
      url: "https://pushing-it-3.onrender.com/api/login",
      body: {
        username: "pushingit",
        password: "123456!",
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
  it("should successfully log in and receive a token", () => {
    cy.request({
      method: "GET",
      url: `https://pushing-it-3.onrender.com/api/products/?id=${productFixture.id}`,
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    }).then((response) => {
      if (response.body.products.docs.length > 0) {
        productToDeleteId = response.body.products.docs[0]._id;
        cy.request({
          method: "DELETE",
          url: `https://pushing-it-3.onrender.com/api/product/${productToDeleteId}`,
          headers: {
            authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        });
      } else {
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
        }).then((response) => {
          productToDeleteId = response.body.product._id;
          cy.request({
            method: "PUT",
            url: `https://pushing-it-3.onrender.com/api/product/${productToDeleteId}`,
            headers: {
              authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
            body: {
              name: "updated",
              price: 666,
              img: productFixture.imageUrl,
            },
          });
        });
      }
    });
  });
});
