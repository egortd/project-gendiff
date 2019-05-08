import { flatten } from 'lodash';

const getString = (ast, step = 1) => {
  const indentation = v => ' '.repeat(2 * v);
  const stringify = (item) => {
    const keys = Object.keys(item);
    const string = keys.reduce((acc, key) => [...acc, `${indentation(step + 3)}${key}: ${item[key]}`], []).join('\n');
    return `{\n${string}\n${indentation(step + 1)}}`;
  };
  const getValue = value => (value instanceof Object ? stringify(value) : value);

  const typeActions = {
    children: ({ prop, children }) => `${indentation(step + 1)}${prop}: ${'{\n'}${getString(children, step + 2)}\n${indentation(step + 1)}}`,
    added: ({ prop, valueAfter }) => `${indentation(step)}+ ${prop}: ${getValue(valueAfter)}`,
    unchanged: ({ prop, valueAfter }) => `${indentation(step + 1)}${prop}: ${getValue(valueAfter)}`,
    removed: ({ prop, valueBefore }) => `${indentation(step)}- ${prop}: ${getValue(valueBefore)}`,
    changed: ({ prop, valueBefore, valueAfter }) => {
      const before = getValue(valueBefore);
      const after = getValue(valueAfter);
      return [`${indentation(step)}- ${prop}: ${before}`, `${indentation(step)}+ ${prop}: ${after}`];
    },
  };
  const string = ast.map(node => typeActions[node.type](node));
  return flatten(string).join('\n');
};
export default ast => `{\n${getString(ast)}\n}`;
