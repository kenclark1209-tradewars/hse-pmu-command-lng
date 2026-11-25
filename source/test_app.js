// Static + interactive smoke test for standalone application (no external packages).
const vm=require('vm'),fs=require('fs'),assert=require('assert');
const html=fs.readFileSync(__dirname+'/../index.html','utf8');
const m=html.match(/<script id="app-data" type="application\/json">([\s\S]*?)<\/script>/);
assert(m,'Embedded source JSON missing');const data=JSON.parse(m[1]);
assert.strictEqual(data.tasks.length,35);assert.strictEqual(data.sources.length,35);
assert.strictEqual(data.scenarios.length,50);assert(!('interview' in data));
assert.strictEqual(data.templates.length,10);
assert.strictEqual(data.templates.reduce((a,t)=>a+t.checklist.length,0),100);
assert(data.scenarios.every(x=>x.actions?.length>=3&&x.evidence?.length>=2));
assert(data.templates.every(x=>x.checklist.every(c=>c.how&&c.evidence&&c.question)));
assert(data.tasks.every(x=>Array.isArray(x.steps)&&x.steps.length>0));
const sourceIds=new Set(data.sources.map(x=>x.id));
for(let g of [data.scenarios,data.templates,data.tasks]) for(let r of g) for(let id of r.refs||[])assert(sourceIds.has(id),`Invalid source ID ${id}`);
const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];assert(scripts.length);
scripts.forEach(s=>new vm.Script(s[1]));
const elements={};function mk(id){return elements[id]||(elements[id]={innerHTML:'',textContent:'',value:'',dataset:{},checked:false,addEventListener:(name,fn)=>{elements[id][name]=fn},focus(){},setSelectionRange(){},scrollIntoView(){},click(){},style:{}})}
const handlers={};let store={};const alerts=[];
const document={getElementById(id){if(id==='app-data')return{textContent:m[1]};return mk('#'+id)},querySelector(q){return mk(q)},addEventListener(k,fn){handlers[k]=fn},documentElement:{setAttribute(){},getAttribute(){return'dark'}},createElement(){return{href:'',download:'',style:{},click(){},remove(){}}},body:{appendChild(){}}};
const context={document,window:{scrollTo(){},print(){}},localStorage:{getItem(k){return store[k]||null},setItem(k,v){store[k]=v}},alert(s){alerts.push(s)},confirm(){return true},console,Date,Math,JSON,Object,Array,String,Number,Blob,URL:{createObjectURL(){return 'blob:dummy'},revokeObjectURL(){}},setTimeout(){}};
vm.createContext(context);vm.runInContext(scripts.map(x=>x[1]).join('\n'),context,{timeout:10000});
assert(elements['#app'].innerHTML.includes('HSE Manager phía chủ đầu tư'));
function click(dataset){handlers.click({target:{closest(){return{dataset}}}})}
function change(id,value){handlers.change({target:{id,value}})}
click({view:'ownerstart'});assert(elements['#app'].innerHTML.includes('11 quyết định trọng yếu'));
click({ownerDecision:'4'});assert(elements['#app'].innerHTML.includes('Đưa HSE vào đấu thầu EPC'));
click({view:'ownerplan'});assert(elements['#app'].innerHTML.includes('5 ngày đầu'));
click({ownerStage:'1'});assert(elements['#app'].innerHTML.includes('Tuần 2: pháp lý'));
mk('#ownerPlanStatus').value='verified';mk('#ownerPlanEvidence').value='TRIGGER-MATRIX-V1';
click({action:'save-owner-stage'});
let own=JSON.parse(store.hse_owner_pmu_playbook_v1);assert.strictEqual(own.ownerMilestones['D6–D15'].status,'verified');
click({view:'ownerlegal'});assert(elements['#app'].innerHTML.includes('Pháp lý'));
click({ownerLegal:'2'});assert(elements['#app'].innerHTML.includes('PCCC &amp; CNCH'));
click({view:'playbooks'});assert(elements['#app'].innerHTML.includes('P0-01'));
click({task:'P3-03'});assert(elements['#app'].innerHTML.includes('Điều phối PSSR'));
click({view:'legal'});assert(elements['#app'].innerHTML.includes('NĐ 207/2026/NĐ-CP'));
click({view:'scenarios'});assert(elements['#app'].innerHTML.includes('50 tình huống'));
assert(elements['#app'].innerHTML.includes('ĐTM chưa hoàn tất'));
click({choice:'S1:1'});assert(elements['#app'].innerHTML.includes('Đúng hướng quản trị'));
assert(elements['#app'].innerHTML.includes('Hành động quản trị cần tổ chức'));
click({case:'S40'});assert(elements['#app'].innerHTML.includes('Gói')||elements['#app'].innerHTML.includes('báo'));
change('casePhase','P3');assert(elements['#app'].innerHTML.includes('Còn')||elements['#app'].innerHTML.includes('First gas')||elements['#app'].innerHTML.includes('ESD'));
change('casePhase','all');click({action:'retry-case'});
click({view:'templates'});assert(elements['#app'].innerHTML.includes('100 tiêu chí'));
assert(elements['#app'].innerHTML.includes('Cách kiểm:'));
click({template:'pssr'});assert(elements['#app'].innerHTML.includes('PSSR'));
const first=data.templates.find(x=>x.id==='pssr').checklist[0].id;
mk('#check-status-'+first).value='pass';
click({action:'save-template-review'});
assert(alerts.some(s=>String(s).includes('bằng chứng')),'Must reject pass without evidence');
mk('#check-evidence-'+first).value='PSSR-EV-01';
click({action:'save-template-review'});
let progress=JSON.parse(store.hse_owner_pmu_playbook_v1);
assert.strictEqual(progress.templateChecks.pssr[first].status,'pass');
assert.strictEqual(progress.templateChecks.pssr[first].evidence,'PSSR-EV-01');
click({downloadChecklist:'pssr'});
click({view:'glossary'});assert(elements['#app'].innerHTML.includes('HAZOP'));
click({task:'P0-01'});mk('#progressStatus').value='verified';mk('#progressOwner').value='HSE BQLDA';mk('#progressEvidence').value='DOC-PMU-001';mk('#progressNote').value='Đã đối chiếu';mk('#progressDue').value='2026-12-01';click({action:'save-progress'});
progress=JSON.parse(store.hse_owner_pmu_playbook_v1);assert.strictEqual(progress.tasks['P0-01'].status,'verified');
click({view:'dashboard'});assert(elements['#app'].innerHTML.includes('Kế hoạch triển khai 90 ngày'));
console.log(JSON.stringify({pass:true,procedures:data.tasks.length,sources:data.sources.length,scenarios:data.scenarios.length,checklist_controls:data.templates.reduce((a,x)=>a+x.checklist.length,0),navigation:true,scenario_explanation:true,checklist_validation:true,progress_backward_compatibility:true},null,2));

