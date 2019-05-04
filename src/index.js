import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { has } from 'lodash';

export default (firstConfig, secondConfig) => {
  const parse = {
    '.json': JSON.parse,
    '.yml': yaml.safeLoad,
  };

  const getExt = pathTo => path.extname(pathTo);
  const getObjectView = config => parse[getExt(config)](fs.readFileSync(config));
  const first = getObjectView(firstConfig);
  const second = getObjectView(secondConfig);
  const properties = new Set([...Object.keys(first), ...Object.keys(second)]);

  const propertyAction = [
    {
      type: 'unchanged',
      check: prop => first[prop] === second[prop],
      view: prop => `    ${prop}: ${first[prop]}`,
    },
    {
      type: 'deleted',
      check: prop => has(first, prop) && !has(second, prop),
      view: prop => `  - ${prop}: ${first[prop]}`,
    },
    {
      type: 'added',
      check: prop => !has(first, prop) && has(second, prop),
      view: prop => `  + ${prop}: ${second[prop]}`,
    },
    {
      type: 'changed',
      check: prop => has(first, prop) && has(second, prop),
      view: prop => `  + ${prop}: ${second[prop]}\n  - ${prop}: ${first[prop]}`,
    },
  ];
  const getPropertyAction = prop => propertyAction.find(({ check }) => check(prop));
  const resultArray = [...properties].reduce(
    (acc, prop) => {
      const { view } = getPropertyAction(prop);
      return [...acc, view(prop)];
    }, [],
  );
  return `{\n${resultArray.join('\n')}\n}`;
};
