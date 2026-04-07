# Poli Service Hub

Catalogo de servicios digitales desarrollado como SPA (Single Page Application) con HTML, CSS y JavaScript vanilla. Proyecto de la asignatura de Programacion Web — Grupo 16.

## Descripcion

Plataforma que permite explorar, filtrar y gestionar un catalogo de servicios digitales. Los usuarios pueden guardar favoritos, ver el detalle de cada servicio y enviar mensajes de contacto. Ademas, incluye un panel de gestion para crear, editar y eliminar servicios.

## Tecnologias

- HTML5, CSS3, JavaScript (ES6+)
- [Tailwind CSS](https://tailwindcss.com/) via CDN
- Google Fonts: Manrope y Space Grotesk
- `fetch` + `services.json` para carga inicial de datos
- `localStorage` para persistencia de cambios y favoritos
- Enrutamiento hash-based (`#/ruta`)

## Estructura del proyecto

```
poli-frontend-g16-vanilla/
├── index.html          # Punto de entrada, configuracion de Tailwind
├── services.json       # Datos iniciales de servicios (fuente JSON)
├── css/
│   └── styles.css      # Estilos globales y animaciones
└── js/
    ├── api.js          # CRUD sobre localStorage (servicios y favoritos)
    ├── router.js       # Enrutador hash, header y footer
    ├── app.js          # Bootstrap: fetch de services.json, seed de localStorage e inicio del router
    └── pages/
        ├── home.js         # Pagina de inicio con servicios destacados
        ├── services.js     # Catalogo con busqueda y filtros
        ├── serviceDetail.js# Vista de detalle de un servicio
        ├── favorites.js    # Servicios guardados como favoritos
        ├── contact.js      # Formulario de contacto
        └── admin.js        # Panel de gestion (crear, editar, eliminar)
```

## Rutas

| Ruta | Descripcion |
|------|-------------|
| `#/` | Inicio |
| `#/servicios` | Catalogo de servicios |
| `#/servicios/:id` | Detalle de un servicio |
| `#/favoritos` | Servicios favoritos |
| `#/contacto` | Formulario de contacto |
| `#/gestion` | Panel de administracion |

## Ejecucion

No requiere instalacion ni servidor de build. Abrir `index.html` directamente en el navegador o servir con cualquier servidor estatico:

```bash
# Con Python
python3 -m http.server 8080

# Con Node.js (npx)
npx serve .
```

Luego acceder a `http://localhost:8080`.

## Persistencia y carga de datos

La app usa dos mecanismos con roles distintos:

**`services.json` — fuente de datos inicial**
Al arrancar, `app.js` hace `fetch('services.json')` para obtener el catalogo base. Si el navegador no tiene datos guardados todavia, los carga desde este archivo. Es el punto de partida obligatorio para que la app tenga contenido desde la primera visita.

**`localStorage` — estado en curso**
Una vez sembrado, todos los cambios del usuario (crear, editar o eliminar servicios desde el panel de Gestion, y marcar favoritos) se guardan en `localStorage`. Esto hace que los cambios persistan entre recargas sin depender del servidor.

El flujo resumido:

```
Primera visita:   fetch(services.json) → localStorage vacio → siembra localStorage
Visitas siguientes: localStorage ya tiene datos → fetch no sobreescribe nada
Crear/editar/eliminar: escribe directamente en localStorage
```

Las claves usadas en `localStorage`:

- `poli-service-hub-services` — lista de servicios
- `poli-service-hub-favorites` — IDs de servicios marcados como favoritos

Para volver al catalogo original, eliminar ambas claves desde las DevTools del navegador (Application → Local Storage).
