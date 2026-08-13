from __future__ import annotations

import re
import shutil
from pathlib import Path

OFFICIAL_ROOT = Path('/home/teru/.openclaw/workspace/external/nmdl-mizo.github.io')
PLAYGROUND_ROOT = Path('/home/teru/.openclaw/workspace/external/mace-san-lab')
BASE_PATH = '/mace-san-lab'

CONTENT_MAP = {
    'research.md': OFFICIAL_ROOT / 'src/content/about/english/-index.md',
    'environment.md': OFFICIAL_ROOT / 'src/content/environment/english/-index.md',
    'join.md': OFFICIAL_ROOT / 'src/content/join/english/-index.md',
    'manuscripts.md': OFFICIAL_ROOT / 'src/content/manuscript/english/-index.md',
    'invited.md': OFFICIAL_ROOT / 'src/content/invited/english/-index.md',
    'presentations.md': OFFICIAL_ROOT / 'src/content/presentation/english/-index.md',
    'books.md': OFFICIAL_ROOT / 'src/content/book/english/-index.md',
    'awards.md': OFFICIAL_ROOT / 'src/content/award/english/-index.md',
}

DST_CONTENT_DIR = PLAYGROUND_ROOT / 'src/imported/official'
DST_IMAGE_DIR = PLAYGROUND_ROOT / 'public/images/official'
SRC_IMAGE_DIR = OFFICIAL_ROOT / 'public/images'

IMG_PATTERNS = [
    re.compile(r'src="/images/([^"]+)"'),
    re.compile(r'\]\(/images/([^\)]+)\)'),
    re.compile(r'image:\s*"/images/([^"]+)"'),
]

TEXT_FIXES = {
    '[<u>GULP</u>] (https://gulp.curtin.edu.au/index.html)': '[<u>GULP</u>](https://gulp.curtin.edu.au/index.html)',
    '2026.April.': 'April 2026.',
}


def collect_image_refs(text: str) -> set[str]:
    refs: set[str] = set()
    for pattern in IMG_PATTERNS:
        refs.update(match.group(1) for match in pattern.finditer(text))
    return refs


def rewrite_text(text: str) -> str:
    for old, new in TEXT_FIXES.items():
        text = text.replace(old, new)
    text = text.replace('src="/images/', f'src="{BASE_PATH}/images/official/')
    text = text.replace('](/images/', f']({BASE_PATH}/images/official/')
    text = text.replace('image: "/images/', f'image: "{BASE_PATH}/images/official/')
    return text


def copy_image(ref: str) -> None:
    src = SRC_IMAGE_DIR / ref
    dst = DST_IMAGE_DIR / ref
    if not src.exists():
        print(f'warning: missing image {ref}')
        return
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dst)


def main() -> None:
    DST_CONTENT_DIR.mkdir(parents=True, exist_ok=True)
    all_refs: set[str] = set()

    for dst_name, src_path in CONTENT_MAP.items():
        text = src_path.read_text()
        all_refs.update(collect_image_refs(text))
        (DST_CONTENT_DIR / dst_name).write_text(rewrite_text(text))
        print(f'wrote {dst_name}')

    mem_src = SRC_IMAGE_DIR / 'mem'
    mem_dst = DST_IMAGE_DIR / 'mem'
    if mem_src.exists():
        shutil.copytree(mem_src, mem_dst, dirs_exist_ok=True)
        print('synced member images')

    for ref in sorted(all_refs):
        copy_image(ref)


if __name__ == '__main__':
    main()
