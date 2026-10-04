/* Canvas-native pixel sprites. Reference photos are not embedded or downloaded. */
'use strict';
window.createArt = function(ctx) {
  const campus=createCampusArt(ctx),festival=createFestivalArt(ctx);
  const festivalVisits=new Map();
  let route=[],lastOffset=-1;
  const venueWidth=type=>type===11?980:type===0?540:500;
  function resetScene(){festivalVisits.clear();route=[];lastOffset=-1;}
  function routeFor(offset,W){
    if(offset<lastOffset)resetScene();lastOffset=offset;
    if(!route.length)route.push({x:350,type:0});
    while(route.at(-1).x<offset+W+1400){
      const recent=route.slice(-5).map(l=>l.type),choices=Array.from({length:12},(_,i)=>i).filter(i=>!recent.includes(i));
      const prev=route.at(-1);route.push({x:prev.x+venueWidth(prev.type)+380+Math.floor(Math.random()*181),type:choices[Math.floor(Math.random()*choices.length)]});
    }
    while(route.length>6&&route[1].x+venueWidth(route[1].type)<offset-1200)route.shift();
    return route;
  }
  const r=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),Math.ceil(w),Math.ceil(h));};
  const txt=(t,x,y,size=14,c='#314c50')=>{ctx.fillStyle=c;ctx.font=`bold ${size}px monospace`;ctx.fillText(t,Math.round(x),Math.round(y));};
  const glyphs={I:['111','010','010','010','111'],Z:['111','001','010','100','111'],T:['111','010','010','010','010'],E:['111','100','110','100','111'],C:['111','100','100','100','111'],H:['101','101','111','101','101']};
  function logo(x,y,scale=1,ink='#ac4245',outline=true) {
    // White outline and red fill reproduce the sweatshirt's varsity lettering.
    if(outline)for(const [i,c] of [...'IZTECH'].entries())glyphs[c].forEach((row,j)=>[...row].forEach((v,k)=>{
      if(v==='1')r(x+(i*4+k)*scale-.5,y+j*scale-.5,scale+1,scale+1,'#e8ded3');
    }));
    for(const [i,c] of [...'IZTECH'].entries())glyphs[c].forEach((row,j)=>[...row].forEach((v,k)=>{
      if(v==='1')r(x+(i*4+k)*scale,y+j*scale,scale,scale,ink);
    }));
  }
  function hills(world,W,twilight=0) {
    r(0,0,W,450,'#bad9db');r(0,90,W,100,'#cae0d7');r(W-130,35,44,44,'#f5e5ac');
    for(let band=0;band<10;band++){r(0,65+band*12,W,12,`rgba(${244+band},${137+band*5},${157-band*3},${twilight*(.12+band*.045)})`);}
    for(let i=0;i<5;i++){
      let x=((i*350-world*.065)%1750+1750)%1750-350;
      for(let a=0;a<95;a++){
        const h=46+Math.sin(a/21)*39+Math.sin(a/8)*8;
        r(x+a*5,178-h,5,h+70,'#9ba999');
        if(a%4===0)r(x+a*5,185-h,7,4,'#7d9682');
      }
    }
    r(0,215,W,123,'#a8bd89');
    for(let i=0;i<60;i++){const x=((i*83-world*.12)%4980+4980)%4980;r(x,224+i%6*14,28,3,'#91ad7f');}
  }
  function techno(x) {
    // Wide, stepped curved facade; white roof rim, green rooftop and glass grid.
    r(x+44,160,330,33,'#e3e5d3');r(x+44,157,330,6,'#f3efdc');
    for(let i=0;i<42;i++){
      const edge=Math.abs(i-20.5)/20.5, top=191-Math.round(edge*edge*25/3)*3;
      const y=top+16,h=116-Math.round(edge*edge*20/3)*3;
      r(x+i*12,y,12,h,'#345b64');
      r(x+i*12,top,12,15,'#e0e6d7');
      // Close the left roof seam without changing the curved roof elsewhere.
      const roofBack=i<4?Math.min(157,top-11):top-11;
      r(x+i*12,roofBack,12,Math.max(0,top-roofBack),i<3||i>38?'#d9ddcd':'#759e50');
      if(i<4)r(x+i*12,roofBack,12,2,'#e0e6d7');
      for(let j=0;j<6;j++){
        r(x+i*12+1,y+5+j*17,10,13,(i+j)%5===0?'#678b80':(i+j)%3===0?'#476f73':'#3e626c');
        r(x+i*12,y+17+j*17,12,2,'#9daea0');
      }
      r(x+i*12,y,2,h,'#293f49');
      if(i%4===0){r(x+i*12,top-20,2,10,'#ccd3bb');r(x+i*12,top-21,48,2,'#c5cbb6');}
    }
    for(let i=0;i<26;i++){r(x+35+i*16,249+Math.round(Math.sin(i/6)*13),16,3,'#789481');}
    r(x+170,289,58,35,'#233f49');r(x+197,290,2,34,'#b4c4b8');
    r(x+176,308,4,11,'#c1cebf');r(x+216,308,4,11,'#c1cebf');r(x+187,197,169,21,'#e2e4d2');txt('TEKNOPARK İZMİR',x+196,212,14,'#344d54');
    r(x-8,327,540,5,'#d6d7b6');
  }
  function building(x,type,t) {
    if(type===0){techno(x);return;}
    const width=type===1?240:type===2?330:300,y=type===1?202:type===2?240:210;
    r(x,y,width,330-y,'#e0e0ca');r(x,y,width,7,'#b16d58');r(x+width-32,y+7,32,323-y,'#c6cbb6');
    const rows=type===2?2:3;
    for(let a=0;a<Math.floor(width/36);a++)for(let b=0;b<rows;b++){
      r(x+12+a*34,y+17+b*29,19,20,'#52747a');r(x+21+a*34,y+17+b*29,2,20,'#b8cabe');
    }
    r(x+width/2-17,299,35,31,'#425f65');r(x+20,y-21,width-40,20,'#ece8d4');
    txt(t.campus[type],x+28,y-6,12,'#4d6562');
    if(type===1){r(x+width+18,277,100,8,'#bb7253');for(let a=0;a<5;a++)r(x+width+18+a*20,277,10,8,'#ece4c9');r(x+width+20,285,4,45,'#737c65');r(x+width+112,285,4,45,'#737c65');}
    if(type===2){r(x-25,310,34,8,'#846e53');r(x-20,318,4,12,'#655a4b');r(x+1,318,4,12,'#655a4b');}
  }
  function scene(world,W,t,night=0,time=0,lightSeed=0) {
    night=night*night*(3-2*night); // Ease sunrise and sunset at both ends.
    hills(world,W,Math.sin(Math.PI*night));campus.beginLights(lightSeed);const techLights=[];
    const offset=world*.30,locations=routeFor(offset,W);
    campus.tower(((760-world*.085+200)%2600+2600)%2600-200);
    let near=0,nearDistance=Infinity;const festivals=[],visibleVisits=new Set();
    for(const l of locations){const x=l.x-offset;
      if(x<W+100&&x>-1000){if(l.type===11){
        if(x<W&&x+980>0){
          visibleVisits.add(l.x);
          if(!festivalVisits.has(l.x))festivalVisits.set(l.x,night>=.5?1:0);
          const appearance=festivalVisits.get(l.x);
          festival.draw(x,time,appearance,t);festivals.push({x,appearance});
        }
      }else if(l.type===0){techno(x);techLights.push(x);}else campus.building(x,l.type,t); }
      const d=Math.abs(x+(l.type===11?470:l.type===0?250:150)-W*.55);if(d<nearDistance){nearDistance=d;near=l.type;}
    }
    for(const key of festivalVisits.keys())if(!visibleVisits.has(key))festivalVisits.delete(key);
    // Trees share the venue's coordinate system; exclusion never changes on screen.
    for(let i=Math.floor(offset/280)-1;i<Math.ceil((offset+W)/280)+1;i++){
      const treeWorld=i*280+90,x=treeWorld-offset;
      if(locations.some(l=>l.type===11&&treeWorld+40>l.x&&treeWorld<l.x+980))continue;
      r(x+15,284,6,47,'#786d51');const sway=Math.round(Math.sin(time*1.4+i)*2);ctx.save();ctx.translate(sway,0);r(x+2,268,32,28,'#6d8c67');r(x+8,259,23,20,'#7d9b70');r(x-3,278,18,12,'#648560');r(x+17,291,2,34,'#968365');for(let leaf=0;leaf<7;leaf++)r(x+leaf*5-1,271+(leaf%3)*6,4,3,leaf%2?'#a0b382':'#506f55');ctx.restore();
    }
    campus.boarSign(((900-world*.37+70)%1450+1450)%1450-70);
    const shelterX=((1300-offset+250)%2100+2100)%2100-250;const shelterWorld=shelterX+offset;
    if(!locations.some(l=>l.type===11&&shelterWorld+220>l.x&&shelterWorld<l.x+980))campus.shelter(shelterX,Math.floor(shelterWorld/2100));
    campus.road(world,W);
    // Sparse windblown leaves stay decorative and behind the runner.
    for(let leaf=0;leaf<7;leaf++){
      const lx=((leaf*211-world*.22+time*24)%(W+160)+(W+160))%(W+160)-80;
      const ly=250+(leaf*17)%77+Math.sin(time*1.9+leaf)*8;
      r(lx,ly,5,2,leaf%2?'#a7864e':'#6c8556');r(lx+2,ly-2,3,2,'#b0a064');
    }
    if(night>0){
      r(0,0,W,450,`rgba(13,23,58,${night*.76})`);
      r(W-130,35,44,44,`rgba(222,233,226,${night})`);
      r(W-116,31,33,36,`rgba(36,55,83,${night})`);
      for(let i=0;i<28;i++)r((i*127+23)%W,16+(i*31)%65,2,2,`rgba(237,241,219,${night*.8})`);
    }
    campus.lights(night);
    if(night>0)for(const x of techLights){
      ctx.save();ctx.globalAlpha=night*.82;
      for(let i=0;i<42;i++)for(let j=0;j<6;j++){
        if(!campus.roomLit(i*6+j,lightSeed))continue;
        const edge=Math.abs(i-20.5)/20.5,y=212-Math.round(edge*edge*25/3)*3+j*17,px=x+i*12+3;
        if((px>x+180&&px<x+360&&y<222)||(px>x+165&&px<x+235&&y>282))continue;
        r(px,y,7,10,'#d8bc79');r(px,y,7,3,'#f0dba4');
      }ctx.restore();
    }
    for(const f of festivals)if(f.appearance===1){festival.draw(f.x,time,1,t);festival.lights(f.x,time,night);}
    // Draw passing students after the concert, so the second stage pass cannot erase them.
    ctx.save();ctx.globalAlpha=1-night*.25;festival.campusLife(world,W,time);ctx.restore();
    campus.lamps(world,W,night);return near;
  }
  const spriteRect=r,spriteText=txt,spriteLogo=logo;
  function student(p,duck,time,running,invincible,character='male',charge=10,waving=false) {
    const female=character==='female',cloth=female?'#eeeee4':'#504d49',fold=female?'#d0d3cb':'#625e58',shade=female?'#babfb8':'#44433f';
    const x=p.x,y=p.y,ground=p.groundY??340,air=y<ground-1,crouch=p.crouch??(duck&&y>=ground-1?1:0),b=!air&&(duck||crouch>.5),step=running?Math.sin(time*19):.3;
    const landing=Math.sin(Math.PI*Math.min(1,(p.landing||0)/.16));
    const bend=air?0:Math.max(0,Math.min(1,crouch));
    // Squat vertically: rigid upper body, fixed horizontal position, bent knees.
    const drop=10*bend;
    let headLayer=false;
    const r=(rx,ry,w,h,color)=>spriteRect(rx,ry+(ry<y-18?drop:0)+(headLayer?2*bend:0),w,h,color);
    // Gather only the sweatshirt fabric toward its hem; head and body width stay fixed.
    const fabric=(rx,ry,w,h,color)=>{
      const gather=3*bend,ratio=1-gather/34;
      r(rx,y-18+(ry-y+18)*ratio,w,h*ratio,color);
    };
    const txt=spriteText;
    const logo=(rx,ry,size,ink,outline)=>spriteLogo(rx,ry+drop,size,ink,outline);

    if(running&&y>=ground-1&&!duck){for(let dust=0;dust<3;dust++){const age=(time*3+dust/3)%1;r(x-9-age*28,338-age*9,3,2,`rgba(201,193,164,${(1-age)*.5})`);}}
    const shadow=1-Math.min(.45,(ground-y)/280);r(x+25-36*shadow,ground+1,73*shadow,4,'#61715c44');if(invincible>0&&Math.floor(invincible*14)%2)return;
    ctx.save();ctx.translate(x+20,y);
    const stretch=air?(p.vy<0?1.04:.98):1-landing*.10;
    const compression=air?0:Math.max(0,Math.min(1,crouch));
    ctx.scale(1+landing*.07,stretch);ctx.translate(-x-20,-y);
    {

      r(x-8,y-48,12,27,'#696251');fabric(x-4,y-52,41,34,cloth);fabric(x,y-51,33,6,fold);
      fabric(x+1,y-22,33,5,shade);fabric(x+8,y-29,20,8,shade);fabric(x+9,y-29,18,2,fold);
      r(x+5,y-65,27,15,shade);r(x+9,y-61,19,11,shade);
      headLayer=true;
      r(x+9,y-77,23,22,'#deb18a');r(x+7,y-80,27,8,'#303c3e');r(x+7,y-72,7,10,'#303c3e');r(x+28,y-69,4,4,'#293638');
      if(character==='female'){
        r(x+5,y-80,27,7,'#c4a052');r(x+2,y-75,9,27,'#c4a052');r(x-3,y-65,7,27,'#d9b966');r(x-6,y-41,7,6,'#c4a052');r(x+4,y-73,3,16,'#f1d993');r(x+9,y-78,10,3,'#ecd18b');r(x-1,y-60,6,3,'#b77965');
      }else{
        r(x+8,y-79,24,5,'#2f4141');r(x+10,y-79,6,2,'#536357');r(x+20,y-78,7,2,'#46574b');r(x+8,y-74,4,6,'#33433e');
      }
      headLayer=false;
      if(bend<.2){r(x+13,y-53,1,11,'#e6ded1');r(x+20,y-53,1,13,'#e6ded1');}logo(x+1,y-40,1.3,female?'#722b34':'#ac4245',!female);
      if(compression>.15){fabric(x+2,y-31,11,2,fold);fabric(x+23,y-30,9,2,shade);fabric(x+4,y-25,13,2,shade);fabric(x+19,y-23,12,2,fold);fabric(x+2,y-47,7,2,shade);}
      if(air){const tuck=Math.max(0,1-Math.abs(p.vy||0)/680);r(x+1,y-18,12,10,'#293c48');r(x-5,y-12-tuck*4,15,6,'#293c48');r(x-9,y-9-tuck*4,17,5,'#232f37');r(x+22,y-18,11,13,'#293c48');r(x+29,y-10,13,5,'#232f37');}else{
      if(bend>0){
        const stride=running?Math.sin(time*19):0;
        const leftLift=running?Math.max(0,stride)*3:0,rightLift=running?Math.max(0,-stride)*3:0;
        const sway=stride*3,kneeY=y-13+6*bend;
        r(x+1+sway*.5,y-18+drop,11,Math.max(4,14-drop-leftLift),'#293c48');
        r(x+22-sway*.5,y-18+drop,11,Math.max(4,14-drop-rightLift),'#293c48');
        r(x-2*bend+sway,kneeY-leftLift,13,5,'#293c48');r(x+22+2*bend-sway,kneeY-rightLift,13,5,'#293c48');
        r(x-2+sway,y-5-leftLift,19,5,'#232f37');r(x+21-sway,y-5-rightLift,19,5,'#232f37');
      }else{
        r(x+1,y-18,11,14+(step>0?0:-5),'#293c48');r(x+22,y-18,11,14+(step>0?-5:0),'#293c48');
        r(x+(step>0?-2:-5),y-5,19,5,'#232f37');r(x+21,y-(step>0?10:5),19,5,'#232f37');
      }
      }
      if(air){
        r(x+31,y-70,9,29,cloth);r(x+33,y-81,7,13,'#deb18a');r(x+29,y-83,15,6,'#deb18a');
        r(x+22,y-105,30,21,'#304d57');r(x+25,y-102,24,14,'#95c8a4');txt('>_',x+29,y-91,10,'#214b43');r(x+19,y-85,37,4,'#304d57');
        r(x-9,y-46,7,15,cloth);r(x-12,y-34,8,5,'#deb18a');
      }else{
      r(x+33,y-44,10,15,cloth);
      if(bend<.7){
        ctx.save();ctx.translate(-62*bend,8*bend);
        spriteRect(x+39,y-34,13,6,'#deb18a');spriteRect(x+48,y-48,25,19,'#304d57');spriteRect(x+51,y-45,19,12,'#95c8a4');
        spriteText('>_',x+52,y-35,10,'#214b43');spriteRect(x+43,y-29,34,4,'#304d57');ctx.restore();
      }else{
        r(x-7,y-49,8,21,'#304d57');r(x-5,y-47,3,15,'#8da3a6');
        r(x-9,y-37,12,16,'#696251');r(x-8,y-38,11,3,'#857d68');r(x+34,y-29,8,6,'#deb18a');
      }
      r(x+34,y-41,2,9,fold);r(x+3,y-16,2,9,'#46606a');r(x+24,y-15,2,6,'#46606a');}

    }
    if(waving&&!air&&!b){
      const wave=Math.round(Math.sin(time*6)*3);
      r(x-8,y-56,8,24,cloth);r(x-7,y-56,3,15,fold);
      r(x-8,y-68,7,14,'#deb18a');r(x-10+wave,y-77,9,11,'#deb18a');
      r(x-10+wave,y-80,2,6,'#ebc29f');r(x-6+wave,y-81,2,6,'#ebc29f');r(x-2+wave,y-79,2,6,'#ebc29f');
    }
    ctx.restore();
  }
  function obstacle(o,time,t) {
    const x=o.x,y=o.y;
    if(o.type==='quiz'){
      if(!o.reveal)return;ctx.save();ctx.globalAlpha=o.reveal;const lift=(1-o.reveal)*18;
      r(x-3,y-3-lift,o.w+6,o.h+6,'#f1d087');r(x,y-lift,o.w,o.h,'#37485e');r(x,y-lift,o.w,5,'#d79355');
      txt(o.course+' '+t.quiz,x+5,y+20-lift,11,'#fff0c5');
      for(let row=0;row<2;row++){r(x+9,y+36+row*23-lift,7,7,'#d79355');r(x+23,y+38+row*23-lift,o.w-35-row%2*15,3,'#8395a8');}
      r(x+7,y+o.h-23-lift,o.w-14,17,'#26364b');txt('↓  '+(t.day==='DAY'?'DUCK':'EĞİL'),x+20,y+o.h-10-lift,11,'#ffe3a2');
      if(o.reveal<1){r(x-8,y-8-lift,4,4,'#e9ba61');r(x+o.w+4,y+o.h+4,4,4,'#e9ba61');}ctx.restore();
    }else if(o.type==='bug'){
      const b=Math.sin(time*9+x)*2;r(x,y+b,40,30,'#805574');r(x+6,y-6+b,28,8,'#805574');
      for(let i=0;i<3;i++){r(x-8,y+i*11+b,9,4,'#654760');r(x+39,y+i*11+b,9,4,'#654760');}
      r(x+8,y+7+b,7,7,'#eddea1');r(x+25,y+7+b,7,7,'#eddea1');txt('BUG',x+2,y-13,12,'#624361');
    }else if(o.type==='fly'){
      const flap=Math.floor(time*18)%2*5;
      r(x+10,y-9-flap,20,13,'#c9d8cf');r(x+35,y-12+flap,22,13,'#b4cdca');
      r(x+15,y+2,40,17,'#6a756c');r(x+5,y+4,17,16,'#51655e');r(x+7,y+7,6,6,'#e1b27c');
      r(x+22,y+19,3,6,'#435e59');r(x+44,y+19,3,6,'#435e59');r(x+49,y+9,17,4,'#728076');txt(t.fly,x+10,y-18,11,'#d5e5c9');
    }else if(o.type==='boar'){
      const s=Math.sin(time*18)>0?4:0;
      r(x+10,y+6,46,24,'#675746');r(x+15,y+1,34,10,'#75634e');r(x+17,y-3,6,7,'#493e34');r(x+27,y-4,5,7,'#493e34');
      r(x+2,y+12,20,18,'#675746');r(x-4,y+21,14,9,'#99816b');r(x+4,y+9,8,8,'#493e34');r(x+7,y+17,3,3,'#171f22');
      r(x+1,y+28,5,5,'#eee5c8');r(x+13,y+29,7,9-s,'#493e34');r(x+42,y+29,7,5+s,'#493e34');r(x+56,y+11,7,4,'#493e34');
      txt(t.boar,x+10,y-12,12,'#6c5241');
    }else{
      r(x,y,o.w,o.h,'#697e78');r(x+4,y+4,o.w-8,o.h-8,'#ebe6cc');r(x,y,o.w,9,'#b96e50');
      txt(o.course,x+7,y+27,14,'#405c5c');txt(t[o.exam],x+7,y+45,12,'#a4543f');r(x+8,y+52,o.w-16,2,'#c7c0a1');r(x+o.w-5,y+10,3,o.h-12,'#b8b298');for(let k=0;k<5;k++)r(x+9+k*16,y-3,3,7,'#43575a');
    }
  }
  function coffee(c,time,t) {
    const x=c.x,y=c.y;r(x-7,341,45,4,'#68744733');
    r(x+1,y+4,24,25,'#f0e3c2');r(x+5,y+27,16,4,'#cbbfa0');r(x-2,y,30,6,'#4a4940');
    r(x+1,y+11,24,10,'#a96644');r(x+9,y+13,7,6,'#f0d9a6');r(x+11,y+14,2,4,'#a96644');r(x+14,y+13,1,3,'#a96644');r(x+24,y+7,7,15,'#e8d7b1');r(x+25,y+10,3,9,'#a9ba8b');
    const drift=Math.floor(time*4)%2*3;r(x+7+drift,y-14,3,8,'#fcf2cf');r(x+15-drift,y-20,3,9,'#fcf2cf');
    txt('+1 ♥',x-3,y-25,13,'#446947');
  }
  function powerbank(c,time,t) {
    const x=c.x,y=c.y;r(x-5,341,42,4,'#68744744');r(x+1,y,28,31,'#32495d');r(x+4,y+3,22,25,'#dbe1d7');r(x+9,y-4,12,4,'#3b5663');
    r(x+15,y+7,5,7,'#679347');r(x+10,y+13,10,4,'#679347');r(x+10,y+17,5,7,'#679347');r(x+5,y+26,4,2,'#8acb64');r(x+12,y+26,4,2,'#8acb64');txt('+2',x+3,y-10,14,'#3e6272');
  }
  return {r,txt,scene,resetScene,routeFor,student,obstacle,coffee,powerbank};
};
