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
  structureVideo: "/Images/site/estrutura_nova_boxes.mp4",
  logo: "/Images/site/LOGO.jpg",
  highlights: [
    "CUIDAMOS DO SEU PET COM DEDICAÇÃO EXCLUSIVA",
    "AMPLO ESPAÇO INTERNO COM BOXES HIGIENIZADOS",
    "SUPERVISÃO E CARINHO INTEGRAL 24 HORAS",
    "SEPARAÇÃO SEGURA POR TEMPERAMENTO E PORTE"
  ]
};

export const pricingData = {
  title: "Tabela de Diárias 24 Horas & Day Care",
  subtitle: "Cobrança simples e transparente: diária completa de 24 horas (dia + pernoite) com o melhor custo-benefício de Monte Mor e região",
  promoBanner: "🔥 Diária 24 Horas Completa • Acomodações Reformadas com Piso e Higiene Total",
  promoCode: "QUINTAL2026",
  categories: [
    {
      porte: "Porte Pequeno",
      weight: "5 kg a 10 kg",
      badge: "Cães Pequenos",
      prices: [
        { period: "Diária Completa (24 Horas)", price: "75,00", unit: "diária 24h", featured: true },
        { period: "Day Care / Diurna (12 Horas)", price: "35,00", unit: "diária 12h" },
        { period: "Meio Período (Até 6h)", price: "20,00", unit: "período" }
      ]
    },
    {
      porte: "Porte Médio",
      weight: "10 kg a 20 kg",
      badge: "Mais Procurado",
      popular: true,
      prices: [
        { period: "Diária Completa (24 Horas)", price: "85,00", unit: "diária 24h", featured: true },
        { period: "Day Care / Diurna (12 Horas)", price: "40,00", unit: "diária 12h" },
        { period: "Meio Período (Até 6h)", price: "25,00", unit: "período" }
      ]
    },
    {
      porte: "Porte Grande",
      weight: "Acima de 20 kg",
      badge: "Amplo Espaço",
      prices: [
        { period: "Diária Completa (24 Horas)", price: "95,00", unit: "diária 24h", featured: true },
        { period: "Day Care / Diurna (12 Horas)", price: "45,00", unit: "diária 12h" },
        { period: "Meio Período (Até 6h)", price: "25,00", unit: "período" }
      ]
    }
  ]
};

export const servicesData = [
  {
    id: "creche_mensal",
    title: "Creche Pet - Pacote Mensal",
    subtitle: "Economia máxima e rotina saudável para quem precisa deixar o pet com frequência",
    description: "A escolha perfeita para tutores com rotina corrida de trabalho. No pacote mensal do Hotel Quintal dos Animais, seu cão desfruta de um amplo espaço interno seguro, com boxes individuais higienizados, socialização supervisionada e carinho constante.",
    features: [
      "Super descontos na diária no fechamento do pacote mensal",
      "Flexibilidade de dias e horários conforme a sua rotina",
      "Acomodações estruturadas com piso e separação por porte",
      "Relatórios, fotos e atualizações diárias no WhatsApp",
      "Atendimento sob consulta e cotação personalizada"
    ],
    badge: "⭐ Maior Economia",
    iconName: "CalendarCheck",
    isCustomQuote: true
  },
  {
    id: "hospedagem",
    title: "Hospedagem Canina 24 Horas",
    subtitle: "Tranquilidade total para suas viagens e compromissos",
    description: "Espaço amplo interno para seu pet brincar durante o dia e descansar com todo conforto e segurança à noite. Boxes individuais higienizados com piso, aconchegantes e monitorados com presença constante do responsável.",
    features: [
      "Boxes individuais com piso novo, limpo e lavável",
      "Alimentação e medicação conforme orientação do tutor",
      "Relatórios diários com fotos e vídeos pelo WhatsApp",
      "Monitoramento constante com dedicação exclusiva do Geraldo Gomes"
    ],
    badge: "Mais Procurado",
    iconName: "Home"
  },
  {
    id: "daycare",
    title: "Day Care / Diária Diurna",
    subtitle: "Gaste a energia do seu pet com segurança enquanto você trabalha",
    description: "Perfeito para cães que passam muito tempo sozinhos em casa. No Day Care do Hotel Quintal dos Animais, seu dog se exercita em espaço seguro, recebe carinho e volta para casa relaxado.",
    features: [
      "Recreação em espaço interno amplo e seguro",
      "Brincadeiras e estímulo mental supervisionado",
      "Socialização positiva e separação preventiva de portes",
      "Flexibilidade de horários para tutores de Monte Mor e RMC"
    ],
    badge: "Ideal para o dia a dia",
    iconName: "Sun"
  },
  {
    id: "recreacao",
    title: "Acomodações Estruturadas & Boxes com Piso",
    subtitle: "Segurança, higiene e tranquilidade para o seu cão",
    description: "Nossa nova estrutura conta com boxes individuais arejados, cerquinhas firmes e piso lavável higienizado, garantindo conforto e saúde para animais de todos os portes.",
    features: [
      "Boxes novos com piso higienizado e fácil desinfecção",
      "Área interna coberta e protegida de sol excessivo e chuva",
      "Divisões seguras para respeitar o espaço e temperamento de cada cão",
      "Ambiente calmo no Parque Café I em Monte Mor"
    ],
    badge: "Estrutura Reformada",
    iconName: "Trees"
  },
  {
    id: "cuidados",
    title: "Cuidados Especiais & Carinho Individualizado",
    subtitle: "Atenção máxima para filhotes, idosos ou pets com necessidades",
    description: "Sabemos que cada animal é único. Respeitamos a rotina alimentar, administração de medicamentos receitados pelo veterinário e o tempo de repouso de cada hospedado.",
    features: [
      "Administração rigorosa de medicamentos prescritos",
      "Atenção dedicada a cães idosos ou em recuperação",
      "Ambiente acolhedor e silencioso",
      "Acompanhamento pessoal e diário do Geraldo Gomes"
    ],
    badge: "Atenção VIP",
    iconName: "HeartHandshake"
  }
];

