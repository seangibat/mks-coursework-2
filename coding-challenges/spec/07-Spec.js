var Pairs = require('../07-search-for-pairs.js');

describe("Search for pairs .. ", function(){

  it("should return the answer for the already given array", function() {
    var result = Pairs.pairs([10, 20, 30, 50, 100, 970, 980, 990]);

    expect(result).toEqual(['970, 30', '980, 20', '990, 10']);
  });

  it("should return nothing for this array", function() {
    var result = Pairs.pairs([10, 20, 30, 50, 100]);

    expect(result).toEqual([]);
  });

  it("should not 500 as a pair of itself", function() {
    var result = Pairs.pairs([10, 20, 30, 500, 100]);

    expect(result).toEqual([]);
  });

});