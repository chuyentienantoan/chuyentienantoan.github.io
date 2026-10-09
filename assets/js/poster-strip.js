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
