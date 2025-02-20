const { defineConfig } = require("cypress");

module.exports = defineConfig({
  scripts: {
    test: "npx cypress open --e2e -b chrome",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://pushing-it.vercel.app/",
    env: {
      username: "pushingit",
      password: "123456!",
    },
  },
});
