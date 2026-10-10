(() => {
 const section=document.getElementById('cam-nang'),header=document.querySelector('.site-header'),help=document.querySelector('.mobile-help'),chapters=[...section.querySelectorAll('.chapter')];
 const dialog=document.createElement('dialog');dialog.className='book-reader';dialog.id='book-reader';dialog.setAttribute('aria-labelledby','book-reader-title');dialog.innerHTML='<div class="book-reader-header"><h2 id="book-reader-title"></h2><button type="button" aria-label="Đóng nội dung chủ đề">Đóng ×</button></div><div class="book-reader-content"></div>';document.body.append(dialog);
 const content=dialog.querySelector('.book-reader-content');let originalParent=null,moved=null,opener=null;
 function open(node,parent,title,trigger){originalParent=parent;moved=node;opener=trigger;dialog.querySelector('h2').textContent=title;content.append(node);content.scrollTop=0;document.documentElement.classList.add('book-reading');dialog.showModal();document.body.classList.add('book-reading');}
 dialog.querySelector('button').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('close',()=>{if(moved)originalParent.append(moved);document.body.classList.remove('book-reading');document.documentElement.classList.remove('book-reading');opener?.focus({preventScroll:true});moved=null;});
 // Related posters already use the existing viewer; keep their handlers intact.
 content.addEventListener('click',event=>{if(event.target.closest('a'))dialog.close();});
 chapters.forEach(chapter=>{chapter.open=false;const summary=chapter.querySelector('summary');summary.setAttribute('aria-haspopup','dialog');summary.setAttribute('aria-controls','book-reader');summary.addEventListener('click',event=>{event.preventDefault();open(chapter.querySelector('.chapter-body'),chapter,summary.children[1].textContent,summary);});});
 const note=section.querySelector('.student-note'),tip=document.createElement('button'),holder=document.createElement('div');tip.className='book-student-tip';tip.type='button';tip.setAttribute('aria-haspopup','dialog');tip.setAttribute('aria-controls','book-reader');tip.innerHTML='Gửi học sinh, sinh viên <span aria-hidden="true">↗</span>';note.replaceWith(tip);holder.append(note);tip.addEventListener('click',()=>open(note,holder,'Gửi học sinh, sinh viên',tip));
 function fit(){section.style.setProperty('--book-header-height',`${header.getBoundingClientRect().height}px`);section.style.setProperty('--book-help-height',`${window.pa05BottomInset()}px`);}
 function align(){window.scrollTo({top:section.getBoundingClientRect().top+scrollY-header.getBoundingClientRect().height,behavior:'instant'});}
 const observer=new ResizeObserver(fit);observer.observe(header);observer.observe(header.querySelector('nav'));if(help)observer.observe(help);
 document.querySelectorAll('a[href="#cam-nang"]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();history.pushState(null,'','#cam-nang');align();requestAnimationFrame(()=>requestAnimationFrame(()=>{fit();align();}));}));
 window.addEventListener('resize',()=>{fit();if(header.querySelector('a[href="#cam-nang"][aria-current]'))align();},{passive:true});
 if(location.hash==='#cam-nang')window.addEventListener('load',()=>requestAnimationFrame(()=>requestAnimationFrame(()=>{fit();align();})));
 fit();
})();
