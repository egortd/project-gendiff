import parse from './parsers';
import buildAst from './buildAst';
import render from './renders';

export default (firstConfig, secondConfig) => {
  const first = parse(firstConfig);
  const second = parse(secondConfig);
  const ast = buildAst(first, second);
  return render(ast);
};
