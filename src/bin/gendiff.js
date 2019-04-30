#!/usr/bin/env node

import commander from 'commander';
import fs from 'fs';
import { version } from '../../package.json';
import gendiff from '..';

export default commander
  .version(version, '-V, --version')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig>')
  .arguments('<secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) => {
    const first = fs.readFileSync(firstConfig).toString();
    const second = fs.readFileSync(secondConfig).toString();
    console.log(gendiff(first, second));
  })
  .parse(process.argv);
