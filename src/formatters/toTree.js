import { flatten } from 'lodash';

const indentation = v => ' '.repeat(2 * v);
const getValue = (item, step) => {
  if (item instanceof Object) {
    const keys = Object.keys(item);
    const text = keys.reduce((acc, key) => [...acc, `${indentation(step + 3)}${key}: ${item[key]}`], []).join('\n');
    return `{\n${text}\n${indentation(step + 1)}}`;
  }
  return item;
};

const getText = (ast, step = 1) => {
  const typeActions = {
    children: ({ prop, children }) => `${indentation(step + 1)}${prop}: ${'{\n'}${getText(children, step + 2)}\n${indentation(step + 1)}}`,
    unchanged: ({ prop, valueAfter }) => `${indentation(step + 1)}${prop}: ${getValue(valueAfter, step)}`,
    added: ({ prop, valueAfter }) => `${indentation(step)}+ ${prop}: ${getValue(valueAfter, step)}`,
    removed: ({ prop, valueBefore }) => `${indentation(step)}- ${prop}: ${getValue(valueBefore, step)}`,
    changed: ({ prop, valueBefore, valueAfter }) => {
      const before = getValue(valueBefore, step);
      const after = getValue(valueAfter, step);
      return [`${indentation(step)}- ${prop}: ${before}`, `${indentation(step)}+ ${prop}: ${after}`];
    },
  };
  const lines = ast.map(node => typeActions[node.type](node));
  return flatten(lines).join('\n');
};
export default ast => `{\n${getText(ast)}\n}`;
