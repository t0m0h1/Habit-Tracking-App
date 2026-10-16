const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pad=n=>String(n).padStart(2,'0');
const key=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const addDays=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x};
const wkStart=d=>{const x=new Date(d);x.setHours(0,0,0,0);x.setDate(x.getDate()-((x.getDay()+6)%7));return x};
const dow=d=>(d.getDay()+6)%7;
const DS=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const DL=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const TIMES=[['Morning','sun'],['Afternoon','cloud'],['Evening','moon'],['Anytime','clock']];
const P={
drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
stretch:'<circle cx="12" cy="5" r="2"/><path d="M12 8v6m-6-3 6 1.5 6-1.5m-8 10 2-7 2 7"/>',
walk:'<circle cx="13" cy="4.5" r="1.8"/><path d="M11 21l2-6-3-3 1-4 3 2 3 1M9 11l-2 3"/>',
book:'<path d="M12 6c-2-1.5-5-2-8-2v14c3 0 6 .5 8 2 2-1.5 5-2 8-2V4c-3 0-6 .5-8 2zM12 6v14"/>',
sparkle:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 17v4m-2-2h4"/>',
pill:'<rect x="3" y="8.5" width="18" height="7" rx="3.5" transform="rotate(-45 12 12)"/><path d="M9.5 9.5l5 5"/>',
apple:'<path d="M12 8c-2-1.5-6-1-6 4 0 4 3 8 6 8s6-4 6-8c0-5-4-5.5-6-4zM12 8c0-2 1-4 3-5"/>',
moon:'<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>',
pencil:'<path d="M4 20l1-4L16 5l3 3L8 19zM14 7l3 3"/>',
music:'<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>',
sprout:'<path d="M12 21v-9M12 12c0-4-3-6-7-6 0 4 3 6 7 6zM12 14c0-3 2-5 6-5 0 3-2 5-6 5z"/>',
house:'<path d="M4 11l8-7 8 7M6 10v10h12V10"/>',
sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>',
cup:'<path d="M5 8h12v6a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5zM17 10h2a2 2 0 0 1 0 4h-2M8 3v2m4-2v2"/>',
heart:'<path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z"/>',
paw:'<circle cx="7" cy="10" r="1.7"/><circle cx="11" cy="6.5" r="1.7"/><circle cx="16" cy="7" r="1.7"/><circle cx="19" cy="11.5" r="1.7"/><path d="M12 12c-3 0-6 4-5 6.5s3 1.5 5 1 4 1 5-1-2-6.5-5-6.5z"/>',
check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
cloud:'<path d="M7 18a4 4 0 0 1-.5-8A6 6 0 0 1 18 11a3.5 3.5 0 0 1-.5 7z"/>',
clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
calendar:'<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4m6-4v4"/>'
};
const ICONS=['drop','stretch','walk','book','sparkle','pill','apple','moon','pencil','music','sprout','house','sun','cup','heart','paw'];
const OLDI=['💧','🧘','🚶','📖','🪥','💊','🍎','😴','🎨','🎵','🌱','🧺','✍️','🐕','☀️','🫖'];
const svg=(n,z=22)=>`<svg width="${z}" height="${z}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]||P.sprout}</svg>`;
const COLS=[['Sage','#a8d5cf'],['Peach','#f2c9b8'],['Lavender','#c9c3e6'],['Butter','#f3e2a9'],['Sky','#b8d8ee'],['Meadow','#d5e8b8']];
const CHEERS=['Nice one!','Lovely, that counts.','Well done, small steps add up.','Done. Good for you.','That’s a win.'];
const ALL7=[0,1,2,3,4,5,6];
const DEF={habits:[
{id:'h1',name:'Drink water',icon:'drop',color:'#b8d8ee',time:'Morning',days:ALL7,remind:false},
{id:'h2',name:'Gentle stretch',icon:'stretch',color:'#c9c3e6',time:'Morning',days:ALL7,remind:false},
{id:'h3',name:'Go for a walk',icon:'walk',color:'#d5e8b8',time:'Afternoon',days:[0,1,2,3,4],remind:false},
{id:'h4',name:'Wind down with a book',icon:'book',color:'#f3e2a9',time:'Evening',days:ALL7,remind:false}],
log:{},rest:{},set:{theme:'auto',size:'normal',calm:false,nudge:false,nudgeOff:''}};
const SK='gentle-habits-v1';
let S=null;
try{S=JSON.parse(localStorage.getItem(SK))}catch(e){}
if(!S||!S.habits){S=JSON.parse(JSON.stringify(DEF))}
S.set=Object.assign({},DEF.set,S.set||{});
S.habits.forEach(h=>{const i=OLDI.indexOf(h.icon);if(i>-1)h.icon=ICONS[i]});
const save=()=>{try{localStorage.setItem(SK,JSON.stringify(S))}catch(e){}};
let view='today',ws=wkStart(new Date()),ed=null,confirmDel=false,tt;
const st=(h,k)=>(S.log[k]||{})[h.id]||0;
const sched=(h,d)=>h.days.includes(dow(d));
function setSt(h,k,v){S.log[k]=S.log[k]||{};if(v)S.log[k][h.id]=v;else delete S.log[k][h.id];save()}
function toast(m){const t=$('#toast');t.textContent=m;clearTimeout(tt);tt=setTimeout(()=>t.textContent='',3200)}
function apply(){const r=document.documentElement;const t=S.set.theme;if(t==='auto')r.removeAttribute('data-theme');else r.setAttribute('data-theme',t);r.dataset.size=S.set.size;r.dataset.calm=S.set.calm?'on':'off'}
function dayInfo(d){const k=key(d),act=S.habits.filter(h=>sched(h,d)&&st(h,k)!==2);return{k,act,done:act.filter(h=>st(h,k)===1).length}}

