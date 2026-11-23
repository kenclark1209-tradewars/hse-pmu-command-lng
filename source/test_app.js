const vm=require('vm'),fs=require('fs'),assert=require('assert');
const html=fs.readFileSync(__dirname+'/../index.html','utf8');
const m=html.match(/<script id="app-data" type="application\/json">([\s\S]*?)<\/script>/);
assert(m,'data not found');const data=JSON.parse(m[1]);assert.strictEqual(data.scenarios.length,50);assert.strictEqual(data.interview.length,91);assert.strictEqual(data.templates.reduce((sum,t)=>sum+t.checklist.length,0),100);
const script=html.match(/<script>\n([\s\S]*?)<\/script>\n<\/body>/)[1];
const elements={};
function mk(id){return elements[id]||(elements[id]={innerHTML:'',textContent:'',value:'',dataset:{},addEventListener:(name,fn)=>{elements[id][name]=fn},focus(){},setSelectionRange(){},scrollIntoView(){},click(){},style:{}})};
const handlers={};let store={};
const document={
 getElementById(id){if(id==='app-data')return {textContent:m[1]};return mk('#'+id)},
 querySelector(q){return mk(q)},
 addEventListener(k,fn){handlers[k]=fn},
 documentElement:{setAttribute(){},getAttribute(){return 'dark'}},
 createElement(tag){return {href:'',download:'',style:{},click(){},remove(){}}},
 body:{appendChild(){}}
};
const context={document,window:{scrollTo(){},print(){}},localStorage:{getItem(k){return store[k]||null},setItem(k,v){store[k]=v}},alert(x){throw Error('Unexpected alert: '+x)},confirm(){return true},console,Date,Math,JSON,Object,Array,String,Number,Blob,URL:{createObjectURL(){return 'blob:dummy'},revokeObjectURL(){}},setTimeout(){}};
vm.createContext(context);vm.runInContext(script,context,{timeout:10000});
assert(elements['#app'].innerHTML.includes('Từ chuẩn bị dự án LNG'));
assert(elements['#app'].innerHTML.includes('35 quy trình'));
function click(d){handlers.click({target:{closest(){return {dataset:d}}}})}
click({view:'playbooks'});assert(elements['#app'].innerHTML.includes('Playbook HSE BQLDA'));
assert(elements['#app'].innerHTML.includes('P0-01'));
click({task:'P3-03'});assert(elements['#app'].innerHTML.includes('Điều phối PSSR'));
click({view:'legal'});assert(elements['#app'].innerHTML.includes('NĐ 207/2026/NĐ-CP'));
click({view:'templates'});assert(elements['#app'].innerHTML.includes('Legal / Permit Register'));
click({view:'scenarios'});assert(elements['#app'].innerHTML.includes('ĐTM chưa hoàn tất'));
click({choice:'S1:1'});assert(elements['#app'].innerHTML.includes('Đúng hướng quản trị'));
click({view:'interview'});assert(elements['#app'].innerHTML.includes('91 câu hỏi'));
// v2 feature checks
click({view:'templates'});assert(elements['#app'].innerHTML.includes('100 tiêu chí'));
const checklistItem=data.templates[0].checklist[0].id;
mk('#check-status-'+checklistItem).value='pass';
mk('#check-evidence-'+checklistItem).value='TEST-EVIDENCE-0001';
click({action:'save-template-review'});
let v2=JSON.parse(store.hse_owner_pmu_playbook_v1);
assert(v2.templateChecks.legal[checklistItem].status==='pass');
click({view:'interview'});assert(!elements['#app'].innerHTML.includes('GÓC NHÌN HỘI ĐỒNG'));
mk('#interviewAnswer').value='Kiểm soát nghĩa vụ, bằng chứng và thẩm quyền dự án';
mk('#interviewRating').value='4';
click({action:'save-interview'});
v2=JSON.parse(store.hse_owner_pmu_playbook_v1);
assert(v2.interviews.Q001.score===4);
click({action:'toggle-answer'});assert(elements['#app'].innerHTML.includes('Câu hỏi xoáy'));
click({view:'glossary'});assert(elements['#app'].innerHTML.includes('HAZOP'));
console.log(JSON.stringify({pass:true,tasks:data.tasks.length,sources:data.sources.length,scenarios:data.scenarios.length,templates:data.templates.length,interview:data.interview.length,glossary:data.glossary.length,renderedUI:true},null,2));
// Test update task status and persistence (mock inputs)
click({task:'P0-01'});
mk('#progressStatus').value='verified';mk('#progressOwner').value='HSE BQLDA';mk('#progressEvidence').value='DOC-PMU-001';mk('#progressNote').value='Đã đối chiếu và ghi nhận evidence';mk('#progressDue').value='2026-12-01';
click({action:'save-progress'});
assert(store.hse_owner_pmu_playbook_v1,'progress not persisted');
let progress=JSON.parse(store.hse_owner_pmu_playbook_v1);
assert(progress.tasks['P0-01'].status==='verified');
assert(progress.tasks['P0-01'].evidence==='DOC-PMU-001');
click({view:'dashboard'});
assert(elements['#app'].innerHTML.includes('90 ngày đầu'));
console.log('progress-save test pass');
