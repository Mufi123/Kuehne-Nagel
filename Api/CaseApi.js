const request = require("request");
describe('', () => {


  before(async () => {

  });

  after(async () => {

  });

  it('response.statuscode should return http 200', async () => {
    await request.get('http://mysite.com/doodle.png')
  });

});
