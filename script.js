/* ── MISO'S WORLD BIRTHDAY CONSOLE SCRIPT ── */
document.addEventListener('DOMContentLoaded', () => {
  
  // ── 1. Audio Elements & Sound Synthesizer ──
  const audioBbung = document.getElementById('audioBbung');
  const audioBye = document.getElementById('audioBye');

  const btnSndBbung = document.getElementById('btnSndBbung');
  const btnSndBye = document.getElementById('btnSndBye');
  const btnSndFanfare = document.getElementById('btnSndFanfare');
  const btnSndRetro = document.getElementById('btnSndRetro');

  // Play audio safely
  function playAudio(audioEl) {
    if (audioEl) {
      audioEl.currentTime = 0;
      audioEl.play().catch(e => console.log('Audio play blocked:', e));
    }
  }

  btnSndBbung?.addEventListener('click', () => playAudio(audioBbung));
  btnSndBye?.addEventListener('click', () => playAudio(audioBye));

  // Web Audio Synth Fanfare
  function playSynthFanfare() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);
        gain.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.12 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.12);
        osc.stop(ctx.currentTime + i * 0.12 + 0.45);
      });
    } catch(e) {
      console.log('Web Audio error:', e);
    }
  }

  // Web Audio Retro Tune
  function playRetroTune() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const notes = [440, 554.37, 659.25, 880, 659.25, 880];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);
        gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.1);
        osc.stop(ctx.currentTime + i * 0.1 + 0.22);
      });
    } catch(e) {}
  }

  btnSndFanfare?.addEventListener('click', playSynthFanfare);
  btnSndRetro?.addEventListener('click', playRetroTune);


  // ── 2. Runaway Cake Game (선물 추격전) ──
  const runawayTarget = document.getElementById('runawayTarget');
  const chaseArena = document.getElementById('chaseArena');
  const tauntBubble = document.getElementById('tauntBubble');
  const chaseCountEl = document.getElementById('chaseCount');
  const chaseGaugeEl = document.getElementById('chaseGauge');
  const moodTextEl = document.getElementById('moodText');

  let chaseCount = 0;
  const tauntList = [
    "응 안 줘~ 🤪",
    "0.001초 반사신경 실화? ⚡",
    "미소의 세상에서는 촛불도 혼자 못 끔 🎂",
    "야옹이가 먼저 먹었지롱 🐱",
    "칼퇴하고 잡으러 와~ 🏃💨",
    "킹받쥬? 못 잡겠쥬? 😜",
    "반응속도 지연 발생! 💥",
    "손보다 빠른 텔레포트! 🚀",
    "오늘 미소는 건드릴 수 없음 👑"
  ];

  function moveRunawayTarget() {
    if (!chaseArena || !runawayTarget) return;

    const arenaRect = chaseArena.getBoundingClientRect();
    const targetWidth = runawayTarget.offsetWidth || 120;
    const targetHeight = runawayTarget.offsetHeight || 100;

    const maxX = arenaRect.width - targetWidth - 20;
    const maxY = arenaRect.height - targetHeight - 20;

    const newX = Math.max(10, Math.random() * maxX);
    const newY = Math.max(10, Math.random() * maxY);

    runawayTarget.style.left = `${newX}px`;
    runawayTarget.style.top = `${newY}px`;
    runawayTarget.style.transform = 'none';

    // Show Taunt Bubble
    const randomTaunt = tauntList[Math.floor(Math.random() * tauntList.length)];
    if (tauntBubble) {
      tauntBubble.textContent = randomTaunt;
      tauntBubble.style.left = `${Math.min(newX + 40, arenaRect.width - 160)}px`;
      tauntBubble.style.top = `${Math.max(10, newY - 40)}px`;
      tauntBubble.classList.add('show');
      setTimeout(() => tauntBubble.classList.remove('show'), 1200);
    }

    // Increment Counter
    if (chaseCount < 10) {
      chaseCount++;
      if (chaseCountEl) chaseCountEl.textContent = chaseCount;
      if (chaseGaugeEl) chaseGaugeEl.style.width = `${(chaseCount / 10) * 100}%`;

      if (chaseCount === 10) {
        if (moodTextEl) moodTextEl.textContent = "🔥 남미소 폭주 모드 해금!!";
        playAudio(audioBbung);
        triggerConfettiBurst();
      }
    }
  }

  // Trigger dodge on mouseover/pointerenter or touch
  runawayTarget?.addEventListener('mouseover', moveRunawayTarget);
  runawayTarget?.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveRunawayTarget();
  });


  // ── 3. Captcha Game ──
  const captchaOptions = document.querySelectorAll('.btn-captcha-opt');
  const captchaResult = document.getElementById('captchaResult');

  captchaOptions.forEach(btn => {
    btn.addEventListener('click', () => {
      const isCorrect = btn.getAttribute('data-correct') === 'true';
      captchaOptions.forEach(b => b.classList.remove('correct', 'wrong'));

      if (isCorrect) {
        btn.classList.add('correct');
        if (captchaResult) {
          captchaResult.style.color = '#10b981';
          captchaResult.textContent = '🎉 정답! 남미소 님 생일 자격 최종 검증 완료! (칼퇴 수여)';
        }
        playSynthFanfare();
        triggerConfettiBurst();
      } else {
        btn.classList.add('wrong');
        if (captchaResult) {
          captchaResult.style.color = '#ef4444';
          captchaResult.textContent = '❌ 땡! 킹받게 만드는데 성공했습니다. 다시 선택해보세요!';
        }
        playAudio(audioBbung);
      }
    });
  });


  // ── 4. Slot Machine (칭찬 뽑기) ──
  const btnSpin = document.getElementById('btnSpin');
  const reel1 = document.getElementById('reel1');
  const reel2 = document.getElementById('reel2');
  const reel3 = document.getElementById('reel3');

  const list1 = ["전설의", "우주최강", "부산산 퓨어히터", "칼퇴 1등", "귀여움 9999배", "시크함 마스터"];
  const list2 = ["전략기획자", "디저트 사냥꾼", "야근 파괴자", "미소의 세상 짱", "분위기 메이커"];
  const list3 = ["남미소 님 생일 축하!", "케이크 3조각 독식!", "전 사원 칭찬 수감!", "오늘 하루 주인공!"];

  btnSpin?.addEventListener('click', () => {
    playRetroTune();
    let counter = 0;
    const interval = setInterval(() => {
      if (reel1) reel1.textContent = list1[Math.floor(Math.random() * list1.length)];
      if (reel2) reel2.textContent = list2[Math.floor(Math.random() * list2.length)];
      if (reel3) reel3.textContent = list3[Math.floor(Math.random() * list3.length)];
      counter++;
      if (counter > 15) {
        clearInterval(interval);
        playSynthFanfare();
        triggerConfettiBurst();
      }
    }, 80);
  });


  // ── 5. Certificate Stamping ──
  const btnStamp = document.getElementById('btnStamp');
  const stampMark = document.getElementById('stampMark');

  btnStamp?.addEventListener('click', () => {
    if (stampMark) {
      stampMark.classList.add('stamped');
    }
    playAudio(audioBbung);
    triggerConfettiBurst();
  });


  // ── 6. Confetti & Finale Overlay ──
  function triggerConfettiBurst() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }

  const btnFullFinale = document.getElementById('btnFullFinale');
  const finaleOverlay = document.getElementById('finaleOverlay');
  const btnCloseFinale = document.getElementById('btnCloseFinale');

  btnFullFinale?.addEventListener('click', () => {
    if (finaleOverlay) finaleOverlay.classList.add('show');
    playSynthFanfare();

    // Launch Continuous Fireworks
    if (typeof confetti === 'function') {
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }
  });

  btnCloseFinale?.addEventListener('click', () => {
    if (finaleOverlay) finaleOverlay.classList.remove('show');
  });

});
