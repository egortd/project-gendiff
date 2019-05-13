import path from 'path';
import fs from 'fs';
import getParser from './parsers';
import buildAst from './buildAst';
import getRender from './formatters';

const getExtension = filePath => path.extname(filePath);

const getParsedConfig = (configPath) => {
  const extension = getExtension(configPath);
  const parse = getParser(extension);
  return parse(fs.readFileSync(configPath, 'utf-8'));
};

export default (firstConfigPath, secondConfigPath, format) => {
  const firstParsedConfig = getParsedConfig(firstConfigPath);
  const secondParsedConfig = getParsedConfig(secondConfigPath);
  const render = getRender(format);
  return render(buildAst(firstParsedConfig, secondParsedConfig));
};
