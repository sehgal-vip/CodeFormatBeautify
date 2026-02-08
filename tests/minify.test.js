const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { canMinify } = require('../js/formatters.js');

describe('Module 10: Minify Controls', () => {
  it('10.1: canMinify json', () => { assert.strictEqual(canMinify('json'), true); });
  it('10.2: canMinify xml', () => { assert.strictEqual(canMinify('xml'), true); });
  it('10.3: canMinify html', () => { assert.strictEqual(canMinify('html'), true); });
  it('10.4: canMinify css', () => { assert.strictEqual(canMinify('css'), true); });
  it('10.5: canMinify javascript', () => { assert.strictEqual(canMinify('javascript'), true); });
  it('10.6: canMinify typescript', () => { assert.strictEqual(canMinify('typescript'), true); });
  it('10.7: canMinify sql', () => { assert.strictEqual(canMinify('sql'), true); });
  it('10.8: canMinify yaml', () => { assert.strictEqual(canMinify('yaml'), true); });
  it('10.9: canMinify python', () => { assert.strictEqual(canMinify('python'), false); });
  it('10.10: canMinify java', () => { assert.strictEqual(canMinify('java'), false); });
  it('10.11: canMinify c', () => { assert.strictEqual(canMinify('c'), false); });
  it('10.12: canMinify go', () => { assert.strictEqual(canMinify('go'), false); });
  it('10.13: canMinify rust', () => { assert.strictEqual(canMinify('rust'), false); });
  it('10.14: canMinify php', () => { assert.strictEqual(canMinify('php'), false); });
  it('10.15: canMinify ruby', () => { assert.strictEqual(canMinify('ruby'), false); });
  it('10.16: canMinify shell', () => { assert.strictEqual(canMinify('shell'), false); });
  it('10.17: canMinify toml', () => { assert.strictEqual(canMinify('toml'), false); });
  it('10.18: canMinify markdown', () => { assert.strictEqual(canMinify('markdown'), false); });
});
