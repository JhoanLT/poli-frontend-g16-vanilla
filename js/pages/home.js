function renderHome() {
  const services = getServices();
  const featured = services.filter(s => s.featured).slice(0, 3);

  const stats = [
    { label: 'Servicios activos', value: services.length + '+' },
    { label: 'Categorias integradas', value: '4' },
    { label: 'Almacenamiento', value: 'LocalStorage' },
  ];

  document.getElementById('main').innerHTML = `
    <div class="space-y-20 pb-20">

      <!-- Hero -->
      <section class="mx-auto max-w-6xl px-4 sm:px-6 pt-10">
        <div class="grid gap-8 overflow-hidden rounded-[36px] bg-ink px-6 py-10 text-cream shadow-soft sm:px-10 lg:grid-cols-[1.2fr_0.8fr] lg:px-12 lg:py-14">
          <div>
            <p class="text-sm font-extrabold uppercase tracking-[0.25em] text-gold">
              Entrega 2 · prototipo funcional
            </p>
            <h1 class="mt-5 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Una plataforma para explorar servicios digitales sin sobrecargar la experiencia.
            </h1>
            <p class="mt-6 max-w-2xl text-base leading-7 text-cream/80">
              Poli Service Hub organiza experiencias educativas, tecnologicas, turisticas y
              comerciales en un catalogo claro, con detalle, favoritos, formulario de contacto y
              gestion basica de servicios.
            </p>
            <div class="mt-8 flex flex-wrap gap-4">
              <a href="#/servicios" class="btn-coral">Explorar servicios</a>
              <a href="#/gestion" class="btn-secondary border-cream/20 text-cream hover:bg-cream/10">Panel de gestion</a>
            </div>
          </div>
          <div class="flex flex-col justify-center gap-4">
            ${stats.map(stat => `
              <div class="rounded-2xl bg-white/5 px-6 py-4">
                <p class="font-display text-3xl font-bold text-coral">${stat.value}</p>
                <p class="mt-1 text-sm text-cream/70">${stat.label}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Featured services -->
      <section class="mx-auto max-w-6xl px-4 sm:px-6">
        <div class="mb-8 flex items-end justify-between">
          <div>
            <p class="text-xs font-bold uppercase tracking-widest text-coral">Destacados</p>
            <h2 class="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">Servicios destacados</h2>
          </div>
          <a href="#/servicios" class="btn-secondary hidden sm:inline-flex">Ver todos</a>
        </div>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          ${featured.map(s => serviceCardHTML(s)).join('')}
        </div>
        <div class="mt-6 text-center sm:hidden">
          <a href="#/servicios" class="btn-secondary">Ver todos los servicios</a>
        </div>
      </section>

      <!-- Testimonials -->
      <section class="mx-auto max-w-6xl px-4 sm:px-6">
        <div class="mb-8 text-center">
          <p class="text-xs font-bold uppercase tracking-widest text-coral">Opiniones</p>
          <h2 class="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">Lo que dicen los equipos</h2>
        </div>
        <div class="grid gap-6 md:grid-cols-2">
          <div class="rounded-2xl border border-sand bg-white/60 p-6 shadow-soft">
            <p class="text-sm leading-7 text-slate">"La propuesta permite mostrar contenido, validar interes del usuario y dejar clara la navegacion principal."</p>
            <p class="mt-4 text-sm font-bold text-ink">Equipo de innovacion academica</p>
          </div>
          <div class="rounded-2xl border border-sand bg-white/60 p-6 shadow-soft">
            <p class="text-sm leading-7 text-slate">"La seccion de gestion ayuda a demostrar el CRUD basico de una forma simple para la entrega."</p>
            <p class="mt-4 text-sm font-bold text-ink">Emprendimiento local</p>
          </div>
        </div>
      </section>

    </div>
  `;

  // Bind fav buttons
  bindFavButtons();
}

function serviceCardHTML(service) {
  const fav = isFavorite(service.id);
  return `
    <div class="service-card group flex flex-col overflow-hidden rounded-2xl border border-sand bg-white/70 shadow-soft">
      <div class="relative overflow-hidden">
        <img src="${service.image}" alt="${service.name}" class="h-44 w-full object-cover" />
        <button
          class="fav-btn absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow transition hover:scale-110 ${fav ? 'active' : ''}"
          data-id="${service.id}"
          aria-label="Guardar en favoritos"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="${fav ? '#F26A4B' : 'none'}" stroke="${fav ? '#F26A4B' : '#112033'}" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      <div class="flex flex-1 flex-col p-5">
        <span class="inline-block w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold badge-${service.category}">${service.category}</span>
        <h3 class="mt-3 font-display text-lg font-bold text-ink">${service.name}</h3>
        <p class="mt-1 flex-1 text-sm leading-6 text-slate">${service.shortDescription}</p>
        <div class="mt-4 flex items-center justify-between">
          <span class="text-sm font-semibold text-coral">${service.price}</span>
          <a href="#/servicios/${service.id}" class="btn-primary text-xs px-4 py-2">Ver detalle</a>
        </div>
      </div>
    </div>
  `;
}

function bindFavButtons() {
  document.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.dataset.id;
      const favs = toggleFavorite(id);
      const isFav = favs.includes(id);

      // Update button visually
      btn.classList.toggle('active', isFav);
      const svg = btn.querySelector('svg');
      svg.setAttribute('fill', isFav ? '#F26A4B' : 'none');
      svg.setAttribute('stroke', isFav ? '#F26A4B' : '#112033');

      showToast(isFav ? 'Guardado en favoritos' : 'Eliminado de favoritos');
      renderHeader(); // update fav count badge
    });
  });
}