assert.strictEqual(data.legalClauses.length,36,"legal clause citations");
assert(data.tasks.every(t=>t.legalPins.length>=2),"every playbook has clause-level citations");
click({view:'playbooks'});
assert(elements['#app'].innerHTML.includes('Điều 5 khoản 1 điểm a, b'),"exact cited clause in playbook");
click({task:'P0-04'});
assert(elements['#app'].innerHTML.includes('Điều 31 khoản 1–2'),"environmental exact article");
click({view:'ownerstart'});
assert(elements['#app'].innerHTML.includes('LNG Cà Ná – phát triển trước EPC'),"Trung Nam example");
// v4.1: project-specific legal gates (offline content + source locators)
assert(data.ownerFocus.projectLegal.asOf==="25/11/2026");
assert.strictEqual(data.ownerFocus.legalGates.length,7);
assert(data.ownerFocus.legalGates.every(g=>g.assessment.findings.length>0&&g.assessment.findings.every(f=>f.authority&&f.when&&f.evidence&&f.clauses.every(c=>c.locator&&c.content&&c.url.startsWith('https://')))));
click({view:'ownerlegal'});
assert(elements['#app'].innerHTML.includes('NGHIÊN CỨU DỰ ÁN'));
for(let i=0;i<7;i++){click({ownerLegal:String(i)});assert(elements['#app'].innerHTML.includes('Đánh giá áp dụng LNG Nghi Sơn'));assert(elements['#app'].innerHTML.includes('Điều khoản và nội dung quy định'));}
click({ownerLegal:'1'});assert(elements['#app'].innerHTML.includes('28/02/2027'));assert(elements['#app'].innerHTML.includes('300 ha'));
click({ownerLegal:'2'});assert(elements['#app'].innerHTML.includes('Điều 8 TT62'));assert(elements['#app'].innerHTML.includes('15/09/2026'));
console.log("PASS v4.1 project legal gates");

 // Critical risk: identification, rating, controls, hold, evidence and filtering.
