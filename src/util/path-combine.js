import toPath from 'lodash/toPath';
import { invariant } from 'assertions-simplified';
import isPath from 'util/is-path';

export default (path1, path2) => {
  invariant(isPath(path1));
  invariant(isPath(path2));
  return [...toPath(path1), ...toPath(path2)];
};
