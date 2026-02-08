const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { beautifyTOML, minifyTOML } = require('../js/formatters.js');

describe('Module 5: TOML Formatter', () => {
  it('5.1: beautifies TOML with sections', () => {
    const input = '[package]\nname = "app"\nversion = "1.0"\n[dependencies]\nserde = "1.0"';
    const result = beautifyTOML(input, 2);
    assert.ok(typeof result === 'string');
    assert.ok(result.includes('[package]'));
    assert.ok(result.includes('[dependencies]'));
    assert.ok(result.includes('name = "app"'));
  });

  it('5.2: returns error for broken TOML', () => {
    const result = beautifyTOML('[package]\nname = ', 2);
    assert.strictEqual(result.error, true);
    assert.ok(typeof result.message === 'string');
  });

  it('5.3: formats simple key-value pairs', () => {
    const input = 'key = "value"\nnumber = 42\nbool = true';
    const result = beautifyTOML(input, 2);
    assert.ok(typeof result === 'string');
    assert.ok(result.includes('key = "value"'));
    assert.ok(result.includes('number = 42'));
    assert.ok(result.includes('bool = true'));
  });

  it('5.4: no minifyTOML function exists', () => {
    assert.strictEqual(minifyTOML, undefined);
  });
});
