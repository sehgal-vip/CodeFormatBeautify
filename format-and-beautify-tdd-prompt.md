# Claude Code Prompt — Format And Beautify (TDD Loop)

## Approach: Test-Driven Development Loop

You will build this project using a strict **test-driven development loop**. Follow this cycle for EVERY module:

```
┌─────────────────────────────────────────────────┐
│                                                   │
│   1. WRITE TESTS for a module (they will fail)    │
│              ↓                                    │
│   2. RUN TESTS → confirm they fail (RED)          │
│              ↓                                    │
│   3. WRITE CODE to make tests pass                │
│              ↓                                    │
│   4. RUN TESTS → check results                    │
│              ↓                                    │
│   5a. All pass? → Move to next module             │
│   5b. Failures? → Fix code → Go to step 4         │
│              ↓                                    │
│   6. After ALL modules done → run FULL test suite  │
│              ↓                                    │
│   7. Fix any regressions until 100% green          │
│                                                   │
└─────────────────────────────────────────────────┘
```

### Rules:
- **NEVER write implementation code before its tests exist.**
- Each module's tests must be committed and failing (RED) before writing any implementation.
- After each module, run the FULL test suite (not just the new tests) to catch regressions.
- Use a lightweight test runner that works in Node.js (no browser needed for logic tests). Use `node --test` (built-in Node.js test runner) or write a simple custom runner.
- UI/visual tests (themes, responsive, output panel) can be manual checklists — document them in `tests/manual-checklist.md`.
- At the end, the full automated test suite must pass with 0 failures.

---

## Project Overview

Build **Format And Beautify** — a client-side code formatter, beautifier, and minifier. Static site, GitHub Pages, 18 languages, VS Code-like output with syntax highlighting and 10 themes.

- **Repo name:** `codeformatbeautify`
- **Deploy:** GitHub Pages
- **URL:** `vipulsehgal.com/codeformatbeautify`
- **Page title:** "Format And Beautify"
- **Design:** Minimal, clean — match `vipulsehgal.com`

---

## File Structure

```
codeformatbeautify/
├── index.html
├── css/
│   ├── style.css
│   └── themes.css
├── js/
│   ├── app.js              # UI logic, event handlers
│   ├── detect.js            # Auto-detection (export functions)
│   ├── formatters.js        # Beautify/minify functions (export)
│   └── indent.js            # Generic indentation beautifier (export)
├── tests/
│   ├── run.js               # Test runner entry point
│   ├── detect.test.js       # Module 1 tests
│   ├── json.test.js         # Module 2 tests
│   ├── xml.test.js          # Module 3 tests
│   ├── yaml.test.js         # Module 4 tests
│   ├── toml.test.js         # Module 5 tests
│   ├── html-css.test.js     # Module 6 tests
│   ├── js-ts.test.js        # Module 7 tests
│   ├── sql.test.js          # Module 8 tests
│   ├── indent.test.js       # Module 9 tests (Python, Java, C, Go, etc.)
│   ├── minify.test.js       # Module 10 tests
│   ├── errors.test.js       # Module 11 tests
│   ├── ui.test.js           # Module 12 tests (programmatic UI checks)
│   └── manual-checklist.md  # Manual visual/interaction tests
├── README.md
└── CNAME
```

---

## Build Order (Module by Module)

Execute these modules IN ORDER. Each module follows the TDD loop: tests first → red → code → green.

---

### MODULE 1: Auto-Detection Engine
**File:** `js/detect.js` → **Tests:** `tests/detect.test.js`

Write and export a `detectLanguage(input)` function that returns `{ language: string, minified: boolean }`.

**Write these tests FIRST (all must fail initially):**

