const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { detectLanguage } = require('../js/detect.js');

describe('Module 1: Auto-Detection Engine', () => {
  it('1.1: detects minified JSON object', () => {
    const result = detectLanguage('{"key":"value"}');
    assert.deepStrictEqual(result, { language: 'json', minified: true });
  });

  it('1.2: detects formatted JSON object', () => {
    const result = detectLanguage('{\n  "key": "value"\n}');
    assert.deepStrictEqual(result, { language: 'json', minified: false });
  });

  it('1.3: detects minified XML', () => {
    const result = detectLanguage('<?xml version="1.0"?><root/>');
    assert.deepStrictEqual(result, { language: 'xml', minified: true });
  });

  it('1.4: detects minified HTML', () => {
    const result = detectLanguage('<!DOCTYPE html><html><body>');
    assert.deepStrictEqual(result, { language: 'html', minified: true });
  });

  it('1.5: detects YAML', () => {
    const result = detectLanguage('---\nname: Alice\nskills:\n  - JS');
    assert.deepStrictEqual(result, { language: 'yaml', minified: false });
  });

  it('1.6: detects TOML', () => {
    const result = detectLanguage('[package]\nname = "app"');
    assert.deepStrictEqual(result, { language: 'toml', minified: false });
  });

  it('1.7: detects SQL', () => {
    const result = detectLanguage('SELECT * FROM users WHERE id = 1');
    assert.deepStrictEqual(result, { language: 'sql', minified: false });
  });

  it('1.8: detects minified CSS', () => {
    const result = detectLanguage('body{margin:0}.x{color:red}');
    assert.deepStrictEqual(result, { language: 'css', minified: true });
  });

  it('1.9: detects formatted CSS', () => {
    const result = detectLanguage('body {\n  margin: 0;\n}');
    assert.deepStrictEqual(result, { language: 'css', minified: false });
  });

  it('1.10: detects JavaScript', () => {
    const result = detectLanguage('const x = require("express")');
    assert.deepStrictEqual(result, { language: 'javascript', minified: false });
  });

  it('1.11: detects TypeScript', () => {
    const result = detectLanguage('interface User { name: string }');
    assert.deepStrictEqual(result, { language: 'typescript', minified: false });
  });

  it('1.12: detects Python', () => {
    const result = detectLanguage('import os\ndef main():\n    pass');
    assert.deepStrictEqual(result, { language: 'python', minified: false });
  });

  it('1.13: detects Shell', () => {
    const result = detectLanguage('#!/bin/bash\necho "hi"');
    assert.deepStrictEqual(result, { language: 'shell', minified: false });
  });

  it('1.14: detects Go', () => {
    const result = detectLanguage('package main\nfunc main() {}');
    assert.deepStrictEqual(result, { language: 'go', minified: false });
  });

  it('1.15: detects Rust', () => {
    const result = detectLanguage('fn main() {\n    println!("hi");\n}');
    assert.deepStrictEqual(result, { language: 'rust', minified: false });
  });

  it('1.16: detects Java', () => {
    const result = detectLanguage('public class Main { public static void main');
    assert.deepStrictEqual(result, { language: 'java', minified: false });
  });

  it('1.17: detects C', () => {
    const result = detectLanguage('#include <stdio.h>\nint main()');
    assert.deepStrictEqual(result, { language: 'c', minified: false });
  });

  it('1.18: detects PHP', () => {
    const result = detectLanguage('<?php echo "hello"; ?>');
    assert.deepStrictEqual(result, { language: 'php', minified: false });
  });

  it('1.19: detects Ruby', () => {
    const result = detectLanguage('puts "hello"\ndef greet\n  "hi"\nend');
    assert.deepStrictEqual(result, { language: 'ruby', minified: false });
  });

  it('1.20: detects Markdown', () => {
    const result = detectLanguage('# Heading\n\n**bold** text');
    assert.deepStrictEqual(result, { language: 'markdown', minified: false });
  });

  it('1.21: detects plain text', () => {
    const result = detectLanguage('Just plain text. Nothing special.');
    assert.deepStrictEqual(result, { language: 'text', minified: false });
  });

  it('1.22: detects empty input as text', () => {
    const result = detectLanguage('');
    assert.deepStrictEqual(result, { language: 'text', minified: false });
  });
});
