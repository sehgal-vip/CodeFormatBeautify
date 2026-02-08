#!/usr/bin/env node
// Test runner - runs all test files and reports results
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const testDir = __dirname;
const testFiles = fs.readdirSync(testDir)
  .filter(f => f.endsWith('.test.js'))
  .sort();

console.log('Running Format And Beautify test suite...\n');

let totalPassed = 0;
let totalFailed = 0;

for (const file of testFiles) {
  const filePath = path.join(testDir, file);
  try {
    const output = execSync(`node --test "${filePath}" 2>&1`, {
      encoding: 'utf-8',
      timeout: 30000,
    });

    const passMatch = output.match(/pass (\d+)/);
    const failMatch = output.match(/fail (\d+)/);

    const passed = passMatch ? parseInt(passMatch[1]) : 0;
    const failed = failMatch ? parseInt(failMatch[1]) : 0;

    totalPassed += passed;
    totalFailed += failed;

    const status = failed === 0 ? '\u2705' : '\u274C';
    const moduleName = file.replace('.test.js', '');
    console.log(`${status} ${moduleName}: ${passed}/${passed + failed} passed`);

    if (failed > 0) {
      const lines = output.split('\n');
      for (const line of lines) {
        if (line.includes('\u2716') || line.includes('not ok')) {
          console.log(`   ${line.trim()}`);
        }
      }
    }
  } catch (err) {
    const output = (err.stdout || '') + (err.stderr || '');
    const passMatch = output.match(/pass (\d+)/);
    const failMatch = output.match(/fail (\d+)/);

    const passed = passMatch ? parseInt(passMatch[1]) : 0;
    const failed = failMatch ? parseInt(failMatch[1]) : 0;

    totalPassed += passed;
    totalFailed += failed;

    const moduleName = file.replace('.test.js', '');
    console.log(`\u274C ${moduleName}: ${passed}/${passed + failed} passed`);

    const lines = output.split('\n');
    for (const line of lines) {
      if (line.includes('\u2716') || line.includes('not ok')) {
        console.log(`   ${line.trim()}`);
      }
    }
  }
}

const grandTotal = totalPassed + totalFailed;
console.log(`\n${'='.repeat(50)}`);
console.log(`TOTAL: ${totalPassed}/${grandTotal} passed ${totalFailed === 0 ? '\u2705' : '\u274C'}`);
if (totalFailed > 0) {
  console.log(`${totalFailed} failure(s).`);
} else {
  console.log('0 failures. Ship it.');
}