```
Test 1.1:  detectLanguage('{"key":"value"}')                         → { language: "json", minified: true }
Test 1.2:  detectLanguage('{\n  "key": "value"\n}')                  → { language: "json", minified: false }
Test 1.3:  detectLanguage('<?xml version="1.0"?><root/>'))           → { language: "xml", minified: true }
Test 1.4:  detectLanguage('<!DOCTYPE html><html><body>')             → { language: "html", minified: true }
Test 1.5:  detectLanguage('---\nname: Alice\nskills:\n  - JS')       → { language: "yaml", minified: false }
Test 1.6:  detectLanguage('[package]\nname = "app"')                 → { language: "toml", minified: false }
Test 1.7:  detectLanguage('SELECT * FROM users WHERE id = 1')        → { language: "sql", minified: false }
Test 1.8:  detectLanguage('body{margin:0}.x{color:red}')             → { language: "css", minified: true }
Test 1.9:  detectLanguage('body {\n  margin: 0;\n}')                 → { language: "css", minified: false }
Test 1.10: detectLanguage('const x = require("express")')            → { language: "javascript", minified: false }
Test 1.11: detectLanguage('interface User { name: string }')         → { language: "typescript", minified: false }
Test 1.12: detectLanguage('import os\ndef main():\n    pass')        → { language: "python", minified: false }
Test 1.13: detectLanguage('#!/bin/bash\necho "hi"')                  → { language: "shell", minified: false }
Test 1.14: detectLanguage('package main\nfunc main() {}')            → { language: "go", minified: false }
Test 1.15: detectLanguage('fn main() {\n    println!("hi");\n}')     → { language: "rust", minified: false }
Test 1.16: detectLanguage('public class Main { public static void main') → { language: "java", minified: false }
Test 1.17: detectLanguage('#include <stdio.h>\nint main()')          → { language: "c", minified: false }
Test 1.18: detectLanguage('<?php echo "hello"; ?>')                  → { language: "php", minified: false }
Test 1.19: detectLanguage('puts "hello"\ndef greet\n  "hi"\nend')    → { language: "ruby", minified: false }
Test 1.20: detectLanguage('# Heading\n\n**bold** text')              → { language: "markdown", minified: false }
Test 1.21: detectLanguage('Just plain text. Nothing special.')        → { language: "text", minified: false }
Test 1.22: detectLanguage('')                                        → { language: "text", minified: false }
```

**Then implement `detectLanguage()` until all 22 tests pass.**

Priority detection order:
1. `{\rtf` → unsupported (return `{ language: "unsupported", minified: false }`)
2. Starts with `{` or `[` + valid JSON → `json`
3. Starts with `<?xml` or has XML structure → `xml`
4. `<!DOCTYPE html` or `<html` → `html`
5. YAML patterns (`---`, `key: value`, no braces) → `yaml`
6. TOML patterns (`[section]`, `key = value`) → `toml`
7. SQL keywords as first tokens → `sql`
8. CSS patterns (selectors + `{` + `property: value;`) → `css`
9. `#!/bin/bash` or `#!/bin/sh` → `shell`
10. Python patterns (`def `, `import `, `class `, `:` endings) → `python`
11. Rust patterns (`fn `, `let mut`, `impl`, `pub fn`) → `rust`
12. Go patterns (`package `, `func `, `:=`) → `go`
13. TypeScript patterns (JS-like + type annotations) → `typescript`
14. JavaScript patterns (`const `, `let `, `function `, `=>`) → `javascript`
15. Java patterns (`public class`, `System.out`) → `java`
16. PHP patterns (`<?php`, `$var`) → `php`
17. Ruby patterns (`def/end`, `puts`) → `ruby`
18. C/C++ patterns (`#include`, `int main`) → `c`
19. Markdown patterns (`# `, `**bold**`) → `markdown`
20. Fallback → `text`

Minified detection: single line > 500 chars with no newlines → `minified: true`

**Run full suite. All 22 green → move on.**

---

### MODULE 2: JSON Formatter
**File:** `js/formatters.js` (add `beautifyJSON`, `minifyJSON`) → **Tests:** `tests/json.test.js`

**Write these tests FIRST:**

```
Test 2.1:  beautifyJSON('{"a":1,"b":"hello","c":true}', 2)
           → '{\n  "a": 1,\n  "b": "hello",\n  "c": true\n}'

Test 2.2:  beautifyJSON('{"a":1}', 4)
           → '{\n    "a": 1\n}'

Test 2.3:  beautifyJSON('{"a":1}', '\t')
           → '{\n\t"a": 1\n}'

Test 2.4:  beautifyJSON('{"a":{"b":{"c":{"d":"deep"}}}}', 2)
           → 4 levels of nesting, each indented 2 spaces

Test 2.5:  beautifyJSON('[1,2,3,{"key":"val"}]', 2)
           → array formatted with each element on its own line

Test 2.6:  minifyJSON('{\n  "a": 1,\n  "b": "hello"\n}')
           → '{"a":1,"b":"hello"}'

Test 2.7:  beautifyJSON('{"emoji":"🎉","chinese":"你好"}', 2)
           → unicode preserved, properly formatted

Test 2.8:  beautifyJSON('{"a": 1,}', 2)
           → throws/returns error object: { error: true, message: string containing "Unexpected" or position info }

Test 2.9:  beautifyJSON('not json at all', 2)
           → throws/returns error object

Test 2.10: beautifyJSON('', 2)
           → throws/returns error object or empty result

Test 2.11: minifyJSON('already minified {"a":1}')
           → throws/returns error (invalid JSON — leading text)
```

