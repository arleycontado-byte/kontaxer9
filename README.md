# KONTAXER · sitio web local-first

Sitio estático reconstruido desde cero en HTML, CSS y JavaScript nativo. El espacio de trabajo no contenía el proyecto V5, así que esta versión usa la especificación y el logo oficial entregados como única referencia. No se añadieron precios, horarios, dirección, certificaciones ni normas tributarias.

## Archivos

```text
outputs/
├── index.html                 Página principal y diálogos accesibles
├── privacy.html               Plantilla pendiente de revisión legal
├── styles.css                 Tema oscuro adaptable y accesible
├── app.js                     Interfaz, formulario, guía, buscador y chat
├── privacy.js                 Contacto de privacidad tomado de la KB
├── service-worker.js           Precache, actualización y fallback offline
├── manifest.webmanifest        PWA con iconos any y maskable
├── serve.mjs                   Servidor local sin dependencias
├── generate-icons.ps1          PNG transparentes e iconos desde el JPG
├── package.json
├── assets/                     Logo original/lockup, 4 SVG de servicios, iconos e imagen OG
├── js/assistant/
│   ├── knowledge-base.js       Servicios, FAQ, contacto, frases y sinónimos
│   ├── normalize.js            Normalización, abreviaturas y corrección fuzzy
│   ├── scorer.js               BM25 simplificado con IDF
│   ├── memory.js               Nombre y tema en memoria de sesión
│   ├── responder.js            Respuestas locales y botones de acción
│   └── engine.js               Coordinación del motor puro
└── tests/assistant.test.js     70 pruebas ejecutables con Node
```

## Ejecutar en Windows

Abre PowerShell en esta carpeta. Si tienes Python instalado:

```powershell
py -m http.server 8080
```

En este entorno Python no estaba instalado. Con Node.js también puedes iniciar un servidor local sin paquetes externos:

```powershell
node serve.mjs
```

Visita `http://localhost:8080`. Para probar el modo offline, carga la página una vez, abre DevTools → Application → Service Workers y verifica el registro. Luego activa Network → Offline y recarga. La PWA funciona también bajo HTTPS en el mismo origen. Para ejecutar las pruebas del motor:

```powershell
node tests/assistant.test.js
```

Resultado verificado: `OK: 70 pruebas aprobadas.`

## Mantenimiento del asistente

La implementación es determinista y no usa LLM, API ni dependencia remota. Normaliza acentos y jerga, corrige errores de un carácter, puntúa frases de ejemplo con IDF, conserva nombre/servicio en memoria y responde con plantillas. Usa coincidencia por palabras y no por subcadenas para impedir, por ejemplo, que “privacidad” active “IVA”.

Para ampliar el conocimiento, agrega frases a `rows` en `js/assistant/knowledge-base.js`, mantén al menos cuatro ejemplos representativos por intención y añade la respuesta de esa intención en `responder.js`. Declara sinónimos en `SYNONYMS`. En `http://localhost:8080/?debug`, el panel muestra la intención, el puntaje, los tokens y las correcciones. Precios, horarios, dirección y normativa cambiante se derivan a contacto humano.

## Logo e iconos

El archivo recibido es JPG con fondo negro. `generate-icons.ps1` crea en Windows un PNG transparente desde esa imagen y genera versiones transparentes del logo, el lockup recortado, PNG para favicon, Apple Touch, iconos PWA, máscara segura e imagen Open Graph. Ejecuta:

```powershell
./generate-icons.ps1
```

Para convertir el logo a WebP y recrear los assets con ImageMagick 7:

