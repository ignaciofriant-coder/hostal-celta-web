# Hostal Celta — Sitio web oficial

Página oficial del Hostal Celta (Pucón, Chile). **HTML + CSS + JavaScript puro**, sin frameworks ni dependencias externas (salvo Google Fonts y el mapa de Google embebido). Portada bilingüe ES/EN.

Implementada a partir del diseño aprobado en Claude Design (`Hostal Celta - Home v2`), pero reescrita como sitio propio, liviano y fácil de editar.

## Estructura

```
Hostal-Celta-Web/
├── index.html      ← página (head, SEO, JSON-LD, fuentes)
├── styles.css      ← base + reglas responsive
├── app.js          ← contenido (ES/EN), render y toda la interacción
└── assets/         ← 11 fotos + logo + reel_mar23.mp4
```

Todo el **texto y los datos** (traducciones, habitaciones, reseñas, FAQ, actividades, galería) viven en `app.js`, arriba del archivo. Para editar un texto o precio, se cambia ahí.

## Cómo verla en local

Por el uso de `fetch`/rutas relativas conviene servirla con un servidor, no abrir el archivo directo:

```bash
cd "Hostal-Celta-Web"
python -m http.server 8000
```

Luego abrir `http://localhost:8000`.

## Qué incluye

- Hero, barra de confianza, historia de Alex, experiencias + agenda semanal.
- Habitaciones (Dormitorio, Triskel, Doble Superior) con "incluye" y precio.
- Servicios, "Qué hacer en Pucón" (con enlaces a Google Maps), ubicación con mapa embebido.
- Galería tipo masonry con lightbox (fotos + reel), reseñas reales, FAQ.
- Formulario de contacto que arma un mensaje de WhatsApp listo para enviar.
- Bilingüe ES/EN (también por URL: `?lang=en`), CTA fija en móvil, datos estructurados (SEO).

## ⚠️ Marcadores pendientes (cambiar antes de publicar)

En `app.js`, objeto `CFG` (arriba del archivo):

- `whatsappUrl` — número real de WhatsApp de Alex (hoy: `wa.me/56900000000`, marcador).
- `reservaUrl` — enlace directo de Booking del hostal (hoy: booking.com genérico).
- Precios de **Triskel** y **Doble Superior** ("Tarifa por confirmar") — en `DATA.es.rooms` / `DATA.en.rooms`.
- **Dominio** (hoy: hostalcelta.cl como referencia).
- Nota: el puntaje del header se fijó en **8,9** (nota real de Booking).

## Publicar

Al ser estática, se sube tal cual a cualquier hosting (Netlify, Vercel, Cloudflare Pages, GitHub Pages o el hosting del dominio). No requiere build ni servidor de Node.