**Implement `beautifyJSON(input, indent)` and `minifyJSON(input)`. Run tests → green.**

**Run FULL suite (Module 1 + 2). Fix any regressions.**

---

### MODULE 3: XML Formatter
**File:** `js/formatters.js` (add `beautifyXML`, `minifyXML`) → **Tests:** `tests/xml.test.js`

**Write tests FIRST:**

```
Test 3.1:  beautifyXML('<root><item id="1"><name>Alice</name></item></root>', 2)
           → each tag on its own line, 2-space indent

Test 3.2:  beautifyXML('<?xml version="1.0"?><root><item>test</item></root>', 2)
           → declaration on first line, rest indented

Test 3.3:  beautifyXML('<root xmlns:ns="http://ex.com"><ns:item>test</ns:item></root>', 2)
           → namespaces preserved

Test 3.4:  minifyXML('<root>\n  <item>\n    <name>Alice</name>\n  </item>\n</root>')
           → '<root><item><name>Alice</name></item></root>'

Test 3.5:  beautifyXML('<root><item>Unclosed<other>text</other></root>', 2)
           → returns { warning: true, message: string, result: string } (best-effort formatted)

Test 3.6:  beautifyXML('<root><!-- comment --><item>text</item></root>', 2)
           → comment preserved in output

Test 3.7:  beautifyXML('<root><![CDATA[some <raw> data]]><item>text</item></root>', 2)
           → CDATA preserved
```

**Implement. Run tests → green. Run FULL suite (1+2+3).**

---

### MODULE 4: YAML Formatter
**File:** `js/formatters.js` (add `beautifyYAML`, `minifyYAML`) → **Tests:** `tests/yaml.test.js`

**Write tests FIRST:**

```
Test 4.1:  beautifyYAML('name: Alice\nskills:\n- JS\n- Python', 2)
           → properly indented YAML

Test 4.2:  beautifyYAML('{name: Alice, skills: [JS, Python]}', 2)
           → expanded block-style YAML

Test 4.3:  minifyYAML('name: Alice\nskills:\n  - JS\n  - Python')
           → compact flow style: '{name: Alice, skills: [JS, Python]}'

Test 4.4:  beautifyYAML('name: Alice\n  bad indent: value', 2)
           → returns error object with line number

Test 4.5:  beautifyYAML('---\nname: doc1\n---\nname: doc2', 2)
           → multi-document preserved (or first doc formatted)

Test 4.6:  beautifyYAML('', 2)
           → returns error or empty result
```

**Implement. Run tests → green. Run FULL suite (1+2+3+4).**

---

### MODULE 5: TOML Formatter
**File:** `js/formatters.js` (add `beautifyTOML`) → **Tests:** `tests/toml.test.js`

**Write tests FIRST:**

```
Test 5.1:  beautifyTOML('[package]\nname = "app"\nversion = "1.0"\n[dependencies]\nserde = "1.0"', 2)
           → sections clearly separated, proper indentation

Test 5.2:  beautifyTOML('[package]\nname = ', 2)
           → returns error object

Test 5.3:  beautifyTOML('key = "value"\nnumber = 42\nbool = true', 2)
           → simple key-value pairs formatted

Test 5.4:  Verify no minifyTOML function exists (minify not applicable)
```

**Implement. Run FULL suite (1–5).**

---

### MODULE 6: HTML & CSS Formatter (Prettier-based)
**File:** `js/formatters.js` → **Tests:** `tests/html-css.test.js`

**Write tests FIRST:**