function todayView(){
 const t=new Date(),{k,act,done}=dayInfo(t),rest=S.rest[k],tot=act.length;
 const hr=t.getHours(),greet=hr<12?'Good morning':hr<18?'Good afternoon':'Good evening';
 const f=rest||!tot?0:done/tot,C=263.9;
 const msg=rest?'Rest day. Nothing is needed from you today.':!tot?'Nothing planned today. Enjoy the space.':done===tot?'All done for today. Lovely work. Time to relax.':done?`${done} done. Every step counts.`:'Whenever you’re ready. One small step is plenty.';
 const y=addDays(t,-1),yi=dayInfo(y),fresh=!S.rest[yi.k]&&yi.act.length&&yi.done<yi.act.length&&!done&&!rest;
 let nudge='';
 if(S.set.nudge&&S.set.nudgeOff!==k&&!rest){const w=hr<12?'Morning':hr<17?'Afternoon':'Evening';
  const hs=act.filter(h=>h.remind&&h.time===w&&st(h,k)!==1);
  if(hs.length)nudge=`<div class="note"><p>A gentle nudge: ${hs.map(h=>esc(h.name)).join(', ')} whenever you’re ready.</p><button class="btn sm" data-act="nudgeoff" data-fid="nd">Dismiss</button></div>`}
 let list='';
 for(const [tm,ic] of TIMES){const hs=S.habits.filter(h=>h.time===tm&&sched(h,t));if(!hs.length)continue;
  list+=`<h2><span aria-hidden="true">${svg(ic,20)}</span> ${tm}</h2><ul>`+hs.map(h=>{const s=st(h,k);
  return `<li class="row ${s===1?'done':''} ${s===2?'skip':''}" style="--c:${h.color}"><label class="chk"><input type="checkbox" data-act="tick" data-id="${h.id}" data-fid="t${h.id}" ${s===1?'checked':''} ${s===2?'disabled':''}><span class="box" aria-hidden="true"></span><span class="ico" aria-hidden="true">${svg(h.icon,22)}</span><span class="nm">${esc(h.name)}${s===2?'<small>Skipped. That’s okay.</small>':''}</span></label><button class="ghost" data-act="skip" data-id="${h.id}" data-fid="s${h.id}">${s===2?'Undo':'Not today'}</button></li>`}).join('')+'</ul>'}
 if(!list)list='<p class="card sub" style="margin-top:20px">No habits planned today. Add one in My habits whenever you like.</p>';
 return `<h1>${greet}</h1><p class="sub">${t.toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long'})}</p>
 <section class="card hero" aria-label="Today’s progress"><div class="ring" role="img" aria-label="${rest?'Resting today':done+' of '+tot+' habits done'}"><svg viewBox="0 0 100 100" aria-hidden="true"><circle class="t" cx="50" cy="50" r="42"/><circle class="p" cx="50" cy="50" r="42" stroke-dasharray="${C}" stroke-dashoffset="${C*(1-f)}"/></svg><b aria-hidden="true">${rest?svg('moon',34):done+'/'+tot}</b></div><div><p><b>${msg}</b></p><button class="ghost" style="padding-left:0" data-act="rest" data-fid="rest">${rest?'Undo rest day':'Take a rest day'}</button></div></section>
 ${fresh?'<div class="note"><p>Today is a fresh page. Yesterday is behind you, and that’s okay.</p></div>':''}${nudge}${list}`}

