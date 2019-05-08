#!/usr/bin/env node

import commander from 'commander';
import { version } from '../../package.json';
import gendiff from '..';

export default commander
  .version(version, '-V, --version')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig>')
  .arguments('<secondConfig>')
  .option('-f, --format [type]', 'Output format', 'tree')
  .action((firstConfig, secondConfig) => {
    console.log(gendiff(firstConfig, secondConfig, commander.format));
  })
  .parse(process.argv);
