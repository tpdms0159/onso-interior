(() => {
  'use strict';

  /* ---------- 포트폴리오 데이터 ---------- */
  const WORKS = [
    { id: 'seongsu', img: 'p-kitchen.jpg', cat: '30', title: '성수동 34평 아파트', tag: '전체 리모델링', sub: '거실 쪽으로 연 아일랜드 주방',
      desc: '닫혀 있던 ㄷ자 주방을 거실 쪽으로 열고, 3.2m 아일랜드를 두어 식탁과 작업대를 겸하게 했습니다. 상부장을 없애는 대신 키큰장 수납을 늘렸습니다.',
      spec: [['공사 기간', '6주'], ['공사 범위', '전체 철거 · 주방 구조 변경 · 바닥 · 조명'], ['주요 자재', '오크 무늬목, 화이트 쿼츠, 플루티드 패널'], ['예산', '8,400만원대']] },
    { id: 'bundang', img: 'p-bedroom.jpg', cat: '30', title: '분당 32평 아파트', tag: '전체 리모델링', sub: '붙박이장으로 수납을 해결한 침실',
      desc: '침실 한 면을 손잡이 없는 붙박이장으로 채워 수납을 해결하고, 벽은 석회 질감 도장으로 마감하고, 천장 간접 조명만 남겨 눈부심을 줄였습니다.',
      spec: [['공사 기간', '5주'], ['공사 범위', '전체 리모델링 · 붙박이장 제작'], ['주요 자재', '라임스톤 도장, 오크 원목 플랫폼 베드'], ['예산', '7,600만원대']] },
    { id: 'mapo', img: 'p-bath.jpg', cat: '20', title: '마포 25평 아파트', tag: '욕실 부분 시공', sub: '살면서 9일 만에 고친 욕실',
      desc: '오래된 욕조를 철거하고 워크인 샤워로 바꿨습니다. 대형 석재 타일로 줄눈을 줄여 청소가 쉽고, 플로팅 세면대로 공간이 넓어 보입니다.',
      spec: [['공사 기간', '9일 (거주 중)'], ['공사 범위', '욕실 1개 전체 · 방수 · 환기'], ['주요 자재', '600×1200 석재 타일, 브러시드 브라스 수전'], ['예산', '1,350만원대']] },
    { id: 'pangyo', img: 'p-dining.jpg', cat: '40', title: '판교 43평 아파트', tag: '전체 리모델링', sub: 'TV 대신 책장을 둔 거실과 다이닝',
      desc: '거실 TV 대신 벽 한 면 전체를 책장으로 만들고, 2.4m 원목 테이블을 두어 가족이 모이는 중심을 다이닝으로 옮겼습니다.',
      spec: [['공사 기간', '7주'], ['공사 범위', '전체 리모델링 · 확장 · 책장 제작'], ['주요 자재', '월넛·오크 원목, 크림 도장'], ['예산', '1억 2천만원대']] },
    { id: 'mokdong', img: 'p-entry.jpg', cat: '20', title: '목동 24평 아파트', tag: '전체 리모델링', sub: '벤치 신발장과 중문으로 정리한 현관',
      desc: '좁은 복도에 벤치형 신발장과 리드 유리 슬라이딩 도어를 더해, 빛은 들어오고 복도 안쪽은 가려지도록 했습니다.',
      spec: [['공사 기간', '5주'], ['공사 범위', '전체 리모델링 · 중문 · 수납 설계'], ['주요 자재', '라임스톤 타일, 리드 유리, 오크 신발장'], ['예산', '5,900만원대']] },
    { id: 'yeonnam', img: 'p-cafe.jpg', cat: 'shop', title: '연남동 카페 15평', tag: '상업공간', sub: '곡선 카운터와 창가 좌석을 둔 카페',
      desc: '좁은 매장의 동선을 위해 카운터를 곡선으로 설계했습니다. 창가에는 바 좌석을 두어 혼자 오는 손님 자리를 늘렸습니다.',
      spec: [['공사 기간', '4주 (야간 시공 병행)'], ['공사 범위', '상업공간 전체 · 카운터 제작 · 전기'], ['주요 자재', '미장 도장, 테라조 타일, 오크 선반'], ['예산', '6,200만원대']] },
  ];

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  /* ---------- 헤더 / 모바일 메뉴 ---------- */
  const header = $('.header');
  const menuBtn = $('#menuBtn');
  const mobileBar = $('.mobile-bar');
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 40);
    mobileBar.classList.toggle('is-show', y > window.innerHeight * 0.6);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const setMenu = (open) => {
    header.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    document.body.style.overflow = open ? 'hidden' : '';
  };
  menuBtn.addEventListener('click', () => setMenu(!header.classList.contains('is-open')));
  $$('#nav a').forEach((a) => a.addEventListener('click', () => setMenu(false)));

  /* ---------- 등장 애니메이션 ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 80}ms`;
    io.observe(el);
  });

  /* ---------- 숫자 카운트업 ---------- */
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      countIO.unobserve(e.target);
      const el = e.target;
      const target = parseFloat(el.dataset.count);
      const decimals = String(target).includes('.') ? 1 : 0;
      const start = performance.now();
      const dur = 1400;
      const tick = (t) => {
        const p = Math.min((t - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(decimals);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach((el) => countIO.observe(el));

  /* ---------- 포트폴리오 ---------- */
  const worksEl = $('#works');
  worksEl.innerHTML = WORKS.map((w) => `
    <button class="work reveal" data-cat="${w.cat}" data-id="${w.id}" aria-label="${w.title} 자세히 보기">
      <div class="work__img"><img src="assets/img/${w.img}" alt="${w.title}, ${w.sub}" loading="lazy" width="1120" height="1400" /></div>
      <div class="work__meta"><span class="work__title">${w.title}</span><span class="work__tag">${w.tag}</span></div>
      <p class="work__sub">${w.sub}</p>
    </button>`).join('');
  $$('.work', worksEl).forEach((el) => io.observe(el));

  $$('.filter').forEach((btn) => btn.addEventListener('click', () => {
    $$('.filter').forEach((b) => { b.classList.toggle('is-active', b === btn); b.setAttribute('aria-selected', String(b === btn)); });
    const f = btn.dataset.filter;
    $$('.work', worksEl).forEach((w) => {
      const show = f === 'all' || w.dataset.cat === f;
      w.hidden = !show;
      w.classList.remove('is-in');
      if (show) { void w.offsetWidth; w.classList.add('is-in', 'is-visible'); }
    });
  }));

  // 상세 팝업
  const modal = $('#modal');
  let currentWork = null;
  worksEl.addEventListener('click', (e) => {
    const card = e.target.closest('.work');
    if (!card) return;
    const w = WORKS.find((x) => x.id === card.dataset.id);
    currentWork = w;
    $('#modalImg').src = `assets/img/${w.img}`;
    $('#modalImg').alt = `${w.title} 시공 사진`;
    $('#modalTag').textContent = w.tag;
    $('#modalTitle').textContent = w.title;
    $('#modalDesc').textContent = w.desc;
    $('#modalSpec').innerHTML = w.spec.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');
    modal.showModal();
  });
  $('#modalClose').addEventListener('click', () => modal.close());
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });
  $('#modalCta').addEventListener('click', () => {
    modal.close();
    if (currentWork) $('#fMemo').value = `[${currentWork.title}] 사례와 비슷한 스타일로 상담 받고 싶어요.`;
  });

  /* ---------- 예상 견적 계산기 ---------- */
  // 평당 단가(만원), 데모용 기준값
  const RATE = {
    full: { basic: 190, standard: 245, premium: 320 },
    shop: { basic: 260, standard: 340, premium: 450 },
  };
  // 고정 금액(만원) + 평형 보정
  const FIXED = {
    bath: { basic: 650, standard: 900, premium: 1300 },
    kb:   { basic: 1900, standard: 2700, premium: 3900 },
  };
  const sizeEl = $('#size');
  const fmt = (n) => Math.round(n / 10) * 10;
  const won = (n) => n.toLocaleString('ko-KR');

  const calc = () => {
    const size = +sizeEl.value;
    const scope = $('input[name="scope"]:checked').value;
    const grade = $('input[name="grade"]:checked').value;
    $('#sizeOut').textContent = `${size}평`;
    sizeEl.style.setProperty('--p', `${((size - sizeEl.min) / (sizeEl.max - sizeEl.min)) * 100}%`);

    let base, period;
    if (scope === 'full' || scope === 'shop') {
      base = size * RATE[scope][grade];
      const weeks = Math.round(3 + size / 10);
      period = scope === 'shop' ? `약 ${Math.max(3, weeks - 2)}~${weeks}주` : `약 ${weeks}~${weeks + 2}주`;
    } else {
      const bathCount = size >= 30 ? 2 : 1;
      base = scope === 'bath'
        ? FIXED.bath[grade] * bathCount
        : FIXED.kb[grade] + FIXED.bath[grade] * (bathCount - 1) + size * 8;
      period = scope === 'bath' ? `약 ${bathCount === 2 ? '10~14' : '7~10'}일` : '약 2~3주';
    }
    $('#priceMin').textContent = won(fmt(base * 0.9));
    $('#priceMax').textContent = won(fmt(base * 1.1));
    $('#period').textContent = period;
  };
  $('#calc').addEventListener('input', calc);
  calc();

  $('#calcToForm').addEventListener('click', () => {
    $('#fSize').value = `${sizeEl.value}평`;
    $('#fScope').value = $('input[name="scope"]:checked').value;
    const gradeLabel = $('input[name="grade"]:checked').nextElementSibling.textContent;
    $('#fMemo').value = `예상 견적 ${$('#priceMin').textContent}~${$('#priceMax').textContent}만원 (${gradeLabel}) 기준으로 상담 받고 싶어요.`;
    $('#contact').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => $('input[name="name"]').focus({ preventScroll: true }), 700);
  });

  /* ---------- 상담 폼 (데모) ---------- */
  const form = $('#contactForm');
  const err = $('#formError');
  const toast = $('#toast');
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add('is-show');
    clearTimeout(showToast.t);
    showToast.t = setTimeout(() => toast.classList.remove('is-show'), 3600);
  };
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.elements.name.value.trim();
    const phone = form.elements.phone.value.replace(/\D/g, '');
    form.elements.name.classList.toggle('is-invalid', !name);
    form.elements.phone.classList.toggle('is-invalid', phone.length < 9);
    let msg = '';
    if (!name) msg = '이름을 입력해 주세요.';
    else if (phone.length < 9) msg = '연락 가능한 번호를 입력해 주세요.';
    else if (!form.elements.agree.checked) msg = '개인정보 수집·이용에 동의해 주세요.';
    err.hidden = !msg;
    err.textContent = msg;
    if (msg) return;
    form.reset();
    showToast(`${name}님, 상담 신청이 접수되었습니다. (데모 페이지라 실제로 전송되지는 않습니다)`);
  });

  // 연락처 자동 하이픈
  form.elements.phone.addEventListener('input', (e) => {
    const d = e.target.value.replace(/\D/g, '').slice(0, 11);
    e.target.value = d.length < 4 ? d : d.length < 8 ? `${d.slice(0, 3)}-${d.slice(3)}` : `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
  });

  $$('[data-kakao]').forEach((a) => a.addEventListener('click', () => showToast('카카오톡 채널 연결 자리입니다. (포트폴리오 데모)')));
})();
