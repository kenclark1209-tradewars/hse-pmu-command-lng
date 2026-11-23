#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Build the standalone offline HTML from the version-controlled JSON and template."""
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parent.parent
content = json.loads((ROOT / "source" / "content.json").read_text(encoding="utf-8"))
template = (ROOT / "source" / "template.html").read_text(encoding="utf-8")
if template.count("__DATA__") != 1:
    raise ValueError("Expected exactly one __DATA__ placeholder in template.html")
payload = json.dumps(content, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
result = template.replace("__DATA__", payload)
path = ROOT / "index.html"
path.write_text(result, encoding="utf-8")
print(f"Wrote {path} ({path.stat().st_size} bytes): "
      f"{len(content['tasks'])} procedures, {len(content['sources'])} legal references")
