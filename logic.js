import {exercises,plans,cycle,alternatives} from './data.js';
export const KEY='shape8w_v2';
export const today=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
export const validDate=s=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&s>='1900-01-01'&&s<='2199-12-31'&&!isNaN(Date.parse(s))&&new Date(s).toISOString().slice(0,10)===s;
export const addDays=(s,n)=>new Date(Date.parse(s+'T12:00:00Z')+n*86400000).toISOString().slice(0,10);
export const daysBetween=(a,b)=>Math.round((Date.parse(b+'T12:00:00Z')-Date.parse(a+'T12:00:00Z'))/86400000);
export const phase=w=>w<=2?'动作学习期':w<=4?'稳定加量期':w<=7?'渐进训练期':'巩固复测周';
export function fresh(){return {version:2,profile:{age:25,height:160,weight:48.5,start:today(),level:1,increment:.5,gear:['machine','dumbbell','band','body']},measurements:{},sessions:{},legacy:{},legacyMigrated:false};}
export function dayPlan(state,date){const index=daysBetween(state.profile.start,date);return {index,week:Math.floor(index/7)+1,inPlan:index>=0&&index<56,type:index>=0&&index<56?cycle[index%7]:'recovery'};}
export function newSession(state,date){return {type:dayPlan(state,date).type,status:'normal',note:'',gear:[...state.profile.gear],selections:{},logs:{},checked:false};}
export const emptySet=()=>({weight:null,reps:null,rpe:null,done:false});
export function stateRules(session){
  const text=session.note.replace(/(没有|无|不)(明显)?(疼痛|头晕|心悸|胸痛)/g,'');
  const stop=/疼|痛|头晕|心悸|眼前发黑|受伤/.test(text);
  const tired=session.status==='tired'||/疲劳|很累|没睡好|睡眠不足|乏力|经期不适/.test(text);
  const short=/时间少|赶时间|只有\s*(10|15|20)\s*分/.test(text);
  let gear=[...session.gear];
  if(/无器械|没器械|没有器械|徒手/.test(text))gear=['body'];
  else if(/只有哑铃|仅哑铃/.test(text))gear=['body','dumbbell'];
  else if(/只有弹力带/.test(text))gear=['body','band'];
  return {stop,tired,short,gear,messages:[stop?'识别到疼痛或异常不适：暂停训练建议；持续或明显不适请寻求专业评估。':null,tired?'识别到疲劳：减少一组，维持或减轻负重。':null,short?'识别到时间有限：建议每个动作少一组，不加练补偿。':null,gear.join()!==session.gear.join()?'备注已更新本次可用器械。':null].filter(Boolean)};
}
export function rating(baseId,id,session,level){const e=exercises[id],base=exercises[baseId],r=stateRules(session);const goal=e.main.some(m=>base.main.includes(m))?2:1;const gear=r.gear.includes(e.gear)?2:0;const difficulty=e.difficulty<=Math.max(1,level-(r.tired?1:0))?1:0;const score=goal+gear+difficulty;return {score,goal,gear,difficulty,available:gear>0&&!r.stop};}
export function ranked(base,session,level){return alternatives(base).map(e=>({...e,rating:rating(base,e.id,session,level)})).sort((a,b)=>b.rating.score-a.rating.score||a.difficulty-b.difficulty);}
export function recommendation(state,date,id,session,includeCurrent=false){
  const e=exercises[id],r=stateRules(session),week=dayPlan(state,date).week;
  const target=Math.max(1,e.sets-((r.tired||r.short)?1:0));
  const lead=`${target}组 × ${e.min}–${e.max}${e.unit}${e.side?'/侧':''}`;
  if(r.stop)return {target:0,text:'暂停这个动作。当前不适无法通过文字判断原因，不自动增加训练或推荐带痛替代。',kind:'stop'};
  if(!r.gear.includes(e.gear))return {target,text:'当前器械不匹配，请在下方选择可用的替代动作。原主推荐仍保留。',kind:'equipment'};
  if(e.unit!=='次')return {target,text:`${lead}。${r.tired?'按体感缩短时间；':'保持可控呼吸；'}不自动增加时间或负重。`,kind:'time'};
  const history=Object.entries(state.sessions).filter(([d,s])=>(d<date||(includeCurrent&&d===date))&&s.logs[id]?.sets.some(x=>x.done)).sort(([a],[b])=>b.localeCompare(a));
  const last=history[0]?.[1]?.logs[id];
  if(!last)return {target,text:`${lead}。尚无该动作历史；先用可控的轻负重或自重试做，保留2–3次余力（RPE约7–8）。`,kind:'new'};
  const done=last.sets.filter(x=>x.done&&x.reps!==null),weights=done.map(x=>x.weight).filter(x=>x!==null),base=weights.length?Math.min(...weights):null;
  const hard=done.some(x=>(x.rpe!==null&&x.rpe>=9)||x.reps<e.min);
  if(r.tired||hard){const lower=base===null?null:Math.floor(base*.9*10)/10;return {target,text:`${lead}。${r.tired?'当天疲劳':'上次余力不足或次数未达下限'}：${e.loaded&&lower!==null?`可从约${lower} kg或更轻的可用档位开始`:'缩短幅度或降低难度'}，保留3–4次余力。`,kind:'reduce'};}
  const qualified=log=>log&&log.sets.length>=e.sets&&log.sets.every(x=>x.done&&x.reps>=e.max&&x.rpe!==null&&x.rpe<=8&&(!e.loaded||x.weight!==null));
  const previous=history[1]?.[1]?.logs[id];
  const sameLoad=previous&&last.sets.every(x=>x.weight===base)&&previous.sets.every(x=>x.weight===base);
  if(week>=3&&week<=7&&qualified(last)&&qualified(previous)&&sameLoad){
    const inc=state.profile.increment;
    if(e.loaded&&base>0&&inc/base<=.05)return {target,text:`连续两次同负重全部达到上限且RPE≤8：下次可试 ${Math.round((base+inc)*100)/100} kg（+${inc} kg），次数回到${e.min}次。先试一组，动作不稳则退回。`,kind:'increase'};
    return {target,text:`${lead}。连续两次稳定达标；${e.loaded?'最小加重档位超过5%或负重资料不足，先维持':'自重动作先保持质量'}。不强行增加重量。`,kind:'hold'};
  }
  return {target,text:`${lead}。${e.loaded&&base!==null?`维持上次约 ${base} kg，` : ''}${week<=2?'学习期先稳定动作':week===8?'巩固周不自动加重':'余力充足时每组尝试增加1次，不超过范围上限'}。${done.some(x=>x.rpe===null)?'补充RPE后才能判断是否加重。':'连续两次稳定达标后再考虑小幅加重。'}`,kind:'hold'};
}
export function distribution(items){const weights={};for(const {id,count} of items){const e=exercises[id];if(!e||count<=0||e.unit!=='次')continue;const denominator=e.main.length+e.secondary.length*.5;for(const m of e.main)weights[m]=(weights[m]||0)+count/denominator;for(const m of e.secondary)weights[m]=(weights[m]||0)+count*.5/denominator;}const total=Object.values(weights).reduce((a,b)=>a+b,0);return Object.entries(weights).sort((a,b)=>b[1]-a[1]).map(([id,value])=>({id,value,percent:Math.round(value/total*100)}));}
export function muscleActivity(session){const main=new Set(),secondary=new Set();for(const [id,log] of Object.entries(session.logs))if(log.sets.some(s=>s.done)){exercises[id].main.forEach(m=>main.add(m));exercises[id].secondary.forEach(m=>secondary.add(m));}main.forEach(m=>secondary.delete(m));return {main:[...main],secondary:[...secondary]};}
const object=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
const num=(x,min,max)=>typeof x==='number'&&Number.isFinite(x)&&x>=min&&x<=max;
const assert=(test,msg)=>{if(!test)throw new Error(msg);};
const gearValid=g=>Array.isArray(g)&&g.length<=4&&g.every(x=>['machine','band','body','dumbbell'].includes(x))&&g.includes('body');
export function validateState(raw){
  assert(object(raw)&&raw.version===2,'备份版本不支持');const p=raw.profile;
  assert(object(p)&&validDate(p.start)&&num(p.age,18,100)&&num(p.height,100,230)&&num(p.weight,25,250)&&[1,2,3].includes(p.level)&&num(p.increment,.1,20)&&gearValid(p.gear),'个人设置格式无效');
  assert(object(raw.measurements)&&object(raw.sessions)&&Object.keys(raw.sessions).length<=10000&&Object.keys(raw.measurements).length<=10000,'记录格式或数量无效');
  const out=fresh();out.profile={age:p.age,height:p.height,weight:p.weight,start:p.start,level:p.level,increment:p.increment,gear:[...new Set(p.gear)]};
  for(const [d,m] of Object.entries(raw.measurements)){assert(validDate(d)&&object(m),'身体记录日期无效');const value={};for(const [key,min,max] of [['weight',25,250],['waist',30,200],['thigh',15,150]]){assert(m[key]===null||num(m[key],min,max),'身体数值超出有效范围');value[key]=m[key];}assert(Object.values(value).some(v=>v!==null),'空身体记录');out.measurements[d]=value;}
  for(const [d,s] of Object.entries(raw.sessions)){
    assert(validDate(d)&&object(s)&&Object.hasOwn(plans,s.type)&&['normal','tired','good'].includes(s.status)&&typeof s.note==='string'&&s.note.length<=1000&&gearValid(s.gear)&&typeof s.checked==='boolean'&&object(s.logs)&&object(s.selections),'训练记录格式无效');
    const clean={type:s.type,status:s.status,note:s.note,gear:[...new Set(s.gear)],checked:s.checked,selections:{},logs:{}};
    for(const [base,id] of Object.entries(s.selections)){assert(plans[s.type].ids.includes(base)&&Object.hasOwn(exercises,id)&&(id===base||alternatives(base).some(e=>e.id===id)),'动作替换无效');clean.selections[base]=id;}
    for(const [id,log] of Object.entries(s.logs)){
      assert(Object.hasOwn(exercises,id)&&object(log)&&Array.isArray(log.sets)&&log.sets.length>0&&log.sets.length<=12,'动作组数无效');
      clean.logs[id]={sets:log.sets.map(x=>{assert(object(x)&&(x.weight===null||num(x.weight,0,300))&&(x.reps===null||num(x.reps,0,300))&&(x.rpe===null||num(x.rpe,1,10))&&typeof x.done==='boolean'&&(!x.done||(x.reps!==null&&x.reps>0)),'逐组数值无效');return {weight:x.weight,reps:x.reps,rpe:x.rpe,done:x.done};})};
    }
    out.sessions[d]=clean;
  }
  if(object(raw.legacy)){for(const [k,v] of Object.entries(raw.legacy))if(/^[1-8]-[0-6]-[0-4]$/.test(k)&&v===true)out.legacy[k]=true;}
  out.legacyMigrated=raw.legacyMigrated===true;return out;
}
export function migrateLegacy(state,start){assert(validDate(start),'请选择旧计划起始日');assert(!state.legacyMigrated,'旧打卡已经迁移');let count=0;const sizes={upper:5,lower:5,core:4,recovery:3};for(let w=1;w<=8;w++)for(let d=0;d<7;d++){const type=cycle[d];if(Array.from({length:sizes[type]},(_,i)=>state.legacy[`${w}-${d}-${i}`]).every(Boolean)){const date=addDays(start,(w-1)*7+d);if(date>today())continue;if(!state.sessions[date]){state.sessions[date]=newSession(state,date);state.sessions[date].type=type;}state.sessions[date].checked=true;count++;}}state.legacyMigrated=true;return count;}
