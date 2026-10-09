'use strict';
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
