const getAst = (first, second) => {
  const properties = new Set([...Object.keys(first), ...Object.keys(second)]);
  const propertyAction = [
    {
      check: prop => first[prop] instanceof Object && second[prop] instanceof Object,
      makeNode: prop => ({ type: 'children', prop, children: getAst(first[prop], second[prop]) }),
    },
    {
      check: prop => first[prop] === second[prop],
      makeNode: prop => ({ type: 'unchanged', prop, valueAfter: second[prop] }),
    },
    {
      check: prop => !first[prop],
      makeNode: prop => ({ type: 'added', prop, valueAfter: second[prop] }),
    },
    {
      check: prop => !second[prop],
      makeNode: prop => ({ type: 'deleted', prop, valueBefore: first[prop] }),
    },
    {
      check: prop => first[prop] !== second[prop],
      makeNode: prop => ({
        type: 'changed', prop, valueBefore: first[prop], valueAfter: second[prop],
      }),
    },
  ];
  const getPropertyAction = prop => propertyAction.find(({ check }) => check(prop));
  const ast = [...properties].reduce(
    (acc, prop) => {
      const { makeNode } = getPropertyAction(prop);
      return [...acc, makeNode(prop)];
    }, [],
  );
  return ast;
};
export default getAst;
