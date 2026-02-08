const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { getFileExtension, languageFromExtension, getDownloadFilename } = require('../js/app.js');

describe('Module 12: UI Logic', () => {
  it('12.1: getFileExtension json', () => { assert.strictEqual(getFileExtension('json'), '.json'); });
  it('12.2: getFileExtension javascript', () => { assert.strictEqual(getFileExtension('javascript'), '.js'); });
  it('12.3: getFileExtension typescript', () => { assert.strictEqual(getFileExtension('typescript'), '.ts'); });
  it('12.4: getFileExtension python', () => { assert.strictEqual(getFileExtension('python'), '.py'); });
  it('12.5: getFileExtension c', () => { assert.strictEqual(getFileExtension('c'), '.c'); });
  it('12.6: getFileExtension shell', () => { assert.strictEqual(getFileExtension('shell'), '.sh'); });
  it('12.7: getFileExtension yaml', () => { assert.strictEqual(getFileExtension('yaml'), '.yaml'); });
  it('12.8: getFileExtension markdown', () => { assert.strictEqual(getFileExtension('markdown'), '.md'); });
  it('12.9: getFileExtension rust', () => { assert.strictEqual(getFileExtension('rust'), '.rs'); });
  it('12.10: getFileExtension go', () => { assert.strictEqual(getFileExtension('go'), '.go'); });
  it('12.11: getFileExtension ruby', () => { assert.strictEqual(getFileExtension('ruby'), '.rb'); });
  it('12.12: getFileExtension php', () => { assert.strictEqual(getFileExtension('php'), '.php'); });

  it('12.13: languageFromExtension .json', () => { assert.strictEqual(languageFromExtension('.json'), 'json'); });
  it('12.14: languageFromExtension .py', () => { assert.strictEqual(languageFromExtension('.py'), 'python'); });
  it('12.15: languageFromExtension .js', () => { assert.strictEqual(languageFromExtension('.js'), 'javascript'); });
  it('12.16: languageFromExtension .ts', () => { assert.strictEqual(languageFromExtension('.ts'), 'typescript'); });
  it('12.17: languageFromExtension .yml', () => { assert.strictEqual(languageFromExtension('.yml'), 'yaml'); });
  it('12.18: languageFromExtension .yaml', () => { assert.strictEqual(languageFromExtension('.yaml'), 'yaml'); });
  it('12.19: languageFromExtension .htm', () => { assert.strictEqual(languageFromExtension('.htm'), 'html'); });
  it('12.20: languageFromExtension .sh', () => { assert.strictEqual(languageFromExtension('.sh'), 'shell'); });
  it('12.21: languageFromExtension .bash', () => { assert.strictEqual(languageFromExtension('.bash'), 'shell'); });
  it('12.22: languageFromExtension .cpp', () => { assert.strictEqual(languageFromExtension('.cpp'), 'c'); });
  it('12.23: languageFromExtension .h', () => { assert.strictEqual(languageFromExtension('.h'), 'c'); });

  it('12.24: getDownloadFilename json', () => { assert.strictEqual(getDownloadFilename('json'), 'formatted.json'); });
  it('12.25: getDownloadFilename python', () => { assert.strictEqual(getDownloadFilename('python'), 'formatted.py'); });
  it('12.26: getDownloadFilename typescript', () => { assert.strictEqual(getDownloadFilename('typescript'), 'formatted.ts'); });
});
