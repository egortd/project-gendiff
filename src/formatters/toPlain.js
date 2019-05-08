import { flatten, isEmpty } from 'lodash';

const getPlain = (ast, pathCall = '') => {
  const getStringValue = item => (item instanceof Object ? '[complex value]' : `value '${item}'`);
  const typeActions = {
    children: ({ children }, chain) => getPlain(children, chain),
    unchanged: () => '',
    added: ({ valueAfter }, chain) => `Property '${chain}' was added with ${getStringValue(valueAfter)}`,
    removed: (node, chain) => `Property '${chain}' was removed`,
    changed: ({ valueBefore, valueAfter }, chain) => {
      const firstValue = getStringValue(valueBefore);
      const secondValue = getStringValue(valueAfter);
      return `Property '${chain}' was changed from ${firstValue} to ${secondValue}`;
    },
  };
  const result = ast.map((node) => {
    const callView = pathCall ? `${pathCall}.${node.prop}` : node.prop;
    return typeActions[node.type](node, callView);
  });
  return flatten(result).filter(x => !(isEmpty(x))).join('\n');
};
export default ast => getPlain(ast);
