from __future__ import annotations

import re
import shutil
import json
import hashlib
import subprocess
import argparse
from pathlib import Path

PLAYGROUND_ROOT = Path(__file__).resolve().parents[1]
OFFICIAL_ROOT = PLAYGROUND_ROOT.parent / 'nmdl-mizo.github.io'
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
    'members.md': OFFICIAL_ROOT / 'src/content/member/english/-index.md',
    'alumni.md': OFFICIAL_ROOT / 'src/content/alumni/english/-index.md',
    'news.md': OFFICIAL_ROOT / 'src/content/news/english/-index.md',
    'address.md': OFFICIAL_ROOT / 'src/content/address/english/-index.md',
    'homepage.md': OFFICIAL_ROOT / 'src/content/homepage/english/-index.md',
}

DST_CONTENT_DIR = PLAYGROUND_ROOT / 'src/imported/official'
DST_IMAGE_DIR = PLAYGROUND_ROOT / 'public/images/official'
SRC_IMAGE_DIR = OFFICIAL_ROOT / 'public/images'

IMG_PATTERNS = [
    re.compile(r'''["'(]/images/([^"')\s]+)'''),
    re.compile(r'src="/images/([^"]+)"'),
    re.compile(r'\]\(/images/([^\)]+)\)'),
    re.compile(r'image:\s*"/images/([^"]+)"'),
]

ROUTES = {'about': 'research', 'member': 'members', 'alumni': 'alumni',
          'environment': 'environment', 'join': 'join', 'news': 'news',
          'address': 'about', 'manuscript': 'publications#manuscripts',
          'invited': 'publications#invited', 'presentation': 'publications#presentations',
          'book': 'publications#books', 'award': 'publications#awards'}


def collect_image_refs(text: str) -> set[str]:
    refs: set[str] = set()
    for pattern in IMG_PATTERNS:
        refs.update(match.group(1) for match in pattern.finditer(text))
    return refs


def rewrite_text(text: str) -> str:
    text = re.sub(r'''(?<=["'(])/images/''', f'{BASE_PATH}/images/official/', text)
    for source, target in ROUTES.items():
        text = re.sub(r'(?<=["\'(])/(?:en/)?' + source + r'/?(?=["\')#])',
                      f'{BASE_PATH}/{target}', text)
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
    parser = argparse.ArgumentParser(description='Import the official NMDL content without editorial changes.')
    parser.add_argument('--check', action='store_true', help='Verify imported content and source provenance without writing.')
    args = parser.parse_args()
    DST_CONTENT_DIR.mkdir(parents=True, exist_ok=True)
    all_refs: set[str] = set()
    records = []

    for dst_name, src_path in CONTENT_MAP.items():
        text = src_path.read_text(encoding='utf-8')
        all_refs.update(collect_image_refs(text))
        destination = DST_CONTENT_DIR / dst_name
        rewritten = rewrite_text(text)
        if args.check:
            assert destination.read_text(encoding='utf-8') == rewritten, f'Out of sync: {dst_name}'
        else:
            destination.write_text(rewritten, encoding='utf-8')
        records.append({'source': src_path.relative_to(OFFICIAL_ROOT).as_posix(),
                        'destination': destination.relative_to(PLAYGROUND_ROOT).as_posix(),
                        'source_text_sha256': hashlib.sha256(text.encode('utf-8')).hexdigest()})
        print(f'wrote {dst_name}')

    # Preserve original language editions too; french is the official Japanese directory.
    for name, src_path in CONTENT_MAP.items():
        source = Path(str(src_path).replace('english', 'french'))
        text = source.read_text(encoding='utf-8')
        all_refs.update(collect_image_refs(text))
        destination = DST_CONTENT_DIR / 'ja' / name
        if args.check:
            assert destination.read_text(encoding='utf-8') == rewrite_text(text), f'Out of sync: ja/{name}'
        else:
            destination.parent.mkdir(parents=True, exist_ok=True)
            destination.write_text(rewrite_text(text), encoding='utf-8')
        records.append({'source': source.relative_to(OFFICIAL_ROOT).as_posix(),
                        'destination': destination.relative_to(PLAYGROUND_ROOT).as_posix(),
                        'source_text_sha256': hashlib.sha256(text.encode('utf-8')).hexdigest()})

    # The small homepage gallery is derived from source, never a separate hand-maintained roster.
    text = re.sub(r'<!--.*?-->', '', CONTENT_MAP['members.md'].read_text(encoding='utf-8'), flags=re.S)
    staff = text.split('##### -Staff-')[1].split('##### -Researcher-')[0]
    gallery = []
    for match in re.finditer(r'<img[^>]+src="(/images/[^"]+)"[^>]*>\s*([^\n]+)', staff):
        description = match.group(2).strip()
        if description.startswith('AI-Agent'):
            continue
        gallery.append({'name': description, 'role': 'Staff', 'group': 'Staff',
                        'image': match.group(1).replace('/images/', '/images/official/')})
    assert len(gallery) == 4, 'Official staff structure changed; review gallery parser'
    head = subprocess.check_output(['git', '-C', str(OFFICIAL_ROOT), 'rev-parse', 'HEAD'], text=True).strip()
    objectives = {}
    for language, folder in [('en', 'english'), ('ja', 'french')]:
        home = (OFFICIAL_ROOT / f'src/content/homepage/{folder}/-index.md').read_text(encoding='utf-8')
        first_feature = home.split('bulletpoints:', 1)[1].split('    button:', 1)[0]
        objectives[language] = [json.loads(line.strip()[1:].strip()) for line in first_feature.splitlines() if line.strip().startswith('-')]
        assert len(objectives[language]) == 2, 'Review objective parser after source structure change'
    awards = CONTENT_MAP['awards.md'].read_text(encoding='utf-8').split('---', 2)[2]
    latest_awards = [re.sub(r'\*\*', '', entry).strip() for entry in re.split(r'(?m)^1\.\s+', awards)[1:4]]
    metadata = {'source_repository': 'https://github.com/nmdl-mizo/nmdl-mizo.github.io',
                'source_commit': head, 'files': records, 'homepage_staff': gallery,
                'homepage_objectives': objectives, 'latest_awards': latest_awards}
    provenance_path = DST_CONTENT_DIR / 'provenance.json'
    serialized = json.dumps(metadata, ensure_ascii=False, indent=2) + '\n'
    if args.check:
        assert provenance_path.read_text(encoding='utf-8') == serialized, 'Provenance differs'
        for ref in all_refs:
            if (SRC_IMAGE_DIR / ref).exists():
                assert (DST_IMAGE_DIR / ref).read_bytes() == (SRC_IMAGE_DIR / ref).read_bytes(), f'Image differs: {ref}'
        print(f'Verified {len(records)} documents and {len(gallery)} staff gallery entries at {head}')
        return
    provenance_path.write_text(serialized, encoding='utf-8')

    mem_src = SRC_IMAGE_DIR / 'mem'
    mem_dst = DST_IMAGE_DIR / 'mem'
    if mem_src.exists():
        shutil.copytree(mem_src, mem_dst, dirs_exist_ok=True)
        print('synced member images')

    for ref in sorted(all_refs):
        copy_image(ref)


if __name__ == '__main__':
    main()
