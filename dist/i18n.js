'use strict';
window.I18N = {
  tr: {
    springFestival:'BAHAR FESTİVALİ',
    credit:'Arda KARAHALİLOĞLU tarafından yapıldı',
    bugs:'BUG', newRecord:'YENİ KİŞİSEL REKOR!', finished:'Koşu tamamlandı.', lightTheme:'Açık tema', darkTheme:'Koyu tema', quiz:'QUIZ', quizLog:'# Pop-up quiz! ↓ / S ile eğil.', festival:'ŞENLİK ALANI', concert:'ŞENLİK KONSERİ', rector:'REKTÖR', sucuk:'SUCUK EKMEK', stands:['YAZILIM','BİLİM','SANAT','KULÜPLER'],
    night:'GECE', day:'GÜNDÜZ', fly:'SİNEK', nightLog:'# Gece oldu: domuzları atla, sineklerden eğilerek kaç.', dayLog:'# Gün doğdu: sınavlar geri geldi.', battery:'BATARYA', choose:'Karakterini seç', male:'Erkek öğrenci', female:'Kız öğrenci', chargeLog:'>>> powerbank.connect()  # +2 şarj', fullChargeLog:'>>> battery == 10  # batarya dolu', emptyLog:'BatteryError: şarj bitti! Powerbank topla.', chargeToast:'POWERBANK! +2 ŞARJ', fullChargeToast:'BATARYA DOLU', arcade:'TOPLULUK ARCADE', series:'KAMPÜS SERİSİ', subtitle:'Bir öğrenci. Bir laptop. Sonsuz sayıda bug.',
    deadline:'# deadline yaklaşıyor', score:'SKOR', best:'BU CİHAZDA REKOR', health:'KALAN CAN',
    tag:'python kampüste çalışıyor.', enter:"veya ENTER'a bas", jump:'Zıpla', duck:'Eğil', pause:'Mola ver',
    jumpTouch:'↑ ZIPLA', duckTouch:'↓ EĞİL', fireTouch:'⌁ ATEŞ',
    rules:"Kahve: +1 can · Powerbank: +2 şarj · Atış: −1 şarj · Sınavları ve domuzları atla",
    footer:'Kampüste bir infinite loop.', readyTitle:'Sonsuz döngüye hazır mısın?', readyText:"Sınavı atla. Kahveni kap. Bug'ı temizle.", start:'KOŞUYU BAŞLAT',
    pausedTitle:'Kahve molası.', pausedText:'Döngü seni bekliyor.', resume:'DEVAM ET', restart:'YENİDEN KOŞ',
    summary:(s,k,c)=>`Skor: ${s} · ${k} bug temizlendi · ${c} kahve`,
    idleLog:'import student  # kahve hazır, laptop açık', runLog:'while True: run()  # SPACE / ↑ ile zıpla',
    flyLog:'# Sinek geliyor: ↓ / S ile eğil', bugLog:'# Bug bulundu: F → print("damage")', boarLog:'# Kampüs sakini geliyor: üzerinden atla!', fixLog:'>>> bug.fix()  # +50 puan',
    hitLog:'  # bir can gitti', endLog:'except ExamError: try_again()', coffeeLog:'>>> coffee.drink()  # +1 can', fullLog:'>>> health == 3  # canın zaten dolu', coffeeToast:'KAHVE! +1 CAN', fullToast:'KAHVE! CAN DOLU',
    exam:'VİZESİ', final:'FİNALİ', coffee:'KAHVE', boar:'DOMUZ', recovering:'except: devam_et()',
    campus:['TEKNOPARK İZMİR','BİLGİSAYAR MÜH.','ELEKTRONİK HABERLEŞME','MAKİNE MÜH.','KÜTÜPHANE','YURTLAR','MATEMATİK','MOLEKÜLER BİYOLOJİ & GENETİK','FİZİK','KİMYA MÜH.','MİMARLIK FAKÜLTESİ','ŞENLİK ALANI'], canvas:'Koşu parkuru. Boşluk veya yukarı ok: zıpla. Aşağı ok veya S: eğil. F: ateş. Esc: duraklat.', pauseLabel:'Oyunu duraklat', resumeLabel:'Oyuna devam et',
    title:'IZTECH RUN — Kampüste bir infinite loop', description:"İYTE kampüsünde koş, kahve topla ve Python ile bug'ları temizle."
  },
  en: {
    springFestival:'SPRING FESTIVAL',
    credit:'made by Arda KARAHALİLOĞLU',
    bugs:'BUGS FIXED', newRecord:'NEW PERSONAL BEST!', finished:'Run complete.', lightTheme:'Light theme', darkTheme:'Dark theme', quiz:'QUIZ', quizLog:'# Pop-up quiz! Duck with ↓ / S.', festival:'FESTIVAL GROUNDS', concert:'FESTIVAL LIVE', rector:'RECTOR', sucuk:'GRILLED SUCUK', stands:['SOFTWARE','SCIENCE','ART','CLUBS'],
    night:'NIGHT', day:'DAY', fly:'FLY', nightLog:'# Night: jump over boars and duck under flies.', dayLog:'# Sunrise: exams are back.', battery:'BATTERY', choose:'Choose your character', male:'Male student', female:'Female student', chargeLog:'>>> powerbank.connect()  # +2 charge', fullChargeLog:'>>> battery == 10  # fully charged', emptyLog:'BatteryError: out of charge! Collect a powerbank.', chargeToast:'POWERBANK! +2 CHARGE', fullChargeToast:'BATTERY FULL', arcade:'COMMUNITY ARCADE', series:'CAMPUS SERIES', subtitle:'One student. One laptop. An infinite number of bugs.',
    deadline:'# deadline approaching', score:'SCORE', best:'DEVICE BEST', health:'HEALTH',
    tag:'python runs on campus.', enter:'or press ENTER', jump:'Jump', duck:'Duck', pause:'Take a break', jumpTouch:'↑ JUMP', duckTouch:'↓ DUCK', fireTouch:'⌁ FIRE',
    rules:'Coffee: +1 health · Powerbank: +2 charge · Shot: −1 charge · Jump over exams and boars', footer:'An infinite loop on campus.', readyTitle:'Ready for an infinite loop?', readyText:'Jump the exam. Grab a coffee. Fix the bug.', start:'START RUNNING',
    pausedTitle:'Coffee break.', pausedText:'Your loop is waiting.', resume:'RESUME RUN', restart:'RUN AGAIN', summary:(s,k,c)=>`Score: ${s} · ${k} bugs fixed · ${c} coffees`,
    idleLog:'import student  # coffee ready, laptop open', runLog:'while True: run()  # SPACE / ↑ to jump', flyLog:'# Flying insect: ↓ / S to duck', bugLog:'# Bug detected: F → print("damage")', boarLog:'# Campus resident ahead: jump over it!', fixLog:'>>> bug.fix()  # +50 points',
    hitLog:'  # lost one heart', endLog:'except ExamError: try_again()', coffeeLog:'>>> coffee.drink()  # +1 health', fullLog:'>>> health == 3  # already at full health', coffeeToast:'COFFEE! +1 HEALTH', fullToast:'COFFEE! HEALTH FULL',
    exam:'MIDTERM', final:'FINAL', coffee:'COFFEE', boar:'BOAR', recovering:'except: keep_going()', campus:['TEKNOPARK İZMİR','COMPUTER ENGINEERING','ELECTRONICS & COMM.','MECHANICAL ENG.','LIBRARY','DORMITORIES','MATHEMATICS','MOLECULAR BIOLOGY & GENETICS','PHYSICS','CHEMICAL ENG.','ARCHITECTURE','FESTIVAL GROUNDS'], canvas:'Running course. Space or up arrow: jump. Down arrow or S: duck. F: fire. Esc: pause.', pauseLabel:'Pause game', resumeLabel:'Resume game',
    title:'IZTECH RUN — An infinite loop on campus', description:'Run across the IZTECH campus, collect coffee and fix bugs with Python.'
  }
};
