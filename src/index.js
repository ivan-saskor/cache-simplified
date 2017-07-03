import has from 'lodash/has';
import get from 'lodash/get';
import set from 'lodash/set';
import unset from 'lodash/unset';
import mapValues from 'lodash/mapValues';
import isPromise from 'is-promise';
import { safeInvariant } from 'assertions-simplified';
import parseCacheValueDefinition from 'parse-cache-value-definition';

const makeCache = (cacheDefinition) => {  // eslint-disable-line import/prefer-default-export
  const data = {};

  const isCached = path => has(data, path);
  const isFetching = path => isCached(path) && isPromise(get(data, path));

  const getOrFetch = ({ path, fetchValue, forceRefresh = false }) => {
    if ((forceRefresh && isFetching(path)) || (!forceRefresh && isCached(path))) {
      return Promise.resolve(get(data, path));
    }

    const valuePromise = Promise.resolve(fetchValue());
    set(data, path, valuePromise);

    return valuePromise.then(
      (value) => {
        safeInvariant(get(data, path) === valuePromise, `Value for '${path}' is changed during the fetch.`);
        set(data, path, value);
        return value;
      },
      (error) => {
        safeInvariant(get(data, path) === valuePromise, `Value for '${path}' is changed during the fetch.`);
        unset(data, path);
        return error;
      },
    );
  };

  const makeCacheValueHandler = (definition, path) => {
    const { getPath, fetchValue } = parseCacheValueDefinition({ path, definition });
    return (args, { forceRefresh = false } = {}) => getOrFetch({
      path: getPath(args), fetchValue: () => fetchValue(args), forceRefresh,
    });
  };

  return mapValues(cacheDefinition, makeCacheValueHandler);
};

export default makeCache;
