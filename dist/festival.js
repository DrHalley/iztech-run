/* Optional festival scenery; gameplay and collision rules remain independent. */
'use strict';
window.createFestivalArt=function(ctx){
  const r=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),w,h);};
  const label=(s,x,y,size=12,c='#f3ead1')=>{ctx.fillStyle=c;ctx.font=`bold ${size}px monospace`;ctx.fillText(s,Math.round(x),Math.round(y));};
  let animationTime=0;
  function person(x,y,color,pose=0,scale=1,hair='#453e34',female=false){
    ctx.save();ctx.translate(Math.round(x),Math.round(y));ctx.scale(scale,scale);
    if(female){r(0,-37,5,21,hair);r(-3,-28,5,12,hair);r(0,-28,4,3,'#b87873');}
    r(3,-37,10,11,'#d9ad86');r(2,-40,12,5,hair);r(2,-26,13,18,color);
    const stride=Math.sin(animationTime*5+x*.1)*2;r(3+stride,-8,4,8,'#34444a');r(10-stride,-8,4,8,'#34444a');r(1,-2,6,2,'#26343d');r(10,-2,6,2,'#26343d');
    r(-1,-24,3,12,color);r(15,-24,3,pose?5:12,color);
    if(pose===2){r(13,-23,6,3,'#d9ad86');r(18,-29,5,9,'#293f4e');r(19,-28,3,5,'#a5cfcc');r(11,-31,3,2,'#966d54');}else if(pose){const wave=Math.round(Math.sin(animationTime*7)*2);r(16,-32,3,13,'#d9ad86');r(17+wave,-36,3,5,'#d9ad86');}else r(15,-13,3,4,'#d9ad86');ctx.restore();
  }
  function tent(x,y,w,color,title){
    r(x,y+22,3,63,'#e4e0cf');r(x+w-3,y+22,3,63,'#e4e0cf');
    for(let row=0;row<11;row++){const inset=(10-row)*w/24;r(x+inset,y+row*2,w-inset*2,2,row<6?'#eee9d8':'#d3d4c5');}
    r(x-3,y+22,w+6,9,color);r(x+5,y+59,w-10,22,color);r(x+2,y+56,w-4,5,'#e1d2ae');label('İYTE',x+w/2-14,y+19,11,'#823c3c');label(title,x+8,y+75,10);
  }
  function rector(x,y,time,t){
    // Navy jacket, grey temples, unmistakable dark sunglasses; serving arm extends to the queue.
    r(x+9,y-68,19,21,'#d2a27e');r(x+8,y-72,19,5,'#34383c');r(x+6,y-68,20,4,'#3c4043');r(x+6,y-64,5,14,'#484d50');r(x+7,y-62,3,7,'#55595b');r(x+10,y-71,7,2,'#464a4d');
    r(x+15,y-61,8,5,'#162831');r(x+26,y-61,7,5,'#162831');r(x+22,y-60,5,2,'#162831');r(x+10,y-60,5,2,'#273742');
    r(x+28,y-52,5,2,'#a87960');r(x+4,y-46,29,34,'#354f66');r(x+9,y-45,14,7,'#b8cfca');r(x+17,y-37,2,23,'#253c50');
    r(x+12,y-43,9,18,'#c9d4d1');r(x+15,y-40,4,4,'#8d4b4e');r(x+15,y-35,4,13,'#733d46');
    r(x+8,y-43,4,13,'#50647a');r(x+11,y-33,3,10,'#243e55');r(x+22,y-42,4,15,'#50647a');r(x+21,y-28,3,7,'#243e55');
    r(x+26,y-24,6,2,'#1f354a');r(x+23,y-39,2,2,'#b33f42');for(let j=0;j<5;j++)r(x+6,y-39+j*5,2,3,'#415971');
    r(x+5,y-14,10,14,'#344149');r(x+23,y-14,10,14,'#344149');
    const reach=Math.floor((Math.sin(time*1.5)+1)*3);r(x+29,y-37,13,9,'#354f66');r(x+38,y-34,18+reach,7,'#354f66');r(x+53+reach,y-34,9,6,'#d2a27e');
    r(x+57+reach,y-35,15,5,'#e3bb77');r(x+59+reach,y-35,11,2,'#974c35');
    label(t.rector,x-2,y-80,10,'#283f46');
  }
  function day(x,time,t){
    r(x,271,940,57,'#a7b982');r(x+16,306,910,4,'#98ad78');
    for(let i=0;i<4;i++)tent(x+20+i*135,227,112,['#708ba0','#a7624d','#8b9470','#b48755'][i],t.stands[i]);
    for(let i=0;i<19;i++)person(x+32+i*26+Math.sin(time*.65+i)*20,296+(i%3)*10-Math.abs(Math.sin(time*3+i))*2,['#ede5ce','#657b85','#914f4b','#384b5b','#9aab86'][i%5],0,.62+(i%2)*.08);
    // Pennants and students chatting on the grass.
    for(const px of [x+8,x+534]){r(px-3,320,13,7,'#787769');r(px,203,5,120,'#737e72');r(px+1,203,2,116,'#c5c8b0');r(px-2,200,9,5,'#d5c9a4');}
    for(let i=0;i<132;i++){const sag=Math.round(Math.sin(i/131*Math.PI)*9);r(x+12+i*4,210+sag,4,2,'#596d60');}
    for(let i=0;i<22;i++){const sag=Math.round(Math.sin((i*24+4)/524*Math.PI)*9);for(let j=0;j<5;j++)r(x+16+i*24+j,212+sag+j*2,11-j*2,2,['#b47959','#809e9a','#e7dfaf'][i%3]);}
    tent(x+567,208,172,'#a85542',t.sucuk);rector(x+591,288,time,t);
    r(x+576,280,153,7,'#d9be8f');r(x+579,287,147,23,'#8f5742');label(t.sucuk,x+590,302,12);
    r(x+667,267,57,15,'#35413e');r(x+665,263,61,5,'#4b4a3b');for(let i=0;i<6;i++){r(x+669+i*9,265,7,3,'#ad6241');r(x+672+i*9,265,2,2,'#df9260');}
    for(let i=0;i<6;i++){const lift=(time*10+i*11)%57;r(x+673+(i%3)*14+Math.sin(time+i)*4,256-lift,9,7,'#e7e5d069');}
    // A closed route preserves each student's identity across loop boundaries.
    const route=[[930,309],[735,309],[676,296],[676,296],[727,323],[940,323],[960,292],[930,309]],crowd=[];
    for(let i=0;i<7;i++){
      const phase=((time/4+i)%7+7)%7,k=Math.floor(phase),f=phase-k;
      const px=route[k][0]+(route[k+1][0]-route[k][0])*f,py=route[k][1]+(route[k+1][1]-route[k][1])*f;
      crowd.push({px,py,i,served:k>=3&&k<6});
    }
    crowd.sort((a,b)=>a.py-b.py);
    for(const p of crowd){person(x+p.px,p.py,['#e6e4ce','#556e86','#a17b5d','#6d8b7a','#b68a74','#697c9b','#8d6c84'][p.i],0,1,p.i%2?'#b59b61':'#473c35');
      if(p.served){r(x+p.px+15,p.py-27,13,4,'#e8c586');r(x+p.px+17,p.py-27,9,2,'#945039');}}
    label(t.festival,x+33,190,17,'#3b5856');
  }
  function stage(x,time,t){
    r(x+115,302,615,23,'#293746');r(x+133,190,580,110,'#15232f');
    // Steel truss roof and upright towers.
    r(x+113,178,620,5,'#7d8b8f');r(x+113,192,620,4,'#606f75');
    for(let i=0;i<41;i++){r(x+117+i*15,181,3,12,'#8a9693');r(x+120+i*15,184,4,3,'#83918b');r(x+124+i*15,187,4,3,'#83918b');}
    for(const tower of [115,723]){r(x+tower,159,5,146,'#7e8d8d');r(x+tower+12,159,4,146,'#64787b');for(let j=0;j<10;j++)r(x+tower,163+j*14,16,3,'#8b9590');}
    for(const speaker of [145,660]){r(x+speaker,230,28,70,'#202d39');for(let j=0;j<3;j++){r(x+speaker+5,235+j*21,18,16,'#35454f');r(x+speaker+9,239+j*21,10,8,'#1b2936');}}
    r(x+264,206,286,42,'#284153');label(t.springFestival,x+407-t.springFestival.length*6,234,20,'#b6b0cd');
    person(x+324+Math.sin(time*2)*7,302-Math.abs(Math.sin(time*3))*4,'#bd947b',1,1.12);person(x+489+Math.sin(time*1.7)*8,302-Math.abs(Math.sin(time*2))*3,'#728b99',0,1.15);
    r(x+336,276,27,12,'#be9160');r(x+357,274,29,4,'#ab845a');r(x+311,266,2,37,'#adbbb0');r(x+307,264,12,3,'#c1c8b5');
    r(x+409,288,27,21,'#766487');r(x+395,278,54,3,'#aca992');r(x+420,262,3,28,'#a9b0a1');person(x+414,285,'#a87b72',0,.73);
    for(let i=0;i<46;i++){const wave=Math.sin(time*1.1+i*.9)>0;person(x+20+i*19,329+(i%2)-Math.max(0,Math.sin(time*3+i))*8,['#293847','#344254','#3d4056'][i%3],wave?1:0,.67+(i%3)*.1);}
    label(t.concert,x+135,159,16,'#87949c');
  }
  function lights(x,time,night){
    if(night<=0)return;
    const colors=[[181,153,249],[131,207,239],[242,183,128],[201,164,238]];
    for(let i=0;i<7;i++){
      const cx=x+201+i*72,sway=Math.sin(time*.65+i*1.3)*43,c=colors[i%4];
      for(let j=0;j<16;j++){const width=6+j*4;r(cx+sway*j/16-width/2,199+j*6,width,6,`rgba(${c},${night*.09})`);}
      r(cx-3,197,9,4,`rgba(${c},${night*.95})`);
    }
    for(let i=0;i<12;i++)r(x+198+i*38+Math.sin(time*.3+i)*13,284+(i%3)*6,70,7,`rgba(193,195,220,${night*.075})`);
  }
  function draw(x,time,night,t){animationTime=time;if(night<.5)day(x,time,t);else stage(x,time,t);}
  // Every bit mask occurs: all female/male orderings for groups of 2, 3 and 4.
  function groupComposition(index){const count=1+index%4;return {count,mask:(Math.floor(index/4)^3)&((1<<count)-1)};}
  function campusLife(world,W,time){
    animationTime=time;
    const palette=['#b77a60','#718aa0','#e0d9bd','#535669','#879a6c','#a76576'];
    for(let g=0;g<64;g++){
      const {count,mask}=groupComposition(g),x=((g*385-world*.37+time*(g%2?7:-6))%24640+24640)%24640-150;
      if(x>W+100)continue;
      for(let j=0;j<count;j++){
        const px=x+j*21,py=326-(j%2)*3,bob=Math.abs(Math.sin(time*4+g+j))*2;
        const moment=(time+(g*3+j)*1.7)%19,pose=moment<2.5?2:count>1&&moment>10&&moment<12.5?1:0;
        person(px,py-bob,palette[(g+j)%palette.length],pose,.8,['#463c36','#b39b61','#6b5142'][(g+j)%3],Boolean(mask&(1<<j)));
        r(px-2,py-21-bob,4,10,palette[(g+j+2)%6]);
      }
    }
    for(let i=0;i<6;i++){
      const mode=i%3,x=((i*730+240-world*.37+(mode===0?time*12:0))%4380+4380)%4380-80,y=326;
      const coat=['#c7ac7d','#8e7962','#ded5b9'][i%3];
      if(mode===2){r(x,y-8,28,8,coat);r(x+22,y-7,11,7,coat);r(x+29,y-4,3,1,'#4b4b43');label('z',x+26,y-13-Math.sin(time)*2,9,'#6d817c');}
      else {const sit=mode===1,bob=sit?0:Math.sin(time*5)*1.5;r(x,y-18+bob,sit?24:29,13,coat);const turn=sit&&((time+i*2)%13)>10?-4:0;ctx.save();ctx.translate(turn,0);r(x+20,y-27+bob,13,13,coat);r(x+19,y-28+bob,5,9,'#665647');r(x+30,y-22+bob,8,6,coat);r(x+32,y-24+bob,2,2,'#303b38');ctx.restore();r(x-5,y-24+bob,6,4,coat);for(let k=0;k<2;k++)r(x+k*21,y-7,4,7-(sit?0:Math.max(0,Math.sin(time*8+k*3))*4),coat);}
    }
  }
  return {draw,lights,campusLife,groupComposition};
};
