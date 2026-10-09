'use strict';

// === app.js ===
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
  const shieldSize = Math.min(mobile ? 220 : 340, width * (mobile ? .50 : .25), height * .45);
  const shieldX = Math.min(width * .69, width - shieldSize * .60 - 16);
  const shieldY = Math.max(shieldSize * .65 + 40, height * .46);
  const impactX = shieldX - shieldSize * .03;
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
  layer.innerHTML = `<svg class="intro-definitions" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><defs>${symbols}</defs></svg><span class="shield-aura"></span><span class="shield-ground-shadow"></span><div class="shield-stage"><div class="shield-solid"><span class="shield-depth depth-back"></span><span class="shield-depth depth-middle"></span><span class="shield-depth depth-edge"></span><svg class="shield-face" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><defs><linearGradient id="intro-shield-rim" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff2bc"/><stop offset=".42" stop-color="#c8a85c"/><stop offset=".7" stop-color="#fff1bd"/><stop offset="1" stop-color="#8f713b"/></linearGradient><linearGradient id="intro-shield-face" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#348886"/><stop offset=".42" stop-color="#14665d"/><stop offset="1" stop-color="#123d48"/></linearGradient></defs><g class="shield-brand-mark" transform="translate(-12 -4) scale(1.78)"><path d="M52 15h8V9M56 25h10M16 15H9V9" fill="none" stroke="#80C9B7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="60" cy="7" r="4" fill="#D5B46B"/><circle cx="66" cy="25" r="3.5" fill="#80C9B7"/><circle cx="9" cy="7" r="3.5" fill="#80C9B7"/><path d="M35 5 58 15v19c0 16-10 26-23 33C22 60 12 50 12 34V15L35 5Z" fill="url(#intro-shield-face)" stroke="url(#intro-shield-rim)" stroke-width="1.4"/><path d="M35 11 52 19v15c0 12-7 20-17 27-10-7-17-15-17-27V19l17-8Z" fill="none" stroke="#80C9B7" stroke-width="1.8"/><path d="M35 7 14 16v18c0 14 9 24 21 31Z" fill="#fff" opacity=".07"/><rect class="shield-brand-card" x="21" y="24" width="31" height="24" rx="4" fill="#F5FAF7"/><path d="M21 31h31" stroke="#123D48" stroke-width="4"/><rect x="25" y="37" width="8" height="6" rx="1.5" fill="#D5B46B"/><path d="M37 40h7" stroke="#14665D" stroke-width="2.3" stroke-linecap="round"/><circle cx="49" cy="48" r="12" fill="#14665D" stroke="#F5FAF7" stroke-width="2.5"/><path class="shield-brand-check" d="m43.5 48 3.5 3.5 7-8" fill="none" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></g></svg></div></div><span class="shield-caption">LÁ CHẮN SỐ</span>`;
  const noteFlights = [];
  let seed = 705;
  const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const lanes = [-.38,-.13,.13,.38];
  for (let arrowIndex = 0; arrowIndex < 4; arrowIndex++) {
    const size = mobile ? Math.min(44,width*.13) : 66;
    const step = size*.68, rise = size*.44;
    // Preserve the first shot; the following three launch in a tight burst.
    const duration = 1570, delay = [280,500,650,800][arrowIndex];
    const contactX=impactX+[-.025,.015,-.015,.025][arrowIndex]*shieldSize;
    const hitY = shieldY+lanes[arrowIndex]*shieldSize*.16-size*.245;
    const hitX = contactX-size*.9;
    const startY = shieldY+lanes[arrowIndex]*shieldSize-size*.245;
    const arrow=document.createElement('div');arrow.className='money-arrow';
    arrow.dataset.arrow=String(arrowIndex+1);
    const startX=-size-25, travel=hitX-startX;
    const flight=[[startX,startY],[startX+travel*.12,startY-shieldSize*.14],[startX+travel*.52,hitY-shieldSize*.06],[hitX,hitY]];
    flight.forEach(([x,y],point)=>{arrow.style.setProperty(`--arrow-x${point}`,`${Math.round(x)}px`);arrow.style.setProperty(`--arrow-y${point}`,`${Math.round(y)}px`);});
    arrow.style.setProperty('--flight-delay',`${delay}ms`);arrow.style.setProperty('--flight-duration',`${duration}ms`);
    // The shaft and two diagonal wings form a rigid right-pointing arrow.
    const slots=[[0,0,0],[-1,0,0],[-2,0,0],[-3,0,0],[-4,0,0],[-1,-1,34],[-2,-2,34],[-1,1,-34],[-2,2,-34]];
    if(!mobile)slots.push([-5,0,0]);
    slots.forEach(([column,row,rotation],index)=>{
    const colorIndex=(arrowIndex+index)%3;
    const localX=column*step,localY=row*rise;
    const note = document.createElement('span'); note.className = 'money-note';
    note.dataset.slot=`${column},${row}`;
    note.innerHTML = `<span class="money-bill" data-value="${palettes[colorIndex].value}"><svg class="money-paper" viewBox="0 0 160 78" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><use href="#intro-dong-${colorIndex}"/></svg></span>`;
    // One compositor animation per note: a continuous ballistic path and
    // a gentle 3D tumble, prepared once rather than updated each frame.
    const turn=(index%2?1:-1)*12;
    const recoil=size*(1.8+random()*.9), kick=size*(3+random());
    const fall=height+size-hitY-localY, spin=(index%2?1:-1)*(150+random()*90);
    const transform=(x,y,r,yaw,pitch)=>`translate3d(${x.toFixed(3)}px,${y.toFixed(3)}px,0) rotateZ(${r.toFixed(3)}deg) rotateY(${yaw.toFixed(3)}deg) rotateX(${pitch.toFixed(3)}deg)`;
    const start=transform(localX,localY,rotation,turn,7);
    const frames=[{offset:0,transform:start,opacity:0},{offset:.03,transform:start,opacity:.97},{offset:.20,transform:start,opacity:.97}];
    for(let sample=1;sample<=40;sample++){
      const t=sample/40;
      const x=localX-recoil*(1-Math.exp(-3*t))/(1-Math.exp(-3));
      const y=localY-kick*t+(fall+kick)*t*t;
      frames.push({offset:.20+.80*t,transform:transform(x,y,rotation+spin*t,turn+18*Math.sin(t*Math.PI*3),7+12*Math.sin(t*Math.PI*2)),opacity:t<.72?.97:.97*(1-t)/.28});
    }
    note.style.setProperty('--note-x',`${localX}px`);
    note.style.setProperty('--note-y',`${localY}px`);
    noteFlights.push({note,frames,delay,duration});
    note.style.setProperty('--note-size',`${size}px`);
    note.style.setProperty('--note-edge',palettes[colorIndex].edge);
    note.style.setProperty('--note-fill',palettes[colorIndex].fill);
    note.style.setProperty('--note-ink',palettes[colorIndex].ink);
    note.style.setProperty('--paper-turn',`${(index%2?1:-1)*12}deg`);
    arrow.append(note);
    });
    layer.append(arrow);
    // Each arrow hits as one group; its notes scatter only after contact.
      const pulse = document.createElement('span');pulse.className='shield-impact';
      pulse.style.left=`${contactX}px`;pulse.style.top=`${hitY+size*.245}px`;
      pulse.style.setProperty('--impact-delay',`${delay+duration*.20}ms`);
      layer.append(pulse);
      const glow=document.createElement('span');glow.className='shield-hit-glow';
      glow.style.setProperty('--impact-delay',`${delay+duration*.20}ms`);
      layer.append(glow);
  }
  document.body.append(layer);
  const runningNotes=noteFlights.map(({note,frames,delay,duration})=>note.animate(frames,{duration,delay,easing:'linear',fill:'both'}));
  let timer;
  const stop = () => {
    runningNotes.forEach(animation=>animation.cancel());
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
// All fitted sections reserve both rows of the mobile bottom dock.
window.pa05BottomInset=()=>{
 const nav=siteHeader.querySelector('nav'),help=document.querySelector('.mobile-help');
 const navHeight=mobileHeaderMedia.matches?nav.getBoundingClientRect().height:0;
 document.documentElement.style.setProperty('--mobile-nav-height',`${navHeight}px`);
 return navHeight+(help&&getComputedStyle(help).display!=='none'?help.getBoundingClientRect().height:0);
};

// Measure the opening view without changing its height when the brand collapses.
let homeHeaderHeight=siteHeader.getBoundingClientRect().height;
function fitOpeningView(){
  if(!siteHeader.classList.contains('is-compact'))homeHeaderHeight=siteHeader.getBoundingClientRect().height;
  const help=document.querySelector('.mobile-help');
  document.documentElement.style.setProperty('--home-header-height',`${homeHeaderHeight}px`);
  document.documentElement.style.setProperty('--home-help-height',`${window.pa05BottomInset()}px`);
}
const homeSizeObserver=new ResizeObserver(fitOpeningView);
homeSizeObserver.observe(siteHeader);homeSizeObserver.observe(siteHeader.querySelector('nav'));const homeHelp=document.querySelector('.mobile-help');if(homeHelp)homeSizeObserver.observe(homeHelp);
window.addEventListener('resize',fitOpeningView,{passive:true});fitOpeningView();
let coverFitFrame=0;
function fitHomeCover(){
 cancelAnimationFrame(coverFitFrame);coverFitFrame=requestAnimationFrame(()=>{
  if(!mobileHeaderMedia.matches)return;
  const grid=document.querySelector('.hero-grid'),title=grid.querySelector('h1'),intro=grid.querySelector('.hero-intro'),cover=grid.querySelector('.book-cover');
  const gap=parseFloat(getComputedStyle(grid).rowGap),landscape=innerWidth>600&&innerHeight<=520;
  const available=landscape?grid.clientHeight:grid.clientHeight-title.getBoundingClientRect().height-intro.getBoundingClientRect().height-2*gap;
  const columnWidth=landscape?grid.clientWidth/2.6:grid.clientWidth;
  const imageWidth=Math.max(40,Math.min(columnWidth-8,(available-8)*480/681));
  cover.style.setProperty('--home-book-width',`${imageWidth+8}px`);
  cover.style.setProperty('--home-book-height',`${imageWidth*681/480+8}px`);
 });
}
const coverSizeObserver=new ResizeObserver(fitHomeCover);coverSizeObserver.observe(document.querySelector('.hero-grid'));coverSizeObserver.observe(document.querySelector('.hero h1'));coverSizeObserver.observe(document.querySelector('.hero-intro'));document.fonts.ready.then(fitHomeCover);fitHomeCover();

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


// === check-now.js ===
// One shared set of answers; the original desktop view and the mobile dialog render it.
(() => {
  const form=document.getElementById('risk-check');
  if(!form)return;
  const rules = {
    secret: {weight:25, serious:true, advice:'Không gửi mật khẩu, OTP hay mã PIN cho bất kỳ ai. Nếu đã lộ, liên hệ ngân hàng ngay qua số chính thức.'},
    link: {weight:20, serious:true, advice:'Không mở link, quét QR hay cài ứng dụng theo yêu cầu của người lạ. Tự mở ứng dụng hoặc website chính thức để kiểm tra.'},
    transfer: {weight:20, serious:true, advice:'Dừng chuyển tiền để “xác minh”, mở khóa hay nhận thưởng. Tên hoặc nickname người nhận không chứng minh yêu cầu là thật.'},
    account: {weight:15, serious:true, advice:'Không cho mượn, cho thuê, bán tài khoản hoặc mở hộ. Giữ SIM, thẻ và quyền truy cập tài khoản của mình.'},
    bill: {weight:10, serious:false, advice:'Ảnh chuyển tiền chưa chứng minh tiền đã vào. Chỉ giao hàng hoặc hoàn tiền khi tự kiểm tra giao dịch thực tế trong ứng dụng ngân hàng.'},
    pressure: {weight:10, serious:false, advice:'Dừng lại khi bị thúc giục. Gọi lại qua số đã biết; nhờ gia đình, thầy cô hoặc người tin cậy cùng kiểm tra.'}
  };

  const shortAdvice={
    secret:'Không gửi OTP, mật khẩu. Nếu đã lộ, gọi ngân hàng ngay.',
    link:'Không mở link, QR hay cài ứng dụng lạ. Dùng kênh chính thức.',
    transfer:'Dừng chuyển tiền “xác minh”. Gọi lại qua số chính thức.',
    account:'Không giao tài khoản, SIM, thẻ. Không cho thuê hay mở hộ.',
    bill:'Tự kiểm tra tiền vào trong ứng dụng ngân hàng rồi mới giao hàng.',
    pressure:'Đừng làm vội. Gọi lại qua số đã biết, nhờ người thân kiểm tra.'
  };
  const compactAdvice={
    secret:'Không gửi OTP, mật khẩu. Gọi ngân hàng nếu đã lộ.',
    link:'Không mở link, QR hay cài ứng dụng lạ.',
    transfer:'Không chuyển tiền “xác minh”. Gọi ngân hàng.',
    account:'Không giao, cho thuê hay mở hộ tài khoản.',
    bill:'Tự kiểm tra tiền vào rồi mới giao hàng.',
    pressure:'Gọi lại số đã biết. Nhờ người thân kiểm tra.'
  };
  const inputs=Array.from(form.querySelectorAll('input[type="checkbox"]'));
  const mobileForm=document.getElementById('mobile-risk-check');
  const mobileInputs=Array.from(mobileForm.querySelectorAll('input[type="checkbox"]'));
  const dialog=document.getElementById('mobile-checker');
  const mobileMedia=window.matchMedia('(max-width:800px), (max-width:1000px) and (hover:none) and (pointer:coarse)');
  const levels={
    unknown:['Chưa đủ thông tin','Chưa chọn dấu hiệu không có nghĩa là giao dịch an toàn. Hãy xác minh người nhận trước khi chuyển.'],
    caution:['Cần cảnh giác','Có dấu hiệu đáng ngờ. Tạm dừng giao dịch và kiểm tra thông tin qua kênh đã biết.'],
    elevated:['Rủi ro tăng','Nhiều dấu hiệu cần làm rõ. Đừng chuyển tiền hoặc giao hàng khi chưa tự xác minh.'],
    high:['Nguy cơ cao','Có yêu cầu nghiêm trọng hoặc nhiều dấu hiệu đáng ngờ. Dừng làm theo; xác minh qua kênh chính thức trước khi tiếp tục.']
  };
  let mobileTips=[],tipIndex=0,tipShown=1,tipPages=[0],opener=null;
  function renderTip(){
    const list=document.getElementById('mobile-advice-text');
    const adviceBox=document.querySelector('.mobile-check-advice');
    list.replaceChildren();tipShown=0;
    if(dialog.open){
      const style=getComputedStyle(adviceBox);
      const bottom=adviceBox.getBoundingClientRect().bottom-parseFloat(style.paddingBottom)-parseFloat(style.borderBottomWidth)-1;
      // Add as many complete tips as fit. Shorten only a single oversized tip.
      for(let position=tipIndex;position<mobileTips.length;position++){
        const tip=mobileTips[position],li=document.createElement('li');
        li.textContent=tip.full||tip.normal;list.append(li);
        if(li.getBoundingClientRect().bottom>bottom){
          li.remove();
          if(tipShown===0){
            list.append(li);
            for(const text of [...new Set([tip.full,tip.normal,tip.compact].filter(Boolean))]){
              li.textContent=text;
              if(li.getBoundingClientRect().bottom<=bottom)break;
            }
            tipShown=1;
          }
          break;
        }
        tipShown++;
      }
    }else{
      const li=document.createElement('li');li.textContent=mobileTips[tipIndex].normal;list.append(li);tipShown=1;
    }
    const end=tipIndex+tipShown;
    document.getElementById('mobile-advice-count').textContent=tipShown>1?`${tipIndex+1}–${end}/${mobileTips.length}`:`${tipIndex+1}/${mobileTips.length}`;
    document.getElementById('mobile-advice-prev').disabled=tipIndex===0;
    document.getElementById('mobile-advice-next').disabled=end>=mobileTips.length;
  }
  function fitMobileContent(){
    if(!dialog.open)return;
    const frame=dialog.firstElementChild;
    if(window.matchMedia('(orientation:portrait)').matches){
      const style=getComputedStyle(frame),gap=parseFloat(style.rowGap);
      const fixed=['.mobile-check-header','.mobile-check-score','.mobile-check-instruction','.mobile-check-controls','.mobile-check-note']
        .reduce((sum,selector)=>sum+frame.querySelector(selector).getBoundingClientRect().height,0);
      const minimumAdvice=parseFloat(style.getPropertyValue('--mobile-advice-min'))||132;
      const available=Math.max(0,frame.clientHeight-parseFloat(style.paddingTop)-parseFloat(style.paddingBottom)-6*gap-fixed-minimumAdvice);
      const choices=Array.from(dialog.querySelectorAll('.mobile-risk-choice'));
      const rowHeight=Math.max(...choices.map(choice=>{
        const tile=getComputedStyle(choice);
        return Math.ceil(choice.querySelector('strong').getBoundingClientRect().height+parseFloat(tile.paddingTop)+parseFloat(tile.paddingBottom)+parseFloat(tile.borderTopWidth)+parseFloat(tile.borderBottomWidth));
      }));
      const choiceGap=parseFloat(getComputedStyle(document.getElementById('mobile-check-choices')).rowGap);
      frame.style.setProperty('--mobile-choices-height',`${Math.min(available,3*rowHeight+2*choiceGap)}px`);
    }else frame.style.removeProperty('--mobile-choices-height');
    renderTip();
  }
  let fitFrame=0;
  function scheduleFit(){cancelAnimationFrame(fitFrame);fitFrame=requestAnimationFrame(fitMobileContent);}
  function update(announce=true){
    const selected=inputs.filter(input=>input.checked).map(input=>input.value);
    const chosen=selected.map(value=>rules[value]);
    const raw=chosen.reduce((sum,rule)=>sum+rule.weight,0);
    const score=chosen.some(rule=>rule.serious)?60+Math.round(raw*.4):raw;
    const level=!chosen.length?'unknown':score>=60?'high':score>=15?'elevated':'caution';
    const [title,message]=levels[level];
    inputs.forEach(input=>input.closest('.check-choice').classList.toggle('is-selected',input.checked));
    const result=document.getElementById('check-result');
    result.dataset.level=level;
    result.classList.toggle('has-risk',score>0);
    const pulseStrength=score/100;
    result.style.setProperty('--risk-pulse-peak',pulseStrength.toFixed(3));
    result.style.setProperty('--risk-pulse-floor',(pulseStrength*.16).toFixed(3));
    result.style.setProperty('--risk-pulse-duration',`${2400-1400*pulseStrength}ms`);
    result.style.setProperty('--risk-pulse-glow',`${4+12*pulseStrength}px`);
    document.getElementById('risk-score').textContent=String(score);
    document.getElementById('risk-meter-fill').style.width=`${score}%`;
    const meter=document.getElementById('risk-meter');
    meter.setAttribute('aria-valuenow',String(score));meter.setAttribute('aria-valuetext',`${score} trên 100. ${title}.`);
    document.getElementById('check-count').textContent=`Đã chọn ${chosen.length} / 6 dấu hiệu`;
    document.getElementById('check-result-heading').textContent=title;
    document.getElementById('check-result-text').textContent=message;
    document.getElementById('check-mobile-score').textContent=String(score);
    document.getElementById('check-mobile-level').textContent=title;
    document.getElementById('check-mobile-summary').dataset.level=level;
    const tips=chosen.length?chosen.map(rule=>rule.advice):['Gọi lại qua số đã biết để xác minh người nhận.','Tự kiểm tra giao dịch trong ứng dụng ngân hàng.'];
    document.getElementById('check-advice-list').replaceChildren(...tips.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));
    mobileInputs.forEach(input=>{input.checked=selected.includes(input.value);input.closest('.mobile-risk-choice').classList.toggle('is-selected',input.checked);});
    dialog.dataset.level=level;
    document.getElementById('mobile-risk-score').textContent=String(score);
    const mobileTitle=level==='unknown'?'Chưa chọn':title;
    document.getElementById('mobile-risk-level').textContent=mobileTitle;
    document.getElementById('mobile-risk-fill').style.width=`${score}%`;
    const mobileMeter=document.getElementById('mobile-risk-meter');
    mobileMeter.setAttribute('aria-valuenow',String(score));mobileMeter.setAttribute('aria-valuetext',`${score} trên 100. ${mobileTitle}.`);
    document.getElementById('mobile-check-count').textContent=`${chosen.length}/6`;
    mobileTips=selected.length?selected.map(value=>({full:rules[value].advice,normal:shortAdvice[value],compact:compactAdvice[value]})):[{full:'Chưa chọn dấu hiệu không có nghĩa là an toàn. Gọi lại qua số đã biết để xác minh người nhận. Tự kiểm tra thông tin trong ứng dụng ngân hàng trước khi chuyển tiền.',normal:'Gọi lại qua số đã biết để xác minh người nhận trước khi chuyển tiền.',compact:'Gọi lại số đã biết để xác minh người nhận.'}];
    const detail = {tips,message,brief:selected.length?selected.map(value=>shortAdvice[value]):tips,compact:selected.length?selected.map(value=>compactAdvice[value]):tips};
    form._lastCheckDetail = detail;
    form.dispatchEvent(new CustomEvent('checkupdated',{detail}));
    if(announce){
      const text=`Đã chọn ${chosen.length} dấu hiệu. Điểm cảnh báo ${score} trên 100. ${title}.`;
      document.getElementById('check-announcement').textContent=text;
      document.getElementById('mobile-check-announcement').textContent=text;
    }
  }
  function reset(){inputs.forEach(input=>input.checked=false);update();}
  form.addEventListener('submit',event=>event.preventDefault());
  form.addEventListener('change',()=>update());
  form.addEventListener('reset',reset);
  mobileForm.addEventListener('submit',event=>event.preventDefault());
  mobileForm.addEventListener('change',()=>{inputs.forEach(input=>input.checked=mobileInputs.find(mobile=>mobile.value===input.value).checked);update();});
  mobileForm.addEventListener('reset',event=>{event.preventDefault();reset();});
  document.getElementById('mobile-advice-prev').addEventListener('click',()=>{if(tipIndex>0){tipPages.pop();tipIndex=tipPages[tipPages.length-1]||0;renderTip();}});
  document.getElementById('mobile-advice-next').addEventListener('click',()=>{if(tipIndex+tipShown<mobileTips.length){tipIndex+=tipShown;tipPages.push(tipIndex);renderTip();}});
  document.getElementById('check-choices').disabled=false;
  document.getElementById('mobile-check-choices').disabled=false;
  document.getElementById('open-mobile-check').disabled=false;
  document.getElementById('check-result').hidden=false;
  document.getElementById('check-mobile-summary').hidden=false;
  update(false);
  window.addEventListener('resize',scheduleFit);
  new ResizeObserver(scheduleFit).observe(dialog.firstElementChild);
  new MutationObserver(scheduleFit).observe(document.documentElement,{attributes:true,attributeFilter:['class']});
  document.fonts.ready.then(scheduleFit);
  function openMobile(source){
    if(!mobileMedia.matches||dialog.open)return;
    opener=source||document.getElementById('open-mobile-check');
    document.body.classList.add('mobile-checker-open');document.documentElement.classList.add('mobile-checker-open');
    dialog.showModal();
    fitMobileContent();scheduleFit();
  }
  dialog.addEventListener('close',()=>{
    document.body.classList.remove('mobile-checker-open');document.documentElement.classList.remove('mobile-checker-open');
    if(opener&&opener.isConnected&&opener.getClientRects().length)opener.focus({preventScroll:true});opener=null;
  });
  document.getElementById('close-mobile-check').addEventListener('click',()=>dialog.close());
  document.getElementById('open-mobile-check').addEventListener('click',event=>openMobile(event.currentTarget));
  document.querySelectorAll('a[href="#kiem-tra"]').forEach(link=>link.addEventListener('click',event=>{
    if(!mobileMedia.matches||event.button||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
    event.preventDefault();if(location.hash!=='#kiem-tra')history.pushState(null,'','#kiem-tra');
    document.getElementById('kiem-tra').scrollIntoView({behavior:'instant'});openMobile(link);
  }));
  document.getElementById('mobile-check-help').addEventListener('click',event=>{
    event.preventDefault();opener=null;dialog.close();history.pushState(null,'','#can-ho-tro');
    document.getElementById('can-ho-tro').scrollIntoView({behavior:'instant'});
    const heading=document.getElementById('help-heading');heading.tabIndex=-1;heading.focus({preventScroll:true});
  });
  window.addEventListener('popstate',()=>{if(dialog.open&&location.hash!=='#kiem-tra')dialog.close();});
  const onMedia=()=>{if(!mobileMedia.matches&&dialog.open)dialog.close();};
  if(typeof mobileMedia.addEventListener==='function')mobileMedia.addEventListener('change',onMedia);else mobileMedia.addListener(onMedia);
  const start=()=>{if(location.hash==='#kiem-tra')requestAnimationFrame(()=>requestAnimationFrame(()=>openMobile()));};
  if(document.readyState==='complete')start();else window.addEventListener('load',start,{once:true});
})();


// === check-desktop-fit.js ===
(() => {
  const screen=document.querySelector('.desktop-check-screen');
  const section=document.getElementById('kiem-tra');
  const form=document.getElementById('risk-check');
  const header=document.querySelector('.site-header');
  const list=document.getElementById('check-advice-list');
  const advice=screen.querySelector('.check-advice');
  const previous=document.getElementById('desktop-advice-prev');
  const next=document.getElementById('desktop-advice-next');
  const count=document.getElementById('desktop-advice-count');
  const summary=document.getElementById('check-result-text');
  let fullMessage=summary.textContent;
  const briefLevels={unknown:'Chưa chọn dấu hiệu không có nghĩa là an toàn.',caution:'Tạm dừng, kiểm tra qua kênh đã biết.',elevated:'Chưa chuyển tiền hoặc giao hàng khi chưa xác minh.',high:'Dừng giao dịch. Xác minh qua kênh chính thức.'};
  let tips=Array.from(list.children,li=>li.textContent),brief=tips,compact=tips;
  let index=0,shown=1,pageHistory=[0],frame=0,alignmentUntil=0,lastDesktop=null;
  const isDesktop=()=>getComputedStyle(document.querySelector('.check-desktop')).display!=='none';
  function renderAdvice(){
    if(!isDesktop())return;
    list.replaceChildren();
    const style=getComputedStyle(advice);
    const bottom=advice.getBoundingClientRect().bottom-parseFloat(style.paddingBottom)-parseFloat(style.borderBottomWidth)-1;
    shown=0;
    for(let position=index;position<tips.length;position++){
      const li=document.createElement('li');li.textContent=tips[position];list.append(li);
      if(li.getBoundingClientRect().bottom>bottom){
        li.remove();
        if(shown===0){
          list.append(li);
          for(const text of [...new Set([tips[position],brief[position],compact[position]].filter(Boolean))]){
            li.textContent=text;
            if(li.getBoundingClientRect().bottom<=bottom)break;
          }
          shown=1;
        }
        break;
      }
      shown++;
    }
    const end=index+shown;
    count.textContent=shown>1?`${index+1}–${end} / ${tips.length}`:`${index+1} / ${tips.length}`;
    previous.disabled=index===0;next.disabled=end>=tips.length;
  }
  function align(){section.scrollIntoView({behavior:'instant',block:'start'});}
  function fit(){
    const enabled=isDesktop();
    if(enabled&&lastDesktop===false&&location.hash==='#kiem-tra')alignmentUntil=performance.now()+1000;
    lastDesktop=enabled;
    if(document.documentElement.classList.contains('desktop-check-fit-enabled')!==enabled)document.documentElement.classList.toggle('desktop-check-fit-enabled',enabled);
    if(!enabled)return;
    const oldTop=section.getBoundingClientRect().top;
    const headerHeight=Math.ceil(header.getBoundingClientRect().height);
    document.documentElement.style.setProperty('--desktop-check-header-height',`${headerHeight}px`);
    // Measure the same starting layout each time so density cannot oscillate.
    screen.dataset.density='comfortable';
    const shortScreen=screen.querySelector('.check-layout').getBoundingClientRect().height<420;
    const tooTall=Array.from(screen.querySelectorAll('.check-choice')).some(tile=>{
      const text=tile.querySelector('span').getBoundingClientRect(),box=tile.getBoundingClientRect();
      return text.top<box.top+3||text.bottom>box.bottom-3;
    });
    if(shortScreen||tooTall)screen.dataset.density='compact';
    summary.textContent=screen.dataset.density==='compact'?briefLevels[document.getElementById('check-result').dataset.level]:fullMessage;
    renderAdvice();
    if(location.hash==='#kiem-tra'&&(performance.now()<alignmentUntil||Math.abs(oldTop-headerHeight)<60))align();
  }
  function scheduleFit(){cancelAnimationFrame(frame);frame=requestAnimationFrame(fit);}
  function handleCheckUpdate(detail){
    tips=detail.tips;brief=detail.brief;compact=detail.compact;
    fullMessage=detail.message;
    index=0;pageHistory=[0];fit();
  }
  form.addEventListener('checkupdated',event=>handleCheckUpdate(event.detail));
  if(form._lastCheckDetail)handleCheckUpdate(form._lastCheckDetail);
  previous.addEventListener('click',()=>{if(index===0)return;pageHistory.pop();index=pageHistory[pageHistory.length-1]||0;renderAdvice();});
  next.addEventListener('click',()=>{if(index+shown>=tips.length)return;index+=shown;pageHistory.push(index);renderAdvice();});
  document.querySelectorAll('a[href="#kiem-tra"]').forEach(link=>link.addEventListener('click',event=>{
    if(!isDesktop()||event.button||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
    event.preventDefault();if(location.hash!=='#kiem-tra')window.history.pushState(null,'','#kiem-tra');
    alignmentUntil=performance.now()+1000;
    fit();align();
  }));
  window.addEventListener('resize',scheduleFit);
  window.addEventListener('wheel',()=>{alignmentUntil=0;},{passive:true});
  window.addEventListener('hashchange',()=>{if(isDesktop()&&location.hash==='#kiem-tra'){fit();align();}});
  new ResizeObserver(scheduleFit).observe(header);
  new ResizeObserver(scheduleFit).observe(screen);
  new MutationObserver(scheduleFit).observe(document.documentElement,{attributes:true,attributeFilter:['class']});
  document.fonts.ready.then(()=>{fit();if(isDesktop()&&location.hash==='#kiem-tra')align();});
  const start=()=>{fit();if(isDesktop()&&location.hash==='#kiem-tra')align();};
  if(document.readyState==='complete')start();else window.addEventListener('load',start,{once:true});
})();


// === poster-strip.js ===
(() => {
 const section=document.getElementById('ap-phich'),track=section.querySelector('.poster-grid'),header=document.querySelector('.site-header'),help=document.querySelector('.mobile-help');
 const previous=document.getElementById('poster-strip-previous'),next=document.getElementById('poster-strip-next'),position=document.getElementById('poster-strip-position'),searchPanel=section.querySelector('.poster-search-panel');
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');
 const visible=()=>[...track.querySelectorAll('.poster-card')].filter(card=>!card.hidden);
 function index(){const list=visible(),left=track.getBoundingClientRect().left;return list.reduce((best,card,i)=>Math.abs(card.getBoundingClientRect().left-left)<Math.abs(list[best].getBoundingClientRect().left-left)?i:best,0);}
 function status(){const list=visible(),i=index();position.textContent=list.length?`${i+1} / ${list.length}`:'0 / 0';previous.disabled=!list.length||track.scrollLeft<3;next.disabled=!list.length||track.scrollLeft>=track.scrollWidth-track.clientWidth-3;}
 function fit(){section.style.setProperty('--poster-header-height',`${header.getBoundingClientRect().height}px`);section.style.setProperty('--poster-help-height',`${window.pa05BottomInset()}px`);status();}
 function show(card){if(!card)return;const left=card.getBoundingClientRect().left-track.getBoundingClientRect().left+track.scrollLeft-2;track.scrollTo({left,behavior:reduced.matches?'instant':'smooth'});}
 previous.addEventListener('click',()=>show(visible()[Math.max(0,index()-1)]));
 next.addEventListener('click',()=>show(visible()[Math.min(visible().length-1,index()+1)]));
 track.addEventListener('scroll',status,{passive:true});
 track.addEventListener('keydown',event=>{if(event.target!==track)return;if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();(event.key==='ArrowRight'?next:previous).click();}});
 const observer=new ResizeObserver(fit);observer.observe(header);observer.observe(header.querySelector('nav'));observer.observe(track);if(help)observer.observe(help);
 new MutationObserver(()=>{track.scrollTo({left:0,behavior:'instant'});status();}).observe(track,{subtree:true,attributes:true,attributeFilter:['hidden']});
 function align(){window.scrollTo({top:section.getBoundingClientRect().top+scrollY-header.getBoundingClientRect().height,behavior:'instant'});}
 document.querySelectorAll('a[href="#ap-phich"],a[href^="#poster-"]').forEach(link=>link.addEventListener('click',event=>{
  event.preventDefault();searchPanel.open=false;history.pushState(null,'',link.getAttribute('href'));align();requestAnimationFrame(()=>requestAnimationFrame(()=>{fit();align();if(link.hash.startsWith('#poster-'))show(document.querySelector(link.hash));}));
 }));
 document.addEventListener('click',event=>{if(searchPanel.open&&!searchPanel.contains(event.target))searchPanel.open=false;});
 searchPanel.addEventListener('keydown',event=>{if(event.key==='Escape'){searchPanel.open=false;searchPanel.querySelector('summary').focus();}});
 window.addEventListener('resize',()=>{fit();if(header.querySelector('a[href="#ap-phich"][aria-current]'))align();},{passive:true});
 if(location.hash==='#ap-phich'||location.hash.startsWith('#poster-'))window.addEventListener('load',()=>requestAnimationFrame(()=>requestAnimationFrame(()=>{fit();align();if(location.hash.startsWith('#poster-'))show(document.querySelector(location.hash));})));
 fit();
})();


// === book-fit.js ===
(() => {
 const section=document.getElementById('cam-nang'),header=document.querySelector('.site-header'),help=document.querySelector('.mobile-help'),chapters=[...section.querySelectorAll('.chapter')];
 const dialog=document.createElement('dialog');dialog.className='book-reader';dialog.id='book-reader';dialog.setAttribute('aria-labelledby','book-reader-title');dialog.innerHTML='<div class="book-reader-header"><h2 id="book-reader-title"></h2><button type="button" aria-label="Đóng nội dung chủ đề">Đóng ×</button></div><div class="book-reader-content"></div>';document.body.append(dialog);
 const content=dialog.querySelector('.book-reader-content');let opener=null;
 function open(node,title,trigger){opener=trigger;dialog.querySelector('h2').textContent=title;content.replaceChildren(node.cloneNode(true));content.scrollTop=0;dialog.showModal();document.body.classList.add('book-reading');}
 dialog.querySelector('button').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('close',()=>{content.replaceChildren();document.body.classList.remove('book-reading');opener?.focus({preventScroll:true});opener=null;});
 // Forward clicks on links inside reader to original targets
 content.addEventListener('click',event=>{
  const link=event.target.closest('a');
  if(!link)return;
  if(link.dataset.view){
   event.preventDefault();
   const original=document.querySelector(`[data-view="${link.dataset.view}"][data-index="${link.dataset.index}"]`);
   dialog.close();
   if(original){
    requestAnimationFrame(()=>original.click());
   }
   return;
  }
  const href=link.getAttribute('href');
  if(href&&href.startsWith('#')){
   event.preventDefault();
   dialog.close();
   const target=document.querySelector(href);
   if(target){
    requestAnimationFrame(()=>{
     target.scrollIntoView({behavior:'smooth'});
     target.focus?.({preventScroll:true});
    });
   }
   return;
  }
 });
 window.addEventListener('beforeprint',()=>{if(dialog.open)dialog.close();});
 chapters.forEach(chapter=>{chapter.open=false;const summary=chapter.querySelector('summary');summary.setAttribute('aria-haspopup','dialog');summary.setAttribute('aria-controls','book-reader');summary.addEventListener('click',event=>{event.preventDefault();open(chapter.querySelector('.chapter-body'),summary.children[1].textContent,summary);});});
 const note=section.querySelector('.student-note'),tip=document.createElement('button');tip.className='book-student-tip';tip.type='button';tip.setAttribute('aria-haspopup','dialog');tip.setAttribute('aria-controls','book-reader');tip.innerHTML='Gửi học sinh, sinh viên <span aria-hidden="true">↗</span>';note.after(tip);note.hidden=true;tip.addEventListener('click',()=>open(note,'Gửi học sinh, sinh viên',tip));
 function fit(){section.style.setProperty('--book-header-height',`${header.getBoundingClientRect().height}px`);section.style.setProperty('--book-help-height',`${window.pa05BottomInset()}px`);}
 function align(){window.scrollTo({top:section.getBoundingClientRect().top+scrollY-header.getBoundingClientRect().height,behavior:'instant'});}
 const observer=new ResizeObserver(fit);observer.observe(header);observer.observe(header.querySelector('nav'));if(help)observer.observe(help);
 document.querySelectorAll('a[href="#cam-nang"]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();history.pushState(null,'','#cam-nang');align();requestAnimationFrame(()=>requestAnimationFrame(()=>{fit();align();}));}));
 window.addEventListener('resize',()=>{fit();if(header.querySelector('a[href="#cam-nang"][aria-current]'))align();},{passive:true});
 if(location.hash==='#cam-nang')window.addEventListener('load',()=>requestAnimationFrame(()=>requestAnimationFrame(()=>{fit();align();})));
 fit();
})();


// === utility-fit.js ===
(() => {
 const header=document.querySelector('.site-header'),nav=header.querySelector('nav'),help=document.querySelector('.mobile-help'),sections=['can-ho-tro','tai-tai-lieu'].map(id=>document.getElementById(id));
 function fit(){const height=header.getBoundingClientRect().height,bottom=window.pa05BottomInset();sections.forEach(section=>{section.style.setProperty('--utility-header-height',`${height}px`);section.style.setProperty('--utility-bottom-height',`${bottom}px`);});}
 function align(section){fit();window.scrollTo({top:section.getBoundingClientRect().top+scrollY-header.getBoundingClientRect().height,behavior:'instant'});}
 function settle(section){align(section);requestAnimationFrame(()=>requestAnimationFrame(()=>align(section)));}
 document.querySelectorAll('a[href="#can-ho-tro"]:not(#mobile-check-help),a[href="#tai-tai-lieu"]').forEach(link=>link.addEventListener('click',event=>{if(event.button||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();if(location.hash!==link.hash)history.pushState(null,'',link.hash);settle(document.querySelector(link.hash));}));
 const observer=new ResizeObserver(fit);observer.observe(header);observer.observe(nav);if(help)observer.observe(help);
 function current(){return sections.find(section=>`#${section.id}`===location.hash);}
 window.addEventListener('resize',()=>{fit();const section=current();if(section){const rect=section.getBoundingClientRect();if(rect.top<innerHeight&&rect.bottom>0)settle(section);}},{passive:true});
 window.addEventListener('popstate',()=>{const section=current();if(section)settle(section);});
 window.addEventListener('load',()=>{fit();const section=current();if(section)settle(section);});fit();
})();

