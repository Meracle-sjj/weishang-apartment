/**
 * [INPUT]: index.html 的章节锚点、data-lightbox 图片链接与原生 dialog。
 * [OUTPUT]: 当前章节状态、阅读进度及可通过 Esc/外部点击关闭的原图预览。
 * [POS]: 静态内容的渐进增强层；不生成正文，不替代原生锚点或原图链接。
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

/* -- 阅读位置：由滚动位置决定，不依赖动画时长 -- */
const header = document.querySelector('.site-header');
const sections = [...document.querySelectorAll('main > section[id]')];
const navigation = [...document.querySelectorAll('.main-nav a')];
let updateScheduled = false;

function updateReadingPosition() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? Math.min(100, Math.max(0, window.scrollY / scrollable * 100)) : 0;
  header.style.setProperty('--reading-progress', `${progress}%`);
  const threshold = header.offsetHeight + 100;
  const current = [...sections].reverse().find(section => section.getBoundingClientRect().top <= threshold);
  navigation.forEach(link => {
    if (current && link.hash === `#${current.id}`) {
      link.setAttribute('aria-current', 'location');
    } else {
      link.removeAttribute('aria-current');
    }
  });
  updateScheduled = false;
}

function scheduleReadingUpdate() {
  if (updateScheduled) return;
  updateScheduled = true;
  window.requestAnimationFrame(updateReadingPosition);
}

window.addEventListener('scroll', scheduleReadingUpdate, { passive: true });
window.addEventListener('resize', scheduleReadingUpdate);
window.addEventListener('load', scheduleReadingUpdate);
updateReadingPosition();

/* -- 原图预览：不支持 dialog 的浏览器直接打开原图 -- */
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('.lightbox-image');
const lightboxTitle = lightbox.querySelector('#lightbox-title');

if (typeof lightbox.showModal === 'function') {
  document.querySelectorAll('[data-lightbox]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      lightboxImage.src = link.href;
      lightboxImage.alt = link.querySelector('img').alt;
      lightboxTitle.textContent = link.dataset.title;
      lightbox.showModal();
    });
  });

  lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', event => {
    if (event.target !== lightbox) return;
    const bounds = lightbox.getBoundingClientRect();
    const isOutside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
    if (isOutside) lightbox.close();
  });
  lightbox.addEventListener('close', () => lightboxImage.removeAttribute('src'));
}
