import fs from 'fs';
import gendiff from '../src';

const directory = '__tests__/__fixtures__/';
const extensions = ['.json', '.yml', '.ini'];
const formats = ['tree', 'plain'];
formats.forEach((f) => {
  describe(`\n${f} format:`, () => extensions.forEach((ext) => {
    test(`Checking ${ext} files`, () => {
      const expected = fs.readFileSync(`${directory}${f}Result`, 'utf-8');
      const received = gendiff(`${directory}before${ext}`, `${directory}after${ext}`, `${f}`);
      expect(received).toBe(expected);
    });
  }));
});
