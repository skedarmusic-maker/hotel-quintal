export const companyInfo = {
  name: "Hotel Quintal dos Animais",
  shortName: "Quintal dos Animais",
  owner: "Geraldo Gomes",
  tagline: "Seu pet livre, seguro e amado como se estivesse em casa",
  subtitle: "O segundo lar do seu melhor amigo em Monte Mor e Região de Campinas",
  whatsapp: "(19) 99506-4431",
  whatsappRaw: "5519995064431",
  email: "geraldo58936@gmail.com",
  instagram: "@hotelquintaldosanimais",
  instagramUrl: "https://www.instagram.com/hotelquintaldosanimais",
  address: "R. Angelina Scarassatti Vignando, 435 - Pq. Café I, Monte Mor - SP, 13199-148",
  streetAddress: "R. Angelina Scarassatti Vignando, 435",
  neighborhood: "Pq. Café I",
  city: "Monte Mor",
  state: "SP",
  cep: "13199-148",
  plusCode: "3PFQ+QV Monte Mor, São Paulo",
  googleMapsId: "15913061627725265116",
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d135821.17147170892!2d-47.35013818932445!3d-22.96151597235062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8bb9b57d17a27%3A0x1a50bfbaf7e327dd!2sHotel%20Quintal%20dos%20Animais!5e0!3m2!1spt-BR!2sbr!4v1787354780210!5m2!1spt-BR!2sbr",
  googleReviewUrl: "https://g.page/r/Cd0n4_e6v1AaEBI/review",
  hours: "Aberto 24 horas",
  region: "Monte Mor, Campinas, Hortolândia, Indaiatuba, Sumaré e RMC",
  heroVideo: "/Images/site/Creating_dog_hotel_background_video_202608141659.mp4",
  logo: "/Images/site/LOGO.jpg",
  highlights: [
    "CUIDAMOS DO SEU PET COM DEDICAÇÃO EXCLUSIVA",
    "AMPLO ESPAÇO VERDE AO AR LIVRE",
    "SUPERVISÃO E CARINHO INTEGRAL",
    "SOCIALIZAÇÃO SEGURA E HARMONIOSA"
  ]
};

export const pricingData = {
  title: "Tabela Especial de Lançamento",
  subtitle: "Transparência total para você planejar a hospedagem do seu pet com o melhor custo-benefício da região",
  promoBanner: "🔥 Condição Especial de Lançamento • Vagas Limitadas para Monte Mor e RMC",
  promoCode: "QUINTAL2026",
  categories: [
    {
      porte: "Porte Pequeno",
      weight: "5 kg a 10 kg",
      badge: "Cães Pequenos",
      prices: [
        { period: "Meio Período", price: "20,00", unit: "período" },
        { period: "Diária (12 Horas)", price: "35,00", unit: "diária", featured: true },
        { period: "Noturno (Pernoite)", price: "40,00", unit: "pernoite" }
      ]
    },
    {
      porte: "Porte Médio",
      weight: "10 kg a 20 kg",
      badge: "Mais Procurado",
      popular: true,
      prices: [
        { period: "Meio Período", price: "25,00", unit: "período" },
        { period: "Diária (12 Horas)", price: "40,00", unit: "diária", featured: true },
        { period: "Noturno (Pernoite)", price: "45,00", unit: "pernoite" }
      ]
    },
    {
      porte: "Porte Grande",
      weight: "Acima de 20 kg",
      badge: "Amplo Espaço",
      prices: [
        { period: "Meio Período", price: "25,00", unit: "período" },
        { period: "Diária (12 Horas)", price: "45,00", unit: "diária", featured: true },
        { period: "Noturno (Pernoite)", price: "50,00", unit: "pernoite" }
      ]
    }
  ]
};

