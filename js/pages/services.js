const categories = ['Todos', 'Educativo', 'Tecnologico', 'Turistico', 'Comercial'];

let currentFilter = 'Todos';
let searchQuery = '';

function renderServices() {
  document.getElementById('main').innerHTML = `
    <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">

      <!-- Header -->
      <div class="mb-10">
        <p class="text-xs font-bold uppercase tracking-widest text-coral">Catalogo</p>
        <h1 class="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">Todos los servicios</h1>
        <p class="mt-2 text-slate">Explora y guarda los que mas te interesen.</p>
      </div>

      <!-- Search + filters -->
      <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          id="search-input"
          type="search"
          placeholder="Buscar servicios..."
          value="${searchQuery}"
          class="input sm:max-w-xs"
        />
        <div class="flex flex-wrap gap-2">
          ${categories.map(cat => `
            <button
              class="filter-btn rounded-full px-4 py-1.5 text-sm font-semibold transition
                ${currentFilter === cat
                  ? 'bg-ink text-cream'
                  : 'border border-sand bg-white/60 text-slate hover:bg-sand/40'}"
              data-cat="${cat}"
            >${cat}</button>
          `).join('')}
        </div>
      </div>

      <!-- Grid -->
      <div id="services-grid" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"></div>

    </div>
  `;

  renderServicesGrid();

  // Search
  document.getElementById('search-input').addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderServicesGrid();
  });

  // Filters
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.cat;
      document.querySelectorAll('.filter-btn').forEach(b => {
        const active = b.dataset.cat === currentFilter;
        b.className = `filter-btn rounded-full px-4 py-1.5 text-sm font-semibold transition ${
          active ? 'bg-ink text-cream' : 'border border-sand bg-white/60 text-slate hover:bg-sand/40'
        }`;
      });
      renderServicesGrid();
    });
  });
}

function renderServicesGrid() {
  let services = getServices();

  if (currentFilter !== 'Todos') {
    services = services.filter(s => s.category === currentFilter);
  }
  if (searchQuery.trim()) {
    const q = searchQuery.trim().toLowerCase();
    services = services.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.shortDescription.toLowerCase().includes(q) ||
      s.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  const grid = document.getElementById('services-grid');
  if (!services.length) {
    grid.innerHTML = `
      <div class="col-span-full py-20 text-center">
        <p class="text-4xl">🔍</p>
        <p class="mt-4 font-semibold text-ink">Sin resultados</p>
        <p class="mt-1 text-sm text-slate">Intenta con otro filtro o termino de busqueda.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = services.map(s => serviceCardHTML(s)).join('');
  bindFavButtons();
}