```
Test 6.1:  beautifyHTML('<!DOCTYPE html><html><head><title>T</title></head><body><div><h1>Hi</h1></div></body></html>', 2)
           → properly indented HTML

Test 6.2:  minifyHTML(beautified HTML from 6.1)
           → whitespace stripped between tags

Test 6.3:  beautifyHTML('<div><style>body{margin:0}</style><script>const x=1</script></div>', 2)
           → inline CSS and JS also formatted

Test 6.4:  beautifyCSS('body{margin:0;padding:0}.container{max-width:960px;margin:0 auto}', 2)
           → each rule block on its own line, properties indented

Test 6.5:  beautifyCSS('body{margin:0}', 4)
           → 4-space indent applied

Test 6.6:  minifyCSS('body {\n  margin: 0;\n  padding: 0;\n}\n.x {\n  color: red;\n}')
           → 'body{margin:0;padding:0}.x{color:red}'

Test 6.7:  beautifyCSS('@media (max-width: 768px){.container{width:100%}.sidebar{display:none}}', 2)
           → nested @media properly indented

Test 6.8:  beautifyHTML('', 2)
           → returns error or empty result
```

**Implement using Prettier standalone (HTML parser, CSS parser). Run FULL suite (1–6).**

---

### MODULE 7: JavaScript & TypeScript Formatter (Prettier-based)
**File:** `js/formatters.js` → **Tests:** `tests/js-ts.test.js`

**Write tests FIRST:**

```
Test 7.1:  beautifyJS('const greet=(name)=>{console.log("Hello, "+name);if(name==="Alice"){return true}return false};', 2)
           → properly formatted with line breaks and indentation

Test 7.2:  beautifyJS('const x=1', 4)
           → 4-space indent

Test 7.3:  minifyJS('const greet = (name) => {\n  console.log("Hello");\n  return true;\n};')
           → whitespace removed, single/minimal lines

Test 7.4:  beautifyJS('const x = {; broken', 2)
           → returns error object with Prettier error message

Test 7.5:  beautifyTS('interface User{name:string;age:number}const greet=(u:User):string=>{return u.name}', 2)
           → TypeScript formatted with type annotations preserved

Test 7.6:  minifyTS(beautified TS)
           → minified TypeScript
```

**Implement. Run FULL suite (1–7).**

---

### MODULE 8: SQL Formatter
**File:** `js/formatters.js` → **Tests:** `tests/sql.test.js`

**Write tests FIRST:**

```
Test 8.1:  beautifySQL('SELECT u.name, u.email FROM users u JOIN orders o ON u.id = o.user_id WHERE o.total > 100 ORDER BY o.total DESC LIMIT 10', 2)
           → keywords on separate lines, uppercase keywords, indented clauses

Test 8.2:  minifySQL(beautified SQL from 8.1)
           → single line, minimal whitespace

Test 8.3:  beautifySQL('WITH cte AS (SELECT id, name FROM users WHERE active = true) SELECT * FROM cte', 2)
           → CTE properly formatted and indented

Test 8.4:  beautifySQL('INSERT INTO users (name, email) VALUES ("Alice", "a@b.com"), ("Bob", "b@b.com")', 2)
           → formatted INSERT

Test 8.5:  beautifySQL('', 2)
           → error or empty
```

**Implement using sql-formatter. Run FULL suite (1–8).**

---

### MODULE 9: Generic Indentation Beautifier
**File:** `js/indent.js` → **Tests:** `tests/indent.test.js`

This handles Python, Java, C/C++, Go, Rust, PHP, Ruby, Shell.

**Write tests FIRST:**