function weekView(){
 const t=new Date();t.setHours(23,59,59);const days=ALL7.map(i=>addDays(ws,i));let total=0;
 const isThis=key(ws)===key(wkStart(new Date()));
 const rows=S.habits.map(h=>{let n=0,pl=0;const cells=days.map((d,i)=>{const k=key(d),s=st(h,k),sc=sched(h,d),fut=d>t,rest=S.rest[k];
  if(s===1)n++;if(sc)pl++;
  const lab=`${h.name}, ${DL[i]}, ${s===1?'done':'not done'}`;
  return `<td><button class="cell ${!sc&&s!==1?'off':''} ${rest&&s!==1?'rest':''}" data-act="wtick" data-id="${h.id}" data-k="${k}" data-fid="w${h.id}${k}" aria-pressed="${s===1}" aria-label="${esc(lab)}" ${fut?'disabled':''}>${s===1?svg('check',20):rest?svg('moon',18):''}</button></td>`}).join('');total+=n;
  return `<tr><td class="h"><span aria-hidden="true">${svg(h.icon,22)}</span>${esc(h.name)}<small>${n} ${pl?'of '+pl+' planned':'this week'}</small></td>${cells}</tr>`}).join('');
 const fmt=d=>d.toLocaleDateString('en-GB',{day:'numeric',month:'short'});
 return `<h1>This week</h1><p class="sub">${fmt(ws)} to ${fmt(addDays(ws,6))}</p>
 <div class="bar" style="margin-top:12px"><button class="btn sm" data-act="wprev" data-fid="wp">Earlier</button><button class="btn sm" data-act="wnow" data-fid="wn" ${isThis?'disabled':''}>This week</button><button class="btn sm" data-act="wnext" data-fid="wx">Later</button></div>
 <div class="card wk" style="margin-top:12px">${S.habits.length?`<table><thead><tr><th><span class="sr" style="position:absolute;left:-999px">Habit</span></th>${days.map((d,i)=>`<th class="${key(d)===key(new Date())?'today':''}"><button data-act="wrest" data-k="${key(d)}" data-fid="r${key(d)}" aria-pressed="${!!S.rest[key(d)]}" aria-label="${DL[i]}, ${S.rest[key(d)]?'rest day, tap to undo':'tap to mark as a rest day'}">${DS[i]}<br>${d.getDate()}${S.rest[key(d)]?' '+svg('moon',14):''}</button></th>`).join('')}</tr></thead><tbody>${rows}</tbody></table>`:'<p class="sub">No habits yet.</p>'}</div>
 <p class="card" style="margin-top:14px"><b>${total} check-in${total===1?'':'s'} this week.</b> <span class="sub">Every one of them counts. Empty days are just empty days, not failures.</span></p>
 <p class="sub" style="margin-top:10px">Tip: tap a day name to mark it as a rest day. You can fill in earlier days too.</p>`}

