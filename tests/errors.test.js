const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { beautifyJSON, beautifyYAML, beautifyTOML, beautifyXML, beautifyJS, beautifyCSS } = require('../js/formatters.js');

describe('Module 11: Error Handling', () => {
  it('11.1: JSON trailing comma error', () => {
    const result = beautifyJSON('{"a":1,}', 2);
    assert.strictEqual(result.error, true);
    assert.ok(typeof result.message === 'string');
  });

  it('11.2: completely invalid JSON', () => {
    const result = beautifyJSON('completely invalid', 2);
    assert.strictEqual(result.error, true);
    assert.ok(typeof result.message === 'string');
  });

  it('11.3: invalid YAML with line info', () => {
    const result = beautifyYAML('name: a\n  bad: b', 2);
    assert.strictEqual(result.error, true);
    assert.ok(typeof result.message === 'string');
    assert.ok(/line/i.test(result.message) || /\d/.test(result.message));
  });

  it('11.4: broken TOML error', () => {
    const result = beautifyTOML('[broken\nname = ', 2);
    assert.strictEqual(result.error, true);
    assert.ok(typeof result.message === 'string');
  });

  it('11.5: malformed XML returns warning', () => {
    const result = beautifyXML('<root><unclosed>', 2);
    assert.ok(result.warning === true || typeof result === 'string');
    if (result.warning) {
      assert.ok(typeof result.message === 'string');
      assert.ok(typeof result.result === 'string');
    }
  });

  it('11.6: broken JS returns error', async () => {
    const result = await beautifyJS('const {; broken', 2);
    assert.strictEqual(result.error, true);
    assert.ok(typeof result.message === 'string');
  });

  it('11.7: broken CSS returns error', async () => {
    const result = await beautifyCSS('body { color: }}}', 2);
    assert.strictEqual(result.error, true);
    assert.ok(typeof result.message === 'string');
  });

  it('11.8: JSON error includes position info', () => {
    const result = beautifyJSON('{"a": 1,}', 2);
    assert.strictEqual(result.error, true);
    assert.ok(/line|position|column|\d+/i.test(result.message));
  });

  it('11.9: YAML error includes line info', () => {
    const result = beautifyYAML('name: a\n  bad: b', 2);
    assert.strictEqual(result.error, true);
    assert.ok(/line/i.test(result.message) || /\d/.test(result.message));
  });

  it('11.10: JS error includes line info', async () => {
    const result = await beautifyJS('const x = {;\nbroken code here', 2);
    assert.strictEqual(result.error, true);
    assert.ok(/line/i.test(result.message) || /\d/.test(result.message));
  });
});
