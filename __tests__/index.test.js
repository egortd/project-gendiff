import fs from 'fs';
import gendiff from '../src';

test('gendiff', () => {
  const before = fs.readFileSync('__tests__/__fixtures__/before.json');
  const after = fs.readFileSync('__tests__/__fixtures__/after.json');
  const received = gendiff(before, after);
  const expected = `{
      host: hexlet.io
    + timeout: 20
    - timeout: 50
    - proxy: 123.234.53.22
    + verbose: true
    - follow: false
  }`;
  expect(received).toBe(expected);
});