```
# Python (keyword-based)
Test 9.1:  indentBeautify('def greet(name):\nif name == "Alice":\nreturn "Hello Alice"\nelse:\nreturn "Hello"\n', 'python', 4)
           → 'def greet(name):\n    if name == "Alice":\n        return "Hello Alice"\n    else:\n        return "Hello"\n'

Test 9.2:  indentBeautify('class MyClass:\ndef __init__(self):\nself.x = 1\ndef method(self):\npass\n', 'python', 4)
           → class body indented, method body double-indented

# Java (brace-based)
Test 9.3:  indentBeautify('public class Main {\npublic static void main(String[] args) {\nSystem.out.println("Hi");\nif (true) {\nreturn;\n}\n}\n}', 'java', 2)
           → 3 levels of correct indentation

# C (brace-based)
Test 9.4:  indentBeautify('#include <stdio.h>\nint main() {\nprintf("Hello");\nif (1) {\nreturn 0;\n}\n}', 'c', 2)
           → #include at top (no indent), function body indented, if body double-indented

# Go (brace-based)
Test 9.5:  indentBeautify('package main\nimport "fmt"\nfunc main() {\nfmt.Println("Hi")\nif true {\nreturn\n}\n}', 'go', '\t')
           → tab-indented, correct nesting

# Rust (brace-based)
Test 9.6:  indentBeautify('fn main() {\nprintln!("Hi");\nif true {\nlet x = 1;\n}\n}', 'rust', 4)
           → correct brace-matched indentation

# Shell (keyword-based)
Test 9.7:  indentBeautify('#!/bin/bash\nif [ -f "$file" ]; then\necho "exists"\nfor i in 1 2 3; do\necho $i\ndone\nfi', 'shell', 2)
           → then/do blocks indented, fi/done at correct level

# Ruby (keyword-based)
Test 9.8:  indentBeautify('def greet\nputs "hello"\nif true\nputs "yes"\nend\nend', 'ruby', 2)
           → def/end matched, if/end nested inside

# PHP (brace-based)
Test 9.9:  indentBeautify('<?php\nfunction greet() {\necho "Hello";\nif (true) {\nreturn;\n}\n}', 'php', 2)
           → brace-matched indentation

# Edge cases
Test 9.10: indentBeautify('', 'python', 2)
           → '' (empty returns empty)

Test 9.11: indentBeautify('single line no blocks', 'java', 2)
           → 'single line no blocks' (no change needed)

Test 9.12: indentBeautify('  already\n    indented\n      code', 'java', 2)
           → re-indented based on brace structure (strips existing indent first)
```

**Implement `indentBeautify(input, language, indent)`. Run FULL suite (1–9).**

---

### MODULE 10: Minify Controls
**File:** `js/formatters.js` → **Tests:** `tests/minify.test.js`

**Write tests FIRST:**

```
Test 10.1: canMinify('json')       → true
Test 10.2: canMinify('xml')        → true
Test 10.3: canMinify('html')       → true
Test 10.4: canMinify('css')        → true
Test 10.5: canMinify('javascript') → true
Test 10.6: canMinify('typescript') → true
Test 10.7: canMinify('sql')        → true
Test 10.8: canMinify('yaml')       → true
Test 10.9: canMinify('python')     → false
Test 10.10: canMinify('java')      → false
Test 10.11: canMinify('c')         → false
Test 10.12: canMinify('go')        → false
Test 10.13: canMinify('rust')      → false
Test 10.14: canMinify('php')       → false
Test 10.15: canMinify('ruby')      → false
Test 10.16: canMinify('shell')     → false
Test 10.17: canMinify('toml')      → false
Test 10.18: canMinify('markdown')  → false
```

**Implement `canMinify(language)`. Run FULL suite (1–10).**

---

### MODULE 11: Error Handling
**File:** `js/formatters.js` → **Tests:** `tests/errors.test.js`

**Write tests FIRST:**

```
Test 11.1:  beautifyJSON('{"a":1,}', 2)         → { error: true, message: contains "Unexpected" or "token" }
Test 11.2:  beautifyJSON('completely invalid', 2) → { error: true, message: string }
Test 11.3:  beautifyYAML('name: a\n  bad: b', 2) → { error: true, message: contains line number }
Test 11.4:  beautifyTOML('[broken\nname = ', 2)   → { error: true, message: string }
Test 11.5:  beautifyXML('<root><unclosed>', 2)     → { warning: true, message: string, result: string }
Test 11.6:  beautifyJS('const {; broken', 2)       → { error: true, message: string }
Test 11.7:  beautifyCSS('body { color: }}}', 2)    → { error: true, message: string }

# Errors include position info when available
Test 11.8:  beautifyJSON error message includes "line" or "position" or column
Test 11.9:  beautifyYAML error message includes "line"
Test 11.10: beautifyJS error message includes "line" (from Prettier)
```

**Verify all error paths return consistent `{ error: true, message: string }` or `{ warning: true, message: string, result: string }` format. Run FULL suite (1–11).**

---

### MODULE 12: UI Logic (Programmatic)
**File:** `js/app.js` → **Tests:** `tests/ui.test.js`

These test the logic functions that power the UI, NOT the DOM itself.

**Write tests FIRST:**

