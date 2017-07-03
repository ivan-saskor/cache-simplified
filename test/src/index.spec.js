/* eslint-disable no-use-before-define */

import makeCache from 'index';

describe('FUNCTION makeCache', () => {
  const definition = {
    one: () => resultOne,
    two: a => resultTwo(a),
  };
  const args = {
    alpha: 'a',
    beta: 'b',
  };
  const resultOne = { first: 1 };
  const resultTwo = a => ({ first: 1, second: a });

  it('FETCHES a value WITH no arguments', () => {
    const cache = makeCache(definition);

    return expect(
      cache.one(),
    ).to.eventually.deep.equal(
      resultOne,
    );
  });
  it('FETCHES a value WITH arguments', () => {
    const cache = makeCache(definition);

    return expect(
      cache.two(args),
    ).to.eventually.deep.equal(
      resultTwo(args),
    );
  });
});