export const servicesData = [
  {
    id: "creche_mensal",
    title: "Creche Pet - Pacote Mensal",
    subtitle: "Economia máxima e rotina saudável para quem precisa deixar o pet todos os dias",
    description: "A escolha perfeita para tutores com rotina corrida de trabalho. No pacote mensal de Creche Pet do Hotel Quintal dos Animais, seu cão desfruta do amplo gramado verde diariamente com descontos exclusivos na diária, socialização supervisionada e carinho constante.",
    features: [
      "Super descontos na diária no fechamento do pacote mensal",
      "Flexibilidade de dias e horários conforme a sua rotina",
      "Gasto de energia diário e socialização segura no gramado",
      "Relatórios, fotos e atualizações no app e WhatsApp",
      "Atendimento sob consulta e cotação personalizada"
    ],
    badge: "⭐ Maior Economia",
    iconName: "CalendarCheck",
    isCustomQuote: true
  },
  {
    id: "hospedagem",
    title: "Hospedagem Canina (Pernoite)",
    subtitle: "Tranquilidade total para suas viagens e compromissos",
    description: "Espaço amplo para seu pet correr, brincar durante o dia e descansar com todo conforto e segurança à noite. Dormitórios higienizados, aconchegantes e ambiente monitorado.",
    features: [
      "Amplo quintal verde para atividades",
      "Alimentação e medicação conforme orientação do tutor",
      "Relatórios diários e fotos/vídeos via WhatsApp",
      "Monitoramento constante com presença do responsável"
    ],
    badge: "Mais Procurado",
    iconName: "Home"
  },
  {
    id: "daycare",
    title: "Day Care / Diária Avulsa",
    subtitle: "Gaste a energia do seu pet enquanto você trabalha",
    description: "Perfeito para cães que passam muito tempo sozinhos em casa. No Day Care do Hotel Quintal dos Animais, seu dog se exercita, faz novos amigos e volta para casa relaxado.",
    features: [
      "Recreação em grupo supervisionada",
      "Brincadeiras e estímulo mental",
      "Socialização positiva",
      "Flexibilidade de horários para tutores"
    ],
    badge: "Ideal para o dia a dia",
    iconName: "Sun"
  },
  {
    id: "recreacao",
    title: "Recreação em Amplo Espaço Verde",
    subtitle: "Liberdade que o seu cão precisa para ser feliz",
    description: "Diferente de baias confinadas, oferecemos um espaço aberto integrado à natureza em Monte Mor, onde os pets vivem momentos de pura alegria e liberdade com supervisão carinhosa.",
    features: [
      "Gramado amplo e arejado",
      "Áreas de sombra para descanso",
      "Atividades com bolinhas e obstáculos leves",
      "Respeito ao ritmo de cada animal"
    ],
    badge: "Liberdade & Natureza",
    iconName: "Trees"
  },
  {
    id: "cuidados",
    title: "Cuidados Especiais & Carinho Individualizado",
    subtitle: "Atenção máxima para filhotes, idosos ou pets com necessidades",
    description: "Sabemos que cada animal é único. Respeitamos a rotina alimentar, administração de medicamentos receitados pelo veterinário e o tempo de repouso de cada hospedado.",
    features: [
      "Administração correta de medicamentos",
      "Atenção dedicada a cães idosos",
      "Ambiente calmo e acolhedor",
      "Frequente acompanhamento do Geraldo Gomes"
    ],
    badge: "Atenção VIP",
    iconName: "HeartHandshake"
  }
];

export const differentialsData = [
  {
    title: "Amplo Espaço Verde",
    description: "Área aberta ampla e segura em Monte Mor para o pet correr, explorar e se divertir livremente.",
    icon: "TreeGreen"
  },
  {
    title: "Acolhimento & Carinho",
    description: "Geraldo Gomes e sua equipe tratam seu pet como membro da própria família, sem estresse.",
    icon: "Heart"
  },
  {
    title: "Notícias Diárias no WhatsApp",
    description: "Você viaja com paz de espírito recebendo fotos e vídeos atualizados do seu dog todos os dias.",
    icon: "MessageSquare"
  },
  {
    title: "Fácil Acesso RMC",
    description: "Localizado no Parque Café I em Monte Mor, com acesso rápido para moradores de Campinas, Hortolândia e Indaiatuba.",
    icon: "MapPin"
  }
];

export const localStoryContent = {
  title: "Seu Pet Seguro, Livre e Amado no Nosso Amplo Espaço Verde",
  subtitle: "Tranquilidade total para você viajar sabendo que seu dog está em boas mãos",
  text1: "No Hotel Quintal dos Animais, acreditamos que todo cão merece liberdade, ar puro e carinho verdadeiro. Localizado no Parque Café I em Monte Mor, nosso espaço foi estruturado para oferecer um ambiente calmo, seguro e integrado à natureza para pets de toda a Região Metropolitana de Campinas (RMC).",
  text2: "Ao contrário das hospedagens tradicionais com baias fechadas e confinamento, priorizamos a recreação ao ar livre, o gasto de energia saudável e a socialização harmoniosa. Seu cachorro corre na grama, brinca ao ar livre e descansa em dormitórios aconchegantes e higienizados.",
  text3: "Idealizado e administrado por Geraldo Gomes, nosso foco é a atenção individualizada: acompanhamos a rotina alimentar, medicamentos e temperamento de cada hospedado. Além disso, enviamos fotos e vídeos diários no seu WhatsApp para você acompanhar a alegria do seu pet com total paz de espírito."
};

