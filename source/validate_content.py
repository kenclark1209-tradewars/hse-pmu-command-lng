# -*- coding: utf-8 -*-
"""Static integrity checks for the educational content. Not a legal compliance audit."""
import json
from pathlib import Path
d=json.loads((Path(__file__).parent/'content.json').read_text(encoding='utf-8'))
assert len(d['tasks'])==35 and len(d['sources'])==27
assert len(d['scenarios'])==50 and len(d['interview'])==91
assert len(d['templates'])==10 and sum(len(t['checklist']) for t in d['templates'])==100
source_ids={x['id'] for x in d['sources']}
task_ids={x['id'] for x in d['tasks']}
for group in ('tasks','scenarios','interview','templates'):
    for x in d[group]:
        assert all(r in source_ids for r in x.get('refs',[])),x.get('id')
        assert not x.get('related') or x['related'] in task_ids,x.get('id')
for case in d['scenarios']:
    assert 0<=case['correct']<len(case['choices'])==3
    assert len(case['actions'])>=3 and len(case['evidence'])>=2
for q in d['interview']:
    assert q['model'] and q['followup'] and q['pitfall']
for t in d['templates']:
    assert len(t['checklist'])==10
    assert all(c['how'] and c['evidence'] for c in t['checklist'])
print('PASS 35 playbooks, 27 sources, 50 scenarios, 91 interview questions, 100 review controls')
