const portal = {
  baseUrl: `https://demoqa.com/automation-practice-form`,
  bookStore: 'https://demoqa.com/books',
  KNUrl:'https://home.kuehne-nagel.com/-/services/aerospace-logistics'
};

Cypress.on("uncaught:exception", () => {
  return false;
});

Cypress.Commands.add("addBookToCollection", (bookName) => {
  cy.contains(bookName).click();
  cy.get('#close-fixedban > img').click()
  cy.get("Add To Your Collection").click();
  cy.contains("Profile").click();
});

Cypress.Commands.add("deleteAllbook", () => {
  cy.contains("Delete All Books").click();
  cy.contains("OK").click();
});

cy.testHelper = {
  navigate(url = portal.baseUrl) {
    cy.visit(url);
    cy.title().should('eq','ToolsQA')
  },

  navigateBookStore(url = portal.bookStore) {
    cy.visit(url);
  },

  navigateToKNUrl(url = portal.KNUrl){
    cy.visit(url);
    cy.title().should('eq','Aerospace Logistics - Services and Solutions | Kuehne+Nagel')
  },

  validateMessage(element, value, message) {
    cy.get(element)
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.eq(value);
        cy.log(message)
      });
  },

  getText(element) {
    return cy.get(element).invoke("text");
  },

  isVisible(element, text) {
    cy.get(element).then(($icon) => {
      if ($icon.is(":visible")) {
        cy.log(`${text}`);
      }
    });
  },

  click(element) {
    cy.get(element).should("be.visible");
    cy.get(element).then(($object) => {
      if ($object.is(":visible")) {
        $object.click();
      }
    });
  },

  type(element, text) {
    cy.get(element).clear();
    cy.get(element).should("be.visible").type(text, { sensitive: true });
  },

};