```
Test 12.1:  getFileExtension('json')       → '.json'
Test 12.2:  getFileExtension('javascript') → '.js'
Test 12.3:  getFileExtension('typescript') → '.ts'
Test 12.4:  getFileExtension('python')     → '.py'
Test 12.5:  getFileExtension('c')          → '.c'
Test 12.6:  getFileExtension('shell')      → '.sh'
Test 12.7:  getFileExtension('yaml')       → '.yaml'
Test 12.8:  getFileExtension('markdown')   → '.md'
Test 12.9:  getFileExtension('rust')       → '.rs'
Test 12.10: getFileExtension('go')         → '.go'
Test 12.11: getFileExtension('ruby')       → '.rb'
Test 12.12: getFileExtension('php')        → '.php'

Test 12.13: languageFromExtension('.json')  → 'json'
Test 12.14: languageFromExtension('.py')    → 'python'
Test 12.15: languageFromExtension('.js')    → 'javascript'
Test 12.16: languageFromExtension('.ts')    → 'typescript'
Test 12.17: languageFromExtension('.yml')   → 'yaml'
Test 12.18: languageFromExtension('.yaml')  → 'yaml'
Test 12.19: languageFromExtension('.htm')   → 'html'
Test 12.20: languageFromExtension('.sh')    → 'shell'
Test 12.21: languageFromExtension('.bash')  → 'shell'
Test 12.22: languageFromExtension('.cpp')   → 'c'
Test 12.23: languageFromExtension('.h')     → 'c'

Test 12.24: getDownloadFilename('json')       → 'formatted.json'
Test 12.25: getDownloadFilename('python')     → 'formatted.py'
Test 12.26: getDownloadFilename('typescript') → 'formatted.ts'
```

**Implement utility functions. Run FULL suite (1–12).**

---

### MODULE 13: Build the UI (HTML + CSS + Wiring)

This is the only module where tests are primarily manual. But first:

1. **Wire up all the JS logic** from modules 1–12 into `app.js`
2. **Build `index.html`** with the full layout (see UI Layout below)
3. **Build `css/style.css`** and `css/themes.css`
4. **Run the FULL automated test suite one final time** to verify nothing broke

Then go through `tests/manual-checklist.md` (see below).

---

## UI Layout Spec

```
┌──────────────────────────────────────────────────────────┐
│  Format And Beautify                              [title] │
├──────────────────────────────────────────────────────────┤
│                                                            │
│  ┌──────────────┐  ┌───────────┐  ┌──────────────────┐   │
│  │ Language ▼   │  │ Indent ▼  │  │ Theme ▼          │   │
│  │(auto-detect) │  │ 2│4│tab   │  │ VS Code Dark+    │   │
│  └──────────────┘  └───────────┘  └──────────────────┘   │
│                                                            │
│  ┌────────────────────────────────────────────────────┐   │
│  │         INPUT AREA (textarea, monospace)            │   │
│  │         (drag-drop zone overlay on dragover)        │   │
│  │                                          [Clear] ×  │   │
│  └────────────────────────────────────────────────────┘   │
│                                                            │
│  [Upload File]                                             │
│                                                            │
│  ⚠️ / ❌ Error/Warning banner (conditional)                │
│                                                            │
│     [ ✨ Beautify ]     [ ⚡ Minify ]                      │
│                                                            │
│  ┌────────────────────────────────────────────────────┐   │
│  │ 1 │ {                        (VS Code-like panel)  │   │
│  │ 2 │   "name": "hello",       line numbers          │   │
│  │ 3 │   "value": 42            syntax highlighted     │   │
│  │ 4 │ }                        themed background      │   │
│  └────────────────────────────────────────────────────┘   │
│                                                            │
│  [Copy to Clipboard]   [Download File]                     │
└──────────────────────────────────────────────────────────┘
```

### Component behavior:

- **Language dropdown:** Auto-detect (default), + 18 languages. Show "Detected: JSON" label.
- **Indent dropdown:** 2 Spaces (default), 4 Spaces, Tab
- **Theme dropdown:** 10 themes (see Theme section below). Default: VS Code Dark+
- **Input:** Plain textarea, monospace, min-height 300px, resizable. Drag-drop overlay. Clear button (×).
- **Upload:** File picker for `.json`, `.xml`, `.yaml`, `.yml`, `.toml`, `.html`, `.htm`, `.css`, `.js`, `.ts`, `.py`, `.sql`, `.java`, `.c`, `.cpp`, `.h`, `.go`, `.rs`, `.php`, `.rb`, `.md`, `.sh`, `.bash`
- **Error banner:** Red for errors (with line number when available), amber for warnings. Dismissible ×.
- **Beautify:** Primary CTA. Disabled when empty.
- **Minify:** Secondary. Disabled when empty OR language doesn't support minify (tooltip: "Minification not available for [language]").
- **Output panel:** Read-only `<pre><code>` with Prism.js highlighting, line numbers (CSS counter or gutter spans), themed, horizontal + vertical scroll, max-height ~600px.
- **Copy:** Copies raw formatted text (no HTML/colors). Button → "Copied!" for 2s.
- **Download:** `formatted.<ext>` with auto-matched extension.

