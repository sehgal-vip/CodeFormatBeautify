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
