/* Stylized pixel interpretations of the campus reference photographs. */
'use strict';
window.createCampusArt = function(ctx) {
  let roomLights=[],paneIndex=0,nightSeed=0;
  // Integer avalanche hash: random-looking rooms, stable under camera movement.
  function roomLit(id,seed=nightSeed){let n=(seed^Math.imul(id+1,0x9e3779b9))>>>0;n=Math.imul(n^(n>>>16),0x21f0aaad);n=Math.imul(n^(n>>>15),0x735a2d97);return ((n^(n>>>15))>>>0)/4294967296<.25;}
  const r=(x,y,w,h,c)=>{roomLights=roomLights.filter(p=>!(x<p.x+p.w&&x+w>p.x&&y<p.y+p.h&&y+h>p.y));ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),Math.ceil(w),Math.ceil(h));};
  const text=(s,x,y,size=12,c='#35494b')=>{ctx.fillStyle=c;ctx.font=`bold ${size}px monospace`;ctx.fillText(s,Math.round(x),Math.round(y));};
  const cream='#e3dfca',shade='#c1c3b2',brick='#a7674e',glass='#334e56';
  function windowPane(x,y,w,h){r(x,y,w,h,'#293c42');r(x+2,y+2,w-4,h-4,glass);r(x+3,y+3,w/2-3,h/2,'#668184');r(x+w/2,y,2,h,'#adb4a2');r(x,y+h/2,w,2,'#929d90');r(x+3,y+h-4,w-6,1,'#7e9b9a');r(x+3,y+4,2,Math.max(2,h/3),'#8ba6a1');if(roomLit(paneIndex++))roomLights.push({x:x+2,y:y+2,w:w-4,h:h-4});}
  function brickwork(x,y,w,h){r(x,y,w,h,brick);for(let j=4;j<h;j+=5){r(x,y+j,w,1,'#b5795c');for(let k=(j%2)*5;k<w;k+=15)r(x+k,y+j-4,1,4,'#935d49');}}
  function steps(x,y,w,n=5){for(let i=0;i<n;i++){r(x-i*3,y+i*3,w+i*6,3,i%2?shade:cream);}}
  function rail(x,y,w,h=12){r(x,y,w,2,'#d4dace');r(x,y+6,w,1,'#a3b5ac');for(let i=0;i<w;i+=13)r(x+i,y,2,h,'#9caaa1');}
  function sign(x,y,w,label){r(x,y,w,18,'#f0e9d4');text(label,x+6,y+13,11);}
  function car(x,y,color){r(x+8,y-8,27,8,color);r(x,y,46,12,color);r(x+10,y-6,10,6,'#6d969c');r(x+23,y-6,10,6,'#6d969c');r(x+5,y+8,9,7,'#35413f');r(x+32,y+8,9,7,'#35413f');r(x+1,y+3,4,4,'#e5dfb6');r(x+41,y+3,4,3,'#b45b49');r(x+8,y+10,3,3,'#86958f');r(x+35,y+10,3,3,'#86958f');r(x+22,y,1,8,'#667b73');}
  function ceng(x,t){
    r(x,193,440,125,cream);brickwork(x+8,218,420,97);r(x+410,179,50,139,shade);brickwork(x+420,197,28,44);
    r(x-5,193,450,13,'#f2e9d4');r(x,257,440,11,cream);
    for(let i=0;i<11;i++){r(x+i*39,207,7,111,cream);windowPane(x+13+i*39,221,18,31);windowPane(x+13+i*39,277,18,34);}
    r(x+181,207,62,110,'#888f86');r(x+190,214,43,97,'#30494f');r(x+205,214,3,96,'#b4b5a1');r(x+187,255,50,10,cream);
    steps(x+191,316,40,3);rail(x+105,316,77);r(x+430,156,2,37,'#768782');r(x+429,154,4,4,'#c5ccc1');
    sign(x+126,179,196,t.campus[1]);car(x+28,321,'#d5d7c7');car(x+295,321,'#557585');
  }
  function eee(x,t){
    r(x,227,112,96,cream);for(let j=0;j<3;j++)r(x+4,234+j*10,101,1,'#c6c8b6');brickwork(x,261,112,46);r(x+210,211,157,112,cream);brickwork(x+217,223,144,38);brickwork(x+217,288,144,33);
    for(let i=0;i<4;i++){windowPane(x+224+i*33,230,23,23);windowPane(x+224+i*33,294,23,20);}
    for(let i=0;i<17;i++){const edge=Math.abs(i-8)/8, top=176+Math.round(edge*edge*13/3)*3;r(x+93+i*8,top,8,323-top,cream);r(x+93+i*8,top,8,5,'#f5edd8');}
    r(x+122,200,75,102,'#253f4b');for(let i=0;i<5;i++){r(x+123+i*15,200,2,102,'#96aca7');}for(let j=0;j<5;j++)r(x+122,200+j*23,75,2,'#aab2a3');
    brickwork(x+99,235,24,68);r(x+151,262,27,59,'#24363d');r(x+147,267,4,54,cream);r(x+180,266,5,55,cream);
    rail(x+127,217,68);steps(x+138,322,55,3);sign(x+102,159,185,t.campus[2]);
  }
  function mech(x,t){
    r(x,222,460,102,cream);r(x+20,207,106,117,cream);r(x+294,204,150,120,cream);
    brickwork(x,232,460,6);brickwork(x,279,460,7);brickwork(x,315,460,7);
    r(x+162,184,90,12,cream);r(x+168,194,78,28,shade);for(let i=0;i<5;i++)windowPane(x+174+i*14,197,8,20);
    for(let i=0;i<4;i++){windowPane(x+17+i*28,242,18,26);windowPane(x+17+i*28,290,18,22);}
    r(x+143,232,131,89,'#294b48');for(let i=0;i<8;i++){r(x+146+i*16,233,2,88,'#758c65');r(x+147+i*16,250,14,34,'#486552');}
    r(x+138,226,141,8,cream);for(let i=0;i<6;i++){windowPane(x+296+i*25,242,17,28);r(x+291+i*25,225,10,13,cream);}
    steps(x+169,321,70,3);sign(x+118,207,200,t.campus[3]);
  }
  function library(x,t){
    r(x,224,125,98,cream);brickwork(x+9,243,107,75);r(x,268,125,7,cream);
    for(let i=0;i<3;i++){r(x+7+i*38,240,5,80,cream);windowPane(x+18+i*36,250,20,16);windowPane(x+18+i*36,285,20,20);}
    // Low red arched roofs, tall cream/brick piers and glazed entrance.
    for(let i=0;i<27;i++){const top=221-Math.round(Math.sin(i/26*Math.PI)*13);r(x-3+i*5,top,5,228-top,'#805345');}
    r(x+128,218,124,104,cream);brickwork(x+138,239,106,44);windowPane(x+147,242,88,33);windowPane(x+161,290,49,32);
    r(x+258,237,185,85,cream);r(x+419,205,43,118,cream);r(x+421,209,2,110,'#f0ebd5');brickwork(x+430,218,23,97);
    for(let i=0;i<38;i++){const top=233-Math.round(Math.sin(i/37*Math.PI)*10);r(x+252+i*5,top,5,239-top,'#895948');}
    for(let i=0;i<4;i++){r(x+265+i*37,245,7,63,'#f0e8d3');windowPane(x+275+i*37,265,25,32);}
    steps(x+274,307,92,6);rail(x+259,292,150,14);r(x+258,318,156,7,brick);
    sign(x+146,219,97,t.campus[4]);
    // Skylight pyramid reduced to stepped pixel rows.
    for(let i=0;i<8;i++)r(x+139-i*3,209+i*3,6+i*6,3,i%2?'#83aaa5':'#aec2b4');rail(x+126,218,119,12);
  }
  function dorms(x,t){
    for(let b=0;b<3;b++){
      const bx=x+b*130,by=238+(b%2)*22;r(bx,by,176,71,'#a57253');
      for(let i=0;i<10;i++)for(let j=0;j<2;j++)windowPane(bx+8+i*16,by+10+j*30,8,19);
      r(bx-7,by-9,190,9,'#e7e5d8');r(bx+176,by,9,71,'#845d49');
      for(let i=0;i<9;i++)r(bx-7+i*10,by-9-i,100,2,'#e7e5d8');
    }
    sign(x+124,218,98,t.campus[5]);
  }
  function tower(x){
    r(x-16,196,35,5,'#c5cabb');r(x-12,187,27,9,'#e3e3d1');r(x-9,175,20,12,'#c8d4cf');
    for(let i=0;i<5;i++){r(x-7,90+i*17,15,17,'#e7e7d9');r(x+5,90+i*17,3,17,'#b7c8c4');r(x-8,105+i*17,17,2,'#aebfc0');}
    for(let i=0;i<10;i++)r(x-12+Math.floor(i/3),64+i*3,25-Math.floor(i/3)*2,3,'#e7e6d9');
    r(x,51,2,13,'#909e9b');r(x-4,75,9,2,'#a34745');r(x,71,2,11,'#a34745');r(x-3,72,2,2,'#a34745');r(x+4,80,2,2,'#a34745');r(x+4,72,2,2,'#a34745');r(x-3,80,2,2,'#a34745');
  }
  function boarSign(x){
    r(x+17,290,4,42,'#7e8882');for(let i=0;i<17;i++){r(x+18-i,257+i*2,i*2+3,2,'#ad5045');if(i>4)r(x+20-i,258+i*2,i*2-1,2,'#eee8cd');}
    r(x+12,276,16,8,'#4b4d43');r(x+7,280,8,6,'#4b4d43');r(x+14,284,3,4,'#4b4d43');r(x+24,284,3,4,'#4b4d43');r(x+10,274,3,4,'#4b4d43');
  }
  function road(world,W){
    // The running surface begins at the student's feet: simple asphalt, no brick strip.
    r(0,330,W,7,'#c5c6b6');r(0,337,W,113,'#7e8785');
    r(0,343,W,2,'#d8cb8a');
    for(let i=0;i<40;i++){const x=((i*47-world)%1880+1880)%1880;r(x,365+i%3*12,9,2,'#747e7b');}
    for(let x=-(world%156);x<W;x+=156)r(x,408,65,3,'#dedfd0');
  }
  function mathematics(x,t){
    r(x,215,450,108,cream);brickwork(x+18,183,46,139);brickwork(x+72,238,134,78);
    for(let i=0;i<4;i++){windowPane(x+81+i*31,242,16,29);windowPane(x+81+i*31,283,16,29);r(x+72+i*34,228,5,94,cream);}
    r(x+64,272,144,8,cream);r(x+18,181,46,5,'#c28259');
    r(x+279,181,158,142,cream);for(let j=0;j<6;j++)r(x+370,190+j*23,66,1,'#c7c9b6');for(let i=0;i<3;i++)r(x+372+i*25,184,1,134,'#cbd0bc');r(x+265,207,100,93,'#354e4b');
    for(let i=0;i<5;i++){r(x+265+i*20,207,3,93,'#8f9f83');for(let j=0;j<3;j++)r(x+269+i*20,211+j*28,15,23,j===0?'#a5a576':'#627b60');}
    for(let i=0;i<4;i++){r(x+200+i*22,224,6,89,cream);r(x+200,225+i*8,85,3,'#c4c3a5');}
    for(let j=0;j<3;j++)for(let i=0;i<7;i++)r(x+206+j*24-i*2,270+i*2,4+i*4,2,i%2?'#43626b':'#8ca0a1');
    r(x+275,294,129,8,cream);r(x+279,302,7,21,cream);r(x+392,302,7,21,cream);windowPane(x+302,303,75,20);
    windowPane(x+403,217,17,45);windowPane(x+403,278,17,39);sign(x+118,199,138,t.campus[6]);
    for(let i=0;i<8;i++)r(x+283+i*20,186,1,15,'#c6c7b2');steps(x+291,323,99,3);
  }
  function biology(x,t){
    brickwork(x+190,203,260,117);r(x+286,190,23,131,cream);r(x+384,205,19,116,cream);
    for(let i=0;i<10;i++)for(let j=0;j<3;j++)windowPane(x+205+i*24,218+j*31,8,12);
    for(let i=0;i<21;i++){
      const top=203+Math.round(Math.pow((i-10)/10,2)*12);r(x+i*10,top,10,322-top,cream);
      for(let j=0;j<3;j++)windowPane(x+i*10+2,top+9+j*29,6,21);
      r(x+i*10,top+87,10,5,shade);brickwork(x+i*10+2,top+94,8,322-top-94);
    }
    r(x+180,288,19,33,'#3c4c47');sign(x+188,183,237,t.campus[7]);steps(x+169,322,47,3);
  }
  function physics(x,t){
    brickwork(x+175,207,256,82);r(x+175,201,264,7,'#a5a293');
    for(let i=0;i<10;i++)windowPane(x+184+i*24,221,14,26);
    brickwork(x,243,438,79);r(x,237,440,7,'#646d62');r(x,280,438,7,'#70766b');
    for(let i=0;i<13;i++){r(x+4+i*33,244,5,79,'#686e62');windowPane(x+13+i*32,249,16,24);windowPane(x+13+i*32,292,16,28);}
    for(let i=0;i<16;i++){r(x+10+i*4,221+i,360,2,'#996b65');r(x+179+i*3,189+i,220,2,'#a9776e');}
    r(x+70,204,60,34,'#805b4b');r(x+66,201,67,5,'#c4c2b0');
    for(let i=0;i<7;i++)r(x+93-i*3,188+i*2,5+i*6,2,i%2?'#466b68':'#8aaba2');
    r(x+199,225,53,5,'#4b746e');r(x+203,220,42,5,'#74958c');sign(x+302,224,105,t.campus[8]);
  }
  function chemical(x,t){
    r(x,209,458,113,cream);brickwork(x+10,225,86,95);brickwork(x+364,225,84,95);
    for(let k=0;k<2;k++){windowPane(x+23+k*359,235,54,33);windowPane(x+23+k*359,284,54,33);}
    r(x,271,458,10,cream);
    for(let i=0;i<28;i++){
      const curve=Math.round(Math.sin(i/27*Math.PI)*13),bx=x+91+i*10;
      r(bx,207-curve,10,16,cream);r(bx,223-curve,10,41,'#314c54');r(bx+2,224-curve,7,35,'#708b86');
      r(bx,264-curve,10,14,cream);r(bx,248-curve,10,13,'#8eb2b4');r(bx,246-curve,10,2,'#dbe2d0');
      if(i%3===0)r(bx,240-curve,2,23,'#c8d1c8');
    }
    for(let i=0;i<5;i++){brickwork(x+89+i*65,205,10,114);r(x+89+i*65,196,10,10,brick);}
    windowPane(x+126,281,204,37);sign(x+145,267,176,t.campus[9]);steps(x+61,323,345,4);rail(x+84,310,76);rail(x+301,310,76);
  }
  function architecture(x,t){
    brickwork(x,215,141,107);r(x+8,227,123,23,cream);r(x+8,266,123,22,cream);
    brickwork(x+199,237,251,84);r(x+204,253,239,19,cream);r(x+204,286,239,19,cream);
    for(let j=0;j<3;j++)for(let i=0;i<5;i++)windowPane(x+14+i*23,231+j*34,14,15);
    for(let j=0;j<2;j++)for(let i=0;i<10;i++)windowPane(x+210+i*23,256+j*32,14,13);
    r(x-3,211,148,5,'#5f5b50');r(x+196,233,258,5,'#777160');r(x+140,232,47,90,'#805b4d');
    windowPane(x+152,284,28,37);sign(x+203,219,167,t.campus[10]);
    for(let i=0;i<8;i++){r(x+161+i*38,304,5,25,'#746b50');r(x+150+i*38,297,27,14,'#718764');r(x+155+i*38,290,19,10,'#839a70');}
  }
  function shelter(x,variant=0){
    // Only the brown glazed shelter and red bench from the reference.
    r(x,271,144,8,'#374c50');r(x+5,279,134,45,'#8d80694d');
    r(x+51,282,69,37,'#76573d');r(x+54,285,63,29,'#886744');
    for(const a of [4,46,91,137])r(x+a,278,3,50,'#33464a');r(x+5,322,135,3,'#606d60');
    // Printed community posters, fixed to the shelter's back panel.
    const names=[['HACKATHON'],['SOFTTALKS'],['PYTHON','ATÖLYESİ'],['CODE NIGHT']];
    const words=names[((variant%4)+4)%4];
    r(x+57,283,59,30,'#f4eee2');r(x+59,285,55,2,'#ef8131');
    r(x+61,290,11,13,'#ed8138');r(x+63,288,7,17,'#ed8138');
    r(x+63,293,2,6,'#fff8ec');r(x+62,296,2,2,'#fff8ec');
    r(x+68,293,2,6,'#fff8ec');r(x+69,296,2,2,'#fff8ec');
    for(let k=0;k<7;k++)r(x+68-k/2,290+k*2,1,2,'#fff8ec');
    words.forEach((word,i)=>text(word,x+75,words.length===1?298:294+i*7,6,'#543c32'));
    r(x+76,305,32,1,'#d4ab87');r(x+6,281,30,1,'#acbdb388');r(x+7,283,1,25,'#acbdb388');r(x+149,307,16,22,'#46675b');r(x+147,305,20,4,'#334e47');r(x+153,312,8,2,'#a5bca3');r(x+154,318,6,2,'#a5bca3');
    r(x+48,314,76,4,'#625039');r(x+54,317,3,10,'#34443e');r(x+115,317,3,10,'#34443e');
    for(let i=0;i<3;i++)r(x-65,301+i*4,47,2,'#ae493e');r(x-65,315,47,4,'#bc5043');
    r(x-63,310,4,20,'#883e35');r(x-23,310,4,20,'#883e35');r(x-69,310,7,3,'#bc5043');r(x-22,310,7,3,'#bc5043');
  }
  function lamps(world,W,night){
    const spacing=440,offset=world*.37%spacing;
    for(let x=100-offset;x<W+160;x+=spacing){
      if(night>0){
        for(let j=0;j<20;j++){const y=194+j*8,w=14+j*6;r(x+44-w/2,y,w,8,`rgba(255,226,143,${night*(.045+j*.003)})`);}
        for(let j=0;j<6;j++)r(x-45-j*7,349+j*5,175+j*14,5,`rgba(255,223,134,${night*(.13-j*.015)})`);
      }
      r(x,198,5,133,'#667774');r(x+1,199,2,130,'#a6b0a2');r(x-3,327,11,4,'#7c8981');
      for(let j=0;j<12;j++)r(x+j*4,199-j,5,3,'#86958d');r(x+43,185,21,5,night>.5?'#f7e5a5':'#b9c1b3');r(x+47,183,15,3,'#aeb8ac');
    }
  }
  // Stepped side planes share the facade's exact roof and ground edges.
  function volume(x,y,w,h,depth=26,warm=false){
    const side=warm?'#845e4b':'#a7ae9e',top=warm?'#bb9573':'#d1d4bd';
    for(let d=0;d<depth;d+=2){const rise=Math.floor(d*.42);r(x+w+d,y-rise,2,h,side);r(x+d,y-rise,w,2,top);}
    r(x+w,y,2,h,'#858f81');
    for(let row=20;row<h-8;row+=25)for(let d=2;d<depth-2;d+=2)r(x+w+d,y+row-Math.floor(d*.42),2,1,warm?'#9d745a':'#bcc1ae');
    for(let d=8;d<depth-4;d+=10)for(let row=29;row<h-20;row+=35){const yy=y+row-Math.floor(d*.42);r(x+w+d,yy,6,13,'#4b6262');r(x+w+d+1,yy+1,3,10,'#779088');}
  }
  function building(x,type,t){paneIndex=type*1000;
    const forms={1:[[410,179,50,139]],2:[[210,211,157,112]],3:[[294,204,150,120]],4:[[419,205,43,118]],5:[[260,238,176,71]],6:[[279,181,158,142]],7:[[403,203,47,117]],8:[[175,201,264,88],[0,237,438,85]],9:[[364,209,94,113]],10:[[199,233,251,88],[0,211,141,111]]};
    for(const [dx,y,w,h] of forms[type]||[])volume(x+dx,y,w,h,26,[5,7,8,10].includes(type));
    [null,ceng,eee,mech,library,dorms,mathematics,biology,physics,chemical,architecture][type]?.(x,t);}
  function beginLights(seed=0){roomLights=[];nightSeed=seed;}
  function lights(night){if(!night)return;ctx.save();ctx.globalAlpha=night*.86;for(const p of roomLights){ctx.fillStyle='#d9b56c';ctx.fillRect(Math.round(p.x),p.y,p.w,p.h);ctx.fillStyle='#f2d493';ctx.fillRect(Math.round(p.x),p.y,p.w,Math.max(2,p.h/3));ctx.fillStyle='#66736a';ctx.fillRect(Math.round(p.x+p.w/2),p.y,1,p.h);ctx.fillRect(Math.round(p.x),p.y+p.h/2,p.w,1);}ctx.restore();}
  return {roomLit,beginLights,lights,building,tower,boarSign,road,shelter,lamps};
};
