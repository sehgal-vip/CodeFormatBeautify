const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { beautifyHTML, minifyHTML, beautifyCSS, minifyCSS } = require('../js/formatters.js');

describe('Module 6: HTML & CSS Formatter', () => {
  it('6.1: beautifies HTML', async () => {
    const result = await beautifyHTML('<!DOCTYPE html><html><head><title>T</title></head><body><div><h1>Hi</h1></div></body></html>', 2);
    assert.ok(typeof result === 'string');
    assert.ok(result.includes('\n'));
    assert.ok(result.includes('<html>') || result.includes('<html'));
    assert.ok(result.includes('<h1>Hi</h1>') || result.includes('<h1>'));
  });

  it('6.2: minifies HTML', async () => {
    const beautified = await beautifyHTML('<!DOCTYPE html><html><head><title>T</title></head><body><div><h1>Hi</h1></div></body></html>', 2);
    const result = await minifyHTML(beautified);
    assert.ok(typeof result === 'string');
    // Minified should be shorter
    assert.ok(result.length <= beautified.length);
  });

  it('6.3: beautifies HTML with inline styles and scripts', async () => {
    const result = await beautifyHTML('<div><style>body{margin:0}</style><script>const x=1</script></div>', 2);
    assert.ok(typeof result === 'string');
    assert.ok(result.includes('\n'));
  });

  it('6.4: beautifies CSS with 2-space indent', async () => {
    const result = await beautifyCSS('body{margin:0;padding:0}.container{max-width:960px;margin:0 auto}', 2);
    assert.ok(typeof result === 'string');
    assert.ok(result.includes('\n'));
    assert.ok(result.includes('margin'));
    assert.ok(result.includes('padding'));
  });

  it('6.5: beautifies CSS with 4-space indent', async () => {
    const result = await beautifyCSS('body{margin:0}', 4);
    assert.ok(typeof result === 'string');
    assert.ok(result.includes('    margin') || result.includes('    margin'));
  });

  it('6.6: minifies CSS', async () => {
    const result = await minifyCSS('body {\n  margin: 0;\n  padding: 0;\n}\n.x {\n  color: red;\n}');
    assert.ok(typeof result === 'string');
    // Minified CSS should have no unnecessary whitespace
    assert.ok(!result.includes('\n') || result.split('\n').length <= 2);
  });

  it('6.7: beautifies CSS with @media', async () => {
    const result = await beautifyCSS('@media (max-width: 768px){.container{width:100%}.sidebar{display:none}}', 2);
    assert.ok(typeof result === 'string');
    assert.ok(result.includes('@media'));
    assert.ok(result.includes('\n'));
  });

  it('6.8: returns error for empty HTML', async () => {
    const result = await beautifyHTML('', 2);
    assert.strictEqual(result.error, true);
  });
});
