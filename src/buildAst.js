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
      makeNode: prop => ({ type: 'removed', prop, valueBefore: first[prop] }),
    },
    {
      check: prop => first[prop] !== second[prop],
      makeNode: prop => ({
        type: 'changed', prop, valueBefore: first[prop], valueAfter: second[prop],
      }),
    },
  ];
  return [...properties].map((prop) => {
    const { makeNode } = propertyAction.find(({ check }) => check(prop));
    return makeNode(prop);
  });
};
export default getAst;
