var assert = require('assert');


describe('githubApi', () => {

  describe('#getProjects()', () => {

    it('should return an object', async (done) => {
      const data = await githubApi.getProjects().catch((err) => console.log(err));
      assert.equal(data instanceof Object, true); 
      done();
    });
  
  });


});