function habitsView(){
 if(ed)return editView();
 const s=S.set;
 return `<h1>My habits</h1><p class="sub">Make them yours. Change them any time.</p>
 <div style="margin:14px 0"><button class="btn pri" data-act="add" data-fid="add">Add a habit</button></div>
 <ul>${S.habits.map(h=>`<li class="item" style="--c:${h.color}"><span class="ico" aria-hidden="true">${svg(h.icon,22)}</span><span class="nm">${esc(h.name)}<small>${h.time}, ${h.days.length===7?'every day':h.days.map(i=>DS[i]).join(' ')}${h.remind?', gentle reminder':''}</small></span><button class="btn sm" data-act="edit" data-id="${h.id}" data-fid="e${h.id}" aria-label="Edit ${esc(h.name)}">Edit</button></li>`).join('')||'<li class="card sub">Nothing here yet. Add your first habit, small is perfect.</li>'}</ul>
 <h2>Comfort settings</h2><div class="card">
 <label class="f" for="th" style="margin-top:0">Colour theme</label><select id="th" class="in" data-act="set" data-s="theme"><option value="auto" ${s.theme==='auto'?'selected':''}>Match my device</option><option value="light" ${s.theme==='light'?'selected':''}>Soft light</option><option value="dark" ${s.theme==='dark'?'selected':''}>Soft dark</option></select>
 <label class="f" for="sz">Text size</label><select id="sz" class="in" data-act="set" data-s="size"><option value="normal" ${s.size==='normal'?'selected':''}>Comfortable</option><option value="large" ${s.size==='large'?'selected':''}>Larger</option></select>
 <label class="tg"><input type="checkbox" data-act="set" data-s="calm" ${s.calm?'checked':''}> Turn off all movement</label>
 <label class="tg"><input type="checkbox" data-act="set" data-s="nudge" ${s.nudge?'checked':''}> Show one gentle reminder on the Today page <span class="sub">(only for habits with reminders on; never a sound or pop-up)</span></label></div>
 <p class="sub" style="margin-top:14px">Your habits are saved on this device only.</p>`}

function editView(){
 const e=ed;
 return `<h1>${e.id?'Edit habit':'New habit'}</h1>
 <form id="f" novalidate>
 <label class="f" for="nm">What would you like to do?</label><input id="nm" class="in" name="name" maxlength="40" value="${esc(e.name)}" placeholder="For example: Drink a glass of water" autocomplete="off">
 ${e.err?'<p class="err" role="alert">Please give your habit a name.</p>':''}
 <fieldset style="border:0;padding:0;margin:0"><legend class="f">Pick an icon</legend><div class="seg">${ICONS.map(i=>`<label><input type="radio" name="icon" value="${i}" ${e.icon===i?'checked':''} aria-label="${i}"><span aria-hidden="true">${svg(i,24)}</span></label>`).join('')}</div></fieldset>
 <fieldset style="border:0;padding:0;margin:0"><legend class="f">Pick a colour</legend><div class="seg">${COLS.map(([n,c])=>`<label class="sw" style="--c:${c}"><input type="radio" name="color" value="${c}" ${e.color===c?'checked':''} aria-label="${n}"><span aria-hidden="true"></span></label>`).join('')}</div></fieldset>
 <fieldset style="border:0;padding:0;margin:0"><legend class="f">Time of day</legend><div class="seg">${TIMES.map(([t,i])=>`<label><input type="radio" name="time" value="${t}" ${e.time===t?'checked':''}><span>${svg(i,18)}${t}</span></label>`).join('')}</div></fieldset>
 <fieldset style="border:0;padding:0;margin:0"><legend class="f">Which days?</legend><div class="seg">${DS.map((d,i)=>`<label><input type="checkbox" name="day" value="${i}" ${e.days.includes(i)?'checked':''}><span>${d}</span></label>`).join('')}</div></fieldset>
 <label class="tg" style="margin-top:14px"><input type="checkbox" name="remind" ${e.remind?'checked':''}> Include in my gentle reminder</label>
 <div class="acts"><button class="btn pri" type="submit">Save habit</button><button class="btn" type="button" data-act="cancel">Cancel</button>${e.id?`<button class="btn" type="button" data-act="del">${confirmDel?'Tap again to delete for good':'Delete habit'}</button>`:''}</div></form>`}