---

## 10 Themes

Use **Prism.js** themes where available. Write custom CSS for the rest.

1. **Monokai** — bg: #272822, keywords: #F92672, strings: #E6DB74, numbers: #AE81FF, comments: #75715E, functions: #66D9EF, properties: #A6E22E
2. **GitHub Light** — bg: #fff, keywords: #d73a49, strings: #032f62, numbers: #005cc5, comments: #6a737d, functions: #6f42c1
3. **GitHub Dark** — bg: #0d1117, keywords: #ff7b72, strings: #a5d6ff, numbers: #79c0ff, comments: #8b949e, functions: #d2a8ff
4. **Dracula** — bg: #282a36, keywords: #ff79c6, strings: #f1fa8c, numbers: #bd93f9, comments: #6272a4, functions: #50fa7b
5. **One Dark** — bg: #282c34, keywords: #c678dd, strings: #98c379, numbers: #d19a66, comments: #5c6370, functions: #61afef
6. **Solarized Light** — bg: #fdf6e3, keywords: #859900, strings: #2aa198, numbers: #d33682, comments: #93a1a1, functions: #268bd2
7. **Solarized Dark** — bg: #002b36, keywords: #859900, strings: #2aa198, numbers: #d33682, comments: #586e75, functions: #268bd2
8. **Nord** — bg: #2e3440, keywords: #81a1c1, strings: #a3be8c, numbers: #b48ead, comments: #4c566a, functions: #88c0d0
9. **Tomorrow Night** — bg: #1d1f21, keywords: #b294bb, strings: #b5bd68, numbers: #de935f, comments: #969896, functions: #81a2be
10. **VS Code Dark+** (default) — bg: #1e1e1e, keywords: #569cd6, strings: #ce9178, numbers: #b5cea8, comments: #6a9955, functions: #dcdcaa

Each theme also needs: `gutterBg`, `gutterFg`, `foreground`, `selection`, `lineHighlight` colors.

Theme change = smooth 200ms CSS transition on output panel.

---

## Libraries (CDN)

```html
<!-- Prism.js (syntax highlighting) -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
<!-- Load Prism language components for all 18 languages -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-json.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-markup.min.js"></script>
<!-- ... etc for all languages -->

<!-- Prettier (formatting) -->
<script src="https://unpkg.com/prettier@3.3.3/standalone.js"></script>
<script src="https://unpkg.com/prettier@3.3.3/plugins/babel.js"></script>
<script src="https://unpkg.com/prettier@3.3.3/plugins/html.js"></script>
<script src="https://unpkg.com/prettier@3.3.3/plugins/css.js"></script>
<script src="https://unpkg.com/prettier@3.3.3/plugins/typescript.js"></script>
<script src="https://unpkg.com/prettier@3.3.3/plugins/markdown.js"></script>
<script src="https://unpkg.com/prettier@3.3.3/plugins/yaml.js"></script>

<!-- SQL Formatter -->
<script src="https://cdn.jsdelivr.net/npm/sql-formatter@15.3.1/dist/sql-formatter.min.js"></script>

<!-- js-yaml -->
<script src="https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.min.js"></script>

<!-- vkBeautify (XML) -->
<script src="https://cdn.jsdelivr.net/npm/vkbeautify@0.99.3/vkbeautify.js"></script>
```

For TOML: check if `@iarna/toml` or `smol-toml` has a CDN build. If not, write a basic TOML formatter (indent sections, align `=`).

---

## Manual Test Checklist (`tests/manual-checklist.md`)

After all automated tests pass, manually verify these in a browser:

