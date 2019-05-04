import gendiff from '../src';

describe('flat', () => {
  const expected = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;
  test('JSON', () => {
    const before = '__tests__/__fixtures__/before.json';
    const after = '__tests__/__fixtures__/after.json';
    const received = gendiff(before, after);
    // const pathToExpected = '__tests__/__fixtures__/diff.txt';
    // const expected = fs.readFileSync(pathToExpected, 'utf-8');
    expect(received).toBe(expected);
  });
  test('YAML', () => {
    const before = '__tests__/__fixtures__/before.yml';
    const after = '__tests__/__fixtures__/after.yml';
    const received = gendiff(before, after);
    expect(received).toBe(expected);
  });
  test('INI', () => {
    const before = '__tests__/__fixtures__/before.ini';
    const after = '__tests__/__fixtures__/after.ini';
    const received = gendiff(before, after);
    expect(received).toBe(expected);
  });
});