```powershell
magick assets/kontaxer-logo-source.jpg -fuzz 8% -transparent black -trim +repage assets/kontaxer-logo.png
magick assets/kontaxer-logo.png -quality 92 assets/kontaxer-logo.webp
magick assets/kontaxer-logo.png -resize 64x64 -background '#090b12' -alpha remove -alpha off assets/favicon.png
magick assets/kontaxer-logo.png -resize 180x180 -background '#090b12' -alpha remove -alpha off assets/apple-touch-icon.png
magick assets/kontaxer-logo.png -resize 192x192 -background '#090b12' -alpha remove -alpha off assets/icon-192.png
magick assets/kontaxer-logo.png -resize 512x512 -background '#090b12' -alpha remove -alpha off assets/icon-512.png
magick -size 512x512 xc:'#090b12' \( assets/kontaxer-logo.png -resize 416x416 \) -gravity center -composite assets/icon-maskable-512.png
magick assets/og-image.svg -background '#090b12' -resize '1200x630^' -gravity center -extent 1200x630 assets/og-image.png
```

El JPG no conserva transparencia: `-fuzz 8% -transparent black` quita el fondo oscuro. Si el diseño contiene partes negras, este método puede borrarlas o adelgazar bordes; un PNG maestro transparente del diseñador es preferible. El icono maskable deja un margen seguro de 48 px por lado (arte de 416 px centrado en 512 px). Los colores de interfaz se aproximaron visualmente al azul y dorado del logo (`#1748ff`, `#ffb900`).

## Metadatos y privacidad

La página principal incluye descripción, Open Graph, Twitter Card y JSON-LD `ProfessionalService` generado desde la base común. No se incluyó `canonical` porque no se proporcionó un dominio oficial; configúralo cuando KONTAXER confirme su URL pública. La página de privacidad es explícitamente una plantilla pendiente de revisión legal.

Cabecera CSP sugerida para el hosting: `Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; font-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self' https://wa.me mailto:`. Si se exige una política estricta, mueve el JSON-LD generado inline a un archivo o aplica un hash CSP.

## Alcance y próximos pasos

El motor solo responde información declarada en la base de conocimiento; no produce asesoría tributaria ni confirma normativa vigente. El formulario prepara mensajes para WhatsApp o correo y no transmite datos a un servidor. Antes de publicar, revisa legalmente privacidad, agrega el dominio canónico confirmado y valida visualmente el PNG derivado del JPG.

## Motor local y evaluación

El asistente funciona sin APIs, CDN, claves ni conexión después de cargar los archivos estáticos. El clasificador combina ejemplos, palabras clave, sinónimos, segmentación de varios mensajes y una corrección de tipeo limitada al vocabulario contable/tributario. La evaluación reservada está en `tests/eval/heldout.json`; no la uses como frases de entrenamiento.

```powershell
npm test
npm run kb:check
node tests/eval/run.js --save
```

`npm test` corre las pruebas unitarias y hace fallar la compilación si el set reservado incumple los umbrales. `tests/eval/report.md` contiene el resultado más reciente; `tests/eval/baseline.md` conserva la medición previa a rehacer el motor. Incluye accuracy por intención, fallback dentro del alcance, respuestas con confianza alta que se equivocan, confusiones y frases fallidas.

### Añadir una intención o sinónimos

1. En `js/assistant/knowledge-base.js`, añade una fila a `rows` con un identificador estable, etiqueta y al menos diez ejemplos naturales únicos. Evita añadir frases que estén en `tests/eval/heldout.json`.
2. Añade conceptos clave a `LEXICON` para variaciones que no aparezcan literalmente en esos ejemplos. Añade equivalencias breves a `SYNONYMS` solo si expresan el mismo concepto en las consultas de KONTAXER.
3. Define la respuesta segura para el identificador en `js/assistant/responder.js`. Si el dato no está confirmado, usa la respuesta de dato no confirmado y acciones de contacto.
4. Ejecuta `npm run kb:check` y `npm test`; revisa los errores y la confusión nueva en `tests/eval/report.md` antes de aceptar el cambio.

La capa determinista supera las metas reservadas, así que no se añade Transformers.js ni se descargan modelos. La PWA precarga la base y los módulos de clasificación desde el mismo origen.