assert.strictEqual(data.criticalRisks.length,44);
assert.strictEqual(data.criticalRisks.reduce((n,r)=>n+r.controls.length,0),132);
click({view:'criticalrisk'});assert(elements['#app'].innerHTML.includes('Critical Risk – 44'));
click({risk:'CR04'});assert(elements['#app'].innerHTML.includes('Nâng hạ thiết bị nặng'));assert(elements['#app'].innerHTML.includes('khả năng chịu tải nền'));assert(elements['#app'].innerHTML.includes('STOP WORK / HOLD GATE'));
mk('#riskS').value='5';mk('#riskL').value='4';mk('#riskRS').value='5';mk('#riskRL').value='1';mk('#riskNote').value='Bài tập giả định lifting, cần xác minh thiết kế và nền.';
const risk4=data.criticalRisks.find(x=>x.id==='CR04');
for(let c of risk4.controls){mk('#risk-status-'+c.id).value='pass';mk('#risk-evidence-'+c.id).value=''}
click({action:'save-risk'});assert(alerts.some(s=>s.includes('CR04-CC1 phải có bằng chứng')));
for(let c of risk4.controls){mk('#risk-status-'+c.id).value='pass';mk('#risk-evidence-'+c.id).value='SYNTHETIC-'+c.id}
mk('#risk-status-'+risk4.controls[0].id).value='fail';
click({action:'save-risk'});let rr=JSON.parse(store.hse_owner_pmu_playbook_v1).riskPractice.CR04;assert.strictEqual(rr.rl,null);assert(elements['#app'].innerHTML.includes('HOLD/STOP'));
mk('#risk-status-'+risk4.controls[0].id).value='pass';
click({action:'save-risk'});rr=JSON.parse(store.hse_owner_pmu_playbook_v1).riskPractice.CR04;assert.strictEqual(rr.rl,1);assert(elements['#app'].innerHTML.includes('không đồng nghĩa được phép làm việc'));
change('riskPhase','P0');assert(!elements['#app'].innerHTML.includes('data-risk="CR04"'));
change('riskPhase','all');click({risk:'CR14'});assert(elements['#app'].innerHTML.includes('Rò rỉ LNG'));
click({action:'export-risk'});click({view:'dashboard'});assert(elements['#app'].innerHTML.includes('Critical Risk'));
console.log("PASS critical risk: 44 risk records, 132 controls, filters, evidence guard, residual gating, CSV and existing navigation");

