'use strict';
// All reading and downloads remain available without JavaScript.
document.documentElement.classList.add('js');
// A three-second CSS 3D shield deflects illustrative Vietnamese đồng notes.
let stopMoneyIntro = null;
function playMoneyIntro() {
  const hero = document.querySelector('.hero');
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!hero || motionPreference.matches || document.visibilityState === 'hidden') return;
  if (window.scrollY > 120 || (location.hash && !['#dau-trang', '#noi-dung'].includes(location.hash))) return;
  if (stopMoneyIntro) stopMoneyIntro();
  const width = window.innerWidth, height = window.innerHeight;
  if (height <= 0) return;
  const mobile = window.matchMedia('(max-width:600px), (hover:none) and (pointer:coarse)').matches;
  const shieldSize = Math.min(mobile ? 168 : 246, width * (mobile ? .38 : .19), height * .36);
  const shieldX = width * .69;
  const shieldY = Math.max(shieldSize * .65 + 40, height * .46);
  const impactX = shieldX - shieldSize * .20;
  const layer = document.createElement('div');
  layer.className = 'intro-money intro-shield'; layer.setAttribute('aria-hidden', 'true');
  layer.style.setProperty('--intro-height', `${height}px`);
  layer.style.setProperty('--shield-size', `${shieldSize}px`);
  layer.style.setProperty('--shield-x', `${shieldX}px`);
  layer.style.setProperty('--shield-y', `${shieldY}px`);
  const palettes = [
    {fill:'#b7dbc3',ink:'#14634b',edge:'#648e73',value:'100.000 ₫'},
    {fill:'#ecc9b4',ink:'#8b483f',edge:'#af7764',value:'200.000 ₫'},
    {fill:'#b1dce3',ink:'#1c6277',edge:'#628f9b',value:'500.000 ₫'}
  ];
  const symbols = palettes.map((color,index) => `<symbol id="intro-dong-${index}" viewBox="0 0 160 78"><rect x="2" y="2" width="156" height="74" rx="5" fill="${color.fill}" stroke="${color.ink}" stroke-width="1.5"/><rect x="7" y="7" width="146" height="64" rx="3" fill="none" stroke="${color.ink}" stroke-opacity=".45"/><path d="M12 17h78M12 21h60M12 63h82M12 67h69" stroke="${color.ink}" stroke-opacity=".3"/><ellipse cx="123" cy="39" rx="24" ry="27" fill="none" stroke="${color.ink}" stroke-opacity=".28"/><ellipse cx="123" cy="39" rx="19" ry="22" fill="none" stroke="${color.ink}" stroke-opacity=".2"/><text x="14" y="34" class="money-country" fill="${color.ink}">VIỆT NAM ĐỒNG</text><text x="13" y="54" class="money-value" fill="${color.ink}">${color.value}</text><text x="123" y="49" class="money-mark" fill="${color.ink}" text-anchor="middle">₫</text><text x="15" y="65" class="money-model" fill="${color.ink}">MÔ PHỎNG</text></symbol>`).join('');
  layer.innerHTML = `<svg class="intro-definitions" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><defs>${symbols}</defs></svg><span class="shield-aura"></span><div class="shield-stage"><div class="shield-solid"><span class="shield-depth depth-back"></span><span class="shield-depth depth-middle"></span><span class="shield-depth depth-edge"></span><svg class="shield-face" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><defs><linearGradient id="intro-shield-rim" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff2bc"/><stop offset=".42" stop-color="#c8a85c"/><stop offset=".7" stop-color="#fff1bd"/><stop offset="1" stop-color="#8f713b"/></linearGradient><linearGradient id="intro-shield-face" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#348886"/><stop offset=".42" stop-color="#14665d"/><stop offset="1" stop-color="#123d48"/></linearGradient></defs><path d="M50 5 L90 18 Q91 81 50 113 Q9 81 10 18Z" fill="url(#intro-shield-rim)"/><path d="M50 11 L84 23 Q83 77 50 105 Q17 77 16 23Z" fill="url(#intro-shield-face)"/><path d="M50 16 L78 26 Q77 74 50 99 Q23 74 22 26Z" fill="none" stroke="#afe3d2" stroke-opacity=".38"/><path d="M50 13 L18 24 Q19 76 50 104Z" fill="#fff" opacity=".075"/><rect x="32" y="49" width="36" height="31" rx="7" fill="#e8f7eb"/><path d="M40 49v-9a10 10 0 0 1 20 0v9" fill="none" stroke="#e8f7eb" stroke-width="5"/><path d="M41 64l6 6 12-13" fill="none" stroke="#14665d" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M26 27L48 18" stroke="#fff8d7" stroke-width="2" stroke-linecap="round" opacity=".65"/></svg></div></div>`;
  let seed = 705;
  const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const count = mobile ? 24 : 42;
  for (let index = 0; index < count; index++) {
    const wave = index % 3, colorIndex = Math.floor(index / 3) % 3;
    const size = (mobile ? 57 : 83) + random() * (mobile ? 23 : 29);
    const duration = 1570 + random() * 150;
    const delay = 100 + wave * 370 + random() * 160;
    const hitY = shieldY + (random() - .5) * shieldSize * .44 - size * .245;
    const hitX = impactX - size * .90;
    const startY = shieldY - shieldSize * .25 + (random() - .5) * shieldSize * .50;
    const rotation = (random() - .5) * 26;
    const note = document.createElement('span'); note.className = 'money-note';
    note.innerHTML = `<span class="money-bill" data-value="${palettes[colorIndex].value}"><svg class="money-paper" viewBox="0 0 160 78" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><use href="#intro-dong-${colorIndex}"/></svg></span>`;
    const points = [
      [-size-50,startY,rotation-14],
      [hitX*.30,startY-shieldSize*.22,rotation-8],
      [hitX*.72,hitY-shieldSize*.13,rotation+3],
      [hitX,hitY,rotation],
      [hitX-size*.36,hitY-12,rotation+28],
      [hitX-size*.74,hitY+shieldSize*.55,rotation+94],
      [hitX-size*1.05,height+size,rotation+245]
    ];
    points.forEach(([x,y,r],step)=>{
      note.style.setProperty(`--x${step}`,`${Math.round(x)}px`);
      note.style.setProperty(`--y${step}`,`${Math.round(y)}px`);
      note.style.setProperty(`--r${step}`,`${r}deg`);
    });
    note.style.setProperty('--flight-delay',`${delay}ms`);
    note.style.setProperty('--flight-duration',`${duration}ms`);
    note.style.setProperty('--note-size',`${size}px`);
    note.style.setProperty('--note-edge',palettes[colorIndex].edge);
    note.style.setProperty('--note-fill',palettes[colorIndex].fill);
    note.style.setProperty('--note-ink',palettes[colorIndex].ink);
    note.style.setProperty('--paper-turn',`${(index%2?1:-1)*(24+random()*16)}deg`);
    layer.append(note);
    // Three localized impact pulses, timed to actual notes reaching the face.
    if (index < 3) {
      const pulse = document.createElement('span');pulse.className='shield-impact';
      pulse.style.left=`${impactX}px`;pulse.style.top=`${hitY+size*.245}px`;
      pulse.style.setProperty('--impact-delay',`${delay+duration*.48}ms`);
      layer.append(pulse);
    }
  }
  document.body.append(layer);
  let timer;
  const stop = () => {
    layer.remove(); clearTimeout(timer);
    if (stopMoneyIntro === stop) stopMoneyIntro = null;
    document.removeEventListener('visibilitychange', onVisibility);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('scroll', onScroll);
    if (typeof motionPreference.removeEventListener === 'function') motionPreference.removeEventListener('change', onPreference);
    else motionPreference.removeListener(onPreference);
  };
  const onVisibility = () => { if (document.visibilityState === 'hidden') stop(); };
  const onPreference = () => { if (motionPreference.matches) stop(); };
  const onResize = () => { if (Math.abs(window.innerWidth - width) > 24) stop(); };
  const onScroll = () => { if (window.scrollY > 120) stop(); };
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('resize', onResize);
  window.addEventListener('scroll', onScroll, {passive:true});
  if (typeof motionPreference.addEventListener === 'function') motionPreference.addEventListener('change', onPreference);
  else motionPreference.addListener(onPreference);
  stopMoneyIntro = stop;
  timer = setTimeout(stop, 3000);
}