```markdown
# Manual Test Checklist

## Theme Rendering
- [ ] VS Code Dark+ (default) — dark bg, correct token colors
- [ ] Switch to GitHub Light — light bg, all tokens visible
- [ ] Switch to Dracula — purple-toned dark bg
- [ ] Cycle all 10 themes — no white-on-white, no invisible text, no broken styles
- [ ] Theme change is smooth (200ms transition)
- [ ] Theme persists across multiple beautify actions

## Output Panel (VS Code feel)
- [ ] Line numbers visible, right-aligned, muted color
- [ ] Line numbers scroll in sync with code
- [ ] Horizontal scroll for long lines (no wrapping)
- [ ] Vertical scroll for 500+ lines, max-height ~600px
- [ ] Output is read-only (cannot type)
- [ ] Gutter and code background match theme

## Syntax Highlighting (verify per language)
- [ ] JSON: keys=property, strings=string, numbers=number, booleans=boolean
- [ ] HTML: tags=tag, attributes=attribute, strings=string
- [ ] CSS: selectors=tag, properties=property, values=string/number
- [ ] JavaScript: const/let/function=keyword, strings=string, comments=comment
- [ ] Python: def/class/import=keyword, strings=string, comments=comment
- [ ] SQL: SELECT/FROM/WHERE=keyword, strings=string
- [ ] XML: tags=tag, attributes=attribute
- [ ] YAML: keys=property, values=string
- [ ] Shell: keywords colored, strings colored, comments colored

## UI Controls
- [ ] Beautify disabled when input empty → enabled on type
- [ ] Minify disabled for Python → shows tooltip
- [ ] Minify enabled for JSON
- [ ] Clear resets everything (input, output, error, detected label)
- [ ] Copy to clipboard → "Copied!" for 2s → raw text in clipboard
- [ ] Download → correct extension file

## File Upload & Drag-Drop
- [ ] Upload .json → language set to JSON, content loaded
- [ ] Upload .py → language set to Python
- [ ] Drag .xml over textarea → overlay appears
- [ ] Drop .xml → content loaded, language set to XML
- [ ] Drag away without drop → overlay disappears

## Error Handling
- [ ] Invalid JSON → red error banner with message
- [ ] Invalid YAML → red error with line number
- [ ] Malformed XML → amber warning, best-effort output
- [ ] Broken JS → red error from Prettier
- [ ] Error dismissible via × button
- [ ] Error clears on next successful beautify

## Auto-Detection
- [ ] Paste JSON → "Detected: JSON"
- [ ] Paste minified CSS → "Detected: CSS (minified)"
- [ ] Paste Python → "Detected: Python"
- [ ] Override dropdown → conversion uses manual selection
- [ ] Detection updates when input changes

## Responsive
- [ ] Mobile 375px: dropdowns stacked, full-width, buttons tappable
- [ ] Tablet 768px: reasonable layout
- [ ] Desktop 1440px: dropdowns in row, centered container
- [ ] Output panel scrolls independently on all sizes

## Cross-Browser
- [ ] Chrome latest: all above pass
- [ ] Firefox latest: all above pass
- [ ] Safari latest: all above pass
```

---

## Final Verification

After all modules are complete:

```bash
# Run full automated test suite
node tests/run.js

# Expected output:
# Module 1 (Detection):  22/22 passed ✅
# Module 2 (JSON):       11/11 passed ✅
# Module 3 (XML):         7/7  passed ✅
# Module 4 (YAML):        6/6  passed ✅
# Module 5 (TOML):        4/4  passed ✅
# Module 6 (HTML/CSS):    8/8  passed ✅
# Module 7 (JS/TS):       6/6  passed ✅
# Module 8 (SQL):         5/5  passed ✅
# Module 9 (Indent):     12/12 passed ✅
# Module 10 (Minify):    18/18 passed ✅
# Module 11 (Errors):    10/10 passed ✅
# Module 12 (UI Logic):  26/26 passed ✅
#
# TOTAL: 135/135 passed ✅
# 
# 0 failures. Ship it.
```

If ANY test fails in the final run, fix it before considering the project done.

---

## Design Notes

- Match `vipulsehgal.com` aesthetic (go look at the site for font/color reference)
- Max-width container ~960px, centered
- Monospace font: JetBrains Mono (Google Fonts) with system fallback
- UI font: match site's sans-serif
- Subtle borders, rounded corners (6px)
- Accent color for Beautify button (match site)
- Minify button: secondary/outline style
- Responsive breakpoints: 375px, 768px, 1024px
- `<meta>` title, description, Open Graph tags
- Emoji favicon: ✨
