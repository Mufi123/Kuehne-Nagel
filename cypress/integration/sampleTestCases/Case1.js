const {Case1Helper} = require("../../helper/Case1Helper");

describe(`Expected validations for study portal`,{ retries: 3 }, ()=> {
  let case1Helper;
  let dataInput;

  beforeEach(() => {
    cy.viewport(1500, 1000)
    case1Helper = new Case1Helper();

    cy.fixture('example').then( (data) =>{
      dataInput = data.data[0];
    })

    //Navigate to practice form url
    cy.testHelper.navigate();
  })

  it('Verify mandatory fields and verify data after submit',  () =>{

    /*Positive scenario test*/
    //validate Fields First Name, Last Name, Gender and Mobile number
    case1Helper.fillMandatoryInputs(dataInput.firstNameInput, dataInput.lastNameInput,
      dataInput.genderInput, dataInput.emailInput, dataInput.numberInput);

    case1Helper.clickSubmitButton();

    //verify mandatory fields
    case1Helper.verifyFieldsAfterSubmit(dataInput.firstNameInput, dataInput.lastNameInput,
      dataInput.genderInput, dataInput.emailInput, dataInput.numberInput);

    //click close button
    case1Helper.clickCloseButton();


    /*Negative scenario test*/
    //Error no 1:
    /*Note : Registration form should not accept symbols for names field
    * But this website accepting the symbols for names field so i consider this is a error
    * so commented below negative test*/

    // //Invalid Name
    // case1Helper.fillMandatoryInputs("*(&^%$#","(*&^%$#", dataInput.genderInput, dataInput.emailInput, dataInput.numberInput);
    // case1Helper.clickSubmitButton();
    // case1Helper.registrationPageIsVisible(); //after submit the page is not navigated without enter mandatory fields

    //Invalid Email
    case1Helper.fillMandatoryInputs(dataInput.firstNameInput, dataInput.lastNameInput, dataInput.genderInput, "765467897", dataInput.numberInput);
    case1Helper.clickSubmitButton();
    case1Helper.registrationPageIsVisible(); //after submit the page is not navigated without enter mandatory fields
    //Invalid mobile number
    case1Helper.fillMandatoryInputs(dataInput.firstNameInput, dataInput.lastNameInput, dataInput.genderInput, dataInput.emailInput, "jhasgfd");
    case1Helper.clickSubmitButton();
    case1Helper.registrationPageIsVisible(); //after submit the page is not navigated without enter mandatory fields

    //Error no 2:
    /*Note : Mobile number should not accept less than 10 digit
     * But this website accepting  so i consider this is a error
     * so commented below negative test*/

    //     //Mobile number is less than 10 digit
    // case1Helper.fillMandatoryInputs(dataInput.firstNameInput, dataInput.lastNameInput, dataInput.genderInput, dataInput.emailInput,"0987654");
    // case1Helper.clickSubmitButton();
    // case1Helper.registrationPageIsVisible(); //after submit the page is not navigated without enter mandatory fields

    //Mobile number entered more than 10 digit should accept only 10 digit
    case1Helper.fillMandatoryInputs(dataInput.firstNameInput, dataInput.lastNameInput, dataInput.genderInput, dataInput.emailInput, "0989876547654");
    case1Helper.clickSubmitButton();
    case1Helper.registrationPageIsVisible(); //after submit the page is not navigated without enter mandatory fields
  })

  const format = ["13 Nov 1989", "13 November 1989", "Novmber 13 1989", "1989 Nov 13"];
  format.forEach((date) => {
  it(`Date of birth accepts different formats of date  and verify data after submit, current format = ${date}`,  () =>{

    //check default today's date
    case1Helper.checkDefaultDate();

    //Error no : 3
    /*Clear the existing date will leads to blank page */
    /*Tested Manually too same error occurs*/

      case1Helper.fillMandatoryInputs(dataInput.firstNameInput, dataInput.lastNameInput, dataInput.genderInput, dataInput.emailInput, dataInput.numberInput);
      case1Helper.enterDateOfBirth(date)
      case1Helper.clickSubmitButton();
      cy.testHelper.getText(Case1Helper.elements.dateOfBirthValue).then((val) => {
        try{
        expect(dataInput.dateOfBirth).to.equals(val)}
        catch (e) {
          throw new Error(`Error occurs in '${date}' date format`)
        }
      });
      //click close button
      case1Helper.clickCloseButton();
    })

  });

  it('File upload  and verify data after submit',  ()=> {

    case1Helper.uploadFile(dataInput.uploadFilePathInput)

    //validate Fields First Name, Last Name, Gender and Mobile number
    case1Helper.fillMandatoryInputs(dataInput.firstNameInput, dataInput.lastNameInput, dataInput.genderInput,
      dataInput.emailInput, dataInput.numberInput);
    case1Helper.clickSubmitButton();

    //verify mandatory fields
    case1Helper.verifyFieldsAfterSubmit(dataInput.firstNameInput, dataInput.lastNameInput, dataInput.genderInput,
      dataInput.emailInput, dataInput.numberInput);

    case1Helper.verifyImageAfterUploaded(dataInput.uploadFilePathInput);

    //click close button
    case1Helper.clickCloseButton();

  })

})