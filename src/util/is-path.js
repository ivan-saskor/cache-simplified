import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import every from 'lodash/every';

export default value => isString(value) || (isArray(value) && every(value, isString));
