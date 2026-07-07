// ==================== 全站共用腳本：滑鼠微視差背景 + 手機版選單開關 ====================
function initBackgroundParallax() {
  const layer = document.getElementById('bgParallaxLayer');
  if (!layer) return;
  const maxShift = 18; // px，位移幅度越大效果越明顯
  let ticking = false;
  window.addEventListener('mousemove', (e) => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const xRatio = (e.clientX / window.innerWidth) - 0.5;
      const yRatio = (e.clientY / window.innerHeight) - 0.5;
      const x = -xRatio * maxShift * 2;
      const y = -yRatio * maxShift * 2;
      layer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      ticking = false;
    });
  });
}

function toggleMobileNav() {
  const menu = document.getElementById('mobileNavMenu');
  if (!menu) return;
  menu.classList.toggle('hidden');
}

document.addEventListener('DOMContentLoaded', initBackgroundParallax);
