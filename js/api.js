const SERVICES_KEY = 'poli-service-hub-services';
const FAVORITES_KEY = 'poli-service-hub-favorites';

function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function readServices() {
  const stored = localStorage.getItem(SERVICES_KEY);
  return stored ? JSON.parse(stored) : [];
}

function writeServices(services) {
  localStorage.setItem(SERVICES_KEY, JSON.stringify(services));
}

function getServices() {
  return readServices();
}

function getServiceById(id) {
  return readServices().find(s => s.id === id) || null;
}

function createService(input) {
  const services = readServices();
  const baseId = slugify(input.name);
  const existingIds = new Set(services.map(s => s.id));
  let id = baseId || `servicio-${Date.now()}`;
  if (existingIds.has(id)) id = `${id}-${Date.now()}`;

  const service = {
    id,
    featured: false,
    benefits: [
      'Visible en el catalogo principal',
      'Disponible para guardar en favoritos',
      'Editable desde el panel de gestion',
    ],
    tags: [input.category, 'Nuevo'],
    contactEmail: 'contacto@poliservicehub.com',
    ...input,
    image: input.image.trim() || 'https://placehold.co/400x240/E7D7C1/112033?text=Servicio',
  };

  writeServices([service, ...services]);
  return service;
}

function updateService(id, input) {
  const services = readServices();
  const index = services.findIndex(s => s.id === id);
  if (index === -1) throw new Error(`Servicio "${id}" no encontrado`);

  const updated = {
    ...services[index],
    ...input,
    image: input.image.trim() || 'https://placehold.co/400x240/E7D7C1/112033?text=Servicio',
  };
  services[index] = updated;
  writeServices(services);
  return updated;
}

function deleteService(id) {
  const services = readServices();
  writeServices(services.filter(s => s.id !== id));
}

function getFavorites() {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveFavorites(ids) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
}

function toggleFavorite(id) {
  const favs = getFavorites();
  const index = favs.indexOf(id);
  if (index === -1) {
    favs.push(id);
  } else {
    favs.splice(index, 1);
  }
  saveFavorites(favs);
  return favs;
}

function isFavorite(id) {
  return getFavorites().includes(id);
}
