const CATEGORIES = ['Educativo', 'Tecnologico', 'Turistico', 'Comercial'];

let editingId = null;

function renderAdmin() {
  const services = getServices();

  document.getElementById('main').innerHTML = `
    <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">

      <div class="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-xs font-bold uppercase tracking-widest text-coral">Panel</p>
          <h1 class="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">Gestion de servicios</h1>
          <p class="mt-2 text-slate">${services.length} servicio${services.length !== 1 ? 's' : ''} en el catalogo</p>
        </div>
        <button id="open-form-btn" class="btn-coral w-fit">+ Nuevo servicio</button>
      </div>

      <!-- Form (hidden by default) -->
      <div id="service-form-wrap" class="mb-10 hidden rounded-2xl border border-sand bg-white/80 p-6 shadow-soft">
        <h2 id="form-title" class="mb-6 font-display text-xl font-bold text-ink">Nuevo servicio</h2>
        <form id="service-form" novalidate class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="mb-1.5 block text-sm font-semibold text-ink" for="sf-name">Nombre *</label>
            <input id="sf-name" type="text" class="input" placeholder="Nombre del servicio" />
            <p class="mt-1 hidden text-xs text-red-500" id="sf-err-name"></p>
          </div>
          <div>
            <label class="mb-1.5 block text-sm font-semibold text-ink" for="sf-category">Categoria *</label>
            <select id="sf-category" class="input">
              ${CATEGORIES.map(c => `<option value="${c}">${c}</option>`).join('')}
            </select>
          </div>
          <div class="sm:col-span-2">
            <label class="mb-1.5 block text-sm font-semibold text-ink" for="sf-short">Descripcion corta *</label>
            <input id="sf-short" type="text" class="input" placeholder="Una linea que resume el servicio" />
            <p class="mt-1 hidden text-xs text-red-500" id="sf-err-short"></p>
          </div>
          <div class="sm:col-span-2">
            <label class="mb-1.5 block text-sm font-semibold text-ink" for="sf-desc">Descripcion completa *</label>
            <textarea id="sf-desc" rows="3" class="input resize-none" placeholder="Descripcion detallada del servicio"></textarea>
            <p class="mt-1 hidden text-xs text-red-500" id="sf-err-desc"></p>
          </div>
          <div>
            <label class="mb-1.5 block text-sm font-semibold text-ink" for="sf-price">Precio *</label>
            <input id="sf-price" type="text" class="input" placeholder="Ej: Desde $100.000 COP" />
            <p class="mt-1 hidden text-xs text-red-500" id="sf-err-price"></p>
          </div>
          <div>
            <label class="mb-1.5 block text-sm font-semibold text-ink" for="sf-duration">Duracion *</label>
            <input id="sf-duration" type="text" class="input" placeholder="Ej: 4 semanas" />
            <p class="mt-1 hidden text-xs text-red-500" id="sf-err-duration"></p>
          </div>
          <div>
            <label class="mb-1.5 block text-sm font-semibold text-ink" for="sf-location">Ubicacion *</label>
            <input id="sf-location" type="text" class="input" placeholder="Ej: Bogota, Colombia" />
            <p class="mt-1 hidden text-xs text-red-500" id="sf-err-location"></p>
          </div>
          <div>
            <label class="mb-1.5 block text-sm font-semibold text-ink" for="sf-image">URL de imagen</label>
            <input id="sf-image" type="text" class="input" placeholder="https://... (opcional)" />
          </div>
          <div class="sm:col-span-2 flex flex-wrap gap-3">
            <button type="submit" class="btn-coral">Guardar</button>
            <button type="button" id="cancel-form-btn" class="btn-secondary">Cancelar</button>
          </div>
        </form>
      </div>

      <!-- Services table -->
      <div class="overflow-x-auto rounded-2xl border border-sand bg-white/80 shadow-soft">
        <table class="w-full text-sm">
          <thead class="border-b border-sand bg-cream/60 text-left text-xs font-bold uppercase tracking-wider text-slate">
            <tr>
              <th class="px-5 py-4">Servicio</th>
              <th class="px-5 py-4 hidden sm:table-cell">Categoria</th>
              <th class="px-5 py-4 hidden md:table-cell">Precio</th>
              <th class="px-5 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody id="services-table-body">
            ${services.map(s => adminRowHTML(s)).join('')}
          </tbody>
        </table>
      </div>

    </div>

    <!-- Delete confirm modal -->
    <div id="delete-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-ink/40 backdrop-blur-sm">
      <div class="mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-soft">
        <h2 class="font-display text-lg font-bold text-ink">Eliminar servicio</h2>
        <p class="mt-2 text-sm text-slate">Esta accion no se puede deshacer. ¿Continuar?</p>
        <div class="mt-6 flex gap-3">
          <button id="confirm-delete-btn" class="btn-danger flex-1">Eliminar</button>
          <button id="cancel-delete-btn" class="btn-secondary flex-1">Cancelar</button>
        </div>
      </div>
    </div>
  `;

  bindAdminEvents();
}

function adminRowHTML(service) {
  return `
    <tr class="border-b border-sand/50 last:border-0 hover:bg-cream/30 transition" data-id="${service.id}">
      <td class="px-5 py-4">
        <p class="font-semibold text-ink">${service.name}</p>
        <p class="mt-0.5 text-xs text-slate line-clamp-1">${service.shortDescription}</p>
      </td>
      <td class="px-5 py-4 hidden sm:table-cell">
        <span class="rounded-full px-2.5 py-0.5 text-xs font-semibold badge-${service.category}">${service.category}</span>
      </td>
      <td class="px-5 py-4 hidden md:table-cell text-slate">${service.price}</td>
      <td class="px-5 py-4 text-right">
        <div class="flex items-center justify-end gap-2">
          <button class="edit-btn btn-secondary px-3 py-1.5 text-xs" data-id="${service.id}">Editar</button>
          <button class="delete-btn btn-danger px-3 py-1.5" data-id="${service.id}">✕</button>
        </div>
      </td>
    </tr>
  `;
}

