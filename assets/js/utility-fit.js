(() => {
  const header = document.querySelector('.site-header');
  const nav = header.querySelector('nav');
  const help = document.querySelector('.mobile-help');
  const sections = ['can-ho-tro', 'tai-tai-lieu'].map(id => document.getElementById(id)).filter(Boolean);

  function fit() {
    const height = header.getBoundingClientRect().height;
    const bottom = typeof window.pa05BottomInset === 'function' ? window.pa05BottomInset() : 0;
    sections.forEach(section => {
      section.style.setProperty('--utility-header-height', `${height}px`);
      section.style.setProperty('--utility-bottom-height', `${bottom}px`);
    });
  }

  function align(section) {
    if (!section) return;
    fit();
    window.scrollTo({
      top: section.getBoundingClientRect().top + scrollY - header.getBoundingClientRect().height,
      behavior: 'instant'
    });
  }

  function settle(section) {
    if (!section) return;
    align(section);
    requestAnimationFrame(() => requestAnimationFrame(() => align(section)));
  }

  document.querySelectorAll('a[href="#can-ho-tro"]:not(#mobile-check-help), a[href="#tai-tai-lieu"]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.button || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      if (location.hash !== link.hash) history.pushState(null, '', link.hash);
      settle(document.querySelector(link.hash));
    });
  });

  const observer = new ResizeObserver(fit);
  observer.observe(header);
  observer.observe(nav);
  if (help) observer.observe(help);

  function current() {
    return sections.find(section => `#${section.id}` === location.hash);
  }

  let lastWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    fit();
    const currentWidth = window.innerWidth;
    // Only realign when viewport width changes significantly (e.g. device rotation), NOT during vertical scroll toolbar collapse
    if (Math.abs(currentWidth - lastWidth) > 30) {
      lastWidth = currentWidth;
      const section = current();
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < innerHeight && rect.bottom > 0) settle(section);
      }
    }
  }, { passive: true });

  window.addEventListener('popstate', () => {
    const section = current();
    if (section) settle(section);
  });

  window.addEventListener('load', () => {
    fit();
    const section = current();
    if (section) settle(section);
  });

  fit();
})();
