class Case3Helper {
  static get elements() {
    return {
      acceptAll: '#accept-recommended-btn-handler'
      //menu
      ,
      menuButton: '.menu__button'
      ,
      transportationAndFulfilment: '#pills-services > .row > :nth-child(1) > .pl-4 > :nth-child(1)'
      ,
      supplyChainLink: '#pills-services > .row > :nth-child(1) > .pl-4 > :nth-child(1)'
      ,
      logisticsPage: 'h1'
      ,
      unLockPotentialSupplyChainStartButton: ':nth-child(16) > a'

      //registrationForm
      ,
      registrationFormPage: '.component-paragraph > div > h2'
      ,
      firstName: '#firstName'
      ,
      lastName: '#lastName'
      ,
      email: '#email'
      ,
      message: '#message'
      ,
      company: '#company'
      ,
      location: '.dropdown > .btn'
      ,
      formCheck: '.form-check'
      ,
      submitButton: '.d-flex.col-12 > .btn'
      ,
      countrySelection: ':nth-child(155) > .dropdown-item > .text'

      //loginPage
      ,
      loginButton: '[href="https://mykn.kuehne-nagel.com/ac/login"] > .text-18'
      ,
      emailAddress: '#username-field'
      ,
      password: '#password-field'
      ,
      login: '#login-button'
      ,
      header: '#header'

      //get new booking via sea
      ,
      bookingViaSea: '#booking-new-sea-submit'
      ,
      countryOrigin: '#origin-location-country-select > .ng-select-container > .ng-value-container > .ng-input > input'
      ,
      countryDesignation: '#destination-location-country-select > .ng-select-container > .ng-value-container > .ng-input > input'
      ,
      cityLocation: '#origin-location-un-location-select > .ng-select-container > .ng-value-container > .ng-input > input'
      ,
      postalCode: '#destination-location-city-select > .ng-select-container > .ng-value-container > .ng-input > input'

      //cargo details
      ,
      quantity: '#container-quantity'
      ,
      containerType: '#container-type-select > .ng-select-container > .ng-value-container > .ng-input > input'
      ,
      saveButton: '#save'
      ,
      quoteHeader: '.h1'
    };
  }

  getNewBookingRouting() {
    cy.get(Case3Helper.elements.bookingViaSea).click();
    cy.get(Case3Helper.elements.countryOrigin).click();
    cy.contains('NETHERLANDS').click();
    cy.get(Case3Helper.elements.countryDesignation).click();
    cy.contains('INDIA').click();
    cy.get(Case3Helper.elements.cityLocation).click();
    cy.contains('Eindhoven').click();
    cy.get(Case3Helper.elements.postalCode).type("625012")
    cy.contains('625012 Avanivapuram').click();
  }

  getNewBookingCargoDetails() {
    cy.get(Case3Helper.elements.quantity).type("2");
    cy.get(Case3Helper.elements.containerType).click();
    cy.contains("20ft container").click();
    cy.get(Case3Helper.elements.saveButton).click();
  }

  fillTheRegistrationForm() {
    cy.testHelper.isVisible(Case3Helper.elements.registrationFormPage, 'Please fill in this information, and we will get back to you asap.')

    cy.testHelper.type(Case3Helper.elements.firstName, "mustafa")
    cy.testHelper.type(Case3Helper.elements.lastName, "mohamed")
    cy.testHelper.type(Case3Helper.elements.email, "mustafaachu@gmail.com")
    cy.testHelper.type(Case3Helper.elements.message, "automation test case")
    cy.testHelper.type(Case3Helper.elements.company, "kuehne + nagel")
    cy.get(Case3Helper.elements.location).click();
    cy.get(Case3Helper.elements.countrySelection).click();
    cy.get(Case3Helper.elements.formCheck).click();
    cy.get(Case3Helper.elements.submitButton).click();
  }

  clickLoginButton() {
    cy.get(Case3Helper.elements.loginButton).click()
  }

  loginAccount() {
    cy.testHelper.type(Case3Helper.elements.emailAddress, "mustafaachu@gmail.com")
    cy.testHelper.type(Case3Helper.elements.password, "Machu123$")
    cy.get(Case3Helper.elements.login).click()
  }

  clickUnLockPotentialSupplyChainStartButton() {
    cy.get(Case3Helper.elements.unLockPotentialSupplyChainStartButton).click()
  }

  clickSupplyChainLink() {
    cy.contains('Supply Chain Management 4PL').click()
  }

  checkLogisticsPage() {
    cy.testHelper.isVisible(Case3Helper.elements.logisticsPage, 'Integrated Logistics — 4PL supply chain orchestration')
  }

  acceptCookies() {
    cy.get(Case3Helper.elements.acceptAll, {timeout: 10000}).should('be.visible');
    cy.testHelper.click(Case3Helper.elements.acceptAll)
  }

  clickMenuButton() {
    cy.testHelper.click(Case3Helper.elements.menuButton)
  }

  checkTransportationAndFulfilment() {
    cy.testHelper.isVisible(Case3Helper.elements.transportationAndFulfilment)
  }


}

module.exports = {Case3Helper};