function bindAdminEvents() {
  const formWrap = document.getElementById('service-form-wrap');
  const form     = document.getElementById('service-form');

  // Open new
  document.getElementById('open-form-btn').addEventListener('click', () => {
    editingId = null;
    document.getElementById('form-title').textContent = 'Nuevo servicio';
    form.reset();
    formWrap.classList.remove('hidden');
    formWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Cancel
  document.getElementById('cancel-form-btn').addEventListener('click', () => {
    formWrap.classList.add('hidden');
    editingId = null;
  });

  // Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateServiceForm()) return;

    const input = {
      name:             document.getElementById('sf-name').value.trim(),
      category:         document.getElementById('sf-category').value,
      shortDescription: document.getElementById('sf-short').value.trim(),
      description:      document.getElementById('sf-desc').value.trim(),
      price:            document.getElementById('sf-price').value.trim(),
      duration:         document.getElementById('sf-duration').value.trim(),
      location:         document.getElementById('sf-location').value.trim(),
      image:            document.getElementById('sf-image').value.trim(),
    };

    if (editingId) {
      updateService(editingId, input);
      showToast('Servicio actualizado');
    } else {
      createService(input);
      showToast('Servicio creado');
    }

    editingId = null;
    formWrap.classList.add('hidden');
    renderAdminTable();
  });

  // Edit buttons
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const service = getServiceById(btn.dataset.id);
      if (!service) return;
      editingId = service.id;
      document.getElementById('form-title').textContent = 'Editar servicio';
      document.getElementById('sf-name').value     = service.name;
      document.getElementById('sf-category').value = service.category;
      document.getElementById('sf-short').value    = service.shortDescription;
      document.getElementById('sf-desc').value     = service.description;
      document.getElementById('sf-price').value    = service.price;
      document.getElementById('sf-duration').value = service.duration;
      document.getElementById('sf-location').value = service.location;
      document.getElementById('sf-image').value    = service.image;
      formWrap.classList.remove('hidden');
      formWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Delete buttons
  let pendingDeleteId = null;
  const modal = document.getElementById('delete-modal');

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      pendingDeleteId = btn.dataset.id;
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    });
  });

  document.getElementById('cancel-delete-btn').addEventListener('click', () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    pendingDeleteId = null;
  });

  document.getElementById('confirm-delete-btn').addEventListener('click', () => {
    if (pendingDeleteId) {
      deleteService(pendingDeleteId);
      showToast('Servicio eliminado');
      pendingDeleteId = null;
    }
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    renderAdminTable();
  });
}

function renderAdminTable() {
  const services = getServices();
  const tbody = document.getElementById('services-table-body');
  if (!tbody) return;
  tbody.innerHTML = services.map(s => adminRowHTML(s)).join('');

  // Re-bind edit/delete buttons
  const formWrap = document.getElementById('service-form-wrap');
  const form = document.getElementById('service-form');

  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const service = getServiceById(btn.dataset.id);
      if (!service) return;
      editingId = service.id;
      document.getElementById('form-title').textContent = 'Editar servicio';
      document.getElementById('sf-name').value     = service.name;
      document.getElementById('sf-category').value = service.category;
      document.getElementById('sf-short').value    = service.shortDescription;
      document.getElementById('sf-desc').value     = service.description;
      document.getElementById('sf-price').value    = service.price;
      document.getElementById('sf-duration').value = service.duration;
      document.getElementById('sf-location').value = service.location;
      document.getElementById('sf-image').value    = service.image;
      formWrap.classList.remove('hidden');
      formWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  let pendingDeleteId = null;
  const modal = document.getElementById('delete-modal');

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      pendingDeleteId = btn.dataset.id;
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    });
  });

  document.getElementById('cancel-delete-btn').addEventListener('click', () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    pendingDeleteId = null;
  });

  document.getElementById('confirm-delete-btn').addEventListener('click', () => {
    if (pendingDeleteId) {
      deleteService(pendingDeleteId);
      showToast('Servicio eliminado');
      pendingDeleteId = null;
    }
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    renderAdminTable();
  });

  // Update count
  const countEl = document.querySelector('p.mt-2.text-slate');
  if (countEl) countEl.textContent = `${services.length} servicio${services.length !== 1 ? 's' : ''} en el catalogo`;
}

function validateServiceForm() {
  const fields = [
    { id: 'sf-name',  errId: 'sf-err-name',  label: 'El nombre',            minLen: 2 },
    { id: 'sf-short', errId: 'sf-err-short', label: 'La descripcion corta',  minLen: 5 },
    { id: 'sf-desc',  errId: 'sf-err-desc',  label: 'La descripcion',        minLen: 10 },
    { id: 'sf-price', errId: 'sf-err-price', label: 'El precio',             minLen: 2 },
    { id: 'sf-duration', errId: 'sf-err-duration', label: 'La duracion',     minLen: 1 },
    { id: 'sf-location', errId: 'sf-err-location', label: 'La ubicacion',    minLen: 2 },
  ];
  let valid = true;
  fields.forEach(f => {
    const el  = document.getElementById(f.id);
    const err = document.getElementById(f.errId);
    if (!el || !err) return;
    if (!el.value.trim() || el.value.trim().length < f.minLen) {
      err.textContent = `${f.label} es requerido.`;
      err.classList.remove('hidden');
      el.classList.add('border-red-400');
      valid = false;
    } else {
      err.classList.add('hidden');
      el.classList.remove('border-red-400');
    }
  });
  return valid;
}
