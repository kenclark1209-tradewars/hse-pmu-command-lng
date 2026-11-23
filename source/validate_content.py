# -*- coding: utf-8 -*-
"""Validate tutorial content structure and links; no network/legal validation."""
import json
from collections import Counter
from pathlib import Path
D=json.loads((Path(__file__).resolve().parent/'content.json').read_text(encoding='utf-8'))

for key in ('phases','sources','gates','tasks','raci','templates','scenarios','interview','glossary'):
    assert key in D, key
assert len(D['tasks'])==35 and len(D['sources'])==28
assert len(D['scenarios'])==50 and len(D['interview'])==91
assert len(D['templates'])==10
assert sum(len(t['checklist']) for t in D['templates'])==100

def unique(items,key):
    ids=[x[key] for x in items]
    assert len(ids)==len(set(ids)), f'Duplicate IDs in {key}'
    return set(ids)
source_ids=unique(D['sources'],'id')
task_ids=unique(D['tasks'],'id')
phase_ids=unique(D['phases'],'id')
unique(D['scenarios'],'id')
unique(D['interview'],'id')
unique(D['templates'],'id')

for group in ('tasks','scenarios','interview','templates'):
    for item in D[group]:
        for ref in item.get('refs',[]):
            assert ref in source_ids, (group,item.get('id'),ref)
        if 'related' in item and item['related']:
            assert item['related'] in task_ids, (group,item['id'],item['related'])
        if item.get('phase'):
            assert item['phase'] in phase_ids, (group,item['id'],item['phase'])
for t in D['templates']:
    assert len(t['columns'])==len(t['row']),(t['id'],'malformed CSV sample')
    assert len(t['checklist'])==10,t['id']
    unique(t['checklist'],'id')
    for c in t['checklist']:
        for k in ('question','how','evidence'):
            assert len(c[k])>10,(t['id'],k)
        assert isinstance(c['critical'],bool)
for s in D['scenarios']:
    assert len(s['choices'])==3 and 0<=s['correct']<3,s['id']
    assert len(s['actions'])>=3 and len(s['evidence'])>=2,s['id']
    assert len(s['story'])>45 and len(s['explain'])>40,s['id']
for q in D['interview']:
    assert len(q['q'])>20 and len(q['model'])>100,q['id']
    assert len(q['key'])>=3 and len(q['followup'])>15 and len(q['pitfall'])>15,q['id']
print('PASS content:',len(D['tasks']),'playbooks,',len(D['sources']),'sources,',len(D['scenarios']),'cases,',len(D['interview']),'interview questions,',sum(len(t['checklist']) for t in D['templates']),'template criteria')
print('Interview distribution:',dict(Counter(x['category'] for x in D['interview'])))
# v3: owner-side positioning, focused rehearsal and authority boundaries.
O=D['ownerFocus']
assert len(D['sources'])==28
assert len(O['interviewDays'])==5 and len(O['roadmap'])==5
assert len(O['decisions'])==11 and len(O['legalGates'])==7
assert len(O['practiceDrills'])==12 and len(O['priorityQuestions'])==24
assert len(O['clarify'])==7
qid={q['id'] for q in D['interview']}
assert len({x['id'] for x in O['practiceDrills']})==12
assert len({x['id'] for x in O['priorityQuestions']})==24
assert all(x['id'] in qid for x in O['priorityQuestions'])
for day in O['interviewDays']:
    assert all(x in qid for x in day['qids'])
for drill in O['practiceDrills']:
    assert len(drill['model'])>=240 and len(drill['followup'])>=20
    assert drill['q'] in qid
    assert set(drill['refs']).issubset(source_ids)
for item in O['legalGates']+O['decisions']:
    assert set(item['refs']).issubset(source_ids)
for stage in O['roadmap']:
    assert len(stage['steps'])==5 and len(stage['outputs'])==3
print('PASS owner focus:',len(O['practiceDrills']),'executive mock interviews,',len(O['priorityQuestions']),'priority questions,',len(O['decisions']),'authority scenarios,',len(O['legalGates']),'legal gates')
