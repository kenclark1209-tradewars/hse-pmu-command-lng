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

# v4: indexed clause references and practical interview examples
assert len(D["legalClauses"]) == 36
clause_ids = {x["id"] for x in D["legalClauses"]}
assert len(clause_ids) == 36
assert all(x["sourceId"] in source_ids and x["clause"] and x["scope"] and x["url"].startswith("https://") for x in D["legalClauses"])
assert all(len(task.get("legalPins",[])) >= 2 and all(p["clauseId"] in clause_ids for p in task["legalPins"]) for task in D["tasks"])
assert all(len(q.get("caseExample","")) >= 90 for q in D["interview"])
assert all(len(drill.get("caseExample","")) >= 90 for drill in O["practiceDrills"])
assert len(O.get("trungNamPractice", [])) == 4
print("PASS v4:",len(clause_ids),"clauses,",len(D["interview"]),"interview examples, owner drills and Trung Nam reference cards")

# v4.1: project-specific research, with conditional assessments
assert O["projectLegal"]["asOf"] == "25/11/2026"
assert len(O["projectLegal"]["links"]) >= 2
for gate in O["legalGates"]:
    a = gate["assessment"]
    assert a["status"] and a["findings"]
    for f in a["findings"]:
        assert all(f[k] for k in ("topic","status","conclusion","authority","when","work","evidence","clauses"))
        assert all(c["locator"] and c["content"] and c["url"].startswith("https://") for c in f["clauses"])
print("PASS v4.1 project-specific legal gates")

# Critical Risk library (training only)
R=D["criticalRisks"]
assert len(R)==28 and len({x["id"] for x in R})==28
assert sum(len(r["controls"]) for r in R)==84
for r in R:
    assert set(r["refs"]).issubset(source_ids)
    assert set(r["tasks"]).issubset(task_ids)
    assert set(r["phases"]).issubset(phase_ids)
    assert all(r[k] for k in ("activity","hazard","event","causes","consequence","stop","restart","assurance","basis"))
    assert all(1<=r["example"][k]<=5 for k in ("s","l","rs","rl"))
    assert r["example"]["s"]>=4
    assert len({c["id"] for c in r["controls"]})==len(r["controls"])
    assert all(all(c[k] for k in ("name","type","criterion","owner","evidence","frequency")) for c in r["controls"])
print("PASS critical risk:",len(R),"risks and",sum(len(r["controls"]) for r in R),"critical controls")
