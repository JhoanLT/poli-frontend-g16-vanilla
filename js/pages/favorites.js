function renderFavorites() {
  const favIds = getFavorites();
  const services = getServices();
  const favServices = services.filter(s => favIds.includes(s.id));

  document.getElementById('main').innerHTML = `
    <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">

      <div class="mb-10">
        <p class="text-xs font-bold uppercase tracking-widest text-coral">Guardados</p>
        <h1 class="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">Mis favoritos</h1>
        <p class="mt-2 text-slate">${favServices.length} servicio${favServices.length !== 1 ? 's' : ''} guardado${favServices.length !== 1 ? 's' : ''}</p>
      </div>

      ${favServices.length === 0 ? `
        <div class="flex flex-col items-center justify-center py-28 text-center">
          <p class="text-5xl">♡</p>
          <h2 class="mt-6 text-xl font-bold text-ink">Aun no tienes favoritos</h2>
          <p class="mt-2 text-sm text-slate">Explora el catalogo y guarda los servicios que mas te interesen.</p>
          <a href="#/servicios" class="btn-primary mt-8">Explorar servicios</a>
        </div>
      ` : `
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          ${favServices.map(s => serviceCardHTML(s)).join('')}
        </div>
      `}

    </div>
  `;

  bindFavButtons();
}
