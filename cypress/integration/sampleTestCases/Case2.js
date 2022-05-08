const Case2Helper = require("../../helper/Case2Helper").Case2Helper;

describe('User has a book added to the collection',{ retries: 3 }, () => {
  let case2Helper;
  let dataInput;
  beforeEach(() => {
    cy.viewport(1500, 1000)
    case2Helper = new Case2Helper();
    cy.testHelper.navigateBookStore();
    cy.fixture('example').then(data => {
      dataInput = data.data[1];
    })

  });


  //Add Books to Collections
  it('Add Books to collections', () => {
    case2Helper.login(dataInput.username, dataInput.password)
    //check the username after login
    case2Helper.verifyUsername(dataInput.username)

    //--click book to go to detailed book page--
    case2Helper.verifyDetailedBookPage();

    //adding books to collections
    case2Helper.addingBookToCollections();

    //Back to the book store page
    case2Helper.backToTheBookStore();

  });

  it('view detailed book page', () => {
    //perform login
    case2Helper.login(dataInput.username, dataInput.password)
    //check the username after login
    case2Helper.verifyUsername(dataInput.username)

    //--click book to go to detailed book page--
    case2Helper.verifyDetailedBookPage();

    //verify book is added to profile
    case2Helper.verifyBookIsAddedToProfile();

  });

  //test case to delete ALL boooks
  it('Delete All Books', () => {

    case2Helper.login(dataInput.username, dataInput.password)
    //check the username after login
    case2Helper.verifyUsername(dataInput.username)

    //go to user profile page
    case2Helper.userProfilePage()

    //click delete all books button
    case2Helper.deleteAllBooks()

  });

  it('Logout should work properly ', () => {
    case2Helper.login(dataInput.username, dataInput.password)
    //check the username after login
    case2Helper.verifyUsername(dataInput.username)

    //logoutt should work
    case2Helper.logout();
  });
});
