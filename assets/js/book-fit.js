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