let moneyIntroStarted = false;
const startMoneyIntro = () => {
  if (moneyIntroStarted || document.visibilityState === 'hidden' || document.readyState !== 'complete') return;
  moneyIntroStarted = true;
  document.removeEventListener('visibilitychange', startMoneyIntro);
  requestAnimationFrame(() => requestAnimationFrame(() => playMoneyIntro()));
};
document.addEventListener('visibilitychange', startMoneyIntro);
if (document.readyState === 'complete') startMoneyIntro();
else window.addEventListener('load', startMoneyIntro, {once:true});
const fontButton = document.querySelector('.font-toggle');
// Collapse only the identity row on small screens; keep navigation reachable.
const siteHeader = document.querySelector('.site-header');
const mobileHeaderMedia = window.matchMedia('(max-width:800px), (max-width:1000px) and (hover:none) and (pointer:coarse)');
const sectionLinks = Array.from(siteHeader.querySelectorAll('nav a'));
const navigationSections = sectionLinks.map(link => document.querySelector(link.getAttribute('href')));
function updateSectionNavigation() {
  const readingLine = siteHeader.getBoundingClientRect().bottom + Math.min(160,window.innerHeight*.2);
  let current = -1;
  navigationSections.forEach((section,index) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= readingLine && rect.bottom > readingLine) current = index;
  });
  sectionLinks.forEach((link,index) => {
    if (index === current) link.setAttribute('aria-current','location');
    else link.removeAttribute('aria-current');
  });
  document.body.classList.toggle('using-checker',current >= 0 && navigationSections[current].id === 'kiem-tra');
}
let headerFrame = null;
function updateMobileHeader() {
  headerFrame = null;
  updateSectionNavigation();
  if (!mobileHeaderMedia.matches) { siteHeader.classList.remove('is-compact'); return; }
  if (document.body.classList.contains('modal-open')) return;
  const compact = siteHeader.classList.contains('is-compact');
  if (!compact && window.scrollY > 96 && !siteHeader.querySelector('.brand').contains(document.activeElement)) siteHeader.classList.add('is-compact');
  else if (compact && window.scrollY < 16) siteHeader.classList.remove('is-compact');
}
function scheduleHeaderUpdate() {
  if (headerFrame === null) headerFrame = requestAnimationFrame(updateMobileHeader);
}
window.addEventListener('scroll', scheduleHeaderUpdate, {passive:true});
window.addEventListener('resize', scheduleHeaderUpdate, {passive:true});
siteHeader.addEventListener('focusout', scheduleHeaderUpdate);
updateMobileHeader();
function setLargeText(enabled) {
  document.documentElement.classList.toggle('large-text', enabled);
  fontButton.setAttribute('aria-pressed', String(enabled));
  fontButton.title = enabled ? 'Trở về cỡ chữ thông thường' : 'Tăng cỡ chữ trên trang';
  fontButton.setAttribute('aria-label', fontButton.title);
}
try { setLargeText(localStorage.getItem('pa05-large-text') === 'true'); } catch (_) {}
fontButton.addEventListener('click', () => {
  const enabled = !document.documentElement.classList.contains('large-text');
  setLargeText(enabled);
  try { localStorage.setItem('pa05-large-text', String(enabled)); } catch (_) {}
});
const cards = Array.from(document.querySelectorAll('.poster-card'));
const search = document.getElementById('poster-search');
const filters = Array.from(document.querySelectorAll('[data-filter]'));
let selectedFilter = 'all';
const normalize = text => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
function filterPosters() {
  const words = normalize(search.value.trim()).split(/\s+/).filter(Boolean);
  let count = 0;
  cards.forEach(card => {
    const searchable = normalize(card.dataset.search);
    const visible = (selectedFilter === 'all' || selectedFilter === card.dataset.group) && words.every(word => searchable.includes(word));
    card.hidden = !visible;
    if (visible) count++;
  });
  document.getElementById('result-count').textContent = `Đang hiển thị ${count} / 10 áp phích.`;
  document.getElementById('empty-state').hidden = count !== 0;
  filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === selectedFilter)));
}
filters.forEach(button => button.addEventListener('click', () => { selectedFilter = button.dataset.filter; filterPosters(); }));
search.addEventListener('input', filterPosters);
document.getElementById('clear-search').addEventListener('click', () => { search.value = ''; selectedFilter = 'all'; filterPosters(); search.focus(); });
// Links from handbook chapters reveal their poster even after a filter was used.
document.querySelectorAll('a[href^="#poster-"]').forEach(link => link.addEventListener('click', () => {
  search.value = ''; selectedFilter = 'all'; filterPosters();
}));
const media = JSON.parse(document.getElementById('media-data').textContent);
const dialog = document.getElementById('image-viewer');
const image = document.getElementById('viewer-image');
const imageContainer = document.getElementById('viewer-content');
const previous = document.getElementById('previous-image');
const next = document.getElementById('next-image');
const zoom = document.getElementById('zoom-image');
let currentGroup = 'posters', currentIndex = 0, opener = null;
let isTurning = false, turnToken = 0, pageAnimation = null, pageLoadTimer = null, swipeStart = null;
let neighborTimer = null;
const viewerImageCache = new Map();
function loadViewerImage(src) {
  if (viewerImageCache.has(src)) {
    const cached = viewerImageCache.get(src);
    viewerImageCache.delete(src); viewerImageCache.set(src,cached);
    return cached;
  }
  const asset = new Image();
  const request = new Promise((resolve,reject) => {
    asset.onload = resolve; asset.onerror = () => reject(new Error('image-load')); asset.src = src;
  }).then(async () => {
    if (typeof asset.decode === 'function') await asset.decode();
    return asset;
  });
  viewerImageCache.set(src,request);
  while (viewerImageCache.size > 3) viewerImageCache.delete(viewerImageCache.keys().next().value);
  request.catch(() => { if (viewerImageCache.get(src) === request) viewerImageCache.delete(src); });
  return request;
}
function queueNextPage() {
  clearTimeout(neighborTimer);
  const connection = navigator.connection;
  if (!dialog.open || isTurning || !image.complete || !image.naturalWidth) return;
  if (connection && (connection.saveData || ['slow-2g','2g'].includes(connection.effectiveType))) return;
  const item = media[currentGroup][currentIndex+1];
  if (!item) return;
  const token = turnToken;
  neighborTimer = setTimeout(() => {
    if (dialog.open && !isTurning && token === turnToken) loadViewerImage(item.image).catch(() => {});
  }, 300);
}
image.addEventListener('load', queueNextPage);
const pageMotionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const normalViewerHint = 'Vuốt trái để xem trang sau, vuốt phải để xem trang trước. Chọn “Phóng to” để đọc chi tiết.';
function setViewerHint(message) {
  const hint = document.getElementById('viewer-hint');
  if (hint.textContent !== message) hint.textContent = message;
}
function updatePageButtons() {
  previous.disabled = isTurning || currentIndex === 0;
  next.disabled = isTurning || currentIndex === media[currentGroup].length - 1;
  zoom.disabled = isTurning;
}
function cancelPageTurn() {
  turnToken++; isTurning = false; swipeStart = null;
  if (pageAnimation) pageAnimation.cancel();
  pageAnimation = null; clearTimeout(pageLoadTimer);
  clearTimeout(neighborTimer);
  imageContainer.classList.remove('is-loading', 'page-error');
  imageContainer.removeAttribute('aria-busy'); updatePageButtons();
}
async function animatePage(frames, origin) {
  if (pageMotionPreference.matches || typeof image.animate !== 'function') return;
  image.style.transformOrigin = origin;
  const animation = image.animate(frames, {duration:160, easing:'ease-out'});
  pageAnimation = animation;
  try { await animation.finished; } catch (_) {}
  if (pageAnimation === animation) pageAnimation = null;
}
async function changePage(direction) {
  const target = currentIndex + direction;
  if (!dialog.open || isTurning || target < 0 || target >= media[currentGroup].length) return;
  const token = ++turnToken;
  const focusedControl = document.activeElement;
  const restoreControlFocus = [previous,next,zoom].includes(focusedControl);
  isTurning = true; swipeStart = null; updatePageButtons();
  imageContainer.setAttribute('aria-busy', 'true'); imageContainer.classList.remove('page-error');
  pageLoadTimer = setTimeout(() => { if (token === turnToken) imageContainer.classList.add('is-loading'); }, 180);
  try {
    // Keep the current page visible until the requested artwork is ready.
    await loadViewerImage(media[currentGroup][target].image);
    if (token !== turnToken || !dialog.open) return;
    clearTimeout(pageLoadTimer); imageContainer.classList.remove('is-loading');
    imageContainer.classList.remove('zoomed');
    const sign = direction > 0 ? -1 : 1;
    await animatePage([
      {transform:'perspective(1200px) translateX(0) rotateY(0deg)',opacity:1},
      {transform:`perspective(1200px) translateX(${sign*14}px) rotateY(${sign*7}deg)`,opacity:.88}
    ], direction > 0 ? 'left center' : 'right center');
    if (token !== turnToken || !dialog.open) return;
    currentIndex = target; renderImage();
    await animatePage([
      {transform:`perspective(1200px) translateX(${-sign*14}px) rotateY(${-sign*7}deg)`,opacity:.88},
      {transform:'perspective(1200px) translateX(0) rotateY(0deg)',opacity:1}
    ], direction > 0 ? 'right center' : 'left center');
  } catch (_) {
    if (token === turnToken && dialog.open) {
      imageContainer.classList.add('page-error');
      setViewerHint('Chưa tải được trang. Hãy thử chuyển trang lại.');
    }
  } finally {
    if (token === turnToken) {
      clearTimeout(pageLoadTimer); imageContainer.classList.remove('is-loading');
      imageContainer.removeAttribute('aria-busy'); isTurning = false; updatePageButtons();
      queueNextPage();
      if (restoreControlFocus && dialog.open && (document.activeElement === document.body || document.activeElement === focusedControl)) {
        const control = focusedControl.disabled ? (focusedControl === previous ? next : previous) : focusedControl;
        control.focus({preventScroll:true});
      }
    }
  }
}
function renderImage() {
  const list = media[currentGroup];
  const item = list[currentIndex];
  const title = item.title;
  document.getElementById('viewer-title').textContent = title;
  document.getElementById('viewer-title').title = title;
  document.getElementById('viewer-count').textContent = `${currentGroup === 'book' ? 'Cẩm nang · Trang' : `Áp phích số ${item.id} ·`} ${currentIndex + 1} / ${list.length}`;
  dialog.style.setProperty('--page-progress', `${(currentIndex+1)/list.length*100}%`);
  image.src = item.image;
  image.alt = item.title;
  const download = document.getElementById('download-image');
  download.href = item.download;
  download.textContent = currentGroup === 'book' ? 'Tải PDF ↓' : 'Tải A3 ↓';
  download.setAttribute('aria-label', currentGroup === 'book' ? 'Tải cẩm nang PDF' : `Tải áp phích ${item.id}, ảnh A3`);
  updatePageButtons();
  imageContainer.classList.remove('zoomed');
  zoom.setAttribute('aria-pressed', 'false'); zoom.textContent = 'Phóng to';
  setViewerHint(normalViewerHint);
  imageContainer.scrollTop = 0; imageContainer.scrollLeft = 0;
}
document.querySelectorAll('[data-view]').forEach(link => link.addEventListener('click', event => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || typeof dialog.showModal !== 'function') return;
  event.preventDefault();
  cancelPageTurn();
  currentGroup = link.dataset.view; currentIndex = Number(link.dataset.index); opener = link;
  renderImage(); dialog.showModal(); document.body.classList.add('modal-open');
  queueNextPage();
  document.getElementById('close-viewer').focus();
}));
document.getElementById('close-viewer').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => { cancelPageTurn(); document.body.classList.remove('modal-open'); if (opener && opener.isConnected) opener.focus({preventScroll:true}); });
previous.addEventListener('click', () => changePage(-1));
next.addEventListener('click', () => changePage(1));
zoom.addEventListener('click', () => {
  const enabled = imageContainer.classList.toggle('zoomed');
  zoom.setAttribute('aria-pressed', String(enabled)); zoom.textContent = enabled ? 'Vừa màn hình' : 'Phóng to';
  setViewerHint(enabled ? 'Ảnh đang phóng to. Vuốt hoặc cuộn để xem; chọn “Vừa màn hình” để xem trọn trang.' : normalViewerHint);
  imageContainer.scrollTop = 0; imageContainer.scrollLeft = 0;
});
dialog.addEventListener('keydown', event => {
  if (event.key === 'Tab') {
    const controls = Array.from(dialog.querySelectorAll('button:not(:disabled), a[href], [tabindex="0"]')).filter(element => element.getClientRects().length);
    const first = controls[0], last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
  if (imageContainer.classList.contains('zoomed') && event.target === imageContainer) return;
  if (event.key === 'ArrowLeft') { event.preventDefault(); changePage(-1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); changePage(1); }
});
// Horizontal touch gestures turn pages only in the fit-to-screen view.
function viewerIsZoomed() {
  return imageContainer.classList.contains('zoomed') || (window.visualViewport && window.visualViewport.scale > 1.05);
}
image.draggable = false;
imageContainer.addEventListener('pointerdown', event => {
  if (!event.isPrimary) { swipeStart = null; return; }
  if (event.pointerType !== 'touch' || !dialog.open || isTurning || viewerIsZoomed()) return;
  swipeStart = {id:event.pointerId,x:event.clientX,y:event.clientY,time:performance.now()};
  try { imageContainer.setPointerCapture(event.pointerId); } catch (_) {}
});
imageContainer.addEventListener('pointerup', event => {
  const start = swipeStart; swipeStart = null;
  if (!start || start.id !== event.pointerId || viewerIsZoomed() || isTurning) return;
  const dx = event.clientX - start.x, dy = event.clientY - start.y;
  const threshold = Math.max(48,Math.min(90,imageContainer.clientWidth*.14));
  if (Math.abs(dx) >= threshold && Math.abs(dx) > Math.abs(dy)*1.4 && performance.now()-start.time <= 1500) {
    changePage(dx < 0 ? 1 : -1);
  }
});
imageContainer.addEventListener('pointercancel', () => { swipeStart = null; });
imageContainer.addEventListener('lostpointercapture', () => { swipeStart = null; });
if (window.visualViewport) window.visualViewport.addEventListener('resize', () => {
  swipeStart = null;
  imageContainer.classList.toggle('is-viewport-zoomed', window.visualViewport.scale > 1.05);
});
// Print the readable handbook with all chapters expanded; restore afterward.
let printState = [];
window.addEventListener('beforeprint', () => { printState = Array.from(document.querySelectorAll('.chapter')).map(chapter => [chapter, chapter.open]); printState.forEach(([chapter]) => { chapter.open = true; }); });
window.addEventListener('afterprint', () => { printState.forEach(([chapter, open]) => { chapter.open = open; }); });
