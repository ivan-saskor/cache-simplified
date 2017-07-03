import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import constant from 'lodash/constant';
import { safeError, invariant } from 'assertions-simplified';
import pathCombine from 'util/path-combine';
import isPath from 'util/is-path';

const parseCacheValueDefinition = ({ path, definition }) => {
  invariant(isPath(path));
  if (isFunction(definition)) {
    const getPath = constant([]);
    const fetchValue = definition;
    return parseCacheValueDefinition({ path, definition: { getPath, fetchValue } });
  }
  if (isArray(definition)) {
    const [getPath, fetchValue] = definition;
    return parseCacheValueDefinition({ path, definition: { getPath, fetchValue } });
  }
  if (isObject(definition)) {
    const { getPath, fetchValue } = definition;
    return { getPath: args => pathCombine(path, getPath(args)), fetchValue };
  }
  safeError('Unsupported cache value definition format.');
  return parseCacheValueDefinition({ path, definition: constant('unsupported-format') });
};

export default parseCacheValueDefinition;
