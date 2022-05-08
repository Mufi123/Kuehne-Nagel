# Kuehne-Nagel
Demo automation test for https://demoqa.com/books

## Project Structure
 ####UI cases are running via cypress: 
```bash
*   integration/sampleTestCases/Case1: Expected validations for study portal.

    -   Verify mandatory fields and verify data after submit
    -   Date of birth accepts different formats of date
    -   File upload  and verify data after submit
```
```bash
*   integration/sampleTestCases/Case2: Expected validations for study portal.

    -   User has a book added to the collection
    -   Add Books to collections
    -   view detailed book page
    -   Delete All Books
    -   Logout should work properly
```
```bash
*   integration/sampleTestCases/Case3: Kn website page.

    -   download pdf file from the website
    -   Login to myKn and book via sea route

```
                    
####Below Api tests are created in axios running via chai
```bash
*   Api/CaseApi: Api testing for books page.

    -   Get isbn number from books api call
    -   Get userID  from the account api call
    -   Get authorization token from the account api call
    -   Add book to the collection using books api call
    -   Authorize user before access profile
    -   Access profile and check book is displayed
    -   Delete all books from the collection
    -   Check the books are deleted from profile
    -   Delete user account
    -   check user profile is deleted

```

## Installing
####Install NodeJS [get started](https://www.pluralsight.com/guides/getting-started-with-nodejs)
```bash
npm install
```

[![npm version](https://badge.fury.io/js/cypress.svg)](https://badge.fury.io/js/cypress)

####Install Cypress for Mac, Linux, or Windows, then [get started](https://on.cypress.io/install).

```bash
npm install cypress --save-dev

or

yarn add cypress --dev
```

## How To Run

####After installation process, it is very simple to run using below commands.
```bash
Run all tests (including dashboard reports)
    -   npm run test

Run only api test 
    -  npm run test-api
Run only chrome UI test
    -  npm run test-cypress-UI-chrome
Run only firefox UI test
    -  npm run test-cypress-UI-firefox
Run UI test in dashboard
    -  npm run test-cypress-dashboard
```

## Reports
   After compile the above dashboard or run all tests , navigate to url [cypress reports](https://dashboard.cypress.io/projects/7ev4ws/analytics/runs-over-time) , to see entire report.
   
  ![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/20042494/167292984-e5354b6e-4ccf-442d-bc7c-daeaa40d3df6.gif)

        
    

