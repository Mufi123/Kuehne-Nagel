class Case1Helper {
  static get elements() {
    return {

      //Main page
      firstName: '#firstName'
      , lastName: '#lastName'
      , emailAddress: '#userEmail'
      , mobileNumber: '#userNumber'
      , submitButton: '#submit'
      , genderMale: '#gender-radio-1'
      , genderFemale: '#gender-radio-2'
      , genderOther: '#gender-radio-3'
      , genderMaleLabel: '[value="Male"]'
      , genderFemaleLabel: '[value="Female"]'
      , genderOtherLabel: '[value="Other"]'

      //after submit
      , title: '#example-modal-sizes-title-lg'
      , label: 'thead > tr > :nth-child(1)'
      , values: 'thead > tr > :nth-child(2)'
      , studentNameTitle: 'tbody > :nth-child(1) > :nth-child(1)'
      , studentNameValue: 'tbody > :nth-child(1) > :nth-child(2)'
      , studentEmailTitle: 'tbody > :nth-child(2) > :nth-child(1)'
      , studentEmailValue: 'tbody > :nth-child(2) > :nth-child(2)'
      , genderTitle: 'tbody > :nth-child(3) > :nth-child(1)'
      , genderValue: 'tbody > :nth-child(3) > :nth-child(2)'
      , mobileTitle: 'tbody > :nth-child(4) > :nth-child(1)'
      , mobileValue: 'tbody > :nth-child(4) > :nth-child(2)'

      //close button
      , scrollImage: '#close-fixedban > img'
      , closeButton: '#closeLargeModal'

      //date of birth
      , defaultDate: '#dateOfBirthInput'
      , dateOfBirthTitle: 'tbody > :nth-child(5) > :nth-child(1)'
      , dateOfBirthValue: 'tbody > :nth-child(5) > :nth-child(2)'

      //Upload image
      , pictureTitle: 'tbody > :nth-child(8) > :nth-child(1)'
      , pictureValue: 'tbody > :nth-child(8) > :nth-child(2)'
      , uploadPath: '[type="file"]'
    };
  }

  uploadFile(path) {
    cy.get(Case1Helper.elements.uploadPath).attachFile(path)
  }

  checkDefaultDate() {
    const date = new Date();
    const options = {day: '2-digit', month: 'long', year: 'numeric'};
    const today = new Intl.DateTimeFormat('en-AU', options).format(date);
    cy.get(Case1Helper.elements.defaultDate).should('have.value', today);
  }

  enterDateOfBirth(format) {
    cy.get('#dateOfBirthInput', {force: true}).click().type('{selectall}', '{backspace}').type(format).type('{enter}')
  }

  checkFirstName() {
    cy.testHelper.validateMessage(Case1Helper.elements.firstName, "", "First name is empty")
  }

  enterTextForFirstName(text) {
    cy.testHelper.type(Case1Helper.elements.firstName, text)
  }

  enterTextForLastName(text) {
    cy.testHelper.type(Case1Helper.elements.lastName, text)
  }

  checkLastName() {
    cy.testHelper.validateMessage(Case1Helper.elements.lastName, "", "Last name is empty")
  }

  checkGenderField() {
    cy.get(Case1Helper.elements.genderMaleLabel).should("have.value", "Male")
    cy.get(Case1Helper.elements.genderFemaleLabel).should("have.value", "Female")
    cy.get(Case1Helper.elements.genderOtherLabel).should("have.value", "Other")
  }

  selectGenderField(gender) {
    switch (gender) {
      case "Male":
        cy.get(Case1Helper.elements.genderMale)
          .click({force: true})
        break;
      case "Female":
        cy.get(Case1Helper.elements.genderFemale)
          .click({force: true})
        break;
      case "Other":
        cy.get(Case1Helper.elements.genderOther)
          .click({force: true})
        break;
      default:
        throw new Error("Gender option is invalid")
    }
  }

  checkEmailAddress() {
    cy.testHelper.validateMessage(Case1Helper.elements.emailAddress, "", "Email address is empty")
  }

  enterEmailAddress(email) {
    cy.testHelper.type(Case1Helper.elements.emailAddress, email)
  }

  checkMobileNumber() {
    cy.testHelper.validateMessage(Case1Helper.elements.mobileNumber, "", "Mobile number is empty")
  }

  enterMobileNumber(number) {
    cy.testHelper.type(Case1Helper.elements.mobileNumber, number)
  }

  fillMandatoryInputs(firstName, lastName, gender, email, number) {
    //check first name field is empty and enter input
    this.checkFirstName()
    this.enterTextForFirstName(firstName)

    //check first name field is empty and enter input
    this.checkLastName();
    this.enterTextForLastName(lastName);

    this.checkGenderField()
    this.selectGenderField(gender)

    this.checkEmailAddress()
    this.enterEmailAddress(email);

    this.checkMobileNumber()
    this.enterMobileNumber(number);
  }


  clickSubmitButton() {
    cy.testHelper.click(Case1Helper.elements.submitButton)
  }

  clickCloseButton() {
    cy.get(Case1Helper.elements.scrollImage).click()
    cy.get(Case1Helper.elements.closeButton).click()
    this.registrationPageIsVisible();
  }

  registrationPageIsVisible() {
    cy.get('h5').contains('Student Registration Form')
      .should('be.visible')
  }

  verifyImageAfterUploaded(path) {
    cy.testHelper.validateMessage(Case1Helper.elements.pictureTitle, "Picture", "Picture title is displayed")
    cy.testHelper.getText(Case1Helper.elements.pictureValue).then((val) => {
      expect(path).to.contains(val)
    });

  }

  verifyFieldsAfterSubmit(firstName, lastName, gender, email, number) {

    //verify all titles
    cy.testHelper.validateMessage(Case1Helper.elements.label, "Label", "Label title is displayed")
    cy.testHelper.validateMessage(Case1Helper.elements.studentNameTitle, "Student Name", "Student Name title is displayed")
    cy.testHelper.validateMessage(Case1Helper.elements.studentEmailTitle, "Student Email", "Student Email title is displayed")
    cy.testHelper.validateMessage(Case1Helper.elements.genderTitle, "Gender", "Gender title is displayed")
    cy.testHelper.validateMessage(Case1Helper.elements.mobileTitle, "Mobile", "Mobile title is displayed")

    //verify all values
    cy.testHelper.validateMessage(Case1Helper.elements.values, "Values", "Values title is displayed")

    cy.testHelper.getText(Case1Helper.elements.studentNameValue).then((val) => {
      cy.log(val)
      expect(firstName + " " + lastName).to.equals(val)
    });
    cy.testHelper.getText(Case1Helper.elements.studentEmailValue).then((val) => {
      cy.log(val)
      expect(email).to.equals(val)
    });
    cy.testHelper.getText(Case1Helper.elements.genderValue).then((val) => {
      cy.log(val)
      expect(gender).to.equals(val)
    });
    cy.testHelper.getText(Case1Helper.elements.mobileValue).then((val) => {
      cy.log(val)
      expect(number).to.equals(val)
    });

  }
}

module.exports = {Case1Helper};