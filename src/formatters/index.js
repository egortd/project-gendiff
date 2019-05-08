import tree from './toTree';
import plain from './toPlain';
import json from './toJson';

const renderers = {
  tree,
  plain,
  json,
};

export default format => renderers[format];
