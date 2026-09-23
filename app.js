/* Hostal Celta — sitio oficial (vanilla, sin dependencias). Bilingüe ES/EN.
   Datos y textos arriba; el HTML se arma en view() con las clases de styles.css. */
(function () {
  "use strict";

  /* ---------------- CONFIG ---------------- */
  var CFG = {
    reservaUrl: "https://www.booking.com/hotel/cl/hostal-celta-pucon.es.html",
    airbnbUrl: "https://www.airbnb.cl/rooms/1582074740518526118",
    whatsappUrl: "https://wa.me/56995154685",        // +56 9 9515 4685 (ficha de Google Maps; confirmar con Alex)
    instagramUrl: "https://www.instagram.com/hostalcelta/",
    puntaje: "9,1",                                  // nota real de Booking (12 comentarios, sept 2026)
    comentarios: "12",
    subnotas: { personal: "9,3", limpieza: "9,3" },
    mostrarPrecios: true,
    mostrarAgenda: true
  };
  var MAPS_PLACE = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Callejón Flores 260, Pucón, Chile");
  var MAPS_ROUTE = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent("Callejón Flores 260, Pucón, Chile");
  var MAP_EMBED = "https://www.google.com/maps?q=Callej%C3%B3n%20Flores%20260,%20Puc%C3%B3n,%20Chile&z=15&output=embed";

  /* resuelve rutas de assets; en el archivo standalone vienen inlineadas en window.__resources */
  var ASSET = function (p) { var m = window.__resources || {}; return m[p] || p; };

  /* ---------------- GALERÍA (la primera es la destacada) ---------------- */
  var MEDIA = [
    { src: "assets/17_cartel_tallado.jpg", type: "image", alt: { es: "El cartel del hostal, tallado y pintado a mano", en: "The hostel sign, hand-carved and painted" } },
    { src: "assets/reel_mar23.mp4", poster: "assets/reel_poster.jpg", type: "video", alt: { es: "Reel: handpan en el salón", en: "Reel: handpan in the lounge" } },
    { src: "assets/08_salon_cocina.jpg", type: "image", alt: { es: "Salón y cocina compartida", en: "Lounge and shared kitchen" } },
    { src: "assets/22_banos_murales.jpg", type: "image", alt: { es: "Baños con nudos celtas y árboles pintados a mano", en: "Bathrooms with hand-painted Celtic knots and trees" } },
    { src: "assets/15_handpan_salon.jpg", type: "image", alt: { es: "Handpan en la casa, contra el muro de madera", en: "Handpan in the house, against the timber wall" } },
    { src: "assets/24_mural_duende_arbol.jpg", type: "image", alt: { es: "Duende pintado en el árbol del baño", en: "A painted elf sitting in the bathroom tree" } },
    { src: "assets/20_doble_cama.jpg", type: "image", alt: { es: "Habitación Triskel con mural del volcán Villarrica", en: "Triskel room with a Villarrica volcano mural" } },
    { src: "assets/09_rincon_guitarra.jpg", type: "image", alt: { es: "Rincón de la guitarra", en: "The guitar corner" } },
    { src: "assets/21_mural_volcan.jpg", type: "image", alt: { es: "Detalle del mural: volcán, araucarias y un pajarito", en: "Mural detail: volcano, monkey-puzzle trees and a bird" } },
    { src: "assets/07_triskel.jpg", type: "image", alt: { es: "Cama de madera con cortina y luz cálida", en: "Timber bed with a curtain and warm light" } },
    { src: "assets/23_puerta_bano.jpg", type: "image", alt: { es: "Puerta del baño pintada con árboles y manilla de rama", en: "Bathroom door painted with trees, with a branch handle" } },
    { src: "assets/11_invitado_teclado.jpg", type: "image", alt: { es: "Un huésped tocando el teclado en el salón", en: "A guest playing the keyboard in the lounge" } }
  ];
  var MOBILE_TILES = 9; // en móvil se muestran la destacada + 8; el resto, en el visor

  /* ---------------- TEXTOS ---------------- */
  var ES = {
    navRooms: "Alojamiento", navExp: "Experiencias", navPucon: "Qué hacer", navLocation: "Ubicación",
    navFaq: "Antes de venir", navGal: "Galería", navRev: "Opiniones", book: "Reservar",
    navAria: "Principal", menu: "Menú", lang: "Idioma",
    heroKicker: "Hostal de madera · Sur de Chile",
    heroTitle: "Un refugio con alma.",
    heroText: "Chimenea, murales pintados a mano y música en vivo, a 10 minutos a pie del centro de Pucón.",
    heroCta: "Consultar disponibilidad", heroCta2: "Ver habitaciones", heroNote: "Te respondemos por WhatsApp",
    trustAria: "Datos rápidos del hostal", trustScoreSuffix: "en Booking",
    trustCenter: "A 10 min a pie del centro", trustBeds: "Solo 9 camas",
    hostKicker: "Bienvenidos", hostTitle: "Un lugar pequeño, hecho para compartir.",
    hostP1: "Soy Alex. Me gusta la montaña, el agua y recibir gente. Levanté esta casa de madera pensando en que fuera cómoda y tranquila, pero, sobre todo, en que quien llega no se sienta como un huésped más.",
    hostP2: "Recibimos a pocas personas a propósito. Así, alrededor de la chimenea o en la cocina, terminan naciendo conversaciones, comidas compartidas y más de alguna amistad.",
    hostSign: "Alex, anfitrión", hostWa: "Escríbele a Alex por WhatsApp", hostWaMsg: "¡Hola Alex! Tengo una consulta sobre el hostal.",
    altMural: "Mural del duende del bosque y el volcán, pintado en la casa", hostCaption: "Mural pintado a mano en la casa.",
    expKicker: "Experiencias", expTitle: "Comunidad al calor del fuego",
    expP1: "Casi todas las semanas hay música en el salón —piano, handpan o algún huésped que se anima con la guitarra—, noches de chimenea y sobremesas largas en la cocina.",
    expP2: "Quienes pasan por acá recuerdan la comodidad, pero sobre todo a la gente.",
    altExp: "Música en vivo en el salón de la casa",
    agendaTitle: "Lo que suele pasar en la semana",
    agendaNote: "Días y horarios pueden cambiar: confírmalos en Instagram o pregúntale a Alex al llegar.",
    expCta: "Ver la agenda en Instagram",
    roomsKicker: "Alojamiento", roomsTitle: "Dos formas de quedarte",
    roomsText: "Madera, murales pintados a mano, baños compartidos impecables y una cocina equipada para que te sientas en casa.",
    includes: "Incluye", roomCta: "Consultar por esta habitación", roomMsg: "¡Hola Alex! Quiero consultar por: ",
    priceAsk: "Tarifa según fechas",
    houseKicker: "La casa", houseTitle: "Lo que encuentras al entrar",
    houseText: "La chimenea, la cocina y el jardín son el corazón de la casa: espacios pensados para quedarse.",
    altHouse: "Salón con estufa a leña, vigas de madera y ventanal al jardín",
    puconKicker: "Qué hacer en Pucón", puconTitle: "La aventura comienza al salir por la puerta.",
    puconP1: "Volcanes, lagos, termas y bosques de araucarias: Pucón es uno de los mejores destinos de naturaleza de Chile, tanto para la aventura como para el descanso.",
    puconP2: "Pregúntanos y te recomendamos rutas, actividades y rincones según el clima y lo que te guste.",
    actsNote: "Tiempos aproximados desde el hostal. Toca un lugar para verlo en Google Maps.",
    actsExt: "abre Google Maps",
    puconCta: "Pregúntale a Alex por WhatsApp", puconMsg: "¡Hola Alex! Quiero ideas de qué hacer en Pucón.",
    altVolcano: "El volcán Villarrica desde Pucón",
    locKicker: "Ubicación", locTitle: "Lo suficientemente cerca para caminar. Lo suficientemente lejos para descansar.",
    locText: "La casa está en un sector tranquilo de Pucón, a 10 minutos a pie del centro y a 12 del lago, con acceso rápido al volcán, los parques nacionales, las termas y los senderos.",
    locAddr: "Callejón Flores 260 · Pucón, Chile", arriveTitle: "¿Cómo llegar?",
    arriveText: "Los buses de larga distancia llegan al centro de Pucón, a unos 10 minutos caminando. Si vienes en avión, el aeropuerto La Araucanía (Temuco) está a unos 83 km: te ayudamos a coordinar el traslado.",
    arriveCta: "Coordinar mi llegada por WhatsApp", arriveMsg: "¡Hola Alex! Quiero coordinar mi llegada al hostal.",
    mapTitle: "Mapa de Hostal Celta en Pucón", routeLink: "Ver la ruta en Google Maps",
    altNight: "La casa de noche: el salón iluminado, lleno de gente",
    galKicker: "Galería", galTitle: "La casa, tal como es",
    galText: "Fotos reales de la casa y un reel. Abre cualquier foto para verla en grande.",
    galMore: "Ver todo (" + MEDIA.length + ")", galOpen: "Ver en grande: ",
    close: "Cerrar", prev: "Anterior", next: "Siguiente",
    scoreWord: "Fantástico", scoreSub: "Nota media en Booking.com · " + CFG.comentarios + " comentarios",
    scoreStaff: "Personal", scoreClean: "Limpieza",
    revKicker: "Opiniones", revTitle: "Lo que dicen quienes ya vinieron",
    revText: "Reseñas de huéspedes de distintos lugares. Casi todas coinciden en lo mismo: el ambiente y el trato.",
    revNote: "Comentarios publicados en Booking. Los que estaban en alemán, traducidos.",
    reviewsLink: "Leer las " + CFG.comentarios + " opiniones en Booking", revCta: "Consultar disponibilidad",
    extTab: "(se abre en otra pestaña)",
    faqKicker: "Preguntas frecuentes", faqTitle: "Antes de venir",
    faqText: "¿No encuentras tu pregunta? Escríbenos y te respondemos.", faqCta: "Preguntar por WhatsApp",
    faqMsg: "¡Hola Alex! Tengo una pregunta: ",
    formKicker: "Reserva tu estadía", formTitle: "Cuéntanos cuándo vienes",
    formText: "Déjanos tus fechas y te respondemos por WhatsApp: confirmamos la disponibilidad, resolvemos tus dudas y te ayudamos a planificar la llegada.",
    directPre: "¿Prefieres escribir directo? ",
    ctaAlsoPre: "También puedes reservar en", ctaOr: "o", ctaAlsoPost: ".",
    formHeading: "Consulta de disponibilidad",
    fName: "Nombre", fIn: "Llegada", fOut: "Salida", fGuests: "Huéspedes", fMsg: "Mensaje (opcional)",
    fMsgHint: "Cuéntanos si viajas en grupo, si llegas de noche o lo que necesites.",
    fSend: "Enviar consulta por WhatsApp", fNote: "Se abrirá WhatsApp con tu mensaje listo; solo tienes que enviarlo.",
    footerTagline: "Un refugio de madera con alma celta, donde la naturaleza, la calma y la comunidad se encuentran.",
    footerHouse: "La casa", footerPucon: "Pucón", footerContact: "Contacto",
    footerHours: "Check-in 14:00–23:00 · Check-out 10:00–11:00",
    altLogo: "Logo del Hostal Celta: árbol de la vida celta con una puerta dorada",
    waFloat: "Escríbenos por WhatsApp"
  };

  var EN = {
    navRooms: "Rooms", navExp: "Experiences", navPucon: "Things to do", navLocation: "Location",
    navFaq: "Before you come", navGal: "Gallery", navRev: "Reviews", book: "Book now",
    navAria: "Main", menu: "Menu", lang: "Language",
    heroKicker: "Timber hostel · Southern Chile",
    heroTitle: "A refuge with soul.",
    heroText: "A fireplace, hand-painted murals and live music, a 10-minute walk from central Pucón.",
    heroCta: "Check availability", heroCta2: "See the rooms", heroNote: "We reply on WhatsApp",
    trustAria: "Hostel at a glance", trustScoreSuffix: "on Booking",
    trustCenter: "10-minute walk to the centre", trustBeds: "Just 9 beds",
    hostKicker: "Welcome", hostTitle: "A small place, built for meeting people.",
    hostP1: "I'm Alex. I love the mountains, the water and having people over. I built this wooden house to be comfortable and quiet — but above all so nobody who walks in feels like just another guest.",
    hostP2: "We keep it small on purpose. Around the fireplace or in the kitchen, conversations, shared meals and a few friendships tend to happen on their own.",
    hostSign: "Alex, your host", hostWa: "Message Alex on WhatsApp", hostWaMsg: "Hi Alex! I have a question about the hostel.",
    altMural: "Mural of the forest sprite and the volcano, painted in the house", hostCaption: "Hand-painted mural in the house.",
    expKicker: "Experiences", expTitle: "Community around the fire",
    expP1: "Most weeks there's music in the lounge — piano, handpan or a guest who picks up the guitar — evenings by the fire and long dinners in the kitchen.",
    expP2: "Guests remember the comfort, but above all the people.",
    altExp: "Live music in the lounge of the house",
    agendaTitle: "What usually happens during the week",
    agendaNote: "Days and times can change: check Instagram or ask Alex when you arrive.",
    expCta: "See the line-up on Instagram",
    roomsKicker: "Rooms", roomsTitle: "Two ways to stay",
    roomsText: "Timber, hand-painted murals, spotless shared bathrooms and a fully equipped kitchen so you can settle in.",
    includes: "Included", roomCta: "Ask about this room", roomMsg: "Hi Alex! I'd like to ask about: ",
    priceAsk: "Rate depends on dates",
    houseKicker: "The house", houseTitle: "What you'll find inside",
    houseText: "The fireplace, the kitchen and the garden are the heart of the house: spaces made for staying a while.",
    altHouse: "Lounge with a wood stove, timber beams and a big window onto the garden",
    puconKicker: "Things to do in Pucón", puconTitle: "The adventure starts at the front door.",
    puconP1: "Volcanoes, lakes, hot springs and monkey-puzzle forests: Pucón is one of Chile's best nature destinations, for adventure and for rest alike.",
    puconP2: "Ask us and we'll suggest routes, activities and local corners depending on the weather and what you enjoy.",
    actsNote: "Approximate times from the hostel. Tap a place to see it on Google Maps.",
    actsExt: "opens Google Maps",
    puconCta: "Ask Alex on WhatsApp", puconMsg: "Hi Alex! I'd love some ideas for things to do in Pucón.",
    altVolcano: "Villarrica volcano seen from Pucón",
    locKicker: "Location", locTitle: "Close enough to walk. Far enough to rest.",
    locText: "The house sits in a quiet part of Pucón, a 10-minute walk from the centre and 12 from the lake, with quick access to the volcano, national parks, hot springs and trails.",
    locAddr: "Callejón Flores 260 · Pucón, Chile", arriveTitle: "Getting here",
    arriveText: "Long-distance buses stop in central Pucón, about a 10-minute walk away. If you're flying, La Araucanía airport (Temuco) is about 83 km away: we can help you arrange a transfer.",
    arriveCta: "Plan my arrival on WhatsApp", arriveMsg: "Hi Alex! I'd like to plan my arrival at the hostel.",
    mapTitle: "Map of Hostal Celta in Pucón", routeLink: "Get directions on Google Maps",
    altNight: "The house at night: the lounge lit up and full of people",
    galKicker: "Gallery", galTitle: "The house as it really is",
    galText: "Real photos of the house and a reel. Open any photo to see it large.",
    galMore: "See all (" + MEDIA.length + ")", galOpen: "View large: ",
    close: "Close", prev: "Previous", next: "Next",
    scoreWord: "Fantastic", scoreSub: "Average score on Booking.com · " + CFG.comentarios + " reviews",
    scoreStaff: "Staff", scoreClean: "Cleanliness",
    revKicker: "Reviews", revTitle: "What past guests say",
    revText: "Reviews from guests all over the map. Almost all of them come back to the same thing: the atmosphere and the welcome.",
    revNote: "Reviews published on Booking. Some translated into English.",
    reviewsLink: "Read all " + CFG.comentarios + " reviews on Booking", revCta: "Check availability",
    extTab: "(opens in a new tab)",
    faqKicker: "FAQ", faqTitle: "Before you come",
    faqText: "Can't find your question? Message us and we'll get back to you.", faqCta: "Ask on WhatsApp",
    faqMsg: "Hi Alex! I have a question: ",
    formKicker: "Book your stay", formTitle: "Tell us when you're coming",
    formText: "Send us your dates and we'll reply on WhatsApp: we'll confirm availability, answer your questions and help you plan your arrival.",
    directPre: "Rather message us directly? ",
    ctaAlsoPre: "You can also book on", ctaOr: "or", ctaAlsoPost: ".",
    formHeading: "Availability enquiry",
    fName: "Name", fIn: "Arrival", fOut: "Departure", fGuests: "Guests", fMsg: "Message (optional)",
    fMsgHint: "Tell us if you're travelling as a group, arriving late, or anything else you need.",
    fSend: "Send enquiry on WhatsApp", fNote: "WhatsApp will open with your message ready — you just hit send.",
    footerTagline: "A timber refuge with a Celtic soul, where nature, calm and community meet.",
    footerHouse: "The house", footerPucon: "Pucón", footerContact: "Contact",
    footerHours: "Check-in 2–11 pm · Check-out 10–11 am",
    altLogo: "Hostal Celta logo: a Celtic tree of life with a golden door",
    waFloat: "Message us on WhatsApp"
  };

  var DATA = {
    es: {
      agenda: [
        { day: "Miércoles", name: "Piano y sobremesa junto a la chimenea", time: "18:00" },
        { day: "Viernes", name: "Handpan en el salón", time: "19:00" },
        { day: "Domingo", name: "Café de la Muerte · conversación abierta", time: "19:00" }
      ],
      rooms: [
        { num: "Opción 01", name: "Dormitorio compartido", img: "assets/01_dormitorio_cama.jpg", imgPos: "center",
          alt: "Dormitorio compartido: camarotes de madera junto a un ventanal al jardín",
          desc: "Ocho camas de madera, cada una con su cortina para privacidad y un baúl con llave para tus cosas. La forma más social —y más económica— de quedarte.",
          specs: ["8 camas", "Mixto", "Baúl con llave"],
          includes: ["Ropa de cama", "Toalla", "Baño compartido", "Wi-Fi", "Cocina"],
          price: "Desde $18.000", unit: "por cama / noche", promo: "Promo temporada baja" },
        { num: "Opción 02", name: "Triskel · Doble Superior", img: "assets/19_doble_mural_volcan.jpg", imgPos: "center 45%",
          alt: "Habitación Triskel: cama doble frente a un mural del volcán Villarrica",
          desc: "Nuestra habitación privada, con nombre celta: una cama de dos plazas frente a un mural pintado a mano del volcán Villarrica, con araucarias y un pajarito en la rama. Luz de mañana y vista al jardín.",
          specs: ["1 cama doble", "Hasta 2 personas", "Privada"],
          includes: ["Ropa de cama", "Toallas", "Baño compartido", "Wi-Fi", "Cocina"],
          price: "", unit: "", promo: "" }
      ],
      amenities: [
        "Salón con chimenea y rincón musical", "Cocina compartida: horno, fogones y cafetera",
        "Estacionamiento privado gratis", "Wi-Fi en toda la casa",
        "Jardín, terraza y reposeras", "Juegos de mesa y Smart TV",
        "Datos locales y ayuda con rutas", "Interior libre de humo"
      ],
      activities: [
        { name: "Volcán Villarrica", dist: "35 min en auto", desc: "La subida parte desde el centro de ski: cráter activo y vistas al lago y la cordillera." },
        { name: "Termas", dist: "20–45 min en auto", desc: "Piscinas de aguas termales entre bosque nativo, ideales después de un día de aventura." },
        { name: "Lago Villarrica", dist: "12 min a pie", desc: "Playa de arena volcánica, kayak, paddle y atardeceres con el volcán de fondo." },
        { name: "Parque Nacional Huerquehue", dist: "50 min en auto", desc: "Senderos entre araucarias milenarias y lagunas de montaña." },
        { name: "Ojos del Caburgua", dist: "25 min en auto", desc: "Cascadas y pozones de agua turquesa en medio del bosque." },
        { name: "Centro de Ski Pucón", dist: "35 min en auto", desc: "Esquí y snowboard en invierno; senderos y miradores en verano." },
        { name: "Santuario El Cañi", dist: "35 min en auto", desc: "Trekking entre araucarias hasta uno de los mejores miradores de la zona." },
        { name: "Parque Nacional Villarrica", dist: "30 min en auto", desc: "Senderos para todos los niveles, bosque nativo y miradores." },
        { name: "Rafting en el río Trancura", dist: "20 min en auto", desc: "De lo más popular de Pucón, con tramos para principiantes y expertos." }
      ],
      featured: { text: "El hostal es súper cálido, con su chimenea en el salón… pero lo mejor, sin duda, la gente que lo regenta.", name: "Fidel", country: "Chile" },
      reviews: [
        { text: "Amabilidad, atención y disposición para tener una buena estadía. Ambiente acogedor y cercano.", name: "Pancho", country: "Chile" },
        { text: "Todo construido en madera, lindo ambiente, súper relajado, excelente atención del dueño y su pareja. Cocina impecable.", name: "Diegones", country: "Argentina" },
        { text: "This is an amazing, cozy little space. The common area is really nice and you feel right at home.", name: "Anna", country: "Dinamarca" },
        { text: "Alojamiento nuevecito. Todo maravilloso y muy amable. Hay solo 9 camas en total, así que es muy acogedor y familiar. Volvería a reservar cuando sea.", name: "Christian", country: "Alemania" }
      ],
      faq: [
        { q: "¿A qué hora es el check-in y el check-out?", a: "Check-in de 14:00 a 23:00 y check-out de 10:00 a 11:00. Si llegas antes o más tarde, escríbenos y lo coordinamos." },
        { q: "¿Hay cocina?", a: "Sí: una cocina compartida y completa, con horno, fogones, cafetera, hervidor y una mesa grande. Puedes cocinar cuando quieras." },
        { q: "¿Incluyen desayuno?", a: "No incluimos desayuno, pero la cocina está disponible todo el día para que prepares el tuyo." },
        { q: "¿Hay estacionamiento?", a: "Sí, estacionamiento privado y gratuito dentro de la propiedad." },
        { q: "¿Puedo venir con mi mascota?", a: "Lo sentimos: no podemos recibir mascotas." },
        { q: "¿Se puede fumar?", a: "Dentro de la casa no se fuma. Afuera hay espacios donde puedes hacerlo." },
        { q: "¿Qué idiomas hablan?", a: "Español e inglés." },
        { q: "¿Hay Wi-Fi?", a: "Sí, Wi-Fi gratis en toda la casa." },
        { q: "¿Se entregan toallas y ropa de cama?", a: "Sí, las dos están incluidas en tu estadía." },
        { q: "¿Puedo guardar mi equipaje antes del check-in o después del check-out?", a: "En general sí. Avísanos con tiempo y te guardamos las maletas." },
        { q: "¿Aceptan tarjetas?", a: "Aceptamos los principales medios de pago. Si tienes dudas con uno en particular, pregúntanos antes de llegar." },
        { q: "¿Pueden ayudarme a reservar actividades?", a: "Sí: te recomendamos y te ayudamos a coordinar la subida al volcán, rafting, termas, canopy y más." }
      ]
    },
    en: {
      agenda: [
        { day: "Wednesday", name: "Piano and long talks by the fireplace", time: "6 pm" },
        { day: "Friday", name: "Handpan in the lounge", time: "7 pm" },
        { day: "Sunday", name: "Café de la Muerte · open conversation", time: "7 pm" }
      ],
      rooms: [
        { num: "Option 01", name: "Shared dorm", img: "assets/01_dormitorio_cama.jpg", imgPos: "center",
          alt: "Shared dorm: timber bunk beds next to a big window onto the garden",
          desc: "Eight timber beds, each with its own curtain for privacy and a lockable chest for your things. The most social — and most affordable — way to stay.",
          specs: ["8 beds", "Mixed", "Lockable chest"],
          includes: ["Bed linen", "Towel", "Shared bathroom", "Wi-Fi", "Kitchen"],
          price: "From CLP 18,000", unit: "per bed / night", promo: "Low-season deal" },
        { num: "Option 02", name: "Triskel · Superior double", img: "assets/19_doble_mural_volcan.jpg", imgPos: "center 45%",
          alt: "Triskel room: a double bed facing a Villarrica volcano mural",
          desc: "Our private room, with a Celtic name: a double bed facing a hand-painted mural of Villarrica volcano, with monkey-puzzle trees and a little bird on the branch. Morning light and a garden view.",
          specs: ["1 double bed", "Up to 2 guests", "Private"],
          includes: ["Bed linen", "Towels", "Shared bathroom", "Wi-Fi", "Kitchen"],
          price: "", unit: "", promo: "" }
      ],
      amenities: [
        "Lounge with fireplace and music corner", "Shared kitchen: oven, hob and coffee maker",
        "Free private parking", "Wi-Fi throughout the house",
        "Garden, terrace and loungers", "Board games and smart TV",
        "Local tips and route planning", "Smoke-free indoors"
      ],
      activities: [
        { name: "Villarrica volcano", dist: "35 min by car", desc: "The climb starts at the ski centre: an active crater and views over the lake and the Andes." },
        { name: "Hot springs", dist: "20–45 min by car", desc: "Thermal pools in native forest, perfect after a day of adventure." },
        { name: "Lake Villarrica", dist: "12 min on foot", desc: "Volcanic sand beach, kayaking, paddleboarding and sunsets with the volcano behind." },
        { name: "Huerquehue National Park", dist: "50 min by car", desc: "Trails among ancient monkey-puzzle trees and mountain lagoons." },
        { name: "Ojos del Caburgua", dist: "25 min by car", desc: "Waterfalls and turquoise pools in the middle of the forest." },
        { name: "Pucón Ski Centre", dist: "35 min by car", desc: "Skiing and snowboarding in winter; trails and lookouts in summer." },
        { name: "El Cañi Sanctuary", dist: "35 min by car", desc: "Trekking through monkey-puzzle forest to one of the best lookouts around." },
        { name: "Villarrica National Park", dist: "30 min by car", desc: "Trails for every level, native forest and lookouts." },
        { name: "Rafting on the Trancura river", dist: "20 min by car", desc: "One of Pucón's favourites, with sections for beginners and experts." }
      ],
      featured: { text: "Really warm hostel, with its fireplace in the lounge… but the best part, without a doubt, is the people who run it.", name: "Fidel", country: "Chile" },
      reviews: [
        { text: "Friendliness, attention and willingness to make sure you have a good stay. A cosy, close-knit atmosphere.", name: "Pancho", country: "Chile" },
        { text: "All built in wood, lovely atmosphere, very relaxed, excellent care from the owner and his partner. Spotless kitchen.", name: "Diegones", country: "Argentina" },
        { text: "This is an amazing, cozy little space. The common area is really nice and you feel right at home.", name: "Anna", country: "Denmark" },
        { text: "Brand-new place. Everything was wonderful and very friendly. There are only 9 beds in total, so it feels very cosy and family-like. I would book again any time.", name: "Christian", country: "Germany" }
      ],
      faq: [
        { q: "What time is check-in and check-out?", a: "Check-in is from 2 pm to 11 pm and check-out from 10 to 11 am. If you're arriving earlier or later, message us and we'll sort it out." },
        { q: "Is there a kitchen?", a: "Yes: a full shared kitchen with an oven, hob, coffee maker, kettle and a big table. Cook whenever you like." },
        { q: "Is breakfast included?", a: "Breakfast isn't included, but the kitchen is open all day so you can make your own." },
        { q: "Is there parking?", a: "Yes, free private parking on the property." },
        { q: "Can I bring my pet?", a: "Sorry — we can't host pets." },
        { q: "Can I smoke?", a: "No smoking inside the house. There are outdoor spots where you can." },
        { q: "Which languages do you speak?", a: "Spanish and English." },
        { q: "Is there Wi-Fi?", a: "Yes, free Wi-Fi throughout the house." },
        { q: "Are towels and bed linen provided?", a: "Yes, both are included in your stay." },
        { q: "Can I store my luggage before check-in or after check-out?", a: "Usually yes. Let us know in advance and we'll keep your bags." },
        { q: "Do you accept cards?", a: "We accept the main payment methods. If you're unsure about a particular one, ask us before you arrive." },
        { q: "Can you help me book activities?", a: "Yes: we'll recommend and help you arrange the volcano climb, rafting, hot springs, canopy and more." }
      ]
    }
  };

  /* ---------------- ESTADO ---------------- */
  var state = { lang: "es", lightbox: -1, form: { name: "", in: "", out: "", guests: "1", msg: "" } };
  var lastFocus = null;

  /* ---------------- HELPERS ---------------- */
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function att(s) { return esc(s).replace(/"/g, "&quot;"); }
  function reduceMotion() { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; }
  function waLink(msg) {
    var b = CFG.whatsappUrl;
    return msg ? b + (b.indexOf("?") > -1 ? "&" : "?") + "text=" + encodeURIComponent(msg) : b;
  }
  function waLabel() {
    var d = String(CFG.whatsappUrl || "").replace(/\D/g, "");
    if (!d) return "";
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
  function mapUrl(name) { return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(name + ", Pucón, Chile"); }
  function ext() { return ' target="_blank" rel="noopener"'; }
  function extSr(t) { return '<span class="sr"> ' + esc(t.extTab) + '</span>'; }

  var WA_PATH = '<path d="M16 .5C7.4.5.5 7.4.5 16c0 2.8.7 5.5 2.1 7.9L.5 31.5l7.8-2C10.6 30.8 13.3 31.5 16 31.5c8.6 0 15.5-6.9 15.5-15.5S24.6.5 16 .5zm0 28.3c-2.5 0-5-.7-7.1-1.9l-.5-.3-4.6 1.2 1.2-4.5-.3-.5C3.3 20.7 2.6 18.4 2.6 16 2.6 8.6 8.6 2.6 16 2.6S29.4 8.6 29.4 16 23.4 28.8 16 28.8z"/><path d="M24.1 19.3c-.4-.2-2.4-1.2-2.8-1.3-.4-.1-.6-.2-.9.2-.3.4-1 1.3-1.2 1.5-.2.2-.4.3-.8.1-.4-.2-1.7-.6-3.2-2-1.2-1.1-2-2.4-2.2-2.8-.2-.4 0-.6.2-.8.2-.2.4-.4.5-.7.2-.2.2-.4.4-.7.1-.3 0-.5 0-.7 0-.2-.9-2.2-1.2-3-.3-.7-.6-.6-.9-.6h-.7c-.2 0-.6.1-1 .5-.3.4-1.3 1.3-1.3 3.1s1.3 3.6 1.5 3.9c.2.2 2.6 4 6.3 5.6.9.4 1.6.6 2.1.8.9.3 1.7.2 2.3.1.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.6.2-1.8-.1-.1-.3-.2-.7-.4z"/>';
  var WA_ICON = '<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">' + WA_PATH + '</svg>';

  // Ornamento celta (árbol del logo), trazado a mano; cada uso con su propio id.
  function orn(id) {
    return '<svg class="orn" viewBox="0 0 120 120" aria-hidden="true" focusable="false"><g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">' +
      '<circle cx="60" cy="60" r="53" stroke-width="2.5"></circle><path d="M60 96 L60 24"></path>' +
      '<g id="' + id + '"><path d="M60 58 C71 56 78 50 82 43"></path><path d="M60 50 C71 47 79 40 84 34"></path><path d="M60 43 C68 38 72 31 71 24"></path></g>' +
      '<use href="#' + id + '" transform="matrix(-1,0,0,1,120,0)"></use><use href="#' + id + '" transform="matrix(1,0,0,-1,0,120)"></use><use href="#' + id + '" transform="matrix(-1,0,0,-1,120,120)"></use>' +
      '</g></svg>';
  }

  /* ---------------- RENDER ---------------- */
  var SHOT = typeof location !== "undefined" && /[?&]shot/.test(location.search);
  function view() {
    var en = state.lang === "en";
    var t = en ? EN : ES;
    var d = DATA[state.lang];
    var score = CFG.puntaje;

    var langGroup =
      '<span class="lang" role="group" aria-label="' + att(t.lang) + '">' +
        '<button type="button" data-lang="es" aria-label="Español" aria-pressed="' + !en + '">ES</button>' +
        '<span class="lang__sep" aria-hidden="true">|</span>' +
        '<button type="button" data-lang="en" aria-label="English" aria-pressed="' + en + '">EN</button>' +
      '</span>';
    var navItems = [["#alojamiento", t.navRooms], ["#experiencias", t.navExp], ["#pucon", t.navPucon], ["#ubicacion", t.navLocation], ["#faq", t.navFaq]];

    var header =
      '<header class="site-header">' +
        '<div class="wrap header__bar">' +
          '<a class="brand" href="#inicio">' +
            '<img class="brand__logo" src="' + att(ASSET("assets/logo.png")) + '" alt="' + att(t.altLogo) + '" width="72" height="72" />' +
            '<span><span class="brand__name">Hostal Celta</span><span class="brand__place">Pucón · Chile</span></span>' +
          '</a>' +
          '<nav class="nav" aria-label="' + att(t.navAria) + '">' +
            '<div class="nav__links">' + navItems.map(function (n) { return '<a href="' + n[0] + '">' + esc(n[1]) + '</a>'; }).join("") + '</div>' +
            langGroup +
            '<a class="btn btn-primary btn-header" href="#contacto">' + esc(t.book) + '</a>' +
            '<button type="button" class="menu-btn" data-menu aria-expanded="false" aria-controls="mnav" aria-label="' + att(t.menu) + '"><span></span><span></span><span></span></button>' +
          '</nav>' +
        '</div>' +
        '<div id="mnav" class="mnav" hidden>' +
          '<div class="wrap">' +
            navItems.map(function (n) { return '<a class="mnav__link" href="' + n[0] + '">' + esc(n[1]) + '</a>'; }).join("") +
            '<div class="mnav__row">' + langGroup + '<a class="btn btn-primary" href="#contacto">' + esc(t.book) + '</a></div>' +
          '</div>' +
        '</div>' +
      '</header>';

    var hero =
      '<section id="inicio" class="hero" data-parallax="1" aria-labelledby="hero-title" style="background-image:url(\'' + ASSET("assets/18_hero_atardecer.jpg") + '\')' + (SHOT ? ';min-height:660px' : '') + '">' +
        '<div class="hero__veil"></div>' +
        '<div class="wrap hero__inner">' +
          '<p class="kicker">' + esc(t.heroKicker) + '</p>' +
          '<h1 id="hero-title" class="h1">' + esc(t.heroTitle) + '</h1>' +
          '<p class="hero__text">' + esc(t.heroText) + '</p>' +
          '<div class="hero-ctas">' +
            '<a class="btn btn-primary" href="#contacto">' + esc(t.heroCta) + '</a>' +
            '<a class="btn-ghost" href="#alojamiento">' + esc(t.heroCta2) + '</a>' +
          '</div>' +
          '<p class="hero__note">' + WA_ICON + esc(t.heroNote) + '</p>' +
        '</div>' +
      '</section>';

    var sep = '<span class="trust__sep" aria-hidden="true"></span>';
    var trust =
      '<section class="trust" aria-label="' + att(t.trustAria) + '">' +
        '<div class="wrap trust__row">' +
          (score ? '<span class="trust__item"><span class="trust__star" aria-hidden="true">★</span>' + esc(score + " " + t.trustScoreSuffix) + '</span>' + sep : '') +
          '<span class="trust__item">' + esc(t.trustCenter) + '</span>' + sep +
          '<span class="trust__item">' + esc(t.trustBeds) + '</span>' +
        '</div>' +
      '</section>';

    var host =
      '<section class="host" data-reveal="1" aria-labelledby="host-title">' +
        '<div class="wrap split">' +
          '<div>' +
            '<p class="kicker">' + esc(t.hostKicker) + '</p>' +
            '<h2 id="host-title" class="h2">' + esc(t.hostTitle) + '</h2>' +
            '<p class="body">' + esc(t.hostP1) + '</p>' +
            '<p class="body">' + esc(t.hostP2) + '</p>' +
            '<p class="sign voice">' + orn("o-host") + esc(t.hostSign) + '</p>' +
            '<a class="textlink" href="' + att(waLink(t.hostWaMsg)) + '"' + ext() + '>' + WA_ICON + esc(t.hostWa) + extSr(t) + '</a>' +
          '</div>' +
          '<figure class="host__media">' +
            '<img src="' + att(ASSET("assets/14_mural_duende.jpg")) + '" alt="' + att(t.altMural) + '" loading="lazy" decoding="async" width="941" height="1672" />' +
            '<figcaption class="small">' + esc(t.hostCaption) + '</figcaption>' +
          '</figure>' +
        '</div>' +
      '</section>';

    var agendaRows = d.agenda.map(function (ev) {
      return '<div class="agenda__row"><span class="agenda__day">' + esc(ev.day) + '</span><span class="agenda__name">' + esc(ev.name) + '</span><span class="agenda__time">' + esc(ev.time) + '</span></div>';
    }).join("");
    var agendaBlock = CFG.mostrarAgenda ?
      '<div class="agenda"><h3 class="kicker">' + esc(t.agendaTitle) + '</h3>' + agendaRows + '<p class="small">' + esc(t.agendaNote) + '</p></div>' : '';
    var experiences =
      '<section id="experiencias" class="exp on-dark" aria-labelledby="exp-title">' +
        '<div class="exp__grid">' +
          '<div class="exp__img" role="img" aria-label="' + att(t.altExp) + '" style="background-image:url(\'' + ASSET("assets/05_salon_musica.jpg") + '\')"></div>' +
          '<div class="exp__content">' +
            '<div class="exp__text">' +
              '<p class="kicker">' + esc(t.expKicker) + '</p>' +
              '<h2 id="exp-title" class="h2">' + esc(t.expTitle) + '</h2>' +
              '<p class="body">' + esc(t.expP1) + '</p>' +
              '<p class="body" style="margin-bottom:0">' + esc(t.expP2) + '</p>' +
            '</div>' +
            '<div class="exp__agenda">' + agendaBlock +
              '<div class="exp__cta"><a class="btn btn-outline" href="' + att(CFG.instagramUrl) + '"' + ext() + '>' + esc(t.expCta) + ' ↗' + extSr(t) + '</a></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>';

    var roomBlocks = d.rooms.map(function (room, i) {
      var specs = room.specs.map(function (s) { return '<span>' + esc(s) + '</span>'; }).join("");
      var incs = room.includes.map(function (inc) { return '<li class="chip">' + esc(inc) + '</li>'; }).join("");
      var price = !CFG.mostrarPrecios ? '' : room.price
        ? '<p class="price"><span class="price__amount">' + esc(room.price) + '</span><span class="price__unit">' + esc(room.unit) + '</span>' + (room.promo ? '<span class="tag">' + esc(room.promo) + '</span>' : '') + '</p>'
        : '<p class="price"><span class="price__amount price__amount--ask">' + esc(t.priceAsk) + '</span></p>';
      return '<article class="room' + (i % 2 ? ' room--rev' : '') + '">' +
        '<div class="room__media"><img src="' + att(ASSET(room.img)) + '" alt="' + att(room.alt) + '" loading="lazy" decoding="async" style="object-position:' + esc(room.imgPos) + '" /></div>' +
        '<div>' +
          '<p class="kicker">' + esc(room.num) + '</p>' +
          '<h3 class="h3">' + esc(room.name) + '</h3>' +
          '<p class="body">' + esc(room.desc) + '</p>' +
          '<div class="specs">' + specs + '</div>' +
          '<p class="kicker">' + esc(t.includes) + '</p>' +
          '<ul class="chips">' + incs + '</ul>' +
          price +
          '<a class="textlink" href="' + att(waLink(t.roomMsg + room.name)) + '"' + ext() + '>' + WA_ICON + esc(t.roomCta) + extSr(t) + '</a>' +
        '</div>' +
      '</article>';
    }).join("");
    var rooms =
      '<section id="alojamiento" class="sec" data-reveal="1" aria-labelledby="rooms-title">' +
        '<div class="wrap">' +
          '<div class="sec-head">' +
            '<div class="orn-row"><span></span>' + orn("o-rooms") + '<span></span></div>' +
            '<p class="kicker">' + esc(t.roomsKicker) + '</p>' +
            '<h2 id="rooms-title" class="h2">' + esc(t.roomsTitle) + '</h2>' +
            '<p class="body">' + esc(t.roomsText) + '</p>' +
          '</div>' +
          '<div class="rooms">' + roomBlocks + '</div>' +
        '</div>' +
      '</section>';

    var house =
      '<section class="sec sec--paper3" data-reveal="1" aria-labelledby="house-title">' +
        '<div class="wrap split house__grid">' +
          '<div>' +
            '<p class="kicker">' + esc(t.houseKicker) + '</p>' +
            '<h2 id="house-title" class="h2">' + esc(t.houseTitle) + '</h2>' +
            '<p class="body">' + esc(t.houseText) + '</p>' +
            '<div class="amen">' + d.amenities.map(function (a) { return '<p>' + esc(a) + '</p>'; }).join("") + '</div>' +
          '</div>' +
          '<div class="house__media"><img src="' + att(ASSET("assets/25_salon_chimenea.jpg")) + '" alt="' + att(t.altHouse) + '" loading="lazy" decoding="async" width="1200" height="1600" /></div>' +
        '</div>' +
      '</section>';

    var acts = d.activities.map(function (a) {
      return '<a class="act" href="' + att(mapUrl(a.name)) + '"' + ext() + '>' +
        '<span class="act__top"><span class="act__name">' + esc(a.name) + '<span class="act__ext" aria-hidden="true">↗</span></span><span class="act__time">' + esc(a.dist) + '</span></span>' +
        '<span class="act__desc">' + esc(a.desc) + '</span>' +
        '<span class="sr"> (' + esc(t.actsExt) + ')</span>' +
      '</a>';
    }).join("");
    var pucon =
      '<section id="pucon" class="sec" data-reveal="1" aria-labelledby="pucon-title">' +
        '<div class="wrap">' +
          '<div class="split">' +
            '<div>' +
              '<p class="kicker">' + esc(t.puconKicker) + '</p>' +
              '<h2 id="pucon-title" class="h2">' + esc(t.puconTitle) + '</h2>' +
              '<p class="body">' + esc(t.puconP1) + '</p>' +
              '<p class="body">' + esc(t.puconP2) + '</p>' +
            '</div>' +
            '<div class="pucon__img"><img src="' + att(ASSET("assets/03_pucon_volcan.jpg")) + '" alt="' + att(t.altVolcano) + '" loading="lazy" decoding="async" width="1086" height="1448" /></div>' +
          '</div>' +
          '<div class="acts">' + acts + '</div>' +
          '<div class="acts-foot">' +
            '<p class="small">' + esc(t.actsNote) + '</p>' +
            '<a class="btn btn-outline" href="' + att(waLink(t.puconMsg)) + '"' + ext() + '>' + WA_ICON + esc(t.puconCta) + extSr(t) + '</a>' +
          '</div>' +
        '</div>' +
      '</section>';

    var location =
      '<section id="ubicacion" class="loc on-dark" aria-labelledby="loc-title">' +
        '<div class="loc__grid">' +
          '<div class="loc__content">' +
            '<p class="kicker">' + esc(t.locKicker) + '</p>' +
            '<h2 id="loc-title" class="h2" style="max-width:17ch">' + esc(t.locTitle) + '</h2>' +
            '<p class="body">' + esc(t.locText) + '</p>' +
            '<p class="addr">' + esc(t.locAddr) + '</p>' +
            '<div class="arrive">' +
              '<h3 class="kicker">' + esc(t.arriveTitle) + '</h3>' +
              '<p class="body">' + esc(t.arriveText) + '</p>' +
              '<a class="textlink" href="' + att(waLink(t.arriveMsg)) + '"' + ext() + '>' + WA_ICON + esc(t.arriveCta) + extSr(t) + '</a>' +
            '</div>' +
            '<div class="map">' +
              '<iframe title="' + att(t.mapTitle) + '" src="' + MAP_EMBED + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' +
              '<a class="map__bar" href="' + att(MAPS_ROUTE) + '"' + ext() + '>' + esc(t.routeLink) + '<span aria-hidden="true">↗</span>' + extSr(t) + '</a>' +
            '</div>' +
          '</div>' +
          '<div class="loc__photo" role="img" aria-label="' + att(t.altNight) + '" style="background-image:url(\'' + ASSET("assets/04_fachada_noche.jpg") + '\')"></div>' +
        '</div>' +
      '</section>';

    var tiles = MEDIA.map(function (m, idx) {
      var cls = "tile" + (idx === 0 ? " tile--feat" : "") + (idx >= MOBILE_TILES ? " tile--x" : "");
      var inner = m.type === "video"
        ? '<img src="' + att(ASSET(m.poster)) + '" alt="" loading="lazy" decoding="async" /><span class="tile__tag" aria-hidden="true">▶ Reel</span>'
        : '<img src="' + att(ASSET(m.src)) + '" alt="" loading="lazy" decoding="async" />';
      return '<button type="button" class="' + cls + '" data-gal="' + idx + '" aria-label="' + att(t.galOpen + m.alt[state.lang]) + '">' + inner + '</button>';
    }).join("");
    var gallery =
      '<section id="galeria" class="sec" data-reveal="1" aria-labelledby="gal-title">' +
        '<div class="wrap">' +
          '<div class="gal-head">' +
            '<div><p class="kicker">' + esc(t.galKicker) + '</p><h2 id="gal-title" class="h2" style="margin-bottom:0">' + esc(t.galTitle) + '</h2></div>' +
            '<p class="body">' + esc(t.galText) + '</p>' +
          '</div>' +
          '<div class="gal">' + tiles + '</div>' +
          '<button type="button" class="btn btn-outline gal-more" data-gal="0">' + esc(t.galMore) + '</button>' +
        '</div>' +
      '</section>';

    var q = function (r) { return '<blockquote><p>“' + esc(r.text) + '”</p></blockquote><figcaption class="cite"><b>' + esc(r.name) + '</b> · ' + esc(r.country) + '</figcaption>'; };
    var reviews =
      '<section id="opiniones" class="sec sec--paper2" data-reveal="1" aria-labelledby="rev-title">' +
        '<div class="wrap">' +
          '<div class="rev-head">' +
            '<div class="score">' +
              '<p class="score__num">' + esc(score) + '</p>' +
              '<p class="score__word">' + esc(t.scoreWord) + '</p>' +
              '<p class="score__sub">' + esc(t.scoreSub) + '</p>' +
              '<p class="score__cats"><span>' + esc(t.scoreStaff) + ' <b>' + esc(CFG.subnotas.personal) + '</b></span><span>' + esc(t.scoreClean) + ' <b>' + esc(CFG.subnotas.limpieza) + '</b></span></p>' +
            '</div>' +
            '<div>' +
              '<p class="kicker">' + esc(t.revKicker) + '</p>' +
              '<h2 id="rev-title" class="h2">' + esc(t.revTitle) + '</h2>' +
              '<p class="body" style="margin-bottom:0">' + esc(t.revText) + '</p>' +
            '</div>' +
          '</div>' +
          '<figure class="quote-feat">' + q(d.featured) + '</figure>' +
          '<div class="quotes">' + d.reviews.map(function (r) { return '<figure class="quote">' + q(r) + '</figure>'; }).join("") + '</div>' +
          '<div class="rev-foot">' +
            '<a class="btn btn-primary" href="#contacto">' + esc(t.revCta) + '</a>' +
            '<a class="textlink" href="' + att(CFG.reservaUrl + "#tab-reviews") + '"' + ext() + '>' + esc(t.reviewsLink) + ' ↗' + extSr(t) + '</a>' +
            '<p class="small">' + esc(t.revNote) + '</p>' +
          '</div>' +
        '</div>' +
      '</section>';

    var faqItems = d.faq.map(function (f) {
      return '<details data-faq="1"><summary><h3>' + esc(f.q) + '</h3></summary><p class="body">' + esc(f.a) + '</p></details>';
    }).join("");
    var faq =
      '<section id="faq" class="sec" data-reveal="1" aria-labelledby="faq-title">' +
        '<div class="wrap faq__grid">' +
          '<div class="faq__intro">' +
            orn("o-faq") +
            '<p class="kicker">' + esc(t.faqKicker) + '</p>' +
            '<h2 id="faq-title" class="h2">' + esc(t.faqTitle) + '</h2>' +
            '<p class="body">' + esc(t.faqText) + '</p>' +
            '<a class="textlink" href="' + att(waLink(t.faqMsg)) + '"' + ext() + '>' + WA_ICON + esc(t.faqCta) + extSr(t) + '</a>' +
          '</div>' +
          '<div>' + faqItems + '</div>' +
        '</div>' +
      '</section>';

    var waLbl = waLabel();
    var AC = { name: "name", in: "off", out: "off", guests: "off", msg: "off" };
    var field = function (label, name, type, cls) {
      var fid = "f-" + name;
      var common = ' class="input" id="' + fid + '" name="' + name + '" data-field="' + name + '" autocomplete="' + AC[name] + '"';
      return '<label class="field' + (cls ? " " + cls : "") + '" for="' + fid + '"><span class="kicker">' + esc(label) + '</span>' +
        (type === "textarea"
          ? '<textarea rows="4"' + common + ' placeholder="' + att(t.fMsgHint) + '">' + esc(state.form[name]) + '</textarea>'
          : '<input type="' + type + '"' + common + (name === "guests" ? ' min="1" max="9" inputmode="numeric"' : '') + ' value="' + att(state.form[name]) + '" />') +
        '</label>';
    };
    var contact =
      '<section id="contacto" class="sec sec--paper2" data-reveal="1" aria-labelledby="contact-title">' +
        '<div class="wrap contact__grid">' +
          '<div class="contact__intro">' +
            '<p class="kicker">' + esc(t.formKicker) + '</p>' +
            '<h2 id="contact-title" class="h2">' + esc(t.formTitle) + '</h2>' +
            '<p class="body">' + esc(t.formText) + '</p>' +
            (waLbl ? '<p class="small direct">' + esc(t.directPre) + '<a class="textlink" href="' + att(CFG.whatsappUrl) + '"' + ext() + '>' + WA_ICON + esc(waLbl) + extSr(t) + '</a></p>' : '') +
            '<p class="alt-links">' + esc(t.ctaAlsoPre) + ' ' +
              '<a href="' + att(CFG.reservaUrl) + '"' + ext() + '>Booking' + extSr(t) + '</a> ' + esc(t.ctaOr) + ' ' +
              '<a href="' + att(CFG.airbnbUrl) + '"' + ext() + '>Airbnb' + extSr(t) + '</a>' + esc(t.ctaAlsoPost) +
            '</p>' +
          '</div>' +
          '<div>' +
            '<h3 class="kicker">' + esc(t.formHeading) + '</h3>' +
            '<form class="form" data-form="1">' +
              field(t.fName, "name", "text", "field--full") +
              field(t.fIn, "in", "date") +
              field(t.fOut, "out", "date") +
              field(t.fGuests, "guests", "number", "field--guests") +
              field(t.fMsg, "msg", "textarea", "field--full") +
              '<button type="submit" class="btn btn-primary">' + WA_ICON + esc(t.fSend) + '</button>' +
            '</form>' +
            '<p class="small form-note">' + esc(t.fNote) + '</p>' +
          '</div>' +
        '</div>' +
      '</section>';

    var fl = function (href, label, blank) {
      return '<a href="' + att(href) + '"' + (blank ? ext() : '') + '>' + esc(label) + (blank ? extSr(t) : '') + '</a>';
    };
    var footer =
      '<footer class="footer">' +
        '<div class="wrap">' +
          '<div class="footer__grid">' +
            '<div class="footer__brand">' +
              '<a class="brand" href="#inicio"><img class="brand__logo" src="' + att(ASSET("assets/logo.png")) + '" alt="' + att(t.altLogo) + '" loading="lazy" width="48" height="48" />' +
                '<span><span class="brand__name">Hostal Celta</span><span class="brand__place">Pucón · Chile</span></span></a>' +
              '<p class="footer__tag">' + esc(t.footerTagline) + '</p>' +
            '</div>' +
            '<div class="footer__col"><h2 class="kicker">' + esc(t.footerHouse) + '</h2>' +
              fl("#alojamiento", t.navRooms) + fl("#experiencias", t.navExp) + fl("#galeria", t.navGal) + fl("#opiniones", t.navRev) + fl("#faq", t.navFaq) +
            '</div>' +
            '<div class="footer__col"><h2 class="kicker">' + esc(t.footerPucon) + '</h2>' +
              fl("#pucon", t.navPucon) + fl("#ubicacion", t.navLocation) + fl(MAPS_ROUTE, t.routeLink, true) +
            '</div>' +
            '<div class="footer__col"><h2 class="kicker">' + esc(t.footerContact) + '</h2>' +
              fl(MAPS_PLACE, "Callejón Flores 260, Pucón", true) +
              fl(CFG.whatsappUrl, "WhatsApp " + waLbl, true) + fl(CFG.instagramUrl, "Instagram @hostalcelta", true) +
              fl(CFG.reservaUrl, "Booking", true) + fl(CFG.airbnbUrl, "Airbnb", true) +
            '</div>' +
          '</div>' +
          '<div class="footer__bottom"><span>© 2026 Hostal Celta · Pucón, Chile</span><span>' + esc(t.footerHours) + '</span></div>' +
        '</div>' +
      '</footer>';

    var waFloat = '<a class="wa-float" href="' + att(CFG.whatsappUrl) + '"' + ext() + ' aria-label="' + att(t.waFloat) + '">' + WA_ICON + '</a>';

    return header + '<main id="main">' + hero + trust + host + experiences + rooms + house + pucon + location + gallery + reviews + faq + contact + '</main>' + footer + waFloat;
  }

  /* ---------------- LIGHTBOX ---------------- */
  function renderLightbox() {
    var root = document.getElementById("lightbox-root");
    var i = state.lightbox;
    if (i < 0) { root.innerHTML = ""; document.body.style.overflow = ""; return; }
    var t = state.lang === "en" ? EN : ES;
    var m = MEDIA[i];
    var media = m.type === "video"
      ? '<video src="' + att(ASSET(m.src)) + '" poster="' + att(ASSET(m.poster)) + '" controls autoplay loop playsinline aria-label="' + att(m.alt[state.lang]) + '" style="width:auto;max-width:100%;max-height:78vh;border-radius:3px;margin:0 auto"></video>'
      : '<img src="' + att(ASSET(m.src)) + '" alt="' + att(m.alt[state.lang]) + '" style="width:auto;max-width:100%;max-height:78vh;object-fit:contain;border-radius:3px;margin:0 auto" />';
    var btn = "position:absolute;background:rgba(20,11,6,.4);border:1px solid rgba(247,241,226,.5);color:#F7F1E2;line-height:1;border-radius:50%;";
    root.innerHTML =
      '<div role="dialog" aria-modal="true" aria-label="' + att(t.galTitle) + '" data-lb-overlay="1" style="position:fixed;inset:0;z-index:200;background:rgba(14,8,4,.94);display:flex;align-items:center;justify-content:center;padding:40px">' +
        '<button type="button" data-lb="close" aria-label="' + att(t.close) + '" style="' + btn + 'top:20px;right:20px;font-size:22px;width:48px;height:48px">×</button>' +
        '<button type="button" data-lb="prev" aria-label="' + att(t.prev) + '" style="' + btn + 'left:16px;font-size:24px;width:48px;height:48px">‹</button>' +
        '<button type="button" data-lb="next" aria-label="' + att(t.next) + '" style="' + btn + 'right:16px;font-size:24px;width:48px;height:48px">›</button>' +
        '<div data-lb="stage" style="max-width:1100px;width:100%;text-align:center">' + media +
          '<p style="color:#D9C9B2;font-size:15px;margin:16px 0 0">' + esc(m.alt[state.lang]) + ' · ' + (i + 1) + ' / ' + MEDIA.length + '</p>' +
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
      ? "Hostal Celta: a small timber hostel in Pucón, Chile. Nine beds, fireplace, shared kitchen, hand-painted murals and live music, a 10-minute walk from the centre."
      : "Hostal Celta: hostal de madera en Pucón, Chile. Nueve camas, chimenea, cocina compartida, murales pintados a mano y música en vivo, a 10 minutos a pie del centro.");
    var skip = document.querySelector(".skip-link");
    if (skip) skip.textContent = en ? "Skip to content" : "Saltar al contenido";
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

  var floatObserver = null;
  function wireFloat(root) {
    // el botón flotante se oculta mientras el formulario de contacto está a la vista
    if (floatObserver) floatObserver.disconnect();
    // (y también sobre la portada, que ya tiene su propio llamado a WhatsApp)
    var fab = root.querySelector(".wa-float"), zones = root.querySelectorAll("#inicio, #contacto");
    if (!fab || !zones.length || !("IntersectionObserver" in window)) return;
    var seen = {};
    floatObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { seen[e.target.id] = e.isIntersecting; });
      fab.classList.toggle("is-hidden", !!(seen.inicio || seen.contacto));
    }, { threshold: 0.25 });
    zones.forEach(function (z) { floatObserver.observe(z); });
  }

  function setMenu(open) {
    var btn = document.querySelector("[data-menu]"), panel = document.getElementById("mnav");
    if (!btn || !panel) return;
    btn.setAttribute("aria-expanded", String(open));
    panel.hidden = !open;
    updateHeader();
  }
  function menuOpen() { var p = document.getElementById("mnav"); return !!(p && !p.hidden); }

  function wire(root) {
    root.querySelectorAll("[data-lang]").forEach(function (b) {
      b.addEventListener("click", function () {
        var lang = b.getAttribute("data-lang");
        if (lang === state.lang) return;
        state.lang = lang;
        render();
      });
    });
    var mb = root.querySelector("[data-menu]");
    if (mb) mb.addEventListener("click", function () { setMenu(!menuOpen()); });
    root.querySelectorAll("#mnav a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
    root.querySelectorAll("[data-gal]").forEach(function (el) {
      el.addEventListener("click", function () { lastFocus = el; state.lightbox = parseInt(el.getAttribute("data-gal"), 10); renderLightbox(); });
    });
    root.querySelectorAll("[data-field]").forEach(function (inp) {
      inp.addEventListener("input", function () { state.form[inp.getAttribute("data-field")] = inp.value; });
    });
    var form = root.querySelector("[data-form]");
    if (form) form.addEventListener("submit", function (e) {
      e.preventDefault();
      window.open(waLink(buildMessage()), "_blank", "noopener");
    });
  }

  function render() {
    var y = window.scrollY;
    var app = document.getElementById("app");
    app.innerHTML = view();
    applyHead();
    wire(app);
    wireReveal(app);
    wireFloat(app);
    window.scrollTo(0, y);
    updateHeader();
  }

  window.addEventListener("keydown", function (e) {
    if (state.lightbox < 0) {
      if (e.key === "Escape" && menuOpen()) { setMenu(false); var b = document.querySelector("[data-menu]"); if (b) b.focus(); }
      return;
    }
    if (e.key === "Escape") closeLb();
    else if (e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "Tab") {
      var btns = document.querySelectorAll('#lightbox-root button, #lightbox-root video[controls]');
      if (!btns.length) return;
      var first = btns[0], last = btns[btns.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      else if (!document.getElementById("lightbox-root").contains(document.activeElement)) { e.preventDefault(); first.focus(); }
    }
  });
  document.getElementById("lightbox-root").addEventListener("click", function (e) {
    var act = e.target.closest ? e.target.closest("[data-lb]") : null;
    if (act) {
      var k = act.getAttribute("data-lb");
      if (k === "close") return closeLb();
      if (k === "prev") return step(-1);
      if (k === "next") return step(1);
      if (k === "stage") return;
    }
    if (e.target.getAttribute && e.target.getAttribute("data-lb-overlay")) closeLb();
  });

  // cabecera: transparente sobre el hero, sólida al bajar o con el menú abierto
  function updateHeader() {
    var hd = document.querySelector("header.site-header");
    if (hd) hd.classList.toggle("solid", window.scrollY > 60 || menuOpen());
  }
  window.addEventListener("scroll", updateHeader, { passive: true });
  window.matchMedia("(min-width:1101px)").addEventListener("change", function (e) { if (e.matches) setMenu(false); });

  var qlang = (location.search.match(/[?&]lang=(es|en)/) || [])[1];
  if (qlang) state.lang = qlang;
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render);
  else render();
})();
