import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import fs from 'fs';


export default (config) => {
  const readConfig = fs.readFileSync(config, 'utf-8');
  const getExt = path.extname(config);
  const parse = {
    '.json': JSON.parse,
    '.yml': yaml.safeLoad,
    '.ini': ini.parse,
  };
  return parse[getExt](readConfig);
};
