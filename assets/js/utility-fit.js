(() => {
 const header=document.querySelector('.site-header'),nav=header.querySelector('nav'),help=document.querySelector('.mobile-help'),sections=['can-ho-tro','tai-tai-lieu'].map(id=>document.getElementById(id));
 function fit(){const height=header.getBoundingClientRect().height,bottom=window.pa05BottomInset();sections.forEach(section=>{section.style.setProperty('--utility-header-height',`${height}px`);section.style.setProperty('--utility-bottom-height',`${bottom}px`);});}
 function align(section){fit();window.scrollTo({top:section.getBoundingClientRect().top+scrollY-header.getBoundingClientRect().height,behavior:'instant'});}
 function settle(section){align(section);requestAnimationFrame(()=>requestAnimationFrame(()=>align(section)));}
 document.querySelectorAll('a[href="#can-ho-tro"],a[href="#tai-tai-lieu"]').forEach(link=>link.addEventListener('click',event=>{if(event.button||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();if(location.hash!==link.hash)history.pushState(null,'',link.hash);settle(document.querySelector(link.hash));}));
 const observer=new ResizeObserver(fit);observer.observe(header);observer.observe(nav);if(help)observer.observe(help);
 function current(){return sections.find(section=>`#${section.id}`===location.hash);}
 window.addEventListener('resize',()=>{fit();const section=current();if(section){const rect=section.getBoundingClientRect();if(rect.top<innerHeight&&rect.bottom>0)settle(section);}},{passive:true});
 window.addEventListener('popstate',()=>{const section=current();if(section)settle(section);});
 window.addEventListener('load',()=>{fit();const section=current();if(section)settle(section);});fit();
})();
