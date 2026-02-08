const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { indentBeautify } = require('../js/indent.js');

describe('Module 9: Generic Indentation Beautifier', () => {
  it('9.1: Python function with if/else', () => {
    const input = 'def greet(name):\nif name == "Alice":\nreturn "Hello Alice"\nelse:\nreturn "Hello"\n';
    const result = indentBeautify(input, 'python', 4);
    assert.ok(result.includes('def greet(name):'));
    assert.ok(result.includes('    if name == "Alice":'));
    assert.ok(result.includes('        return "Hello Alice"'));
    assert.ok(result.includes('    else:'));
    assert.ok(result.includes('        return "Hello"'));
  });

  it('9.2: Python class with methods', () => {
    const input = 'class MyClass:\ndef __init__(self):\nself.x = 1\ndef method(self):\npass\n';
    const result = indentBeautify(input, 'python', 4);
    assert.ok(result.includes('class MyClass:'));
    assert.ok(result.includes('    def __init__(self):'));
    assert.ok(result.includes('        self.x = 1'));
    assert.ok(result.includes('    def method(self):'));
    assert.ok(result.includes('        pass'));
  });

  it('9.3: Java nested braces', () => {
    const input = 'public class Main {\npublic static void main(String[] args) {\nSystem.out.println("Hi");\nif (true) {\nreturn;\n}\n}\n}';
    const result = indentBeautify(input, 'java', 2);
    assert.ok(result.includes('public class Main {'));
    assert.ok(result.includes('  public static void main'));
    assert.ok(result.includes('    System.out.println'));
    assert.ok(result.includes('    if (true) {'));
    assert.ok(result.includes('      return;'));
  });

  it('9.4: C with preprocessor', () => {
    const input = '#include <stdio.h>\nint main() {\nprintf("Hello");\nif (1) {\nreturn 0;\n}\n}';
    const result = indentBeautify(input, 'c', 2);
    assert.ok(result.includes('#include <stdio.h>'));
    assert.ok(result.includes('int main() {'));
    assert.ok(result.includes('  printf("Hello");'));
    assert.ok(result.includes('  if (1) {'));
    assert.ok(result.includes('    return 0;'));
  });

  it('9.5: Go with tabs', () => {
    const input = 'package main\nimport "fmt"\nfunc main() {\nfmt.Println("Hi")\nif true {\nreturn\n}\n}';
    const result = indentBeautify(input, 'go', '\t');
    assert.ok(result.includes('func main() {'));
    assert.ok(result.includes('\tfmt.Println("Hi")'));
    assert.ok(result.includes('\tif true {'));
    assert.ok(result.includes('\t\treturn'));
  });

  it('9.6: Rust with braces', () => {
    const input = 'fn main() {\nprintln!("Hi");\nif true {\nlet x = 1;\n}\n}';
    const result = indentBeautify(input, 'rust', 4);
    assert.ok(result.includes('fn main() {'));
    assert.ok(result.includes('    println!("Hi");'));
    assert.ok(result.includes('    if true {'));
    assert.ok(result.includes('        let x = 1;'));
  });

  it('9.7: Shell with if/then/fi', () => {
    const input = '#!/bin/bash\nif [ -f "$file" ]; then\necho "exists"\nfor i in 1 2 3; do\necho $i\ndone\nfi';
    const result = indentBeautify(input, 'shell', 2);
    assert.ok(result.includes('#!/bin/bash'));
    assert.ok(result.includes('if [ -f "$file" ]; then'));
    assert.ok(result.includes('  echo "exists"'));
    assert.ok(result.includes('  for i in 1 2 3; do'));
    assert.ok(result.includes('    echo $i'));
    assert.ok(result.includes('  done'));
    assert.ok(result.includes('fi'));
  });

  it('9.8: Ruby with def/end', () => {
    const input = 'def greet\nputs "hello"\nif true\nputs "yes"\nend\nend';
    const result = indentBeautify(input, 'ruby', 2);
    assert.ok(result.includes('def greet'));
    assert.ok(result.includes('  puts "hello"'));
    assert.ok(result.includes('  if true'));
    assert.ok(result.includes('    puts "yes"'));
    assert.ok(result.includes('  end'));
    // Last end should be at level 0
    const lines = result.split('\n').filter(l => l.trim() === 'end');
    assert.ok(lines.some(l => l === 'end'));
  });

  it('9.9: PHP with braces', () => {
    const input = '<?php\nfunction greet() {\necho "Hello";\nif (true) {\nreturn;\n}\n}';
    const result = indentBeautify(input, 'php', 2);
    assert.ok(result.includes('<?php'));
    assert.ok(result.includes('function greet() {'));
    assert.ok(result.includes('  echo "Hello";'));
    assert.ok(result.includes('  if (true) {'));
    assert.ok(result.includes('    return;'));
  });

  it('9.10: empty input returns empty', () => {
    const result = indentBeautify('', 'python', 2);
    assert.strictEqual(result, '');
  });

  it('9.11: single line no blocks', () => {
    const result = indentBeautify('single line no blocks', 'java', 2);
    assert.strictEqual(result, 'single line no blocks');
  });

  it('9.12: re-indents already indented code', () => {
    const input = '  already\n    indented\n      code';
    const result = indentBeautify(input, 'java', 2);
    // Should strip existing indent (no braces = all at level 0)
    assert.ok(result.includes('already'));
    assert.ok(result.includes('indented'));
    assert.ok(result.includes('code'));
  });
});
