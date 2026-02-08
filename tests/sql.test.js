const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { beautifySQL, minifySQL } = require('../js/formatters.js');

describe('Module 8: SQL Formatter', () => {
  it('8.1: beautifies complex SELECT', () => {
    const result = beautifySQL('SELECT u.name, u.email FROM users u JOIN orders o ON u.id = o.user_id WHERE o.total > 100 ORDER BY o.total DESC LIMIT 10', 2);
    assert.ok(typeof result === 'string');
    assert.ok(result.includes('\n'));
    assert.ok(/SELECT/i.test(result));
    assert.ok(/FROM/i.test(result));
    assert.ok(/WHERE/i.test(result));
  });

  it('8.2: minifies SQL', () => {
    const beautified = beautifySQL('SELECT u.name, u.email FROM users u JOIN orders o ON u.id = o.user_id WHERE o.total > 100 ORDER BY o.total DESC LIMIT 10', 2);
    const result = minifySQL(beautified);
    assert.ok(typeof result === 'string');
    // Minified should be single line or near-single line
    assert.ok(result.split('\n').length <= 2);
  });

  it('8.3: beautifies CTE', () => {
    const result = beautifySQL('WITH cte AS (SELECT id, name FROM users WHERE active = true) SELECT * FROM cte', 2);
    assert.ok(typeof result === 'string');
    assert.ok(result.includes('\n'));
    assert.ok(/WITH/i.test(result));
  });

  it('8.4: beautifies INSERT', () => {
    const result = beautifySQL('INSERT INTO users (name, email) VALUES ("Alice", "a@b.com"), ("Bob", "b@b.com")', 2);
    assert.ok(typeof result === 'string');
    assert.ok(/INSERT/i.test(result));
    assert.ok(/VALUES/i.test(result));
  });

  it('8.5: returns error for empty input', () => {
    const result = beautifySQL('', 2);
    assert.strictEqual(result.error, true);
  });
});
