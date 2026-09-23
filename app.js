/* Hostal Celta — sitio oficial (vanilla, sin dependencias).
   Portado desde el diseño de Claude Design (Home v2). Bilingüe ES/EN. */
(function () {
  "use strict";

  /* ---------------- CONFIG (marcadores pendientes de Alex) ---------------- */
  var CFG = {
    reservaUrl: "https://www.booking.com/hotel/cl/hostal-celta-pucon.es.html",
    airbnbUrl: "https://www.airbnb.cl/rooms/1582074740518526118",
    whatsappUrl: "https://wa.me/56995154685",        // +56 9 9515 4685 (ficha de Google Maps; confirmar con Alex)
    puntaje: "9,1",                                  // nota real de Booking (12 comentarios, sept 2026)
    mostrarPrecios: true,
    mostrarAgenda: true
  };

  /* resuelve rutas de assets; en el archivo standalone vienen inlineadas en window.__resources */
  var ASSET = function (p) { var m = window.__resources || {}; return m[p] || p; };

  /* ---------------- GALERÍA ---------------- */
  var MEDIA = [
    { src: "assets/04_fachada_noche.jpg", type: "image", alt: { es: "La casa de noche", en: "The house at night" } },
    { src: "assets/reel_mar23.mp4", type: "video", alt: { es: "Reel de la casa", en: "House reel" } },
    { src: "assets/08_salon_cocina.jpg", type: "image", alt: { es: "Salón y cocina compartida", en: "Lounge and shared kitchen" } },
    { src: "assets/05_salon_musica.jpg", type: "image", alt: { es: "Música en vivo en el salón", en: "Live music in the lounge" } },
    { src: "assets/15_handpan_salon.jpg", type: "image", alt: { es: "Handpan en la casa, contra el muro de madera", en: "Handpan in the house, against the timber wall" } },
    { src: "assets/07_triskel.jpg", type: "image", alt: { es: "Habitación Triskel", en: "Triskel room" } },
    { src: "assets/20_doble_cama.jpg", type: "image", alt: { es: "Doble Superior con mural del volcán Villarrica", en: "Superior double with a Villarrica volcano mural" } },
    { src: "assets/22_banos_murales.jpg", type: "image", alt: { es: "Baños con nudos celtas y árboles pintados a mano", en: "Bathrooms with hand-painted Celtic knots and trees" } },
    { src: "assets/24_mural_duende_arbol.jpg", type: "image", alt: { es: "Duende pintado en el árbol del baño", en: "A painted elf sitting in the bathroom tree" } },
    { src: "assets/21_mural_volcan.jpg", type: "image", alt: { es: "Detalle del mural: volcán, araucarias y un pajarito", en: "Mural detail: volcano, monkey-puzzle trees and a bird" } },
    { src: "assets/23_puerta_bano.jpg", type: "image", alt: { es: "Puerta del baño pintada con árboles y manilla de rama", en: "Bathroom door painted with trees, with a branch handle" } },
    { src: "assets/17_cartel_tallado.jpg", type: "image", alt: { es: "El cartel del hostal, tallado y pintado a mano", en: "The hostel sign, hand-carved and painted" } },
    { src: "assets/03_pucon_volcan.jpg", type: "image", alt: { es: "El volcán Villarrica desde Pucón", en: "Villarrica volcano from Pucón" } },
    { src: "assets/09_rincon_guitarra.jpg", type: "image", alt: { es: "Rincón de la guitarra", en: "The guitar corner" } },
    { src: "assets/11_invitado_teclado.jpg", type: "image", alt: { es: "Un huésped tocando el teclado en el salón", en: "A guest playing the keyboard in the lounge" } }
  ];

  /* ---------------- TEXTOS ---------------- */
  var ES = {
    navRooms: "Alojamiento", navExp: "Experiencias", navPucon: "Qué hacer", navLocation: "Ubicación",
    navFaq: "Antes de venir", navGal: "Galería", navRev: "Opiniones", book: "Reservar",
    heroKicker: "Hostal boutique · Pucón, Chile",
    heroTitle: "Un refugio con alma.",
    heroText: "Madera, fuego, música y montaña. Un lugar para desconectarte del ruido y reconectar con lo esencial.",
    heroCta: "Consultar disponibilidad", heroCta2: "Ver habitaciones",
    trustAria: "Datos rápidos del hostal", trustScoreSuffix: "en Booking",
    trustCenter: "A 10 min a pie del centro", trustBeds: "Solo 9 camas",
    hostKicker: "Bienvenidos", hostTitle: "Un lugar pequeño, hecho para compartir.",
    hostP1: "Soy Alex. Me gusta la montaña, el agua y recibir gente. Levanté esta casa de madera pensando en que fuera cómoda y tranquila, pero, sobre todo, en que quien llega no se sienta como un huésped más.",
    hostP2: "Recibimos a pocas personas a propósito. Así, alrededor de la chimenea o en la cocina, terminan naciendo conversaciones, comidas compartidas y más de alguna amistad.",
    hostSign: "— Alex, anfitrión", hostBadge: "Como en casa", altKitchen: "Salón y cocina compartida",
    expKicker: "Experiencias", expTitle: "Comunidad al calor del fuego",
    expP1: "Aquí siempre hay algo por descubrir: música en vivo, noches junto a la chimenea, talleres, conversaciones espontáneas y momentos que nacen de forma natural entre viajeros.",
    altMural: "Mural del duende del bosque y el volcán, pintado en la casa",
    expP2: "Quienes pasan por acá recuerdan la comodidad, pero sobre todo las conversaciones.",
    agendaTitle: "Encuentros habituales", agendaNote: "La programación cambia cada semana. Revisa Instagram o pregúntale a Alex al llegar.",
    expCta: "Ver próximos encuentros",
    roomsKicker: "Alojamiento", roomsTitle: "Tres formas de quedarte",
    roomsText: "Todo en madera, con baños compartidos impecables y cocina equipada para que te sientas en casa.",
    includes: "Incluye",
    houseKicker: "La casa", houseTitle: "Lo que encuentras al entrar",
    puconKicker: "Qué hacer en Pucón", puconTitle: "La aventura comienza al salir de la puerta.",
    puconP1: "Volcanes, lagos, termas, bosques y senderos hacen de Pucón uno de los mejores destinos de naturaleza de Chile. Ya sea que busques aventura o descanso, te ayudamos a encontrar experiencias que realmente valgan la pena.",
    puconP2: "Te recomendamos rutas, actividades y rincones locales para que aproveches cada día al máximo.",
    actCta: "Cómo llegar →", distNote: "Distancias aproximadas desde Hostal Celta.",
    altVolcano: "El volcán Villarrica desde Pucón",
    locKicker: "Ubicación", locTitle: "Lo suficientemente cerca para caminar. Lo suficientemente lejos para descansar.",
    locAddr: "Callejón Flores 260 · Pucón, Chile", arriveTitle: "¿Cómo llegar?",
    arriveText: "Podemos ayudarte a coordinar traslados desde el aeropuerto o indicarte la mejor forma de llegar en bus o automóvil.",
    locText: "La casa está ubicada en un sector tranquilo de Pucón, a pocos minutos del centro y con acceso rápido a los principales atractivos de la zona: el lago, el volcán, parques nacionales, termas y senderos.",
    
    mapTitle: "Mapa de Hostal Celta en Pucón", howTo: "Cómo llegar", openMaps: "Abrir en Google Maps →",
    galKicker: "Galería", galTitle: "Noches de madera y música",
    galText: "Fotos y reels de la casa, tal como se ve cualquier semana. Haz clic para verlos en grande.",
    close: "Cerrar", prev: "Anterior", next: "Siguiente",
    scoreWord: "Fantástico", scoreSub: "Nota media en Booking.com", scoreBase: "Basado en 12 comentarios reales",
    scoreStaff: "Personal", scoreClean: "Limpieza",
    reviewsLink: "Ver opiniones en Booking",
    revKicker: "Opiniones", revTitle: "Lo que dicen quienes ya vinieron",
    revText: "Reseñas reales de huéspedes de distintos lugares. Casi todas coinciden en lo mismo: el ambiente y el trato.",
    revNote: "Comentarios publicados en Booking, en su idioma original.",
    faqKicker: "Antes de venir", faqTitle: "Antes de venir",
    ctaAlsoPre: "También puedes reservar a través de", ctaOr: "o", ctaAlsoPost: "si lo prefieres.",
    ctaWhats: "Consultar por WhatsApp",
    directHours: "Respondemos de 9:00 a 23:00 (hora de Chile).",
    footerTagline: "Un refugio de madera con alma celta, donde la naturaleza, la calma y la comunidad se encuentran.",
    footerHouse: "La casa", footerPucon: "Pucón", footerContact: "Contacto",
    footerHours: "Check-in 14:00–23:00 · Check-out 10:00–11:00",
    formKicker: "Reserva tu estadía", formTitle: "Cuéntanos cuándo vienes",
    formText: "Completa el formulario o escríbenos por WhatsApp. Te confirmaremos la disponibilidad, responderemos tus dudas y te ayudaremos a planificar tu llegada.",
    formHeading: "Consulta de disponibilidad",
    fName: "Nombre", fIn: "Fecha de llegada", fOut: "Fecha de salida", fGuests: "Huéspedes", fMsg: "Mensaje",
    fMsgHint: "Cuéntanos si viajas en grupo, si llegas de noche o lo que necesites.",
    fSend: "Consultar disponibilidad", fNote: "Al enviar el formulario se abrirá WhatsApp con tu mensaje listo para enviar.",
    altLogo: "Logo del Hostal Celta: árbol de la vida celta con una puerta dorada",
    altNight: "La fachada de madera del hostal iluminada de noche"
  };

  var EN = {
    navRooms: "Rooms", navExp: "Experiences", navPucon: "Things to do", navLocation: "Location",
    navFaq: "Before you come", navGal: "Gallery", navRev: "Reviews", book: "Book now",
    heroKicker: "Boutique hostel · Pucón, Chile",
    heroTitle: "A refuge with soul.",
    heroText: "Timber, fire, music and mountains. A place to switch off the noise and reconnect with what matters.",
    heroCta: "Check availability", heroCta2: "See the rooms",
    trustAria: "Hostel at a glance", trustScoreSuffix: "on Booking",
    trustCenter: "10-minute walk to the centre", trustBeds: "Just 9 beds",
    hostKicker: "Welcome", hostTitle: "A small place, built for meeting people.",
    hostP1: "I'm Alex. I love the mountains, the water and having people over. I built this wooden house to be comfortable and quiet — but above all so nobody who walks in feels like just another guest.",
    hostP2: "We keep it small on purpose. Around the fireplace or in the kitchen, conversations, shared meals and a few friendships tend to happen on their own.",
    hostSign: "— Alex, your host", hostBadge: "Feels like home", altKitchen: "Lounge and shared kitchen",
    expKicker: "Experiences", expTitle: "Community around the fire",
    expP1: "There's always something to discover here: live music, evenings by the fire, workshops, spontaneous conversations and moments that arise naturally among travellers.",
    altMural: "Mural of the forest sprite and the volcano, painted in the house",
    expP2: "Guests remember the comfort, but above all the conversations.",
    agendaTitle: "Regular gatherings", agendaNote: "The line-up changes week to week. Check Instagram or ask Alex when you arrive.",
    expCta: "See upcoming gatherings",
    roomsKicker: "Rooms", roomsTitle: "Three ways to stay",
    roomsText: "All in timber, with spotless shared bathrooms and a fully equipped kitchen so you can settle in.",
    includes: "Included",
    houseKicker: "The house", houseTitle: "What you'll find inside",
    puconKicker: "Things to do in Pucón", puconTitle: "The adventure starts at the front door.",
    puconP1: "Volcanoes, lakes, hot springs, forests and trails make Pucón one of the best nature destinations in Chile. Whether you're after adventure or rest, we help you find experiences that are really worth it.",
    puconP2: "We recommend routes, activities and local corners so you make the most of every day.",
    actCta: "How to get there →", distNote: "Approximate distances from Hostal Celta.",
    altVolcano: "Villarrica volcano seen from Pucón",
    locKicker: "Location", locTitle: "Close enough to walk. Far enough to rest.",
    locAddr: "Callejón Flores 260 · Pucón, Chile", arriveTitle: "Getting here",
    arriveText: "We can help you arrange transfers from the airport, or tell you the best way to get here by bus or car.",
    locText: "The house sits in a quiet part of Pucón, minutes from the centre and with quick access to the area's highlights: the lake, the volcano, national parks, hot springs and trails.",
    
    mapTitle: "Map of Hostal Celta in Pucón", howTo: "How to get there", openMaps: "Open in Google Maps →",
    galKicker: "Gallery", galTitle: "Timber nights and music",
    galText: "Photos and reels of the house, exactly as it looks on any given week. Click to view large.",
    close: "Close", prev: "Previous", next: "Next",
    scoreWord: "Fantastic", scoreSub: "Average score on Booking.com", scoreBase: "Based on 12 real reviews",
    scoreStaff: "Staff", scoreClean: "Cleanliness",
    reviewsLink: "See reviews on Booking",
    revKicker: "Reviews", revTitle: "What past guests say",
    revText: "Real reviews from guests all over the map. Almost all of them come back to the same thing: the atmosphere and the welcome.",
    revNote: "Reviews published on Booking, in their original language.",
    faqKicker: "Before you come", faqTitle: "Before you come",
    ctaAlsoPre: "You can also book through", ctaOr: "or", ctaAlsoPost: "if you prefer.",
    ctaWhats: "Ask on WhatsApp",
    directHours: "We reply 9 am–11 pm (Chile time).",
    footerTagline: "A timber refuge with a Celtic soul, where nature, calm and community meet.",
    footerHouse: "The house", footerPucon: "Pucón", footerContact: "Contact",
    footerHours: "Check-in 2–11 pm · Check-out 10–11 am",
    formKicker: "Book your stay", formTitle: "Tell us when you're coming",
    formText: "Fill in the form or message us on WhatsApp. We'll confirm availability, answer your questions and help you plan your arrival.",
    formHeading: "Availability enquiry",
    fName: "Name", fIn: "Arrival date", fOut: "Departure date", fGuests: "Guests", fMsg: "Message",
    fMsgHint: "Tell us if you're travelling as a group, arriving late, or anything else you need.",
    fSend: "Check availability", fNote: "Sending the form opens WhatsApp with your message ready to send.",
    altLogo: "Hostal Celta logo: a Celtic tree of life with a golden door",
    altNight: "The hostel's timber facade lit up at night"
  };

  var DATA = {
    es: {
      agenda: [
        { day: "Miércoles", name: "Piano y sobremesa junto a la chimenea", time: "18:00" },
        { day: "Viernes", name: "Handpan en el salón", time: "19:00" },
        { day: "Domingo", name: "Café de la Muerte · conversación abierta", time: "19:00" }
      ],
      rooms: [
        { num: "Opción 01", name: "Dormitorio compartido", img: "assets/01_dormitorio_cama.jpg", imgOrder: "", imgPos: "center",
          desc: "Ocho camas de madera, cada una con su cortina para privacidad y un baúl con llave para tus cosas. La forma más social —y más económica— de quedarte.",
          specs: ["8 camas", "Mixto", "Baúl con llave"],
          includes: ["Ropa de cama", "Toalla", "Cortina", "Baño compartido", "WiFi", "Cocina"],
          price: "Desde $18.000 / noche", promo: "Promo temporada baja" },
        { num: "Opción 02", name: "Habitación Triskel", img: "assets/07_triskel.jpg", imgOrder: "order:2", imgPos: "center 78%",
          desc: "Nuestra doble más nueva, con nombre celta: madera por todos lados, luz cálida y el triskel como guiño en la decoración. Privacidad y calma, a pasos del salón.",
          specs: ["1 cama doble", "Privada", "Deco celta"],
          includes: ["Ropa de cama", "Toallas", "Baño compartido", "WiFi", "Cocina"],
          price: "Tarifa por confirmar (pendiente)", promo: "" },
        { num: "Opción 03", name: "Doble Superior", img: "assets/19_doble_mural_volcan.jpg", imgOrder: "", imgPos: "center 45%",
          desc: "Cama doble frente a un mural pintado a mano del volcán Villarrica, con araucarias y un pajarito en la rama. Luz de mañana y vista al jardín. Para quienes buscan privacidad sin perderse el ambiente del salón.",
          specs: ["1 cama doble", "Privada", "Mural a mano"],
          includes: ["Ropa de cama", "Toallas", "Baño compartido", "WiFi", "Cocina"],
          price: "Tarifa por confirmar (pendiente)", promo: "" }
      ],
      amenities: [
        { name: "Salón con chimenea", n: "01" }, { name: "Cocina compartida equipada", n: "02" },
        { name: "Estacionamiento privado gratuito", n: "03" }, { name: "Wi-Fi en toda la casa", n: "04" },
        { name: "Jardín y terraza", n: "05" }, { name: "Juegos de mesa y Smart TV", n: "06" },
        { name: "Info turística y ayuda con rutas", n: "07" }, { name: "Espacios interiores libres de humo", n: "08" }
      ],
      activities: [
        { name: "Volcán Villarrica", dist: "25 min en auto", desc: "Asciende uno de los volcanes más emblemáticos de Sudamérica y contempla el cráter activo junto a vistas panorámicas del lago y la cordillera." },
        { name: "Termas", dist: "20–45 min en auto", desc: "Piscinas de aguas termales rodeadas de bosque nativo. El lugar perfecto para descansar después de un día de aventura." },
        { name: "Lago Villarrica", dist: "12 min caminando", desc: "Playa de arena volcánica, kayak, paddle y atardeceres con el volcán como telón de fondo." },
        { name: "Parque Nacional Huerquehue", dist: "50 min en auto", desc: "Senderos entre araucarias milenarias, lagunas de montaña y algunos de los paisajes más icónicos de la Araucanía." },
        { name: "Ojos del Caburgua", dist: "25 min en auto", desc: "Cascadas y pozones de agua turquesa alimentados por ríos subterráneos, rodeados de un bosque siempre verde." },
        { name: "Centro de Ski Pucón", dist: "35 min en auto", desc: "En invierno, esquí y snowboard sobre las laderas del volcán. En verano, senderos y miradores con vistas espectaculares." },
        { name: "Santuario El Cañi", dist: "35 min en auto", desc: "Trekking entre bosques de araucarias con uno de los mejores miradores de la zona." },
        { name: "Parque Nacional Villarrica", dist: "30 min en auto", desc: "Senderos para todos los niveles y acceso a bosques nativos y miradores." },
        { name: "Rafting en el río Trancura", dist: "20 min en auto", desc: "Una de las actividades más populares de Pucón, con opciones para principiantes y expertos." }
      ],
      distances: [
        { name: "Centro de Pucón", km: "1 km" }, { name: "Reserva Nacional Villarrica", km: "10 km" },
        { name: "Centro de Ski Pucón", km: "16 km" }, { name: "Ojos del Caburgua", km: "16 km" },
        { name: "Parque Nacional Huerquehue", km: "33 km" }, { name: "Aeropuerto La Araucanía", km: "85 km" }
      ],
      reviews: [
        { text: "“Amabilidad, atención y disposición para tener una buena estadía. Ambiente acogedor y cercano.”", name: "Pancho", country: "Chile", initial: "P" },
        { text: "“El hostal es súper cálido, con su chimenea en el salón… pero lo mejor, sin duda, la gente que lo regenta.”", name: "Fidel", country: "Chile", initial: "F" },
        { text: "“Todo construido en madera, lindo ambiente, súper relajado, excelente atención del dueño y su pareja. Cocina impecable.”", name: "Diegones", country: "Argentina", initial: "D" },
        { text: "“This is an amazing, cozy little space. The common area is really nice and you feel right at home.”", name: "Anna", country: "Dinamarca", initial: "A" },
        { text: "“Pequeño hostal familiar. La cocina está bien equipada. Las camas del dormitorio tienen cortina y baúl con llave.”", name: "Leska", country: "Alemania", initial: "L" },
        { text: "“Alojamiento nuevecito. Todo maravilloso y muy amable. Hay solo 9 camas en total, así que es muy acogedor y familiar. Volvería a reservar cuando sea.”", name: "Christian", country: "Alemania", initial: "C" }
      ],
      faq: [
        { q: "¿A qué hora es el check-in y el check-out?", a: "Check-in: desde las 14:00 hasta las 23:00. Check-out: entre las 10:00 y las 11:00. Si llegas antes o más tarde, avísanos con anticipación y haremos lo posible por ayudarte." },
        { q: "¿Hay cocina?", a: "Sí. La casa cuenta con una cocina completamente equipada para que puedas preparar tus comidas cuando quieras." },
        { q: "¿Incluyen desayuno?", a: "No ofrecemos desayuno, pero tendrás acceso libre a la cocina durante toda tu estadía." },
        { q: "¿Hay estacionamiento?", a: "Sí, contamos con estacionamiento privado gratuito dentro de la propiedad." },
        { q: "¿Puedo venir con mi mascota?", a: "Por el bienestar de todos nuestros huéspedes, no aceptamos mascotas." },
        { q: "¿Se puede fumar?", a: "No está permitido fumar dentro de la casa. Puedes hacerlo en los espacios exteriores habilitados." },
        { q: "¿Qué idiomas hablan?", a: "Hablamos español e inglés." },
        { q: "¿Hay Wi-Fi?", a: "Sí, contamos con Wi-Fi gratuito en toda la casa." },
        { q: "¿Se entregan toallas y ropa de cama?", a: "Sí, ambas están incluidas en tu estadía." },
        { q: "¿Puedo guardar mi equipaje antes del check-in o después del check-out?", a: "Siempre que sea posible, estaremos encantados de ayudarte." },
        { q: "¿Aceptan tarjetas?", a: "Sí, aceptamos los principales medios de pago." },
        { q: "¿Pueden ayudarme a reservar actividades?", a: "Sí, podemos recomendar y coordinar actividades como ascensos al volcán, rafting, termas, canopy y más." }
      ]
    },
    en: {
      agenda: [
        { day: "Wednesday", name: "Piano and long talks by the fireplace", time: "6 pm" },
        { day: "Friday", name: "Handpan in the lounge", time: "7 pm" },
        { day: "Sunday", name: "Café de la Muerte · open conversation", time: "7 pm" }
      ],
      rooms: [
        { num: "Option 01", name: "Shared dorm", img: "assets/01_dormitorio_cama.jpg", imgOrder: "", imgPos: "center",
          desc: "Eight timber beds, each with its own curtain for privacy and a lockable chest for your things. The most social — and most affordable — way to stay.",
          specs: ["8 beds", "Mixed", "Lockable chest"],
          includes: ["Bed linen", "Towel", "Privacy curtain", "Shared bathroom", "WiFi", "Kitchen"],
          price: "From CLP 18,000 / night", promo: "Low-season deal" },
        { num: "Option 02", name: "Triskel room", img: "assets/07_triskel.jpg", imgOrder: "order:2", imgPos: "center 78%",
          desc: "Our newest double, with a Celtic name: timber everywhere, warm light and the triskel as a nod in the decor. Privacy and calm, a few steps from the lounge.",
          specs: ["1 double bed", "Private", "Celtic decor"],
          includes: ["Bed linen", "Towels", "Shared bathroom", "WiFi", "Kitchen"],
          price: "Rate to be confirmed (placeholder)", promo: "" },
        { num: "Option 03", name: "Superior double", img: "assets/19_doble_mural_volcan.jpg", imgOrder: "", imgPos: "center 45%",
          desc: "A double bed facing a hand-painted mural of Villarrica volcano, with monkey-puzzle trees and a little bird on the branch. Morning light and a garden view. For guests who want privacy without missing the lounge.",
          specs: ["1 double bed", "Private", "Hand-painted mural"],
          includes: ["Bed linen", "Towels", "Shared bathroom", "WiFi", "Kitchen"],
          price: "Rate to be confirmed (placeholder)", promo: "" }
      ],
      amenities: [
        { name: "Lounge with fireplace", n: "01" }, { name: "Fully equipped shared kitchen", n: "02" },
        { name: "Free private parking", n: "03" }, { name: "Wi-Fi throughout the house", n: "04" },
        { name: "Garden and terrace", n: "05" }, { name: "Board games and smart TV", n: "06" },
        { name: "Local tips and route planning", n: "07" }, { name: "Smoke-free indoors", n: "08" }
      ],
      activities: [
        { name: "Villarrica volcano", dist: "25 min by car", desc: "Climb one of South America's most emblematic volcanoes and look into the active crater, with panoramic views of the lake and the mountains." },
        { name: "Hot springs", dist: "20–45 min by car", desc: "Thermal pools surrounded by native forest. The perfect place to rest after a day of adventure." },
        { name: "Lake Villarrica", dist: "12 min on foot", desc: "Volcanic sand beach, kayaking, paddleboarding and sunsets with the volcano as a backdrop." },
        { name: "Huerquehue National Park", dist: "50 min by car", desc: "Trails among ancient araucaria trees, mountain lagoons and some of the most iconic landscapes in the Araucanía." },
        { name: "Ojos del Caburgua", dist: "25 min by car", desc: "Waterfalls and turquoise pools fed by underground rivers, surrounded by evergreen forest." },
        { name: "Pucón Ski Centre", dist: "35 min by car", desc: "In winter, ski and snowboard on the volcano's slopes. In summer, trails and lookouts with spectacular views." },
        { name: "El Cañi Sanctuary", dist: "35 min by car", desc: "Trekking through araucaria forest to one of the best lookouts in the area." },
        { name: "Villarrica National Park", dist: "30 min by car", desc: "Trails for every level, with access to native forest and lookouts." },
        { name: "Rafting on the Trancura river", dist: "20 min by car", desc: "One of Pucón's most popular activities, with options for beginners and experts." }
      ],
      distances: [
        { name: "Pucón centre", km: "1 km" }, { name: "Villarrica National Reserve", km: "10 km" },
        { name: "Pucón Ski Centre", km: "16 km" }, { name: "Ojos del Caburgua", km: "16 km" },
        { name: "Huerquehue National Park", km: "33 km" }, { name: "La Araucanía airport", km: "85 km" }
      ],
      reviews: [
        { text: "“Friendliness, attention and willingness to make sure you have a good stay. A cosy, close-knit atmosphere.”", name: "Pancho", country: "Chile", initial: "P" },
        { text: "“Really warm hostel, with its fireplace in the lounge… but the best part, without a doubt, is the people who run it.”", name: "Fidel", country: "Chile", initial: "F" },
        { text: "“All built in wood, lovely atmosphere, very relaxed, excellent care from the owner and his partner. Spotless kitchen.”", name: "Diegones", country: "Argentina", initial: "D" },
        { text: "“This is an amazing, cozy little space. The common area is really nice and you feel right at home.”", name: "Anna", country: "Denmark", initial: "A" },
        { text: "“Small family hostel. The kitchen is well equipped. The dorm beds have a curtain and a lockable chest.”", name: "Leska", country: "Germany", initial: "L" },
        { text: "“Brand-new place. Everything was wonderful and very friendly. There are only 9 beds in total, so it feels very cosy and family-like. I would book again any time.”", name: "Christian", country: "Germany", initial: "C" }
      ],
      faq: [
        { q: "What time is check-in and check-out?", a: "Check-in: from 2 pm to 11 pm. Check-out: between 10 and 11 am. If you arrive earlier or later, let us know in advance and we'll do our best to help." },
        { q: "Is there a kitchen?", a: "Yes. The house has a fully equipped kitchen so you can cook whenever you like." },
        { q: "Is breakfast included?", a: "We don't offer breakfast, but you have free access to the kitchen throughout your stay." },
        { q: "Is there parking?", a: "Yes, we have free private parking on the property." },
        { q: "Can I bring my pet?", a: "For the comfort of all our guests, we don't accept pets." },
        { q: "Can I smoke?", a: "Smoking isn't allowed inside the house. You can smoke in the designated outdoor areas." },
        { q: "Which languages do you speak?", a: "We speak Spanish and English." },
        { q: "Is there Wi-Fi?", a: "Yes, free Wi-Fi throughout the house." },
        { q: "Are towels and bed linen provided?", a: "Yes, both are included in your stay." },
        { q: "Can I store my luggage before check-in or after check-out?", a: "Whenever possible, we'll be glad to help." },
        { q: "Do you accept cards?", a: "Yes, we accept the main payment methods." },
        { q: "Can you help me book activities?", a: "Yes, we can recommend and arrange activities such as volcano climbs, rafting, hot springs, canopy and more." }
      ]
    }
  };

  /* ---------------- ESTADO ---------------- */
  var state = { lang: "es", lightbox: -1, form: { name: "", in: "", out: "", guests: "1", msg: "" } };
  var lastFocus = null;

  /* ---------------- HELPERS ---------------- */
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function att(s) { return esc(s).replace(/"/g, "&quot;"); }
  function isMobile() { return window.matchMedia("(max-width:820px)").matches; }
  function reduceMotion() { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; }

  function waLabel() {
    var d = String(CFG.whatsappUrl || "").replace(/\D/g, "");
    if (!d || d === "56900000000") return "";
    if (d.length === 11 && d.indexOf("569") === 0) return "+56 9 " + d.slice(3, 7) + " " + d.slice(7);
    return "+" + d;
  }
  function buildMessage() {
    var f = state.form, en = state.lang === "en";
    var lines = [
      en ? "Hi Alex! I'd like to book at Hostal Celta." : "¡Hola Alex! Quiero reservar en el Hostal Celta.",
      (en ? "Name: " : "Nombre: ") + (f.name || "—"),
      (en ? "Check-in: " : "Llegada: ") + (f.in || "—"),
      (en ? "Check-out: " : "Salida: ") + (f.out || "—"),
      (en ? "Guests: " : "Personas: ") + (f.guests || "1")
    ];
    if (f.msg) lines.push((en ? "Notes: " : "Mensaje: ") + f.msg);
    return lines.join("\n");
  }
  function langBtn(active) {
    var base = "background:none;border:none;font-size:12.5px;letter-spacing:.12em;padding:4px 1px;cursor:pointer;";
    return active
      ? base + "color:#3A2617;font-weight:800;text-decoration:underline;text-underline-offset:4px;text-decoration-thickness:1.5px;text-decoration-color:#C89A3E"
      : base + "color:#A0876B;font-weight:600";
  }
  function mapUrl(name) { return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(name + ", Pucón, Chile"); }
  function navlink(href, label) { return '<a href="' + href + '" style="font-size:14.5px;color:#6B4327" data-hover="color:#B65A32">' + esc(label) + '</a>'; }

  var CELTIC_PATTERN = "data:image/svg+xml;utf8," + encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><g fill='none' stroke='#C89A3E' stroke-width='2'><circle cx='60' cy='60' r='26'/><circle cx='0' cy='60' r='26'/><circle cx='120' cy='60' r='26'/><circle cx='60' cy='0' r='26'/><circle cx='60' cy='120' r='26'/></g></svg>");

  var WA_SVG = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 .5C7.4.5.5 7.4.5 16c0 2.8.7 5.5 2.1 7.9L.5 31.5l7.8-2C10.6 30.8 13.3 31.5 16 31.5c8.6 0 15.5-6.9 15.5-15.5S24.6.5 16 .5zm0 28.3c-2.5 0-5-.7-7.1-1.9l-.5-.3-4.6 1.2 1.2-4.5-.3-.5C3.3 20.7 2.6 18.4 2.6 16 2.6 8.6 8.6 2.6 16 2.6S29.4 8.6 29.4 16 23.4 28.8 16 28.8z"/><path d="M24.1 19.3c-.4-.2-2.4-1.2-2.8-1.3-.4-.1-.6-.2-.9.2-.3.4-1 1.3-1.2 1.5-.2.2-.4.3-.8.1-.4-.2-1.7-.6-3.2-2-1.2-1.1-2-2.4-2.2-2.8-.2-.4 0-.6.2-.8.2-.2.4-.4.5-.7.2-.2.2-.4.4-.7.1-.3 0-.5 0-.7 0-.2-.9-2.2-1.2-3-.3-.7-.6-.6-.9-.6h-.7c-.2 0-.6.1-1 .5-.3.4-1.3 1.3-1.3 3.1s1.3 3.6 1.5 3.9c.2.2 2.6 4 6.3 5.6.9.4 1.6.6 2.1.8.9.3 1.7.2 2.3.1.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.6.2-1.8-.1-.1-.3-.2-.7-.4z"/></svg>';
  var WA_ICON = '<svg viewBox="0 0 32 32" aria-hidden="true" width="17" height="17" style="fill:currentColor;flex:none"><path d="M16 .5C7.4.5.5 7.4.5 16c0 2.8.7 5.5 2.1 7.9L.5 31.5l7.8-2C10.6 30.8 13.3 31.5 16 31.5c8.6 0 15.5-6.9 15.5-15.5S24.6.5 16 .5zm0 28.3c-2.5 0-5-.7-7.1-1.9l-.5-.3-4.6 1.2 1.2-4.5-.3-.5C3.3 20.7 2.6 18.4 2.6 16 2.6 8.6 8.6 2.6 16 2.6S29.4 8.6 29.4 16 23.4 28.8 16 28.8z"/><path d="M24.1 19.3c-.4-.2-2.4-1.2-2.8-1.3-.4-.1-.6-.2-.9.2-.3.4-1 1.3-1.2 1.5-.2.2-.4.3-.8.1-.4-.2-1.7-.6-3.2-2-1.2-1.1-2-2.4-2.2-2.8-.2-.4 0-.6.2-.8.2-.2.4-.4.5-.7.2-.2.2-.4.4-.7.1-.3 0-.5 0-.7 0-.2-.9-2.2-1.2-3-.3-.7-.6-.6-.9-.6h-.7c-.2 0-.6.1-1 .5-.3.4-1.3 1.3-1.3 3.1s1.3 3.6 1.5 3.9c.2.2 2.6 4 6.3 5.6.9.4 1.6.6 2.1.8.9.3 1.7.2 2.3.1.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.6.2-1.8-.1-.1-.3-.2-.7-.4z"/></svg>';
  var waBtnInner = function (label) { return '<span style="display:inline-flex;align-items:center;justify-content:center;gap:8px">' + WA_ICON + esc(label) + '</span>'; };

  /* ---------------- RENDER DE SECCIONES ---------------- */
  var SHOT = typeof location !== "undefined" && /[?&]shot/.test(location.search);
  function view() {
    var t = state.lang === "en" ? EN : ES;
    var d = DATA[state.lang];
    var heroH = SHOT ? "660px" : "92vh";
    var locH = SHOT ? "600px" : "80vh";
    var score = CFG.puntaje;
    var trustScore = score ? score + " " + t.trustScoreSuffix : "";

    var header =
      '<header class="site-header" style="position:fixed;top:0;left:0;right:0;z-index:50">' +
        '<div style="max-width:1140px;margin:0 auto;padding:0 28px;height:104px;display:flex;align-items:center;justify-content:space-between;gap:24px">' +
          '<a href="#inicio" style="display:flex;align-items:center;gap:13px;color:inherit">' +
            '<img src="' + att(ASSET("assets/logo.png")) + '" alt="' + att(t.altLogo) + '" style="width:82px;height:82px;border-radius:50%" />' +
            '<span style="display:block">' +
              '<span style="display:block;font-family:Cormorant Garamond,Georgia,serif;font-weight:700;font-size:20px;color:#3A2617;letter-spacing:.13em;text-transform:uppercase">Hostal Celta</span>' +
              '<span style="display:block;font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:#A9812C;margin-top:2px">Pucón · Chile</span>' +
            '</span>' +
          '</a>' +
          '<nav aria-label="' + att(t.navRooms) + '" style="display:flex;align-items:center;gap:26px">' +
            navlink("#alojamiento", t.navRooms) + navlink("#experiencias", t.navExp) + navlink("#pucon", t.navPucon) +
            navlink("#ubicacion", t.navLocation) + navlink("#faq", t.navFaq) +
            '<span role="group" aria-label="' + (state.lang === "en" ? "Language" : "Idioma") + '" style="display:flex;align-items:center;gap:7px">' +
              '<button type="button" data-lang="es" aria-label="Español" aria-pressed="' + (state.lang === "es") + '" style="' + langBtn(state.lang === "es") + '">ES</button>' +
              '<span aria-hidden="true" style="color:#CBB894;font-size:12px">|</span>' +
              '<button type="button" data-lang="en" aria-label="English" aria-pressed="' + (state.lang === "en") + '" style="' + langBtn(state.lang === "en") + '">EN</button>' +
            '</span>' +
            '<a href="#contacto" style="background:#B65A32;color:#fff;font-size:14px;font-weight:600;letter-spacing:.05em;padding:13px 24px;border-radius:2px" data-hover="background:#9d4826;color:#fff">' + esc(t.book) + '</a>' +
          '</nav>' +
        '</div>' +
      '</header>';

    var hero =
      '<section id="inicio" data-parallax="1" aria-label="' + att(t.heroKicker) + '" style="position:relative;min-height:'+heroH+';display:flex;align-items:flex-end;background-image:url(\'' + ASSET("assets/18_hero_atardecer.jpg") + '\');background-size:cover;background-position:center 62%">' +
        '<div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(20,11,6,.88) 0%,rgba(20,11,6,.42) 46%,rgba(20,11,6,.08) 76%)"></div>' +
        '<div style="position:relative;z-index:2;max-width:1140px;margin:0 auto;width:100%;padding:0 28px 150px">' +
          '<p style="font-size:12px;letter-spacing:.28em;text-transform:uppercase;color:#F0C978;font-weight:700;margin:0;text-shadow:0 1px 6px rgba(20,11,6,.85)">' + esc(t.heroKicker) + '</p>' +
          '<h1 style="font-family:Cormorant Garamond,Georgia,serif;font-weight:600;color:#F7F1E2;font-size:clamp(40px,6.2vw,72px);line-height:1.02;letter-spacing:-.015em;margin:16px 0 0;max-width:16ch;text-wrap:balance">' + esc(t.heroTitle) + '</h1>' +
          '<p style="color:#EFE5D2;font-size:19.5px;max-width:46ch;margin:20px 0 30px;text-wrap:pretty">' + esc(t.heroText) + '</p>' +
          '<div class="hero-ctas">' +
            '<a class="btn-primary" href="#contacto">' + esc(t.heroCta) + '</a>' +
            '<a class="btn-ghost" href="#alojamiento">' + esc(t.heroCta2) + '</a>' +
          '</div>' +
        '</div>' +
      '</section>';

    var trust =
      '<section aria-label="' + att(t.trustAria) + '" style="background:#EBE0C8;border-bottom:1px solid #E1D4BB">' +
        '<div data-trust="1" style="max-width:1140px;margin:0 auto;padding:17px 28px;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:12px 30px">' +
          (score ? '<span style="display:flex;align-items:center;gap:8px"><span aria-hidden="true" style="color:#C89A3E;font-size:14px;line-height:1">★</span><span style="font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;color:#6B4327;font-weight:700">' + esc(trustScore) + '</span></span>' +
            '<span data-div="1" aria-hidden="true" style="width:1px;height:13px;background:#D2C09E"></span>' : '') +
          '<span style="font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;color:#6B4327;font-weight:700">' + esc(t.trustCenter) + '</span>' +
          '<span data-div="1" aria-hidden="true" style="width:1px;height:13px;background:#D2C09E"></span>' +
          '<span style="font-size:12.5px;letter-spacing:.14em;text-transform:uppercase;color:#6B4327;font-weight:700">' + esc(t.trustBeds) + '</span>' +
        '</div>' +
      '</section>';

    var host =
      '<section data-reveal="1" style="padding:48px 0 128px">' +
        '<div style="max-width:1140px;margin:0 auto;padding:0 28px;display:grid;grid-template-columns:1.05fr .95fr;gap:66px;align-items:center">' +
          '<div>' +
            '<p style="font-size:12px;letter-spacing:.28em;text-transform:uppercase;color:#A9812C;font-weight:700;margin:0">' + esc(t.hostKicker) + '</p>' +
            '<h2 style="font-family:Cormorant Garamond,Georgia,serif;font-weight:600;font-size:clamp(29px,3.6vw,41px);line-height:1.12;color:#6B4327;margin:16px 0 22px;text-wrap:balance">' + esc(t.hostTitle) + '</h2>' +
            '<p style="color:#54432F;font-size:18.5px;line-height:1.68;margin:0 0 18px;text-wrap:pretty">' + esc(t.hostP1) + '</p>' +
            '<p style="color:#54432F;font-size:18.5px;line-height:1.68;margin:0 0 18px;text-wrap:pretty">' + esc(t.hostP2) + '</p>' +
            '<p style="font-family:Cormorant Garamond,Georgia,serif;font-style:italic;font-size:24px;color:#6B4327;margin:22px 0 0">' + esc(t.hostSign) + '</p>' +
          '</div>' +
          '<div style="position:relative">' +
            '<img src="' + att(ASSET("assets/14_mural_duende.jpg")) + '" alt="' + att(t.altMural) + '" loading="lazy" decoding="async" style="width:100%;height:570px;object-fit:cover;object-position:center 40%;border-radius:3px" />' +
            '<div data-badge="1" style="position:absolute;bottom:22px;left:0;background:#C89A3E;color:#3A2617;font-size:11.5px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;padding:9px 16px">' + esc(t.hostBadge) + '</div>' +
          '</div>' +
        '</div>' +
      '</section>';

    var agendaRows = d.agenda.map(function (ev) {
      return '<div style="display:flex;gap:18px;align-items:baseline;border-bottom:1px solid rgba(241,233,214,.14);padding:11px 0">' +
        '<span style="font-family:Cormorant Garamond,Georgia,serif;font-size:15px;color:#DDB55E;min-width:104px">' + esc(ev.day) + '</span>' +
        '<span style="font-size:15.5px;color:#F1E9D6;flex:1">' + esc(ev.name) + '</span>' +
        '<span style="font-size:13px;color:#B7A48C">' + esc(ev.time) + '</span></div>';
    }).join("");
    var agendaBlock = CFG.mostrarAgenda ?
      '<div style="border-top:1px solid rgba(241,233,214,.2);margin-top:42px;padding-top:26px">' +
        '<p style="font-size:11.5px;letter-spacing:.24em;text-transform:uppercase;color:#DDB55E;font-weight:700;margin:0 0 14px">' + esc(t.agendaTitle) + '</p>' +
        agendaRows +
        '<p style="font-size:13px;color:#A6937C;font-style:italic;line-height:1.55;margin:14px 0 0;max-width:44ch">' + esc(t.agendaNote) + '</p>' +
      '</div>' : '';

    var experiences =
      '<section id="experiencias" style="background:#2E1D12;color:#F1E9D6;position:relative;overflow:hidden">' +
        '<div style="position:absolute;inset:0;opacity:.07;background-image:url(\'' + CELTIC_PATTERN + '\');background-size:120px 120px"></div>' +
        '<div data-expgrid="1" style="position:relative;z-index:2;display:grid;grid-template-columns:1fr 1fr">' +
          '<div data-expimg="1" style="background-image:url(\'' + ASSET("assets/05_salon_musica.jpg") + '\');background-size:cover;background-position:center;min-height:640px"></div>' +
          '<div data-expcontent="1" style="padding:92px 66px;display:flex;flex-direction:column;justify-content:center">' +
            '<div data-exptext="1" style="max-width:48ch">' +
              '<p style="font-size:12px;letter-spacing:.28em;text-transform:uppercase;color:#DDB55E;font-weight:700;margin:0">' + esc(t.expKicker) + '</p>' +
              '<h2 style="font-family:Cormorant Garamond,Georgia,serif;font-weight:600;font-size:clamp(29px,3.6vw,42px);line-height:1.12;color:#F7F1E2;margin:16px 0 22px">' + esc(t.expTitle) + '</h2>' +
              '<p style="color:#E4D7C2;font-size:17.5px;line-height:1.65;margin:0 0 16px;text-wrap:pretty">' + esc(t.expP1) + '</p>' +
              '<p style="color:#E4D7C2;font-size:17.5px;line-height:1.65;margin:0;text-wrap:pretty">' + esc(t.expP2) + '</p>' +
            '</div>' +
            '<div data-expagenda="1">' + agendaBlock +
              '<div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:30px">' +
                '<a href="https://www.instagram.com/hostalcelta/" target="_blank" rel="noopener" style="border:1px solid rgba(247,241,226,.6);color:#F7F1E2;font-size:14.5px;font-weight:600;letter-spacing:.05em;padding:14px 28px;border-radius:2px" data-hover="background:rgba(247,241,226,.16);color:#F7F1E2">' + esc(t.expCta) + '</a>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>';

    var roomBlocks = d.rooms.map(function (room) {
      var specs = room.specs.map(function (s) { return '<span>' + esc(s) + '</span>'; }).join("");
      var incs = room.includes.map(function (inc) { return '<span style="background:#F8F2E4;border:1px solid #E2D6BE;color:#6A5744;font-size:13px;padding:5px 11px;border-radius:2px">' + esc(inc) + '</span>'; }).join("");
      var priceBlock = CFG.mostrarPrecios ?
        '<div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">' +
          '<p style="font-family:Cormorant Garamond,Georgia,serif;font-size:21px;color:#B65A32;font-weight:600;margin:0">' + esc(room.price) + '</p>' +
          (room.promo ? '<span style="background:#33513C;color:#EFE5D2;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:5px 10px;border-radius:2px">' + esc(room.promo) + '</span>' : '') +
        '</div>' : '';
      var m = MEDIA.filter(function (x) { return x.src === room.img; })[0];
      var alt = m ? m.alt[state.lang] : room.name;
      return '<div style="display:grid;grid-template-columns:1fr 1fr;gap:54px;align-items:center;margin-bottom:78px">' +
        '<div style="' + esc(room.imgOrder) + '">' +
          '<img src="' + att(ASSET(room.img)) + '" alt="' + att(alt) + '" loading="lazy" decoding="async" style="width:100%;height:460px;object-fit:cover;object-position:' + esc(room.imgPos) + ';border-radius:3px;transition:transform .6s ease" data-hover="transform:scale(1.02)" />' +
        '</div>' +
        '<div>' +
          '<p style="font-family:Cormorant Garamond,Georgia,serif;font-size:15px;color:#A9812C;letter-spacing:.04em;margin:0">' + esc(room.num) + '</p>' +
          '<h3 style="font-family:Cormorant Garamond,Georgia,serif;font-weight:600;font-size:29px;color:#6B4327;margin:6px 0 14px">' + esc(room.name) + '</h3>' +
          '<p style="color:#6A5744;margin:0 0 18px;text-wrap:pretty">' + esc(room.desc) + '</p>' +
          '<div style="display:flex;gap:22px;flex-wrap:wrap;font-size:14.5px;color:#6B4327;border-top:1px solid #E2D6BE;padding-top:16px;margin-bottom:16px">' + specs + '</div>' +
          '<p style="font-size:11.5px;letter-spacing:.2em;text-transform:uppercase;color:#A9812C;font-weight:700;margin:0 0 8px">' + esc(t.includes) + '</p>' +
          '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px">' + incs + '</div>' +
          priceBlock +
        '</div>' +
      '</div>';
    }).join("");

    var celticSvg = '<svg viewBox="0 0 120 120" aria-hidden="true" style="width:34px;height:34px"><g fill="none" stroke="#C89A3E" stroke-width="3" stroke-linecap="round"><circle cx="60" cy="60" r="53" stroke-width="2.5"></circle><path d="M60 96 L60 24"></path><g id="tqa"><path d="M60 58 C71 56 78 50 82 43"></path><path d="M60 50 C71 47 79 40 84 34"></path><path d="M60 43 C68 38 72 31 71 24"></path></g><use href="#tqa" transform="matrix(-1,0,0,1,120,0)"></use><use href="#tqa" transform="matrix(1,0,0,-1,0,120)"></use><use href="#tqa" transform="matrix(-1,0,0,-1,120,120)"></use></g></svg>';

    var rooms =
      '<section id="alojamiento" data-reveal="1" style="padding:136px 0">' +
        '<div style="max-width:1140px;margin:0 auto;padding:0 28px">' +
          '<div style="max-width:660px;margin:0 auto 78px;text-align:center">' +
            '<div style="display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:10px">' +
              '<span style="height:1px;width:64px;background:#D8CBB0"></span>' + celticSvg + '<span style="height:1px;width:64px;background:#D8CBB0"></span>' +
            '</div>' +
            '<p style="font-size:12px;letter-spacing:.28em;text-transform:uppercase;color:#A9812C;font-weight:700;margin:0">' + esc(t.roomsKicker) + '</p>' +
            '<h2 style="font-family:Cormorant Garamond,Georgia,serif;font-weight:600;font-size:clamp(30px,4vw,44px);color:#6B4327;margin:10px 0 14px">' + esc(t.roomsTitle) + '</h2>' +
            '<p style="font-size:17px;color:#6A5744;margin:0;text-wrap:pretty">' + esc(t.roomsText) + '</p>' +
          '</div>' + roomBlocks +
        '</div>' +
      '</section>';

    var amenityRows = d.amenities.map(function (am) {
      return '<p style="display:flex;justify-content:space-between;align-items:baseline;gap:16px;border-bottom:1px solid #D6C6A6;padding:12px 0;margin:0;font-size:15.5px;color:#33251A">' + esc(am.name) + ' <span style="font-family:Cormorant Garamond,Georgia,serif;font-size:12.5px;color:#96793F;letter-spacing:.06em">' + esc(am.n) + '</span></p>';
    }).join("");
    var house =
      '<section data-reveal="1" style="background:#EBE0C8;border-top:1px solid #DDCFB2;border-bottom:1px solid #DDCFB2;padding:104px 0">' +
        '<div style="max-width:1140px;margin:0 auto;padding:0 28px;display:grid;grid-template-columns:.85fr 1.15fr;gap:64px;align-items:start">' +
          '<div>' +
            '<p style="font-size:12px;letter-spacing:.28em;text-transform:uppercase;color:#A9812C;font-weight:700;margin:0">' + esc(t.houseKicker) + '</p>' +
            '<h2 style="font-family:Cormorant Garamond,Georgia,serif;font-weight:600;font-size:clamp(27px,3.2vw,36px);line-height:1.15;color:#6B4327;margin:14px 0 18px;text-wrap:balance">' + esc(t.houseTitle) + '</h2>' +
          '</div>' +
          '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 44px">' + amenityRows + '</div>' +
        '</div>' +
      '</section>';

    var actCards = d.activities.map(function (a) {
      return '<a href="' + att(mapUrl(a.name)) + '" target="_blank" rel="noopener" title="' + att(a.desc) + '" style="display:flex;align-items:baseline;justify-content:space-between;gap:16px;border-bottom:1px solid #E2D6BE;padding:15px 2px;color:inherit;transition:border-color .25s ease" data-hover="border-color:#C89A3E;color:inherit">' +
        '<span style="font-family:Cormorant Garamond,Georgia,serif;font-size:20px;color:#6B4327">' + esc(a.name) + '</span>' +
        '<span style="font-size:13px;color:#96793F;font-weight:700;white-space:nowrap">' + esc(a.dist) + '</span></a>';
    }).join("");
    var pucon =
      '<section id="pucon" data-reveal="1" style="padding:136px 0">' +
        '<div style="max-width:1140px;margin:0 auto;padding:0 28px">' +
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;margin-bottom:56px">' +
            '<div>' +
              '<p style="font-size:12px;letter-spacing:.28em;text-transform:uppercase;color:#A9812C;font-weight:700;margin:0">' + esc(t.puconKicker) + '</p>' +
              '<h2 style="font-family:Cormorant Garamond,Georgia,serif;font-weight:600;font-size:clamp(29px,3.8vw,42px);line-height:1.12;color:#6B4327;margin:14px 0 18px;text-wrap:balance">' + esc(t.puconTitle) + '</h2>' +
              '<p style="color:#6A5744;font-size:17px;margin:0 0 16px;text-wrap:pretty">' + esc(t.puconP1) + '</p>' +
              '<p style="color:#6A5744;font-size:17px;margin:0;text-wrap:pretty">' + esc(t.puconP2) + '</p>' +
            '</div>' +
            '<div><img src="' + att(ASSET("assets/03_pucon_volcan.jpg")) + '" alt="' + att(t.altVolcano) + '" loading="lazy" decoding="async" style="width:100%;height:420px;object-fit:cover;border-radius:3px" /></div>' +
          '</div>' +
          '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 56px">' + actCards + '</div>' +
          '<p style="font-size:13px;color:#8A7359;font-style:italic;margin:18px 0 0">' + esc(t.distNote) + '</p>' +
        '</div>' +
      '</section>';

    var distRows = d.distances.map(function (x) {
      return '<p style="display:flex;justify-content:space-between;align-items:baseline;gap:20px;border-bottom:1px solid rgba(241,233,214,.2);padding:9px 0;margin:0;font-size:15.5px;color:#EFE5D2">' + esc(x.name) + ' <b style="font-family:Cormorant Garamond,Georgia,serif;color:#DDB55E;font-weight:600;white-space:nowrap">' + esc(x.km) + '</b></p>';
    }).join("");
    var location =
      '<section id="ubicacion" data-parallax="1" aria-label="' + att(t.altNight) + '" style="position:relative;min-height:'+locH+';display:flex;align-items:center;background-image:url(\'' + ASSET("assets/04_fachada_noche.jpg") + '\');background-size:cover;background-position:center">' +
        '<div style="position:absolute;inset:0;background:linear-gradient(90deg,rgba(14,8,3,.96) 0%,rgba(14,8,3,.9) 40%,rgba(20,11,6,.6) 68%,rgba(20,11,6,.45) 100%)"></div>' +
        '<div style="position:relative;z-index:2;max-width:1140px;margin:0 auto;width:100%;padding:112px 28px;color:#F1E9D6;display:grid;grid-template-columns:.92fr 1.08fr;gap:56px;align-items:center">' +
          '<div>' +
            '<p style="font-size:12px;letter-spacing:.28em;text-transform:uppercase;color:#DDB55E;font-weight:700;margin:0">' + esc(t.locKicker) + '</p>' +
            '<h2 style="font-family:Cormorant Garamond,Georgia,serif;font-weight:600;font-size:clamp(29px,3.8vw,42px);color:#F7F1E2;margin:14px 0 12px;max-width:17ch;text-wrap:balance">' + esc(t.locTitle) + '</h2>' +
            '<p style="color:#EFE5D2;font-size:17px;max-width:44ch;margin:0 0 18px;text-wrap:pretty">' + esc(t.locText) + '</p>' +
            '<p style="font-family:Cormorant Garamond,Georgia,serif;font-size:20px;color:#DDB55E;margin:0 0 26px">' + esc(t.locAddr) + '</p>' +
                        '<div style="margin:4px 0 0;max-width:44ch;border-left:2px solid rgba(221,181,94,.55);padding:2px 0 2px 18px">' +
              '<p style="font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:#DDB55E;font-weight:700;margin:0 0 7px">' + esc(t.arriveTitle) + '</p>' +
              '<p style="font-size:15.5px;color:#EFE5D2;margin:0;text-wrap:pretty">' + esc(t.arriveText) + '</p>' +
            '</div>' +
          '</div>' +
          '<div style="border:1px solid rgba(241,233,214,.25);border-radius:3px;overflow:hidden;box-shadow:0 20px 50px rgba(12,7,3,.45)">' +
            '<iframe title="' + att(t.mapTitle) + '" src="https://www.google.com/maps?q=Callej%C3%B3n%20Flores%20260,%20Puc%C3%B3n,%20Chile&z=14&output=embed" width="100%" height="470" style="border:0;display:block;filter:saturate(.85)" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' +
            '<div style="background:#241811;padding:14px 18px;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap">' +
              '<span style="font-size:12px;letter-spacing:.2em;text-transform:uppercase;font-weight:700;color:#CDBBA1">' + esc(t.howTo) + '</span>' +
              '<a href="https://maps.google.com/?q=Callej%C3%B3n+Flores+260,+Puc%C3%B3n,+Chile" target="_blank" rel="noopener" style="font-size:13.5px;font-weight:600;color:#DDB55E" data-hover="color:#F7F1E2">' + esc(t.openMaps) + '</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>';

    var tiles = MEDIA.map(function (m, idx) {
      var inner = m.type === "video"
        ? '<video src="' + att(ASSET(m.src)) + '" muted loop autoplay playsinline aria-label="' + att(m.alt[state.lang]) + '" style="width:100%;display:block" data-stop="1"></video>' +
          '<span style="position:absolute;bottom:12px;left:12px;background:rgba(20,11,6,.72);color:#F7F1E2;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;padding:6px 10px;border-radius:2px">Reel</span>'
        : '<img src="' + att(ASSET(m.src)) + '" alt="' + att(m.alt[state.lang]) + '" loading="lazy" decoding="async" style="width:100%;display:block" />';
      return '<div role="button" tabindex="0" aria-label="' + att(m.alt[state.lang]) + '" data-gal="' + idx + '" style="break-inside:avoid;margin-bottom:14px;position:relative;cursor:zoom-in;border-radius:3px;overflow:hidden;transition:opacity .3s ease" data-hover="opacity:.88">' + inner + '</div>';
    }).join("");
    var gallery =
      '<section id="galeria" data-reveal="1" style="padding:136px 0">' +
        '<div style="max-width:1140px;margin:0 auto;padding:0 28px">' +
          '<div style="display:flex;align-items:flex-end;justify-content:space-between;gap:32px;flex-wrap:wrap;margin-bottom:34px">' +
            '<div>' +
              '<p style="font-size:12px;letter-spacing:.28em;text-transform:uppercase;color:#A9812C;font-weight:700;margin:0">' + esc(t.galKicker) + '</p>' +
              '<h2 style="font-family:Cormorant Garamond,Georgia,serif;font-weight:600;font-size:clamp(28px,3.6vw,40px);color:#6B4327;margin:12px 0 0">' + esc(t.galTitle) + '</h2>' +
            '</div>' +
            '<p style="color:#6A5744;font-size:16px;margin:0;max-width:34ch;text-wrap:pretty">' + esc(t.galText) + '</p>' +
          '</div>' +
          '<div data-masonry="1" style="column-count:3;column-gap:14px">' + tiles + '</div>' +
        '</div>' +
      '</section>';

    var reviewCards = d.reviews.map(function (rev) {
      return '<div style="display:flex;flex-direction:column;background:#fff;border:1px solid #DED0B4;border-radius:4px;padding:26px 30px 28px;box-shadow:0 1px 2px rgba(46,29,18,.05);transition:transform .3s ease,box-shadow .3s ease,border-color .3s ease" data-hover="transform:translateY(-3px);box-shadow:0 12px 30px rgba(46,29,18,.12);border-color:#C89A3E">' +
        '<span aria-hidden="true" style="display:block;font-family:Cormorant Garamond,Georgia,serif;font-size:44px;line-height:.6;color:#E0C88E;margin:0 0 10px">&#8220;</span>' +
        '<p style="font-family:Cormorant Garamond,Georgia,serif;font-size:18px;line-height:1.5;color:#2A2018;font-style:italic;margin:0 0 22px;text-wrap:pretty">' + esc(rev.text) + '</p>' +
        '<div style="display:flex;align-items:center;gap:12px;margin-top:auto;border-top:1px solid #F0E7D3;padding-top:16px">' +
          '<span style="width:34px;height:34px;border-radius:50%;background:#C89A3E;color:#3a2c0d;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;flex:none">' + esc(rev.initial) + '</span>' +
          '<span style="display:block"><span style="display:block;font-weight:700;font-size:15px;color:#3A2617">' + esc(rev.name) + '</span><span style="display:block;font-size:12.5px;color:#8A7359">' + esc(rev.country) + '</span></span>' +
        '</div></div>';
    }).join("");
    var reviews =
      '<section id="opiniones" data-reveal="1" style="background:#F8F2E4;border-top:1px solid #E2D6BE;padding:132px 0">' +
        '<div style="max-width:1140px;margin:0 auto;padding:0 28px">' +
          '<div style="display:grid;grid-template-columns:.78fr 1.22fr;gap:74px;align-items:center;margin-bottom:56px">' +
            '<div style="background:#33513C;color:#EFE5D2;border-radius:3px;padding:34px 30px;text-align:center">' +
              '<p style="font-family:Cormorant Garamond,Georgia,serif;font-weight:700;font-size:64px;line-height:1;margin:0;color:#fff">' + esc(CFG.puntaje) + '</p>' +
              '<p style="font-family:Cormorant Garamond,Georgia,serif;font-size:24px;margin:6px 0 14px;color:#fff">' + esc(t.scoreWord) + '</p>' +
              '<p style="font-size:13.5px;color:#CFDCD1;margin:0 0 4px">' + esc(t.scoreSub) + '</p>' +
              '<p style="font-size:12.5px;color:#A9BFAD;margin:0 0 18px">' + esc(t.scoreBase) + '</p>' +
              '<div style="display:flex;justify-content:center;gap:20px;font-size:13px;color:#CFDCD1;border-top:1px solid rgba(239,229,210,.24);padding-top:16px">' +
                '<span>' + esc(t.scoreStaff) + ' <b style="font-family:Cormorant Garamond,Georgia,serif;color:#fff">9,3</b></span>' +
                '<span>' + esc(t.scoreClean) + ' <b style="font-family:Cormorant Garamond,Georgia,serif;color:#fff">9,3</b></span>' +
              '</div>' +
              '<a href="' + att(CFG.reservaUrl) + '" target="_blank" rel="noopener" style="display:inline-block;margin-top:20px;border:1px solid rgba(239,229,210,.6);color:#EFE5D2;font-size:13.5px;font-weight:600;padding:11px 20px;border-radius:2px" data-hover="background:rgba(239,229,210,.14);color:#fff">' + esc(t.reviewsLink) + '</a>' +
            '</div>' +
            '<div>' +
              '<p style="font-size:12px;letter-spacing:.28em;text-transform:uppercase;color:#A9812C;font-weight:700;margin:0">' + esc(t.revKicker) + '</p>' +
              '<h2 style="font-family:Cormorant Garamond,Georgia,serif;font-weight:600;font-size:clamp(28px,3.6vw,40px);color:#6B4327;margin:14px 0 14px;text-wrap:balance">' + esc(t.revTitle) + '</h2>' +
              '<p style="color:#56442F;font-size:17.5px;line-height:1.6;margin:0;text-wrap:pretty">' + esc(t.revText) + '</p>' +
            '</div>' +
          '</div>' +
          '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px;align-items:stretch">' + reviewCards + '</div>' +
          '<p style="font-size:13px;color:#8A7359;font-style:italic;margin:20px 0 0">' + esc(t.revNote) + '</p>' +
        '</div>' +
      '</section>';

    var faqItems = d.faq.map(function (q) {
      return '<details data-faq="1" style="border-bottom:1px solid #E2D6BE;padding:16px 0">' +
        '<summary style="display:flex;align-items:baseline;justify-content:space-between;gap:16px">' +
          '<h3 style="font-family:Cormorant Garamond,Georgia,serif;font-weight:600;font-size:18.5px;color:#6B4327;margin:0">' + esc(q.q) + '</h3>' +
        '</summary>' +
        '<p style="color:#56442F;font-size:15.5px;line-height:1.6;margin:10px 0 2px;max-width:64ch;text-wrap:pretty">' + esc(q.a) + '</p></details>';
    }).join("");
    var faq =
      '<section id="faq" data-reveal="1" style="padding:72px 0 116px">' +
        '<div style="max-width:1140px;margin:0 auto;padding:0 28px">' +
          '<div style="text-align:center;max-width:620px;margin:0 auto 40px">' +
            '<p style="font-size:12px;letter-spacing:.28em;text-transform:uppercase;color:#A9812C;font-weight:700;margin:0">' + esc(t.faqKicker) + '</p>' +
            '<h2 style="font-family:Cormorant Garamond,Georgia,serif;font-weight:600;font-size:clamp(28px,3.6vw,40px);color:#6B4327;margin:12px 0 0">' + esc(t.faqTitle) + '</h2>' +
          '</div>' +
          '<div style="max-width:800px;margin:0 auto">' + faqItems + '</div>' +
        '</div>' +
      '</section>';

    var waLbl = waLabel();

    var AC = { name: "name", in: "off", out: "off", guests: "off", msg: "off" };
    var field = function (label, name, type, extra) {
      var fid = "f-" + name;
      var req = name === "name" ? ' required aria-required="true"' : '';
      var common = ' id="' + fid + '" name="' + name + '" data-field="' + name + '" autocomplete="' + AC[name] + '"';
      return '<label for="' + fid + '" style="display:block' + (extra && extra.full ? ';grid-column:1 / -1' : '') + '">' +
        '<span style="display:block;font-size:11.5px;letter-spacing:.2em;text-transform:uppercase;color:#A9812C;font-weight:700;margin-bottom:7px">' + esc(label) + '</span>' +
        (type === "textarea"
          ? '<textarea rows="4"' + common + ' placeholder="' + att(t.fMsgHint) + '" style="width:100%;background:#fff;border:1px solid #E2D6BE;border-radius:2px;padding:13px 14px;font-family:Mulish,sans-serif;font-size:15.5px;color:#2A2018;resize:vertical">' + esc(state.form[name]) + '</textarea>'
          : '<input type="' + type + '"' + common + req + (name === "guests" ? ' min="1" max="9" inputmode="numeric"' : '') + ' value="' + att(state.form[name]) + '" style="width:' + (name === "guests" ? "110px" : "100%") + ';background:#fff;border:1px solid #E2D6BE;border-radius:2px;padding:13px 14px;font-family:Mulish,sans-serif;font-size:15.5px;color:#2A2018" />') +
        '</label>';
    };
    var contact =
      '<section id="contacto" data-reveal="1" style="background:#F8F2E4;border-top:1px solid #E2D6BE;padding:120px 0">' +
        '<span id="reservar" aria-hidden="true" style="display:block;height:0"></span>' +
        '<div style="max-width:1140px;margin:0 auto;padding:0 28px;display:grid;grid-template-columns:.85fr 1.15fr;gap:60px;align-items:start">' +
          '<div>' +
            '<p style="font-size:12px;letter-spacing:.28em;text-transform:uppercase;color:#A9812C;font-weight:700;margin:0">' + esc(t.formKicker) + '</p>' +
            '<h2 style="font-family:Cormorant Garamond,Georgia,serif;font-weight:600;font-size:clamp(27px,3.2vw,38px);line-height:1.14;color:#6B4327;margin:14px 0 16px;text-wrap:balance">' + esc(t.formTitle) + '</h2>' +
            '<p style="color:#54432F;font-size:17px;margin:0 0 26px;text-wrap:pretty">' + esc(t.formText) + '</p>' +
            '<a href="' + att(CFG.whatsappUrl) + '" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;background:#B65A32;color:#fff;font-size:15px;font-weight:600;letter-spacing:.04em;padding:16px 30px;border-radius:2px" data-hover="background:#9d4826;color:#fff">' + waBtnInner(t.ctaWhats) + '</a>' +
            '<p style="font-size:15px;color:#54432F;margin:22px 0 0;max-width:44ch">' + esc(t.ctaAlsoPre) + ' ' +
              '<a href="' + att(CFG.reservaUrl) + '" target="_blank" rel="noopener" style="color:#B65A32;border-bottom:1px solid rgba(182,90,50,.4)" data-hover="color:#8E4223;border-bottom-color:#8E4223">Booking</a> ' + esc(t.ctaOr) + ' ' +
              '<a href="' + att(CFG.airbnbUrl) + '" target="_blank" rel="noopener" style="color:#B65A32;border-bottom:1px solid rgba(182,90,50,.4)" data-hover="color:#8E4223;border-bottom-color:#8E4223">Airbnb</a> ' + esc(t.ctaAlsoPost) +
            '</p>' +
            (waLbl ? '<p style="font-family:Cormorant Garamond,Georgia,serif;font-size:19px;color:#96793F;margin:16px 0 0">' + esc(waLbl) + '</p>' : '') +
          '</div>' +
          '<div>' +
            '<p style="font-size:11.5px;letter-spacing:.24em;text-transform:uppercase;color:#96793F;font-weight:700;margin:0 0 18px">' + esc(t.formHeading) + '</p>' +
          '<form data-form="1" style="display:grid;grid-template-columns:1fr 1fr;gap:18px">' +
            field(t.fName, "name", "text", { full: true }) +
            field(t.fIn, "in", "date") +
            field(t.fOut, "out", "date") +
            field(t.fGuests, "guests", "number", { full: true }) +
            field(t.fMsg, "msg", "textarea", { full: true }) +
            '<div style="grid-column:1 / -1;margin-top:4px">' +
              '<button type="submit" style="width:100%;background:#B65A32;color:#fff;border:none;font-size:15.5px;font-weight:700;letter-spacing:.05em;padding:17px 30px;border-radius:2px;cursor:pointer" data-hover="background:#9d4826">' + esc(t.fSend) + '</button>' +
            '</div>' +
          '</form>' +
            '<p style="font-size:13px;line-height:1.6;color:#8A7359;margin:14px 0 0">' + esc(t.fNote) + '</p>' +
          '</div>' +
        '</div>' +
      '</section>';

    var fl = function (href, label, blank) {
      return '<a href="' + att(href) + '"' + (blank ? ' target="_blank" rel="noopener"' : '') + ' style="display:block;color:#CDBBA1;font-size:14.5px;margin-bottom:10px" data-hover="color:#F7F1E2">' + esc(label) + '</a>';
    };
    var footer =
      '<footer style="background:#2E1D12;color:#CDBBA1;padding:70px 0 40px">' +
        '<div style="max-width:1140px;margin:0 auto;padding:0 28px">' +
          '<div style="display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:44px">' +
            '<div>' +
              '<div style="display:flex;align-items:center;gap:13px;margin-bottom:16px">' +
                '<img src="' + att(ASSET("assets/logo.png")) + '" alt="' + att(t.altLogo) + '" style="width:48px;height:48px;border-radius:50%" />' +
                '<span style="display:block"><span style="display:block;font-family:Cormorant Garamond,Georgia,serif;font-weight:700;font-size:18px;color:#F7F1E2;letter-spacing:.12em;text-transform:uppercase">Hostal Celta</span>' +
                '<span style="display:block;font-size:10.5px;letter-spacing:.26em;text-transform:uppercase;color:#A9812C;margin-top:2px">Pucón · Chile</span></span>' +
              '</div>' +
              '<p style="font-size:14.5px;line-height:1.6;color:#B4A187;margin:0;max-width:30ch">' + esc(t.footerTagline) + '</p>' +
            '</div>' +
            '<div>' +
              '<h4 style="font-family:Mulish,sans-serif;font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:#DDB55E;margin:0 0 16px">' + esc(t.footerHouse) + '</h4>' +
              fl("#alojamiento", t.navRooms) + fl("#experiencias", t.navExp) + fl("#galeria", t.navGal) + fl("#opiniones", t.navRev) +
            '</div>' +
            '<div>' +
              '<h4 style="font-family:Mulish,sans-serif;font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:#DDB55E;margin:0 0 16px">' + esc(t.footerPucon) + '</h4>' +
              fl("#pucon", t.navPucon) + fl("#ubicacion", t.navLocation) + fl("#faq", t.navFaq) +
            '</div>' +
            '<div>' +
              '<h4 style="font-family:Mulish,sans-serif;font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:#DDB55E;margin:0 0 16px">' + esc(t.footerContact) + '</h4>' +
              '<a href="https://maps.google.com/?q=Callej%C3%B3n+Flores+260,+Puc%C3%B3n,+Chile" target="_blank" rel="noopener" style="display:block;color:#CDBBA1;font-size:14.5px;line-height:1.5;margin-bottom:12px" data-hover="color:#F7F1E2">Callejón Flores 260<br />Pucón, Chile</a>' +
              fl("https://www.instagram.com/hostalcelta/", "@hostalcelta", true) +
              fl(CFG.whatsappUrl, "WhatsApp", true) + fl(CFG.reservaUrl, "Booking", true) + fl(CFG.airbnbUrl, "Airbnb", true) + fl("#contacto", t.book) +
            '</div>' +
          '</div>' +
          '<div style="border-top:1px solid rgba(241,233,214,.14);margin-top:48px;padding-top:22px;font-size:13px;color:#9C8B76;display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px">' +
            '<span>© 2026 Hostal Celta · hostalcelta.cl</span>' +
            '<span>' + esc(t.footerHours) + '</span>' +
          '</div>' +
        '</div>' +
      '</footer>';

    var sticky =
      '<div data-stickycta="1" style="display:none;position:fixed;left:0;right:0;bottom:0;z-index:120;padding:12px 14px;background:rgba(46,29,18,.96);backdrop-filter:blur(8px);border-top:1px solid rgba(241,233,214,.16)">' +
        '<a href="' + att(CFG.whatsappUrl) + '" target="_blank" rel="noopener" style="display:block;text-align:center;background:#33513C;color:#fff;font-size:15px;font-weight:700;letter-spacing:.04em;padding:15px 10px;border-radius:2px" data-hover="background:#3d6248;color:#fff">' + waBtnInner(t.ctaWhats) + '</a>' +
      '</div>';

    var waFloat =
      '<a class="wa-float" href="' + att(CFG.whatsappUrl) + '" target="_blank" rel="noopener" aria-label="' + (state.lang === "en" ? "Message us on WhatsApp" : "Escríbenos por WhatsApp") + '">' + WA_SVG + '</a>';

    return header + hero + trust + host + experiences + rooms + house + pucon + location + gallery + reviews + faq + contact + footer + waFloat;
  }

  /* ---------------- LIGHTBOX ---------------- */
  function renderLightbox() {
    var root = document.getElementById("lightbox-root");
    var i = state.lightbox;
    if (i < 0) { root.innerHTML = ""; document.body.style.overflow = ""; return; }
    var t = state.lang === "en" ? EN : ES;
    var m = MEDIA[i];
    var media = m.type === "video"
      ? '<video src="' + att(ASSET(m.src)) + '" controls autoplay loop playsinline style="width:100%;max-height:78vh;object-fit:contain;border-radius:3px;margin:0 auto"></video>'
      : '<img src="' + att(ASSET(m.src)) + '" alt="' + att(m.alt[state.lang]) + '" style="width:auto;max-width:100%;max-height:78vh;object-fit:contain;border-radius:3px;margin:0 auto" />';
    root.innerHTML =
      '<div role="dialog" aria-modal="true" aria-label="' + att(t.galTitle) + '" data-lb-overlay="1" style="position:fixed;inset:0;z-index:200;background:rgba(14,8,4,.94);display:flex;align-items:center;justify-content:center;padding:40px">' +
        '<button type="button" data-lb="close" aria-label="' + att(t.close) + '" style="position:absolute;top:22px;right:26px;background:none;border:1px solid rgba(247,241,226,.5);color:#F7F1E2;font-size:20px;line-height:1;width:44px;height:44px;border-radius:50%">×</button>' +
        '<button type="button" data-lb="prev" aria-label="' + att(t.prev) + '" style="position:absolute;left:20px;background:none;border:1px solid rgba(247,241,226,.5);color:#F7F1E2;font-size:22px;line-height:1;width:48px;height:48px;border-radius:50%">‹</button>' +
        '<button type="button" data-lb="next" aria-label="' + att(t.next) + '" style="position:absolute;right:20px;background:none;border:1px solid rgba(247,241,226,.5);color:#F7F1E2;font-size:22px;line-height:1;width:48px;height:48px;border-radius:50%">›</button>' +
        '<div data-lb="stage" style="max-width:1100px;width:100%;text-align:center">' + media +
          '<p style="color:#D9C9B2;font-size:14px;margin:16px 0 0">' + esc(m.alt[state.lang]) + ' · ' + (i + 1) + ' / ' + MEDIA.length + '</p>' +
        '</div>' +
      '</div>';
    document.body.style.overflow = "hidden";
    var cb = root.querySelector('[data-lb="close"]');
    if (cb) cb.focus();
  }
  function step(dir) { if (state.lightbox < 0) return; state.lightbox = (state.lightbox + dir + MEDIA.length) % MEDIA.length; renderLightbox(); }
  function closeLb() { state.lightbox = -1; renderLightbox(); if (lastFocus && lastFocus.focus) { lastFocus.focus(); lastFocus = null; } }

  /* ---------------- INTERACCIONES ---------------- */
  function applyHead() {
    var en = state.lang === "en";
    document.documentElement.lang = state.lang;
    document.title = en ? "Hostal Celta — Pucón, Chile | Timber hostel" : "Hostal Celta — Pucón, Chile | Hostal de madera";
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", en
      ? "Hostal Celta: a small timber hostel in Pucón, Chile. Nine beds, fireplace, shared kitchen and nights of live music, three blocks from the centre."
      : "Hostal Celta: hostal boutique de madera en Pucón, Chile. Nueve camas, chimenea, cocina compartida y noches de música, a tres cuadras del centro.");
  }

  function wireHovers(root) {
    root.querySelectorAll("[data-hover]").forEach(function (el) {
      var base = el.getAttribute("style") || "";
      var hov = el.getAttribute("data-hover");
      var on = function () { el.setAttribute("style", base + ";" + hov); };
      var off = function () { el.setAttribute("style", base); };
      el.addEventListener("mouseenter", on);
      el.addEventListener("mouseleave", off);
      el.addEventListener("focus", on);
      el.addEventListener("blur", off);
    });
  }

  function wireReveal(root) {
    if (reduceMotion() || /[?&]noreveal/.test(location.search) || !("IntersectionObserver" in window)) return;
    var els = root.querySelectorAll("[data-reveal]");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.style.opacity = "1"; e.target.style.transform = "none"; io.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    els.forEach(function (el) {
      el.style.opacity = "0"; el.style.transform = "translateY(22px)";
      el.style.transition = "opacity .8s ease, transform .8s ease";
      io.observe(el);
    });
  }

  function wire(root) {
    // language toggle
    root.querySelectorAll("[data-lang]").forEach(function (b) {
      b.addEventListener("click", function () {
        var lang = b.getAttribute("data-lang");
        if (lang === state.lang) return;
        state.lang = lang;
        render();
      });
    });
    // gallery
    root.querySelectorAll("[data-gal]").forEach(function (el) {
      var idx = parseInt(el.getAttribute("data-gal"), 10);
      var openIt = function () { lastFocus = el; state.lightbox = idx; renderLightbox(); };
      el.addEventListener("click", openIt);
      el.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openIt(); }
      });
    });
    root.querySelectorAll("[data-stop]").forEach(function (v) {
      v.addEventListener("click", function (e) { e.stopPropagation(); });
    });
    // form fields
    root.querySelectorAll("[data-field]").forEach(function (inp) {
      inp.addEventListener("input", function () { state.form[inp.getAttribute("data-field")] = inp.value; });
    });
    var form = root.querySelector("[data-form]");
    if (form) form.addEventListener("submit", function (e) {
      e.preventDefault();
      var base = CFG.whatsappUrl;
      var url = base + (base.indexOf("?") > -1 ? "&" : "?") + "text=" + encodeURIComponent(buildMessage());
      window.open(url, "_blank", "noopener");
    });
  }

  function render() {
    var y = window.scrollY;
    var app = document.getElementById("app");
    app.innerHTML = view();
    applyHead();
    wire(app);
    wireHovers(app);
    wireReveal(app);
    window.scrollTo(0, y);
    updateHeader();
  }

  // global keyboard for lightbox
  window.addEventListener("keydown", function (e) {
    if (state.lightbox < 0) return;
    if (e.key === "Escape") closeLb();
    else if (e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "Tab") {
      var btns = document.querySelectorAll('#lightbox-root button');
      if (!btns.length) return;
      var first = btns[0], last = btns[btns.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      else if (!document.getElementById("lightbox-root").contains(document.activeElement)) { e.preventDefault(); first.focus(); }
    }
  });
  // lightbox clicks
  document.getElementById("lightbox-root").addEventListener("click", function (e) {
    var act = e.target.closest ? e.target.closest("[data-lb]") : null;
    if (act) {
      var k = act.getAttribute("data-lb");
      if (k === "close") return closeLb();
      if (k === "prev") return step(-1);
      if (k === "next") return step(1);
      if (k === "stage") return; // clicks on media area do nothing
    }
    if (e.target.getAttribute && e.target.getAttribute("data-lb-overlay")) closeLb();
  });
  // re-render FAQ open-state when crossing the mobile breakpoint
  var mq = window.matchMedia("(max-width:820px)");
  (mq.addEventListener ? mq.addEventListener.bind(mq, "change") : mq.addListener.bind(mq))(function () { render(); });

  // header: transparent over the hero, solid once scrolled
  function updateHeader() {
    var hd = document.querySelector("header.site-header");
    if (hd) hd.classList.toggle("solid", window.scrollY > 60);
  }
  window.addEventListener("scroll", updateHeader, { passive: true });

  var qlang = (location.search.match(/[?&]lang=(es|en)/) || [])[1];
  if (qlang) state.lang = qlang;
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render);
  else render();
})();
