(() => {
  'use strict';
  const $=s=>document.querySelector(s), canvas=$('#game'), ctx=canvas.getContext('2d'), art=createArt(ctx);
  const storage={get(k,f){try{return localStorage.getItem(k)??f;}catch{return f;}},set(k,v){try{localStorage.setItem(k,String(v));}catch{}}};
  let lang=storage.get('iyte-bug-run-language','tr');if(!I18N[lang])lang='tr';
  let character=storage.get('iyte-bug-run-character','male');if(!['male','female'].includes(character))character='male';
  let rulesOpen=false;
  let theme=storage.get('iztech-run-theme','dark'),newRecord=false,previewTime=0;
  function setTheme(value){theme=value==='light'?'light':'dark';document.documentElement.setAttribute('data-theme',theme);storage.set('iztech-run-theme',theme);$('#themeToggle').textContent=theme==='light'?'☾':'☀';$('#themeToggle').setAttribute('aria-pressed',String(theme==='light'));$('#themeToggle').setAttribute('aria-label',theme==='light'?t().darkTheme:t().lightTheme);}
  $('#themeToggle').onclick=()=>setTheme(theme==='dark'?'light':'dark');
  function flash(selector){const el=$(selector);el.animate?.([{filter:'brightness(1)'},{filter:'brightness(1.8)',transform:'translateY(-2px)'},{filter:'brightness(1)'}],{duration:450});}
  let charge=10,powerbanks=[],night=false,nightBlend=0;
  const PHASE_SCORE=1200;
  let lightSeed=Math.floor(Math.random()*4294967296)>>>0;
  let mode='ready',last=0,time=0,distance=0,kills=0,collected=0,hp=3,best=Math.max(0,Number(storage.get('iyte-bug-run-best',0))||0);
  let speed=330,spawn=1.7,spawnIndex=0,shotCD=0,invincible=0,duck=false,world=0,zone=0,toastTime=0;
  let obstacles=[],bullets=[],particles=[],coffees=[],player={x:115,y:340,vy:0},logKey='idleLog',logPrefix='',toastKey='';
  const t=()=>I18N[lang],pad=n=>String(Math.floor(n)).padStart(5,'0'),score=()=>Math.floor(distance/12)+kills*50;
  // Verified official IYTE course plans; source links are in COURSE_SOURCES.md.
  const courses=['MATH141','MATH142','MATH111','MATH131','MATH151','MATH152','MATH251','MATH255','MATH257','MATH261','MATH265',
    'PHYS101','PHYS102','PHYS121','PHYS122','PHYS201','PHYS203','PHYS204','PHYS222','PHYS266',
    'CENG111','CENG113','CENG115','CENG211','CENG213','CENG215','CENG212','CENG214','CENG216','CENG218','CENG222','CENG311','CENG315','CENG312','CENG316','CENG318','CENG322',
    'ME207','ME208','ME221','ME222','ME224','ME251','ME301','ME311','ME323','ME331','ME343',
    'EE201','EE202','EE210','EE221','CHE101','CHE201','CHEM121','CHEM122','MBG101','MBG202','MBG205','MBG206','MBG326','MBG327','MBG401','MBG403','AR221','AR231','AR251','AR281'];
  function log(key,prefix=''){logKey=key;logPrefix=prefix;$('#log').textContent=prefix+(t()[key]??key);}
  function hud(){ $('#chargeMeter').value=charge;$('#battery').textContent=charge+'/10';$('#battery').classList.toggle('low',charge<=2); $('#score').textContent=pad(score());$('#best').textContent=pad(best);$('#health').textContent='♥ '.repeat(hp)+'♡ '.repeat(3-hp); }
  function overlay(){
    $('#overlay').classList.toggle('hidden',mode==='running');$('#overlay').classList.toggle('results',mode==='over');
    $('#characterPicker').hidden=mode!=='ready';
    $('#chooseAgain').hidden=true;$('#restartPaused').hidden=mode!=='paused';$('#runResults').hidden=mode!=='over';$('#resultScore').textContent=pad(score());$('#resultBest').textContent=pad(best);$('#resultBugs').textContent=kills;
    $('#overlay').classList.toggle('choosing',mode==='ready');
    const title=mode==='ready'?t().readyTitle:mode==='paused'?t().pausedTitle:t().gameOver;
    const detail=mode==='ready'?t().readyText:mode==='paused'?t().pausedText:(newRecord?t().newRecord:t().summary(score(),kills,collected));
    $('#overlayTitle').textContent=title;$('#overlayText').textContent=detail;
    $('#start').textContent=(mode==='ready'?t().start:mode==='paused'?t().resume:t().nextGuide)+' ↗';
    $('#pause').textContent=mode==='paused'?'▶':'Ⅱ';$('#pause').disabled=mode==='ready'||mode==='over';
    $('#pause').setAttribute('aria-label',mode==='paused'?t().resumeLabel:t().pauseLabel);
  }
  function setLanguage(value){
    if(!I18N[value])return;lang=value;storage.set('iyte-bug-run-language',lang);document.documentElement.lang=lang;
    document.querySelectorAll('[data-i18n]').forEach(el=>{el.textContent=t()[el.dataset.i18n];});
    $('#langTR').setAttribute('aria-pressed',String(lang==='tr'));$('#langEN').setAttribute('aria-pressed',String(lang==='en'));
    setTheme(theme);document.title=t().title;document.querySelector('meta[name="description"]').content=t().description;
    canvas.setAttribute('aria-label',t().canvas);overlay();log(logKey,logPrefix);$('#zoneName').textContent=t().campus[zone];
    if(rulesOpen){drawRules();$('#rulesSummary').textContent=mode==='over'?t().summary(score(),kills,collected):'';}
    if(toastTime>0)$('#coffeeToast').textContent=t()[toastKey];
  }
  function setCharacter(value){
    if(!['ready','over'].includes(mode)||!['male','female'].includes(value))return;
    character=value;previewTime=0;storage.set('iyte-bug-run-character',value);
    $('#characterMale').setAttribute('aria-pressed',String(value==='male'));$('#characterFemale').setAttribute('aria-pressed',String(value==='female'));
  }
  function selectionPose(ground,selected){
    const phase=previewTime%1.8,flight=.72,active=selected&&phase<flight;
    const lift=active?Math.sin(Math.PI*phase/flight)*20:0;
    return {x:17,y:ground-lift,groundY:ground,vy:active?-Math.cos(Math.PI*phase/flight)*90:0};
  }
  function portraits(){for(const gender of ['Male','Female']){const c=$('#portrait'+gender),a=createArt(c.getContext('2d'));c.getContext('2d').clearRect(0,0,96,140);a.student(selectionPose(130,character===gender.toLowerCase()),false,previewTime,false,0,gender.toLowerCase(),10);}}

  function drawRules(anim=0){
    for(const type of ['exam','quiz','boar','fly','bug','supplies']){
      const c=$('#rule-'+type),cx=c.getContext('2d'),a=createArt(cx);cx.clearRect(0,0,150,125);cx.imageSmoothingEnabled=false;
      if(type==='supplies'){a.coffee({x:26,y:66},0,t());a.powerbank({x:96,y:66},0,t());}
      else a.obstacle({type:type==='exam'?'block':type,x:type==='quiz'?23:32,y:(type==='quiz'?8:48)+Math.sin(anim*3)*3,w:type==='quiz'?104:86,h:type==='quiz'?108:62,reveal:1,course:'MATH141',exam:'exam'},anim,t());
    }
  }
  function showRules(){rulesOpen=true;$('#rulesSummary').textContent=mode==='over'?t().summary(score(),kills,collected):'';drawRules();$('#rulesDialog').showModal?.();$('#rulesContinue').focus();}
  function dismissRules(){rulesOpen=false;$('#rulesDialog').close?.();if(mode==='over'){mode='ready';$('#confetti').innerHTML='';}overlay();$('#characterMale').focus();}
  $('#rulesContinue').onclick=e=>{e.preventDefault();dismissRules();};
  $('#rulesDialog').addEventListener('cancel',e=>{e.preventDefault();dismissRules();});
  function resize(){const box=canvas.getBoundingClientRect();canvas.width=Math.max(640,Math.round(box.width/box.height*450));canvas.height=450;}
  function start(){
    rulesOpen=false;$('#rulesDialog').close?.();zone=0;art.resetScene?.();newRecord=false;$('#confetti').innerHTML='';
    mode='running';night=false;nightBlend=0;time=0;distance=0;kills=0;collected=0;hp=3;speed=330;spawn=1.5;spawnIndex=0;shotCD=0;invincible=0;duck=false;world=0;
    obstacles=[];bullets=[];particles=[];coffees=[];powerbanks=[];charge=10;player.y=340;player.vy=0;player.crouch=0;player.landing=0;toastTime=0;$('#coffeeToast').textContent='';
    overlay();log('runLog');hud();canvas.focus({preventScroll:true});
  }
  function pause(){
    if(mode==='running'){mode='paused';duck=false;overlay();}
    else if(mode==='paused'){mode='running';overlay();canvas.focus({preventScroll:true});}
  }
  function end(){
    mode='over';newRecord=score()>best;if(newRecord){$('#confetti').innerHTML=Array.from({length:24},(_,i)=>'<i style="--x:'+((i*37)%100)+'%;--delay:'+((i%6)*.1)+'s;--color:'+(['#ff8c2a','#fff','#eb5573'][i%3])+'"></i>').join('');}best=Math.max(best,score());storage.set('iyte-bug-run-best',best);hud();overlay();log('endLog');$('#start').focus();
    window.dispatchEvent(new CustomEvent('iyte:run-complete',{detail:{score:score(),bugs:kills,coffees:collected,distance:Math.floor(distance/12),duration:Math.round(time)}}));
  }
  function jump(){if(mode==='running'&&player.y>=339){duck=false;player.vy=-680;}}
  function fire(){if(mode!=='running'||shotCD>0)return;if(charge===0){log('emptyLog');return;}charge--;shotCD=.28;hud();bullets.push({x:player.x+74,y:player.y-(duck?19:42),w:30,h:9});log('>>> print("damage")');}
  $('#chooseAgain').onclick=()=>{mode='ready';$('#confetti').innerHTML='';overlay();};
  $('#restartPaused').onclick=start;
  $('#start').onclick=()=>mode==='paused'?pause():mode==='over'?showRules():start();$('#pause').onclick=pause;
  $('#characterMale').onclick=()=>setCharacter('male');$('#characterFemale').onclick=()=>setCharacter('female');
  $('#langTR').onclick=()=>setLanguage('tr');$('#langEN').onclick=()=>setLanguage('en');
  const gameKeys=['Space','ArrowUp','ArrowDown','KeyS','KeyF'];
  addEventListener('keydown',e=>{
    if(rulesOpen)return;
    if(gameKeys.includes(e.code)&&mode==='running')e.preventDefault();
    if(e.code==='Enter'&&!e.repeat&&e.target.tagName!=='BUTTON'){e.preventDefault();if(mode==='paused')pause();else if(mode==='over')showRules();else if(mode==='ready')start();}
    if(e.code==='Escape'&&!e.repeat)pause();
    if((e.code==='Space'||e.code==='ArrowUp')&&!e.repeat)jump();
    if((e.code==='ArrowDown'||e.code==='KeyS')&&mode==='running')duck=true;
    if(e.code==='KeyF')fire();
  });
  addEventListener('keyup',e=>{if(e.code==='ArrowDown'||e.code==='KeyS')duck=false;});
  addEventListener('blur',()=>{duck=false;if(mode==='running')pause();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&mode==='running')pause();});
  function touch(id,down,up){const b=$(id);for(const event of ['contextmenu','selectstart','dragstart'])b.addEventListener(event,e=>e.preventDefault());b.addEventListener('pointerdown',e=>{e.preventDefault();b.setPointerCapture(e.pointerId);down();});for(const event of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(event,()=>up?.());}
  touch('#jumpTouch',jump);touch('#fireTouch',fire);touch('#duckTouch',()=>{if(mode==='running')duck=true;},()=>duck=false);
  function hit(a,b){return a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;}
  function playerBox(){const crouch=duck&&player.y===340;return {x:player.x+2,y:player.y-(crouch?31:73),w:crouch?48:34,h:crouch?30:71};}
  function spawnItem(){
    spawnIndex++;
    // A coffee occupies a full obstacle slot, so it cannot be hidden in an exam or boar.
    if(spawnIndex%6===0){coffees.push({x:canvas.width+60,y:309,w:32,h:31});return;}
    if(spawnIndex%6===4){powerbanks.push({x:canvas.width+60,y:309,w:30,h:31});return;}
    const type=spawnIndex%6===2?'bug':night?(Math.random()<.5?'boar':'fly'):(spawnIndex%6===5?'quiz':'block');
    obstacles.push({type,x:canvas.width+60,reveal:0,y:type==='quiz'?195:type==='fly'?276:type==='bug'?305:type==='boar'?302:278,
      w:type==='quiz'?104:type==='fly'?72:type==='bug'?40:type==='boar'?63:91,h:type==='quiz'?108:type==='fly'?27:type==='bug'?35:type==='boar'?38:62,
      course:courses[Math.floor(Math.random()*courses.length)],exam:Math.random()<.7?'exam':'final'});
    if(type==='fly')log('flyLog');if(type==='bug')log('bugLog');if(type==='boar')log('boarLog');
  }
  function collect(c){
    flash('.health');c.dead=true;collected++;const healed=hp<3;hp=Math.min(3,hp+1);log(healed?'coffeeLog':'fullLog');
    toastKey=healed?'coffeeToast':'fullToast';toastTime=1.7;$('#coffeeToast').textContent=t()[toastKey];
    for(let i=0;i<10;i++)particles.push({x:c.x+12,y:c.y,vx:(Math.random()-.5)*120,vy:-80-Math.random()*90,life:.6,color:'#d4f189'});
  }
  function collectPowerbank(p){flash('.battery');p.dead=true;const restored=charge<10;charge=Math.min(10,charge+2);log(restored?'chargeLog':'fullChargeLog');toastKey=restored?'chargeToast':'fullChargeToast';toastTime=1.7;$('#coffeeToast').textContent=t()[toastKey];}
  function update(dt){
    time+=dt;const targetSpeed=Math.min(560,330+time*2.1)+Math.floor(score()/(PHASE_SCORE*2))*50;speed+=Math.min(targetSpeed-speed,dt*30);distance+=speed*dt;world+=speed*dt;shotCD=Math.max(0,shotCD-dt);invincible=Math.max(0,invincible-dt);
    syncPhase(dt);
    const wasAirborne=player.y<340;player.vy+=1850*dt;player.y=Math.min(340,player.y+player.vy*dt);if(player.y===340){player.vy=0;if(wasAirborne)player.landing=.16;}
    player.landing=Math.max(0,(player.landing||0)-dt);
    const crouchTarget=duck&&player.y===340?1:0;player.crouch=(player.crouch||0)+(crouchTarget-(player.crouch||0))*Math.min(1,dt*28);
    spawn-=dt;if(spawn<=0){spawnItem();spawn=Math.max(440+Math.random()*160,speed*1.0)/speed;}
    for(const o of obstacles){o.x-=speed*dt;if(o.type==='quiz'&&o.x-player.x<=Math.min(canvas.width-player.x-30,speed*1.7)){if(!o.reveal)log('quizLog');o.reveal=Math.min(1,(o.reveal||0)+dt/.32);}}for(const c of coffees)c.x-=speed*dt;for(const p of powerbanks)p.x-=speed*dt;for(const b of bullets)b.x+=860*dt;
    for(const b of bullets)for(const o of obstacles)if(o.type==='bug'&&!o.dead&&!b.dead&&hit(b,o)){
      o.dead=true;b.dead=true;kills++;log('fixLog');for(let i=0;i<12;i++)particles.push({x:o.x+20,y:o.y+15,vx:(Math.random()-.5)*210,vy:-Math.random()*180,life:.5,color:'#82516d'});
    }
    syncPhase(0); // A bug bonus may cross the threshold in this same tick.
    const p=playerBox();
    for(const o of obstacles)if(!o.dead&&(o.type!=='quiz'||o.reveal>0)&&invincible===0&&hit(p,o)){
      o.dead=true;hp--;invincible=1.5;log('hitLog','Traceback: '+(o.type==='bug'?'BugError':o.type==='boar'?'BoarEncounter':'ExamError'));
      if(hp===0){end();return;}
    }
    for(const c of coffees)if(!c.dead&&hit(p,c))collect(c);
    for(const b of powerbanks)if(!b.dead&&hit(p,b))collectPowerbank(b);powerbanks=powerbanks.filter(b=>!b.dead&&b.x>-80);
    obstacles=obstacles.filter(o=>!o.dead&&o.x>-120);coffees=coffees.filter(c=>!c.dead&&c.x>-80);bullets=bullets.filter(b=>!b.dead&&b.x<canvas.width+100);
    for(const p of particles){p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=500*dt;p.life-=dt;}particles=particles.filter(p=>p.life>0);
    if(toastTime>0){toastTime-=dt;if(toastTime<=0)$('#coffeeToast').textContent='';}hud();
  }
  function syncPhase(dt){
    const next=Math.floor(score()/PHASE_SCORE)%2===1;
    if(next!==night){night=next;if(night)lightSeed=(lightSeed+0x9e3779b9)>>>0;log(night?'nightLog':'dayLog');}
    const target=night?1:0;nightBlend+=Math.sign(target-nightBlend)*Math.min(Math.abs(target-nightBlend),dt/10);
  }
  function render(){
    ctx.imageSmoothingEnabled=false;zone=art.scene(world,canvas.width,t(),nightBlend,time,lightSeed);$('#zoneName').textContent=t().campus[zone];
    for(const p of powerbanks)art.powerbank(p,time,t());for(const c of coffees)art.coffee(c,time,t());for(const o of obstacles)art.obstacle(o,time,t());art.student(mode==='ready'?{...selectionPose(340,true),x:player.x}:player,duck,mode==='ready'?previewTime:time,mode==='running',invincible,character,charge);
    for(const b of bullets){art.txt('"damage"',b.x,b.y+7,9,night?'#e7f6bc':'#233e39');}
    for(const p of particles)art.r(p.x,p.y,5,5,p.color);
    if(mode==='running'){art.txt((night?t().night:t().day)+' · '+(PHASE_SCORE-score()%PHASE_SCORE),18,29,13,night?'#e2e4bf':'#4b7068');art.txt('LVL '+(1+Math.floor(score()/(PHASE_SCORE*2))),canvas.width-95,29,14,night?'#c9d8c5':'#4b7068');if(invincible>0)art.txt(t().recovering,player.x-35,player.y-97,12,night?'#f5d8ac':'#805344');}
  }
  if(document.modelContext?.registerTool){try{Promise.resolve(document.modelContext.registerTool({name:'read_run_status',description:'Read local run status, score, health, coffee count and language.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true},execute(input){if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).length)throw new Error('Expected an empty object');return {status:mode,score:score(),health:hp,bugs:kills,coffees:collected,deviceBest:best,language:lang,charge,character};}})).catch(()=>{});}catch{}}
  let accumulator=0;
  function frame(ts){const dt=Math.min((ts-last)/1000||0,.05);last=ts;
    if(mode==='running'){accumulator+=dt;while(accumulator>=1/120&&mode==='running'){update(1/120);accumulator-=1/120;}}else accumulator=0;
    if(rulesOpen)drawRules(ts/1000);
    if(mode==='ready'){previewTime+=dt;world+=dt*18;portraits();}render();requestAnimationFrame(frame);
  }
  addEventListener('resize',resize);resize();setLanguage(lang);setCharacter(character);portraits();hud();showRules();requestAnimationFrame(frame);
})();
