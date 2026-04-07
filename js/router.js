const routes = {
  '/'          : renderHome,
  '/servicios' : renderServices,
  '/favoritos' : renderFavorites,
  '/contacto'  : renderContact,
  '/gestion'   : renderAdmin,
};

function getRoute() {
  const hash = window.location.hash.replace('#', '') || '/';
  // Check for service detail: /servicios/:id
  const detailMatch = hash.match(/^\/servicios\/(.+)$/);
  if (detailMatch) return { name: '/servicios/:id', param: detailMatch[1] };
  return { name: hash, param: null };
}

function navigate(path) {
  window.location.hash = path;
}

function router() {
  const { name, param } = getRoute();

  // Re-render header to update active link
  renderHeader();

  const main = document.getElementById('main');
  // Trigger CSS re-animation
  main.style.animation = 'none';
  main.offsetHeight; // reflow
  main.style.animation = '';

  if (name === '/servicios/:id') {
    renderServiceDetail(param);
    return;
  }

  const handler = routes[name];
  if (handler) {
    handler();
  } else {
    renderNotFound();
  }
}

function renderHeader() {
  const hash = window.location.hash.replace('#', '') || '/';
  const navLinks = [
    { path: '/',          label: 'Inicio' },
    { path: '/servicios', label: 'Servicios' },
    { path: '/favoritos', label: 'Favoritos' },
    { path: '/contacto',  label: 'Contacto' },
    { path: '/gestion',   label: 'Gestion' },
  ];

  const favCount = getFavorites().length;

  document.getElementById('header').innerHTML = `
    <nav class="sticky top-0 z-50 border-b border-sand/60 bg-cream/80 backdrop-blur-md">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#/" class="font-display text-lg font-bold text-ink">
          Poli<span class="text-coral">Service</span>Hub
        </a>

        <!-- Desktop nav -->
        <ul class="hidden items-center gap-6 md:flex">
          ${navLinks.map(link => `
            <li>
              <a href="#${link.path}"
                 class="nav-link text-sm font-medium text-slate transition hover:text-coral ${hash === link.path ? 'active' : ''}"
              >${link.label}${link.path === '/favoritos' && favCount > 0 ? `
                <span class="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-coral text-[10px] font-bold text-white">${favCount}</span>
              ` : ''}</a>
            </li>
          `).join('')}
        </ul>

        <!-- Mobile hamburger -->
        <button id="menu-toggle" class="flex flex-col gap-1 p-2 md:hidden" aria-label="Menu">
          <span class="block h-0.5 w-5 bg-ink"></span>
          <span class="block h-0.5 w-5 bg-ink"></span>
          <span class="block h-0.5 w-5 bg-ink"></span>
        </button>
      </div>

      <!-- Mobile menu -->
      <div id="mobile-menu" class="hidden flex-col gap-1 border-t border-sand/60 bg-cream px-4 py-3 md:hidden">
        ${navLinks.map(link => `
          <a href="#${link.path}"
             class="nav-link block rounded-xl px-3 py-2 text-sm font-medium text-slate transition hover:bg-sand/40 hover:text-coral ${hash === link.path ? 'active' : ''}"
          >${link.label}</a>
        `).join('')}
      </div>
    </nav>
  `;

  document.getElementById('menu-toggle').addEventListener('click', () => {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('open');
    menu.classList.toggle('hidden');
  });
}

function renderFooter() {
  document.getElementById('footer').innerHTML = `
    <footer class="mt-24 border-t border-sand/60 bg-ink py-12 text-cream">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <div class="flex flex-col items-start justify-between gap-8 md:flex-row">
          <div>
            <p class="font-display text-lg font-bold">
              Poli<span class="text-coral">Service</span>Hub
            </p>
            <p class="mt-2 max-w-xs text-sm text-cream/60">
              Prototipo funcional desarrollado para la asignatura de Programacion Web.
            </p>
          </div>
          <div class="flex flex-col gap-2 text-sm text-cream/60">
            <p class="font-semibold text-cream">Navegacion</p>
            <a href="#/servicios" class="transition hover:text-coral">Servicios</a>
            <a href="#/favoritos" class="transition hover:text-coral">Favoritos</a>
            <a href="#/contacto"  class="transition hover:text-coral">Contacto</a>
            <a href="#/gestion"   class="transition hover:text-coral">Gestion</a>
          </div>
        </div>
        <p class="mt-8 border-t border-cream/10 pt-6 text-center text-xs text-cream/40">
          &copy; 2025 Poli Service Hub · Grupo 16
        </p>
      </div>
    </footer>
  `;
}

function renderNotFound() {
  document.getElementById('main').innerHTML = `
    <div class="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-32 text-center sm:px-6">
      <p class="font-display text-6xl font-bold text-coral">404</p>
      <h1 class="mt-4 text-2xl font-bold text-ink">Pagina no encontrada</h1>
      <p class="mt-2 text-slate">La ruta que buscas no existe.</p>
      <a href="#/" class="btn-primary mt-8">Volver al inicio</a>
    </div>
  `;
}

// Router is started by app.js after services.json is fetched
