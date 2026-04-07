function renderServiceDetail(id) {
  const service = getServiceById(id);

  if (!service) {
    document.getElementById('main').innerHTML = `
      <div class="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-32 text-center sm:px-6">
        <p class="font-display text-4xl font-bold text-coral">Servicio no encontrado</p>
        <a href="#/servicios" class="btn-primary mt-8">Volver al catalogo</a>
      </div>
    `;
    return;
  }

  const fav = isFavorite(service.id);

  document.getElementById('main').innerHTML = `
    <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">

      <!-- Breadcrumb -->
      <nav class="mb-8 flex items-center gap-2 text-sm text-slate">
        <a href="#/servicios" class="transition hover:text-coral">Servicios</a>
        <span>/</span>
        <span class="font-medium text-ink">${service.name}</span>
      </nav>

      <div class="grid gap-10 lg:grid-cols-[1fr_360px]">

        <!-- Main content -->
        <div>
          <span class="inline-block rounded-full px-3 py-1 text-xs font-semibold badge-${service.category}">${service.category}</span>
          <h1 class="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">${service.name}</h1>
          <p class="mt-3 text-base leading-7 text-slate">${service.description}</p>

          <img src="${service.image}" alt="${service.name}" class="mt-8 h-64 w-full rounded-2xl object-cover shadow-soft" />

          <!-- Benefits -->
          <div class="mt-10">
            <h2 class="font-display text-xl font-bold text-ink">Beneficios</h2>
            <ul class="mt-4 space-y-3">
              ${service.benefits.map(b => `
                <li class="flex items-start gap-3">
                  <span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-coral/10 text-coral text-xs font-bold">✓</span>
                  <span class="text-sm text-slate">${b}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- Tags -->
          <div class="mt-8 flex flex-wrap gap-2">
            ${service.tags.map(t => `
              <span class="rounded-full bg-sand px-3 py-1 text-xs font-medium text-slate">${t}</span>
            `).join('')}
          </div>
        </div>

        <!-- Sidebar -->
        <div class="flex flex-col gap-4">
          <div class="rounded-2xl border border-sand bg-white/80 p-6 shadow-soft">
            <p class="font-display text-2xl font-bold text-coral">${service.price}</p>
            <p class="mt-1 text-sm text-slate">Duracion: <strong>${service.duration}</strong></p>
            <p class="mt-1 text-sm text-slate">Ubicacion: <strong>${service.location}</strong></p>

            <div class="mt-6 flex flex-col gap-3">
              <a href="#/contacto" class="btn-coral w-full justify-center">Contactar</a>
              <button
                id="detail-fav-btn"
                class="btn-secondary w-full justify-center ${fav ? 'border-coral text-coral' : ''}"
              >
                ${fav ? 'En favoritos ♥' : 'Guardar en favoritos'}
              </button>
            </div>
          </div>

          <div class="rounded-2xl border border-sand bg-white/80 p-6 shadow-soft">
            <p class="text-sm font-semibold text-ink">Contacto directo</p>
            <a href="mailto:${service.contactEmail}" class="mt-1 block text-sm text-coral transition hover:underline">${service.contactEmail}</a>
          </div>
        </div>

      </div>
    </div>
  `;

  document.getElementById('detail-fav-btn').addEventListener('click', () => {
    const favs = toggleFavorite(service.id);
    const nowFav = favs.includes(service.id);
    const btn = document.getElementById('detail-fav-btn');
    btn.textContent = nowFav ? 'En favoritos ♥' : 'Guardar en favoritos';
    btn.classList.toggle('border-coral', nowFav);
    btn.classList.toggle('text-coral', nowFav);
    showToast(nowFav ? 'Guardado en favoritos' : 'Eliminado de favoritos');
    renderHeader();
  });
}
