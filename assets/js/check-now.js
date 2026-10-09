'use strict';
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
    tipIndex=0;tipPages=[0];renderTip();
    form.dispatchEvent(new CustomEvent('checkupdated',{detail:{tips,message,brief:selected.length?selected.map(value=>shortAdvice[value]):tips,compact:selected.length?selected.map(value=>compactAdvice[value]):tips}}));
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
  function reflectFont(){document.getElementById('mobile-check-font').setAttribute('aria-pressed',String(document.documentElement.classList.contains('large-text')));}
  document.getElementById('mobile-check-font').addEventListener('click',()=>{document.querySelector('.font-toggle').click();reflectFont();});
  function openMobile(source){
    if(!mobileMedia.matches||dialog.open)return;
    opener=source||document.getElementById('open-mobile-check');reflectFont();
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
