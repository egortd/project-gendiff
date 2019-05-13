import yaml from 'js-yaml';
import ini from 'ini';

const parsersList = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};
export default extension => parsersList[extension];
