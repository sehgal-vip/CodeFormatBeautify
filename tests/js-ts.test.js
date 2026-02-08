const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { beautifyJS, minifyJS, beautifyTS, minifyTS } = require('../js/formatters.js');

describe('Module 7: JavaScript & TypeScript Formatter', () => {
  it('7.1: beautifies JS with 2-space indent', async () => {
    const result = await beautifyJS('const greet=(name)=>{console.log("Hello, "+name);if(name==="Alice"){return true}return false};', 2);
    assert.ok(typeof result === 'string');
    assert.ok(result.includes('\n'));
    assert.ok(result.includes('const'));
    assert.ok(result.includes('console.log'));
  });

  it('7.2: beautifies JS with 4-space indent', async () => {
    const result = await beautifyJS('const x=1', 4);
    assert.ok(typeof result === 'string');
  });

  it('7.3: minifies JS', async () => {
    const result = await minifyJS('const greet = (name) => {\n  console.log("Hello");\n  return true;\n};');
    assert.ok(typeof result === 'string');
    // Minified should be shorter
    assert.ok(!result.includes('\n') || result.split('\n').length <= 3);
  });

  it('7.4: returns error for broken JS', async () => {
    const result = await beautifyJS('const x = {; broken', 2);
    assert.strictEqual(result.error, true);
    assert.ok(typeof result.message === 'string');
  });

  it('7.5: beautifies TypeScript', async () => {
    const result = await beautifyTS('interface User{name:string;age:number}const greet=(u:User):string=>{return u.name}', 2);
    assert.ok(typeof result === 'string');
    assert.ok(result.includes('\n'));
    assert.ok(result.includes('interface'));
    assert.ok(result.includes('User'));
  });

  it('7.6: minifies TypeScript', async () => {
    const beautified = await beautifyTS('interface User{name:string;age:number}const greet=(u:User):string=>{return u.name}', 2);
    const result = await minifyTS(beautified);
    assert.ok(typeof result === 'string');
    assert.ok(result.length <= beautified.length);
  });
});
