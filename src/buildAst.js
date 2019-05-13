import { union } from 'lodash';

const getAst = (first, second) => {
  const properties = union(Object.keys(first), Object.keys(second));
  const propertyActions = [
    {
      check: prop => first[prop] instanceof Object && second[prop] instanceof Object,
      buildNode: prop => ({ type: 'children', prop, children: getAst(first[prop], second[prop]) }),
    },
    {
      check: prop => first[prop] === second[prop],
      buildNode: prop => ({ type: 'unchanged', prop, valueAfter: second[prop] }),
    },
    {
      check: prop => !first[prop],
      buildNode: prop => ({ type: 'added', prop, valueAfter: second[prop] }),
    },
    {
      check: prop => !second[prop],
      buildNode: prop => ({ type: 'removed', prop, valueBefore: first[prop] }),
    },
    {
      check: prop => first[prop] !== second[prop],
      buildNode: prop => ({
        type: 'changed', prop, valueBefore: first[prop], valueAfter: second[prop],
      }),
    },
  ];
  const getPropertyAction = prop => propertyActions.find(({ check }) => check(prop));
  return properties.map((prop) => {
    const { buildNode } = getPropertyAction(prop);
    return buildNode(prop);
  });
};
export default getAst;
