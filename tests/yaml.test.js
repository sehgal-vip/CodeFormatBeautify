const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { beautifyYAML, minifyYAML } = require('../js/formatters.js');

describe('Module 4: YAML Formatter', () => {
  it('4.1: beautifies block-style YAML', () => {
    const result = beautifyYAML('name: Alice\nskills:\n- JS\n- Python', 2);
    assert.ok(typeof result === 'string');
    assert.ok(result.includes('name:'));
    assert.ok(result.includes('skills:'));
  });

  it('4.2: beautifies flow-style YAML to block', () => {
    const result = beautifyYAML('{name: Alice, skills: [JS, Python]}', 2);
    assert.ok(typeof result === 'string');
    assert.ok(result.includes('name:'));
    assert.ok(result.includes('skills:'));
  });

  it('4.3: minifies YAML to flow style', () => {
    const result = minifyYAML('name: Alice\nskills:\n  - JS\n  - Python');
    assert.ok(typeof result === 'string');
    assert.ok(result.includes('name'));
    assert.ok(result.includes('Alice'));
    // Should be compact (flow) style
    assert.ok(!result.includes('\n') || result.split('\n').length <= 2);
  });

  it('4.4: returns error for invalid YAML', () => {
    const result = beautifyYAML('name: Alice\n  bad indent: value', 2);
    assert.strictEqual(result.error, true);
    assert.ok(typeof result.message === 'string');
  });

  it('4.5: handles multi-document YAML', () => {
    const result = beautifyYAML('---\nname: doc1\n---\nname: doc2', 2);
    // Should handle at least the first document
    assert.ok(typeof result === 'string' || result.error !== true);
    if (typeof result === 'string') {
      assert.ok(result.includes('name'));
    }
  });

  it('4.6: returns error for empty input', () => {
    const result = beautifyYAML('', 2);
    assert.strictEqual(result.error, true);
  });
});
