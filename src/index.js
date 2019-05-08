import parse from './parsers';
import buildAst from './buildAst';
import render from './formatters';

export default (firstConfig, secondConfig, format = 'tree') => {
  const first = parse(firstConfig);
  const second = parse(secondConfig);
  const ast = buildAst(first, second);
  return render(format)(ast);
};
