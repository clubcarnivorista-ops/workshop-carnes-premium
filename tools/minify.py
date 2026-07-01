import re
import sys

def minify_css(css):
    # remove comments
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.DOTALL)
    # collapse whitespace
    css = re.sub(r'\s+', ' ', css)
    # tighten around symbols
    css = re.sub(r'\s*([{}:;,>])\s*', r'\1', css)
    css = re.sub(r';}', '}', css)
    return css.strip()

def minify_js(js):
    # remove /* ... */ comments (not inside strings — this codebase has none problematic)
    js = re.sub(r'/\*.*?\*/', '', js, flags=re.DOTALL)
    lines = js.split('\n')
    out = []
    for line in lines:
        stripped = line.strip()
        if not stripped:
            continue
        # remove full-line // comments (safe: no // appears inside string literals in this file)
        if stripped.startswith('//'):
            continue
        out.append(stripped)
    return '\n'.join(out)

if __name__ == '__main__':
    mode = sys.argv[1]
    src = sys.argv[2]
    dst = sys.argv[3]
    with open(src, 'r', encoding='utf-8') as f:
        content = f.read()
    if mode == 'css':
        result = minify_css(content)
    else:
        result = minify_js(content)
    with open(dst, 'w', encoding='utf-8', newline='\n') as f:
        f.write(result)
    print(f'{src} -> {dst}: {len(content)} -> {len(result)} bytes')
