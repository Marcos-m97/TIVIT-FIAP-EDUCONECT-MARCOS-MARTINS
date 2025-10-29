// ==============================================
// 🌗 Modo Claro / Escuro (funciona em todas as telas)
// ==============================================
const toggle = document.getElementById('toggleTheme');
const root = document.documentElement;

if (toggle) {
  let darkMode = localStorage.getItem('educonnect_tema') === 'dark';

  // aplica o tema inicial
  const aplicarTema = () => {
    if (darkMode) {
      root.style.setProperty('--bg', '#0f1220');
      root.style.setProperty('--card', '#171b31');
      root.style.setProperty('--text', '#e6e8f0');
      toggle.textContent = '🌙 Modo Escuro';
    } else {
      root.style.setProperty('--bg', '#f2f3f8');
      root.style.setProperty('--card', '#ffffff');
      root.style.setProperty('--text', '#111');
      toggle.textContent = '☀️ Modo Claro';
    }
  };

  aplicarTema();

  toggle.addEventListener('click', () => {
    darkMode = !darkMode;
    localStorage.setItem('educonnect_tema', darkMode ? 'dark' : 'light');
    aplicarTema();
  });
}

// ==============================================
// 🔐 Simulação de Login (só executa na tela de login)
// ==============================================
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Login realizado com sucesso! (simulação)');
    window.location.href = 'dashboard.html';
  });
}
