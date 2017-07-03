import parseCacheValueDefinition from 'parse-cache-value-definition';

describe('FUNCTION parseCacheValueDefinition', () => {
  it('CAN parse a function', () => {
    const path = ['one', 'two'];
    const value = { alpha: 'a', beta: 2 };
    const definition = () => value;

    const result = parseCacheValueDefinition({ path, definition });

    expect({
      path: result.getPath(), value: result.fetchValue(),
    }).to.deep.equal({
      path, value,
    });
  });
  it('CAN parse an array', () => {
    const path = ['one', 'two'];
    const path2 = ['first', 'second'];
    const value = { alpha: 'a', beta: 2 };
    const definition = [() => path2, () => value];

    const result = parseCacheValueDefinition({ path, definition });

    expect({
      path: result.getPath(), value: result.fetchValue(),
    }).to.deep.equal({
      path: [...path, ...path2], value,
    });
  });
  it('CAN parse an object', () => {
    const path = ['one', 'two'];
    const path2 = ['first', 'second'];
    const value = { alpha: 'a', beta: 2 };
    const definition = { getPath: () => path2, fetchValue: () => value };

    const result = parseCacheValueDefinition({ path, definition });

    expect({
      path: result.getPath(), value: result.fetchValue(),
    }).to.deep.equal({
      path: [...path, ...path2], value,
    });
  });
  it('FAILS for an unsupported format', () => {
    const path = ['one', 'two'];
    const definition = 123;

    expect(
      () => parseCacheValueDefinition({ path, definition }),
    ).to.throw();
  });
});
