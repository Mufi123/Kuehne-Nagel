const Case3Helper = require("../../helper/Case3Helper").Case3Helper;
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
pdfjsLib.GlobalWorkerOptions.workerSrc = "../../node_modules/pdfjs-dist/build/pdf.worker.js";

describe('Kn website page',{ retries: 3 }, () => {
  let case3Helper;
  beforeEach(() => {
    cy.viewport(1500, 1000)
    case3Helper = new Case3Helper();
    cy.testHelper.navigateToKNUrl()
    case3Helper.acceptCookies();
  });

  after(() => {

  });

  it('download pdf file from the website', () => {
    const filepath = 'cypress/fixtures/Download/test.pdf';
    cy.request({
      method: "GET",
      url: "https://home.kuehne-nagel.com/documents/20124/72169/Services-Aerospace-White-Paper-1.pdf",
    }).then(response => {
      cy.writeFile(filepath, response.body, {
        encoding: 'binary',
      });
    })

    // read pages from the pdf
    // const loadingTask = pdfjsLib.getDocument(filepath);
    // loadingTask.promise
    //   .then(function (doc) {
    //     const numPages = doc.numPages;
    //     console.log("# Document Loaded");
    //     console.log("Number of Pages: " + numPages);
    //     console.log();
    //
    //     let lastPromise; // will be used to chain promises
    //     lastPromise = doc.getMetadata().then(function (data) {
    //       console.log("# Metadata Is Loaded");
    //       console.log("## Info");
    //       console.log(JSON.stringify(data.info, null, 2));
    //       console.log();
    //       if (data.metadata) {
    //         console.log("## Metadata");
    //         console.log(JSON.stringify(data.metadata.getAll(), null, 2));
    //         console.log();
    //       }
    //     });
    //   });
  });


  it('Login to myKn and book via sea', () =>{
    case3Helper.clickLoginButton();
    case3Helper.loginAccount();
    case3Helper.getNewBookingRouting();
    case3Helper.getNewBookingCargoDetails();
  })

});
