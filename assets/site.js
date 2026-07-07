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

// 全站會員登入狀態顯示：依 Supabase Auth 的登入狀態，更新導覽列的會員入口文字/連結
function applyMemberNavSession(session) {
  const user = session && session.user ? session.user : null;
  document.querySelectorAll('.member-nav-link').forEach(link => {
    const label = link.querySelector('.member-nav-label');
    if (user) {
      const displayName = (user.user_metadata && user.user_metadata.display_name) || (user.email ? user.email.split('@')[0] : '會員');
      if (label) label.textContent = displayName;
      link.classList.add('is-logged-in');
    } else {
      if (label) label.textContent = '會員登入';
      link.classList.remove('is-logged-in');
    }
  });
}

async function initMemberNav() {
  if (typeof _supabase === 'undefined' || !_supabase) return;
  try {
    const { data } = await _supabase.auth.getSession();
    applyMemberNavSession(data ? data.session : null);
  } catch (err) { /* 尚未設定 Supabase Auth 或連線異常時，安靜地維持「會員登入」預設狀態 */ }
  _supabase.auth.onAuthStateChange((_event, session) => applyMemberNavSession(session));
}

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundParallax();
  initMemberNav();
});
