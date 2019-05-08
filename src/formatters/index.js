import tree from './toTree';
import plain from './toPlain';

const renderers = {
  tree,
  plain,
};

export default format => renderers[format];