const excluded=/phỏng vấn|ứng viên|tuyển dụng|cuộc gọi nhân sự|LILAMA|27\/11|data-view="(?:ownerinterview|interview)"/i;
assert(!excluded.test(html),'No recruitment material in packaged app');
assert.strictEqual(data.scenarios.length,50);
assert.strictEqual(data.ownerFocus.decisions.length,11);
assert(!('practiceDrills' in data.ownerFocus));
const screens=['dashboard','ownerstart','ownerplan','ownerlegal','criticalrisk','playbooks','gates','raci','legal','templates','scenarios','glossary'];
for(let view of screens){click({view});assert(!excluded.test(elements['#app'].innerHTML),'No recruitment copy in '+view);assert(!excluded.test(elements['#nav'].innerHTML),'No legacy menu');}
click({view:'scenarios'});change('casePhase','all');click({case:'S2'});assert(elements['#app'].innerHTML.includes('Tư vấn đề nghị HSE chủ đầu tư phê duyệt báo cáo QRA'));click({choice:'S2:2'});assert(elements['#app'].innerHTML.includes('Sai lầm cần tránh'));
console.log("PASS professional presentation: 12 retained screens, 50 scenarios, no recruitment content");

const ops=data.criticalRisks.filter(r=>r.system);assert.strictEqual(ops.length,16);
assert.strictEqual(data.criticalRisks.filter(r=>r.phases.includes('P5')).length,40);
assert(ops.every(r=>r.kpi.length>=3&&r.phases.includes('P5')&&r.controls.length===3&&r.refs.every(id=>sourceIds.has(id))));
click({view:'criticalrisk'});click({action:'risk-ops-new'});assert(elements['#app'].innerHTML.includes('16/44 rủi ro'));assert(elements['#app'].innerHTML.includes('data-risk="CR29"'));assert(!elements['#app'].innerHTML.includes('data-risk="CR04"'));
click({risk:'CR38'});assert(elements['#app'].innerHTML.includes('QCVN 25:2025/BCT'));assert(elements['#app'].innerHTML.includes('Vai trò HSE O&amp;M')||elements['#app'].innerHTML.includes('Vai trò HSE O&M'));assert(elements['#app'].innerHTML.includes('KPI đề xuất'));
click({action:'risk-system-0'});assert(elements['#app'].innerHTML.includes('3/44 rủi ro'));assert(!elements['#app'].innerHTML.includes('data-risk="CR38"'));
click({action:'risk-ops-all'});assert(elements['#app'].innerHTML.includes('40/44 rủi ro'));click({risk:'CR14'});assert(elements['#app'].innerHTML.includes('Liên hệ O&M'));
click({action:'risk-reset'});assert(elements['#app'].innerHTML.includes('44/44 rủi ro'));assert(elements['#app'].innerHTML.includes('data-risk="CR01"'));
change('riskPhase','P5');assert(elements['#app'].innerHTML.includes('40/44 rủi ro'));change('riskSystem','Nhà máy điện');assert(elements['#app'].innerHTML.includes('5/44 rủi ro'));
click({risk:'CR34'});assert(elements['#app'].innerHTML.includes('buồng đốt turbine khí'));
mk('#riskS').value='5';mk('#riskL').value='3';mk('#riskRS').value='5';mk('#riskRL').value='1';mk('#riskNote').value='Đánh giá tham chiếu synthetic cho vận hành turbine.';
for(let c of data.criticalRisks.find(x=>x.id==='CR34').controls){mk('#risk-status-'+c.id).value='pending';mk('#risk-evidence-'+c.id).value=''}
click({action:'save-risk'});let op=JSON.parse(store.hse_owner_pmu_playbook_v1);assert.strictEqual(op.riskPractice.CR34.rl,null);assert(op.riskPractice.CR04);
click({action:'export-risk'});click({action:'export'});click({action:'risk-reset'});
console.log("PASS O&M: 16 new risks, 40 operationally relevant, 5 system filters, KPI, legal references, residual gating, prior progress and exports");

 // V5: presentation navigation and global search.