export const differentialsData = [
  {
    title: "Amplo Espaço Interno",
    description: "Área ampla, arejada e estruturada com boxes individuais e piso higienizado em Monte Mor.",
    icon: "TreeGreen"
  },
  {
    title: "Acolhimento & Carinho",
    description: "Geraldo Gomes e sua equipe tratam seu pet como membro da própria família, com atenção 24 horas.",
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
  title: "Seu Pet Seguro, Confortável e Amado no Nosso Amplo Espaço Interno",
  subtitle: "Tranquilidade total para você viajar sabendo que seu dog está em boas mãos",
  text1: "No Hotel Quintal dos Animais, acreditamos que todo cão merece conforto, higiene e carinho verdadeiro. Localizado no Parque Café I em Monte Mor, nosso espaço foi estruturado com boxes individuais higienizados com piso, oferecendo um ambiente seguro e acolhedor para pets de toda a Região Metropolitana de Campinas (RMC).",
  text2: "Priorizamos o bem-estar e a tranquilidade: os cães contam com áreas separadas por porte e afinidade em acomodações protegidas, arejadas e limpas. Seu cachorro relaxa, é bem alimentado e descansa com supervisão amorosa constante.",
  text3: "Idealizado e administrado por Geraldo Gomes, nosso foco é a atenção individualizada: acompanhamos a rotina alimentar, medicamentos e temperamento de cada hospedado. Além disso, enviamos fotos e vídeos diários no seu WhatsApp para você acompanhar a tranquilidade do seu pet com total paz de espírito."
};

export const galleryImages = [
  { url: "/Images/site/nova_estrutura_quintal_1.jpg", title: "Novo Quintal com Cerquinhas e Rampa", alt: "Novo quintal do Hotel Quintal dos Animais reformado com cerquinha e brinquedos" },
  { url: "/Images/site/nova_estrutura_panoramica_2.jpg", title: "Vista Panorâmica da Nova Estrutura", alt: "Vista panorâmica da nova estrutura do Hotel Quintal dos Animais" },
  { url: "/Images/site/nova_estrutura_boxes_3.jpg", title: "Novos Boxes com Piso e Área Coberta", alt: "Novas acomodações com piso branco lavável e portão de segurança" },
  { url: "/Images/site/252.jpg", title: "Momento de afeto e aconchego", alt: "Cuidador dando carinho ao pet hospedado" },
  { url: "/Images/site/1414.jpg", title: "Carinho e supervisão constante", alt: "Pet feliz recebendo atenção no hotel para cachorro" },
  { url: "/Images/site/2525.jpg", title: "Socialização harmoniosa", alt: "Cães interagindo com tranquilidade" }
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
    a: "Sim! Avaliamos o temperamento do animal para promover uma estadia harmoniosa e segura, separando por porte em boxes individuais com piso quando necessário em nossa estrutura."
  },
  {
    q: "Onde o Hotel Quintal dos Animais fica localizado?",
    a: "Estamos localizados na R. ANGELINA SCARASSATTI VIGNANDO, 435 - PQ. CAFÉ I - MONTE MOR/SP. Um local calmo, arejado e de facílimo acesso para quem mora em Monte Mor, Campinas, Hortolândia, Indaiatuba e região."
  }
];

export const testimonials = [
  {
    name: "Mariana Silva & Thor",
    city: "Campinas / SP",
    text: "Precisei viajar de emergência a trabalho e fiquei com o coração na mão por deixar o Thor. O Geraldo foi sensacional! Me mandava vídeos do Thor super bem cuidado todo dia. Quando fui buscar, meu dog estava super feliz e tranquilo!"
  },
  {
    name: "Carlos Eduardo & Mel",
    city: "Monte Mor / SP",
    text: "O espaço interno estruturado e os boxes com piso fazem toda a diferença na higiene e segurança. No Quintal dos Animais a Mel recebe carinho, fica calma e volta para casa bem cuidada. Recomendo de olhos fechados!"
  },
  {
    name: "Fernanda Ribeiro & Bob",
    city: "Hortolândia / SP",
    text: "Excelente atendimento! O carinho e a dedicação do Geraldo com os animais transparecem em cada detalhe. O melhor hotel de cachorro da região de Campinas!"
  }
];
