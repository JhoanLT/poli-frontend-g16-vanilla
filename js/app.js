// Toast notification helper (global)
function showToast(message, duration = 2500) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => toast.classList.remove('show'), duration);
}

// Init footer (static, render once)
renderFooter();

// Load services from JSON, seed localStorage if empty, then start router
fetch('services.json')
  .then(res => res.json())
  .then(data => {
    if (!localStorage.getItem('poli-service-hub-services')) {
      localStorage.setItem('poli-service-hub-services', JSON.stringify(data));
    }
    window.addEventListener('hashchange', router);
    router();
  })
  .catch(() => {
    // Fallback: start router even if fetch fails (localStorage may already have data)
    window.addEventListener('hashchange', router);
    router();
  });