click({view:'dashboard'});assert(elements['#app'].innerHTML.includes('SYSTEM COVERAGE'));assert(elements['#app'].innerHTML.includes('ASSET LIFECYCLE'));assert(elements['#app'].innerHTML.includes('P5 · O&M'));assert(elements['#app'].innerHTML.includes('Kế hoạch triển khai 90 ngày'));assert(elements['#nav'].innerHTML.includes('QUẢN TRỊ DỰ ÁN'));assert(elements['#nav'].innerHTML.includes('THƯ VIỆN &amp; ASSURANCE'));
assert.strictEqual(elements['#modeLabel'].textContent,'Trình chiếu');click({action:'toggle-mode'});assert.strictEqual(elements['#modeLabel'].textContent,'Làm việc');assert.strictEqual(store.hse_view_mode,'work');click({action:'toggle-mode'});assert.strictEqual(store.hse_view_mode,'executive');
click({action:'global-search'});assert(!elements['#globalSearchPanel'].hidden);handlers.input({target:{id:'globalSearchInput',value:'rollover'}});assert(elements['#globalSearchResults'].innerHTML.includes('CR30'));click({jump:'risk:CR30'});assert(elements['#globalSearchPanel'].hidden);assert(elements['#app'].innerHTML.includes('Phân lớp LNG'));assert(elements['#app'].innerHTML.includes('bowtie-mini'));assert(elements['#app'].innerHTML.includes('risk-controls'));
click({action:'global-search'});handlers.input({target:{id:'globalSearchInput',value:'pccc'}});assert(elements['#globalSearchResults'].innerHTML.includes('PCCC'));click({jump:'legalgate:2'});assert(elements['#app'].innerHTML.includes('THẨM QUYỀN'));assert(elements['#app'].innerHTML.includes('Điều khoản và nội dung quy định'));
click({jump:'source:Q25'});assert(elements['#app'].innerHTML.includes('QCVN 25:2025/BCT'));click({jump:'task:P3-03'});assert(elements['#app'].innerHTML.includes('Điều phối PSSR'));assert(elements['#app'].innerHTML.includes('task-legal'));
click({jump:'case:S2'});assert(elements['#app'].innerHTML.includes('Tư vấn đề nghị HSE chủ đầu tư phê duyệt báo cáo QRA'));click({jump:'ops:all'});assert(elements['#app'].innerHTML.includes('40/44 rủi ro'));assert(elements['#app'].innerHTML.includes('An toàn vận hành & bảo trì (O&M)'));
assert(JSON.parse(store.hse_owner_pmu_playbook_v1).riskPractice.CR04,'Existing risk records preserved');
console.log("PASS V5: executive dashboard, 12 grouped views, mode toggle, global search, risk/operations drill-down, legal and task jumps, persistence");

click({action:'global-search'});handlers.input({target:{id:'globalSearchInput',value:'phan lop lng'}});assert(elements['#globalSearchResults'].innerHTML.includes('CR30'));handlers.input({target:{id:'globalSearchInput',value:'zzzz-nonexistent-123'}});assert(elements['#globalSearchResults'].innerHTML.includes('Không tìm thấy'));handlers.keydown({key:'Escape',preventDefault(){}});assert(elements['#globalSearchPanel'].hidden);
click({view:'playbooks'});change('taskPhase','P3');handlers.click({target:{closest(){return {dataset:{task:'P3-03'},closest(){return true}}}}});assert(elements['#app'].innerHTML.includes('Điều phối PSSR'));assert(!elements['#app'].innerHTML.includes('data-task="P0-01"'));console.log("PASS UX regression: diacritic search, empty results, Escape, and retained task phase filter");

