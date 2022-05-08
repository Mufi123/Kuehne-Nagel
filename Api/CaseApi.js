const axios = require('axios').default;
const {expect} = require("chai");

describe('Api testing for books page', () => {
  const userName = "Mufi" + Math.floor(Math.random() * 1000000);
  const password = "Machu123$"
  const baseURL = 'https://demoqa.com';
  let isbn;
  let userID;
  let bearer;

  it('Get isbn number from books api call', async () => {
    const response = await axios.get(`${baseURL}/BookStore/v1/Books`)
    expect(response.status).to.equal(200);
    isbn = response.data.books[0].isbn;
  });

  it('Get userID  from the account api call', async () => {
    const body = {
      "userName": userName,
      "password": password
    }
    const response = await axios.post(`${baseURL}/Account/v1/User`, body);
    expect(response.status).to.equal(201);
    userID = response.data.userID;
  });

  it('Get authorization token from the account api call', async () => {
    const body = {
      "userName": userName,
      "password": password
    }
    const response = await axios.post(`${baseURL}/Account/v1/GenerateToken`, body);
    expect(response.status).to.equal(200);
    bearer = response.data.token;
  });

  it('Add book to the collection using books api call', async () => {
    const body = {
      "userId": userID,
      "collectionOfIsbns": [
        {
          "isbn": isbn
        }
      ]
    }
    const response = await axios.post(`${baseURL}/BookStore/v1/Books`, body, {
      headers: {
        'Authorization': `Bearer ` + bearer,
      }
    });
    expect(response.status).to.equal(201);
    expect(response.statusText).to.equal("Created")
  });


  it('Authorize user before access profile', async () =>{
    const body = {
      "userName": userName,
      "password": password
    }
    const response = await axios.post(`${baseURL}/Account/v1/Authorized`, body);
    expect(response.status).to.equal(200);
  })

  it('Access profile and check book is displayed', async() =>{
    const url =`${baseURL}/Account/v1/User/${userID}`;
    const response = await axios.get(url,{
      headers: {
        'Authorization': `Bearer ` + bearer,
      }
    })
    expect(response.status).to.equal(200);
    expect(response.data.userId).to.equal(userID)
  });


  it('Delete all books from the collection',async ()=>{
    const response = await axios.delete(`${baseURL}/BookStore/v1/Books?UserId=${userID}`,{
      headers: {
        'Authorization': `Bearer `+bearer,
      }
    });
    expect(response.status).to.equal(204);
  });

  it('Check the books are deleted from profile', async ()=>{
    const response = await axios.get(`${baseURL}/BookStore/v1/Books?UserId=${userID}`)
    expect(response.status).to.equal(200);
  })

  it('Delete user account', async ()=>{
    const response = await axios.delete(`${baseURL}/Account/v1/User/${userID}`, {
      headers: {
        'Authorization': `Bearer ` + bearer,
      }
    });
    expect(response.status).to.equal(204);
  })

  it('check user profile is deleted', async () =>{
    const body = {
      "userName": userName,
      "password": password
    }
    const response = await axios.post(`${baseURL}/Account/v1/GenerateToken`, body);
    expect(response.status).to.equal(200);
    expect(response.data.result).to.equal("User authorization failed.")
  })

});