export const galleryImages = [
  { url: "/Images/site/00202.jpg", title: "Amplo espaço para correr", alt: "Cachorro brincando no amplo gramado do Hotel Quintal dos Animais em Monte Mor" },
  { url: "/Images/site/1414.jpg", title: "Carinho e supervisão constante", alt: "Pet feliz recebendo atenção no hotel para cachorro" },
  { url: "/Images/site/15151.jpg", title: "Liberdade ao ar livre", alt: "Cão correndo na área verde" },
  { url: "/Images/site/252.jpg", title: "Momento de afeto e aconchego", alt: "Cuidador dando carinho ao pet hospedado" },
  { url: "/Images/site/2525.jpg", title: "Socialização harmoniosa", alt: "Cães interagindo no quintal" },
  { url: "/Images/site/27452.jpg", title: "Descanso na sombra", alt: "Pet relaxando no jardim" },
  { url: "/Images/site/IMG-20260805-WA0002.jpg", title: "Instalações acolhedoras", alt: "Estrutura do Hotel Quintal dos Animais no Parque Café I Monte Mor" },
  { url: "/Images/site/hotel-pet-santo-andre-1.png.webp", title: "Espaço seguro e delimitado", alt: "Área de recreação para cachorros em Monte Mor" }
];

export const faqData = [
  {
    q: "O que preciso levar para a hospedagem do meu cachorro?",
    a: "Para que seu pet se sinta totalmente em casa, pedimos para trazer a ração que ele já está acostumado (na quantidade dos dias de hospedagem), roupinhas ou paninhos com o cheiro da família, caminha e a carteirinha de vacinação atualizada."
  },
  {
    q: "Quais são as exigências de vacinação para o pet se hospedar?",
    a: "Para a segurança de todos os amiguinhos, exigimos vacinas em dia (V10/V8, Antirrábica e Gripe), além de vermífugo e controle de pulgas/carrapatos aplicados recentemente."
  },
  {
    q: "Como saberei como meu cachorro está durante a minha viagem?",
    a: "Mantemos contato direto diário via WhatsApp! Enviamos fotos, vídeos e atualizações dos momentos de brincadeira e descanso do seu pet para que você viaje com total tranquilidade."
  },
  {
    q: "O hotel aceita cachorros de todos os portes?",
    a: "Sim! Avaliamos o temperamento do animal para promover uma socialização harmoniosa e segura, separando por porte e afinidade quando necessário em nosso amplo espaço."
  },
  {
    q: "Onde o Hotel Quintal dos Animais fica localizado?",
    a: "Estamos localizados na R. ANGELINA SCARASSATTI VIGNANDO, 435 - PQ. CAFÉ I - MONTE MOR/SP. Um local calmo, arborizado e de facílimo acesso para quem mora em Monte Mor, Campinas, Hortolândia, Indaiatuba e região."
  }
];

export const testimonials = [
  {
    name: "Mariana Silva & Thor",
    city: "Campinas / SP",
    text: "Precisei viajar de emergência a trabalho e fiquei com o coração na mão por deixar o Thor. O Geraldo foi sensacional! Me mandava vídeos do Thor correndo no gramado todo dia. Quando fui buscar, meu dog nem queria ir embora de tão feliz!"
  },
  {
    name: "Carlos Eduardo & Mel",
    city: "Monte Mor / SP",
    text: "O amplo espaço verde faz toda a diferença. A Mel odeia ficar em gaiolas ou espaços fechados. No Quintal dos Animais ela fica solta, brinca bastante e volta pra casa super calma. Recomendo de olhos fechados!"
  },
  {
    name: "Fernanda Ribeiro & Bob",
    city: "Hortolândia / SP",
    text: "Excelente atendimento! O carinho e a dedicação do Geraldo com os animais transparecem em cada detalhe. O melhor hotel de cachorro da região de Campinas!"
  }
];