function render(){
 const fid=document.activeElement&&document.activeElement.dataset?document.activeElement.dataset.fid:null;
 $('#app').innerHTML=view==='today'?todayView():view==='week'?weekView():habitsView();
 document.querySelectorAll('.nav button').forEach(b=>{if(b.dataset.v===view)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});
 if(fid){const el=document.querySelector('[data-fid="'+fid+'"]');if(el&&!el.disabled)el.focus({preventScroll:true})}
}
function go(v){view=v;ed=null;confirmDel=false;render();window.scrollTo(0,0)}

document.addEventListener('click',e=>{
 const b=e.target.closest('button[data-act]');if(!b)return;const a=b.dataset.act,id=b.dataset.id,h=S.habits.find(x=>x.id===id);
 if(a==='nav')go(b.dataset.v);
 else if(a==='skip'){const k=key(new Date());setSt(h,k,st(h,k)===2?0:2);render()}
 else if(a==='rest'){const k=key(new Date());if(S.rest[k])delete S.rest[k];else S.rest[k]=true;save();render();if(S.rest[k])toast('Rest is part of the plan.')}
 else if(a==='nudgeoff'){S.set.nudgeOff=key(new Date());save();render()}
 else if(a==='wtick'){const k=b.dataset.k;setSt(h,k,st(h,k)===1?0:1);render()}
 else if(a==='wrest'){const k=b.dataset.k;if(S.rest[k])delete S.rest[k];else S.rest[k]=true;save();render()}
 else if(a==='wprev'){ws=addDays(ws,-7);render()}
 else if(a==='wnext'){ws=addDays(ws,7);render()}
 else if(a==='wnow'){ws=wkStart(new Date());render()}
 else if(a==='add'){ed={id:null,name:'',icon:'sprout',color:COLS[0][1],time:'Morning',days:ALL7.slice(),remind:false};render();$('#nm').focus()}
 else if(a==='edit'){ed=JSON.parse(JSON.stringify(h));confirmDel=false;render();$('#nm').focus();window.scrollTo(0,0)}
 else if(a==='cancel'){ed=null;confirmDel=false;render()}
 else if(a==='del'){if(!confirmDel){confirmDel=true;render();document.querySelector('[data-act="del"]').focus()}else{S.habits=S.habits.filter(x=>x.id!==ed.id);save();ed=null;confirmDel=false;render();toast('Habit removed.')}}
});
document.addEventListener('change',e=>{
 const i=e.target;if(i.dataset.act==='tick'){const h=S.habits.find(x=>x.id===i.dataset.id),k=key(new Date());setSt(h,k,i.checked?1:0);
  const info=dayInfo(new Date());render();
  if(i.checked)toast(info.act.length&&info.done===info.act.length?'All done. Lovely work today.':CHEERS[Math.floor(Math.random()*CHEERS.length)])}
 else if(i.dataset.act==='set'){const s=i.dataset.s;S.set[s]=i.type==='checkbox'?i.checked:i.value;save();apply();const f=i.id;render();if(f){const el=document.getElementById(f);if(el)el.focus()}}
});
document.addEventListener('submit',e=>{
 e.preventDefault();const f=new FormData(e.target),name=(f.get('name')||'').trim();
 ed.name=name;ed.icon=f.get('icon')||ed.icon;ed.color=f.get('color')||ed.color;ed.time=f.get('time')||'Anytime';
 ed.days=f.getAll('day').map(Number);if(!ed.days.length)ed.days=ALL7.slice();ed.remind=!!f.get('remind');
 if(!name){ed.err=true;render();$('#nm').focus();return}
 delete ed.err;
 if(ed.id){S.habits=S.habits.map(h=>h.id===ed.id?ed:h)}else{ed.id='h'+Date.now();S.habits.push(ed)}
 save();ed=null;render();toast('Saved.');
});
apply();render();document.querySelectorAll('[data-i]').forEach(e=>e.innerHTML=svg(e.dataset.i,24));
