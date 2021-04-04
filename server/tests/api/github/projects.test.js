const assert = require('assert');
const githubApi = require('../../../data/github/githubApi');

describe('githubApi', () => {

  describe('#getProjects()', () => {

    it('should return an object containing arrays', async () => {
      const res = await githubApi.getProjects(["romind-pinned"]);
      assert.equal(res instanceof Object, true);
      assert.equal(res["romind-pinned"] instanceof Array, true);
    });
  
  });


});
