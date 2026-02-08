const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { beautifyJSON, minifyJSON } = require('../js/formatters.js');

describe('Module 2: JSON Formatter', () => {
  it('2.1: beautifies JSON with 2-space indent', () => {
    const result = beautifyJSON('{"a":1,"b":"hello","c":true}', 2);
    assert.strictEqual(result, '{\n  "a": 1,\n  "b": "hello",\n  "c": true\n}');
  });

  it('2.2: beautifies JSON with 4-space indent', () => {
    const result = beautifyJSON('{"a":1}', 4);
    assert.strictEqual(result, '{\n    "a": 1\n}');
  });

  it('2.3: beautifies JSON with tab indent', () => {
    const result = beautifyJSON('{"a":1}', '\t');
    assert.strictEqual(result, '{\n\t"a": 1\n}');
  });

  it('2.4: beautifies deeply nested JSON', () => {
    const result = beautifyJSON('{"a":{"b":{"c":{"d":"deep"}}}}', 2);
    assert.ok(result.includes('    "c"'));  // 4 spaces = 2 levels
    assert.ok(result.includes('      "d"'));  // 6 spaces = 3 levels
  });

  it('2.5: beautifies JSON array', () => {
    const result = beautifyJSON('[1,2,3,{"key":"val"}]', 2);
    assert.ok(result.includes('\n  1'));
    assert.ok(result.includes('\n  {'));
  });

  it('2.6: minifies JSON', () => {
    const result = minifyJSON('{\n  "a": 1,\n  "b": "hello"\n}');
    assert.strictEqual(result, '{"a":1,"b":"hello"}');
  });

  it('2.7: preserves unicode', () => {
    const result = beautifyJSON('{"emoji":"\ud83c\udf89","chinese":"\u4f60\u597d"}', 2);
    assert.ok(result.includes('\ud83c\udf89'));
    assert.ok(result.includes('\u4f60\u597d'));
    // Verify it's valid formatted JSON
    JSON.parse(result);
  });

  it('2.8: returns error for trailing comma', () => {
    const result = beautifyJSON('{"a": 1,}', 2);
    assert.strictEqual(result.error, true);
    assert.ok(typeof result.message === 'string');
  });

  it('2.9: returns error for non-JSON', () => {
    const result = beautifyJSON('not json at all', 2);
    assert.strictEqual(result.error, true);
    assert.ok(typeof result.message === 'string');
  });

  it('2.10: returns error for empty input', () => {
    const result = beautifyJSON('', 2);
    assert.strictEqual(result.error, true);
  });

  it('2.11: minifyJSON returns error for invalid JSON', () => {
    const result = minifyJSON('already minified {"a":1}');
    assert.strictEqual(result.error, true);
  });
});
