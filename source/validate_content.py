# -*- coding: utf-8 -*-
"""Validate tutorial content structure and links; no network/legal validation."""
import json
from pathlib import Path
D=json.loads((Path(__file__).resolve().parent/'content.json').read_text(encoding='utf-8'))

for key in ('phases','sources','gates','tasks','raci','templates','scenarios','glossary'):
    assert key in D, key
assert len(D['tasks'])==35 and len(D['sources'])==35
assert len(D['scenarios'])==50 and 'interview' not in D
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
unique(D['templates'],'id')

for group in ('tasks','scenarios','templates'):
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
print('PASS content:',len(D['tasks']),'playbooks,',len(D['sources']),'sources,',len(D['scenarios']),'cases')
O=D['ownerFocus']
assert len(O['roadmap'])==5
assert len(O['decisions'])==11 and len(O['legalGates'])==7
assert len(O['clarify'])==7
assert not any(k in O for k in ('interviewDays','priorityQuestions','practiceDrills'))
for item in O['legalGates']+O['decisions']:
    assert set(item['refs']).issubset(source_ids)
for stage in O['roadmap']:
    assert len(stage['steps'])==5 and len(stage['outputs'])==3
print('PASS owner governance:',len(O['decisions']),'authority scenarios,',len(O['legalGates']),'legal gates')

# Indexed legal references
assert len(D["legalClauses"]) == 36
clause_ids = {x["id"] for x in D["legalClauses"]}
assert len(clause_ids) == 36
assert all(x["sourceId"] in source_ids and x["clause"] and x["scope"] and x["url"].startswith("https://") for x in D["legalClauses"])
assert all(len(task.get("legalPins",[])) >= 2 and all(p["clauseId"] in clause_ids for p in task["legalPins"]) for task in D["tasks"])
assert len(O.get("trungNamPractice", [])) == 4
print("PASS legal references:",len(clause_ids),"clauses and Trung Nam reference cards")

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
assert len(R)==44 and len({x["id"] for x in R})==44
assert sum(len(r["controls"]) for r in R)==132
for r in R:
    assert set(r["refs"]).issubset(source_ids)
    assert set(r["tasks"]).issubset(task_ids)
    assert set(r["phases"]).issubset(phase_ids | {D["criticalRiskGuide"]["operation"]["phase"]["id"]})
    assert all(r[k] for k in ("activity","hazard","event","causes","consequence","stop","restart","assurance","basis"))
    assert all(1<=r["example"][k]<=5 for k in ("s","l","rs","rl"))
    assert r["example"]["s"]>=4
    assert len({c["id"] for c in r["controls"]})==len(r["controls"])
    assert all(all(c[k] for k in ("name","type","criterion","owner","evidence","frequency")) for c in r["controls"])
print("PASS critical risk:",len(R),"risks and",sum(len(r["controls"]) for r in R),"critical controls")

import re
assert not re.search(r'phỏng vấn|ứng viên|tuyển dụng|cuộc gọi nhân sự|LILAMA|27/11', json.dumps(D,ensure_ascii=False), re.I)
print("PASS professional presentation")

OP=[r for r in R if r.get("system")]
assert len(OP)==16 and len([r for r in R if "P5" in r["phases"]])==40
assert len(set(r["system"] for r in OP))==5
assert all(len(r["kpi"])>=3 and r["phases"]==["P5"] for r in OP)
assert all(r.get("omNote") for r in R if "P5" in r["phases"] and not r.get("system"))
print("PASS O&M:",len(OP),"new operational risks and 40 related risks")