const moduleViews=['ownerstart','ownerplan','ownerlegal','criticalrisk','playbooks','gates','raci','legal','templates','scenarios','glossary'];
for(const view of moduleViews){click({view});assert(elements['#app'].innerHTML.includes('module-masthead'),'Missing workspace header '+view);assert(elements['#app'].innerHTML.includes('module-jumps'),'Missing workspace navigation '+view)}
click({view:'dashboard'});assert(!elements['#app'].innerHTML.includes('module-masthead'));assert(elements['#app'].innerHTML.includes('SYSTEM COVERAGE'));
click({view:'ownerstart'});assert(elements['#app'].innerHTML.includes('governance-model'));
click({view:'ownerplan'});assert(elements['#app'].innerHTML.includes('plan-timeline'));
click({view:'ownerlegal'});assert(elements['#app'].innerHTML.includes('mod-legal-assessment'));click({ownerLegal:'2'});assert(elements['#app'].innerHTML.includes('LƯỢT VIỆN DẪN'));
click({view:'criticalrisk'});click({action:'risk-reset'});assert(elements['#app'].innerHTML.includes('risk-distribution'));click({action:'risk-group-0'});assert(!elements['#app'].innerHTML.includes('data-risk="CR44"'));click({action:'risk-reset'});click({risk:'CR04'});assert(elements['#app'].innerHTML.includes('cc-card'));assert(elements['#app'].innerHTML.includes('STOP WORK / HOLD GATE'));
click({view:'playbooks'});click({goPhase:'P2'});assert(elements['#app'].innerHTML.includes('workflow-summary'));assert(!elements['#app'].innerHTML.includes('data-task="P0-01"'));
click({view:'gates'});assert(elements['#app'].innerHTML.includes('gate-rail'));assert.strictEqual((elements['#app'].innerHTML.match(/class="card gate gate-record"/g)||[]).length,data.gates.length);
click({view:'raci'});click({action:'raci-hse'});assert(elements['#app'].innerHTML.includes('raci-highlight'));assert(elements['#app'].innerHTML.includes('raci-role-summary'));click({action:'raci-all'});
click({view:'legal'});click({action:'source-kind-0'});assert(elements['#app'].innerHTML.includes('library-kind is-selected'));click({action:'source-kind-all'});assert(elements['#app'].innerHTML.includes('35 nguồn'));
click({view:'templates'});click({template:'pssr'});assert(elements['#app'].innerHTML.includes('template-catalog'));assert(elements['#app'].innerHTML.includes('check-evidence-grid'));assert(elements['#app'].innerHTML.includes('mod-template-checks'));
click({view:'scenarios'});change('casePhase','all');click({case:'S2'});click({action:'retry-case'});const beforeReference=store.hse_owner_pmu_playbook_v1;click({action:'case-reveal'});assert(elements['#app'].innerHTML.includes('Phương án tham chiếu'));assert(elements['#app'].innerHTML.includes('Sai lầm cần tránh'));assert.strictEqual(store.hse_owner_pmu_playbook_v1,beforeReference);click({action:'case-hide'});assert(!elements['#app'].innerHTML.includes('Phương án tham chiếu'));
click({view:'glossary'});click({action:'glossary-letter-H'});assert(elements['#app'].innerHTML.includes('HAZOP'));assert(!elements['#app'].innerHTML.includes('term-code">PMU/BQLDA'));click({action:'glossary-letter-all'});handlers.input({target:{id:'glossarySearch',value:'hazop'}});assert(elements['#app'].innerHTML.includes('HAZOP'));
assert(JSON.parse(store.hse_owner_pmu_playbook_v1).riskPractice.CR04,'Existing risk record still present');
console.log("PASS V5.1: 11 workspace headers, governance, timeline, gate map, RACI focus, library filters, template workspace, read-only scenario reference and glossary index");

// Author credit is visible in the full sidebar and compact topbar.
assert(html.includes('<span class="brand-credit">Created by: <strong>Nguyễn Thắng</strong></span>'));
assert(html.includes('<span class="brand-credit compact-credit">Created by: <strong>Nguyễn Thắng</strong></span>'));
console.log("PASS author attribution: desktop and compact branding");
