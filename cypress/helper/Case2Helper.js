class Case2Helper {
  static get elements() {
    return {

      //login
      loginButton: '#login'
      , userName: '[id=userName]'
      , password: '[id=password]'

      //detailedBookPage
      , bookDetails: 'span.mr-2'
      , bookLink: 'a[href*="/books?"]'

      //add book to collection
      , addToCollectionButton: '.btn'
      , verifyBookAddedPage: '.mt-2.fullButtonWrap.row'

      //UserProfilePage
      , profileButton: '.btn.btn-light'

      //delete books
      , deleteBookButton: '.btn.btn-primary'

      //logoutButton
      , logout: '.btn'
    };
  }

  logout() {
    cy.get(Case2Helper.elements.logout).contains('Log out').should('be.visible').click();
    cy.contains('Welcome').should('exist');
    cy.contains('Login in Book Store').should('exist');
  }

  deleteAllBooks() {
    cy.get(Case2Helper.elements.deleteBookButton).contains('Delete All Books').should('be.visible').click();
    //click OK button on the modal
    cy.get(Case2Helper.elements.deleteBookButton).contains('OK').should('be.visible').click();
  }

  userProfilePage() {
    cy.get(Case2Helper.elements.profileButton).contains('Profile').should('be.visible').click();
  }

  login(username, password) {
    cy.get(Case2Helper.elements.loginButton).click();
    cy.get(Case2Helper.elements.userName).type(username);
    cy.get(Case2Helper.elements.password).type(password);
    cy.get(Case2Helper.elements.loginButton).click();
  }

  verifyUsername(username) {
    cy.contains(username).should('exist');
  }

  verifyBookIsAddedToProfile() {
    cy.get(Case2Helper.elements.verifyBookAddedPage).children().get('.fullButton').should('have.length', 2);
  }

  verifyDetailedBookPage() {
    cy.get(Case2Helper.elements.bookDetails).children(Case2Helper.elements.bookLink).first().click();
    cy.contains('ISBN').should('exist');
    cy.contains('Title').should('exist');
    cy.contains('Sub Title').should('exist');
    cy.contains('Author').should('exist');
    cy.contains('Publisher').should('exist');
    cy.contains('Total Pages').should('exist');
    cy.contains('Description').should('exist');
    cy.contains('Website').should('exist');
  }

  addingBookToCollections() {
    cy.get(Case2Helper.elements.addToCollectionButton).contains('Add To Your Collection').should('be.visible').click();
  }

  backToTheBookStore() {
    cy.get(Case2Helper.elements.addToCollectionButton).contains('Back To Book Store').should('be.visible').click();
    cy.contains('Book Store').should('exist');
  }
}

module.exports = {Case2Helper};