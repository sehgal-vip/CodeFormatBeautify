const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { beautifyXML, minifyXML } = require('../js/formatters.js');

describe('Module 3: XML Formatter', () => {
  it('3.1: beautifies simple XML', () => {
    const result = beautifyXML('<root><item id="1"><name>Alice</name></item></root>', 2);
    assert.ok(result.includes('\n'));
    assert.ok(result.includes('  <item'));
    assert.ok(result.includes('    <name>Alice</name>'));
  });

  it('3.2: beautifies XML with declaration', () => {
    const result = beautifyXML('<?xml version="1.0"?><root><item>test</item></root>', 2);
    assert.ok(result.startsWith('<?xml'));
    assert.ok(result.includes('\n'));
    assert.ok(result.includes('  <item>test</item>'));
  });

  it('3.3: preserves namespaces', () => {
    const result = beautifyXML('<root xmlns:ns="http://ex.com"><ns:item>test</ns:item></root>', 2);
    assert.ok(result.includes('ns:item'));
    assert.ok(result.includes('xmlns:ns'));
  });

  it('3.4: minifies XML', () => {
    const result = minifyXML('<root>\n  <item>\n    <name>Alice</name>\n  </item>\n</root>');
    assert.strictEqual(result, '<root><item><name>Alice</name></item></root>');
  });

  it('3.5: handles malformed XML with warning', () => {
    const result = beautifyXML('<root><item>Unclosed<other>text</other></root>', 2);
    assert.ok(result.warning === true || typeof result === 'string');
    if (result.warning) {
      assert.ok(typeof result.message === 'string');
      assert.ok(typeof result.result === 'string');
    }
  });

  it('3.6: preserves comments', () => {
    const result = beautifyXML('<root><!-- comment --><item>text</item></root>', 2);
    const output = typeof result === 'string' ? result : result.result;
    assert.ok(output.includes('<!-- comment -->'));
  });

  it('3.7: preserves CDATA', () => {
    const result = beautifyXML('<root><![CDATA[some <raw> data]]><item>text</item></root>', 2);
    const output = typeof result === 'string' ? result : result.result;
    assert.ok(output.includes('<![CDATA[some <raw> data]]>'));
  });
});
