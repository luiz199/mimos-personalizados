export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  subcategory?: string;
  isOffer?: boolean;
  createdAt: number;
}

const STORAGE_KEY = 'mimos-products';
const DEFAULT_PRODUCTS: Product[] = [
  {
    id: '1779821754625', name: 'KIT DE MAQUIAGEM',
    description: 'Um kit de maquiagem lindo e completo, perfeito para realçar a beleza e elevar a autoestima com muito charme e elegância.',
    price: 80, image: '',
    category: 'mimos', subcategory: 'kits', createdAt: 1779821754625,
  },
  {
    id: '1779807518130', name: 'CESTA COM CHOCOLATES, COCA-COLA E LINDO CORAÇÃO DE PELÚCIA',
    description: 'Uma cesta linda e apaixonante, perfeita para surpreender alguém especial com muito carinho e amor.',
    price: 85, image: '',
    category: 'mimos', subcategory: '', isOffer: true, createdAt: 1779807518130,
  },
  {
    id: '1779807367814', name: 'CESTA COM VÁRIOS DOCES',
    description: 'Uma cesta deliciosa e super encantadora, recheada com vários doces irresistíveis para adoçar momentos especiais.',
    price: 110, image: '',
    category: 'mimos', subcategory: '', isOffer: true, createdAt: 1779807367814,
  },
  {
    id: '1779806578145', name: 'CESTA DE CORAÇÃO COM CHOCOLATES E LINDO BUQUÊ DE ROSAS VERMELHAS',
    description: 'Uma cesta apaixonante e cheia de romantismo, perfeita para surpreender quem você ama em momentos especiais.',
    price: 105, image: '',
    category: 'mimos', subcategory: '', isOffer: true, createdAt: 1779806578145,
  },
  {
    id: '1779804576147', name: 'Cesta de café da manhã preparada com muito carinho',
    description: 'perfeita para surpreender alguém especial logo nas primeiras horas do dia.',
    price: 150, image: '',
    category: 'mimos', subcategory: '', createdAt: 1779804576147,
  },
  {
    id: '1779547019267', name: 'Kit com 3 blocos personalizados e carrinho com assinatura',
    description: 'Blocos com capas sofisticadas, acabamento premium e detalhes delicados personalizados com nome, tema ou logotipo. Carrinho decorativo moderno com design refinado.',
    price: 260, image: '',
    category: 'mimos', subcategory: 'kits', createdAt: 1779547019267,
  },
  {
    id: '1779546915832', name: 'Sacola personalizada tamanho M',
    description: 'Unidade de sacola personalizada tamanho M, modelo premium com acabamento elegante e sofisticado. Personalização exclusiva com nome, logotipo ou tema.',
    price: 4, image: '',
    category: 'mimos', subcategory: 'kits', createdAt: 1779546915832,
  },
  {
    id: '1779546773018', name: 'Kit com 10 tubetes personalizados em estilo premium',
    description: 'Tubetes transparentes decorados com tema sofisticado, laços delicados, detalhes em glitter e tampa personalizada.',
    price: 15, image: '',
    category: 'mimos', subcategory: 'kits', createdAt: 1779546773018,
  },
  {
    id: '1779327367892', name: 'Buquê rosa com rosas artificiais, ursinho e sempre-vivas',
    description: 'Rosas artificiais cor-de-rosa com sempre-vivas que complementam o arranjo com um toque natural e resistente.',
    price: 110, image: '',
    category: 'mimos', subcategory: '', createdAt: 1779327367892,
  },
  {
    id: '1779327366908', name: 'Caixa com urso e flores',
    description: 'A caixa geralmente é personalizada e bem decorada, podendo ter formato quadrado ou de coração, com cores como rosa, vermelho, branco ou preto.',
    price: 95, image: '',
    category: 'mimos', subcategory: '', createdAt: 1779327366908,
  },
  {
    id: '1779327365758', name: 'Cesta com frutas, iogurte e muito mais',
    description: 'Uma cesta com frutas, iogurte e muito mais é um presente saudável, bonito e bem completo, ideal para demonstrar carinho de forma leve e especial.',
    price: 110, image: '',
    category: 'mimos', subcategory: '', createdAt: 1779327365758,
  },
  {
    id: '1779327362203', name: 'cesta com chocolate, ursinho, iogurte, pão de queijo e um pequeno buquê',
    description: 'Uma cesta com chocolate, ursinho, iogurte, pão de queijo e um pequeno buquê é um presente completo, criativo e muito carinhoso.',
    price: 75, image: '',
    category: 'mimos', subcategory: '', createdAt: 1779327362203,
  },
  {
    id: '1779327360788', name: 'Caixa com ursinho, chocolate Ferrero Rocher e balão',
    description: 'A caixa geralmente é personalizada e bem decorada, podendo ser quadrada ou em formato de coração, com cores como preto, vermelho, rosa ou branco.',
    price: 120, image: '',
    category: 'mimos', subcategory: '', createdAt: 1779327360788,
  },
  {
    id: '1779327359544', name: 'Cesta de café da manhã completa',
    description: 'Ela geralmente vem em uma cesta bonita de palha, madeira ou caixa decorada, organizada com cuidado e envolta em celofane transparente com laço.',
    price: 180, image: '',
    category: 'mimos', subcategory: '', createdAt: 1779327359545,
  },
  {
    id: '1779327357938', name: 'caixa em formato de coração com quadro, chocolate, batata frita e Coca-Cola',
    description: 'A caixa tem formato de coração, geralmente em cores como vermelho, rosa ou branco, com acabamento decorado e elegante.',
    price: 95, image: '',
    category: 'mimos', subcategory: '', createdAt: 1779327357938,
  },
  {
    id: '1779327353023', name: 'caixa com chocolate, quadro estilo Netflix e ursinho pequeno',
    description: 'A caixa geralmente é quadrada ou retangular, com um visual personalizado inspirado na Netflix, usando cores como preto e vermelho.',
    price: 98, image: '',
    category: 'mimos', subcategory: '', createdAt: 1779327353023,
  },
  {
    id: '1779327352031', name: 'Buquê pequeno com girassol e sempre-vivas',
    description: 'Ele é composto por um ou poucos girassóis, que são o destaque principal. Com suas pétalas amarelas vibrantes e centro escuro.',
    price: 25, image: '',
    category: 'mimos', subcategory: '', createdAt: 1779327352031,
  },
  {
    id: '1779327350466', name: 'Buquê de rosas artificiais e chocolate Ferrero Rocher',
    description: 'Rosas artificiais bem realistas em tons de vermelho, rosa ou branco, com chocolates Ferrero Rocher dourados entre as flores.',
    price: 130, image: '',
    category: 'mimos', subcategory: '', createdAt: 1779327350466,
  },
  {
    id: '1779327349034', name: 'Buquê rosa com maquiagem',
    description: 'Um buquê rosa com maquiagem é um presente criativo, delicado e cheio de estilo, que mistura o romantismo das flores com o universo da beleza.',
    price: 70, image: '',
    category: 'mimos', subcategory: '', createdAt: 1779327349034,
  },
  {
    id: '1779327347542', name: 'Buquê preto com urso e rosas artificiais lindas',
    description: 'O buquê tem uma base ou embalagem na cor preta, que traz um visual mais luxuoso e chamativo, destacando ainda mais os elementos dentro dele.',
    price: 120, image: '',
    category: 'mimos', subcategory: '', createdAt: 1779327347542,
  },
  {
    id: '1779327344725', name: 'Caixa com urso e chocolate',
    description: 'A caixa geralmente é personalizada e bem decorada, podendo ter cores como rosa, vermelho, branco ou preto, com acabamento elegante.',
    price: 70, image: '',
    category: 'mimos', subcategory: '', createdAt: 1779327344725,
  },
  {
    id: '1779327343362', name: 'Caixa com chocolate, quadro e mini buquê pequeno',
    description: 'A caixa é geralmente personalizada e bem decorada, podendo ser quadrada ou retangular, com acabamento sofisticado.',
    price: 90, image: '',
    category: 'mimos', subcategory: '', createdAt: 1779327343362,
  },
  {
    id: '1779327341880', name: 'Buquê com urso, rosas vermelhas, Ferrero Rocher e balão',
    description: 'Rosas vermelhas são o destaque principal, representando amor intenso e paixão, com pétalas bem abertas e aparência elegante.',
    price: 110, image: '',
    category: 'mimos', subcategory: '', createdAt: 1779327341880,
  },
  {
    id: '1779327339798', name: 'caixa personalizada com quadro, balão, urso pequeno e chocolate',
    description: 'A caixa tem formato quadrado, com design personalizado que pode incluir nomes, frases, cores favoritas ou mensagens especiais.',
    price: 90, image: '',
    category: 'mimos', subcategory: '', createdAt: 1779327339798,
  },
  {
    id: '1779327338691', name: 'Caixa personalizada em formato quadrado com balão, urso e chocolate',
    description: 'A caixa tem formato quadrado, com design personalizado que pode incluir nomes, frases, cores favoritas ou mensagens especiais.',
    price: 95, image: '',
    category: 'mimos', subcategory: '', createdAt: 1779327338691,
  },
  {
    id: '1779327337344', name: 'Caixa em formato de coração com chocolate e ursinho pequeno',
    description: 'A caixa tem formato de coração, geralmente em cores como vermelho, rosa ou branco, com acabamento elegante e decorativo.',
    price: 55, image: '',
    category: 'mimos', subcategory: '', createdAt: 1779327337344,
  },
  {
    id: '1779327335935', name: 'Caneca com chocolate, balão e foto polaroid',
    description: 'A base é uma caneca personalizada, que pode ter nomes, frases ou estampas especiais, deixando o presente único e feito sob medida.',
    price: 60, image: '',
    category: 'mimos', subcategory: '', createdAt: 1779327335935,
  },
  {
    id: '1779327334637', name: 'Caixa personalizada com foto, chocolate e luz de fada',
    description: 'Por fora, a caixa pode ser personalizada com nomes, frases ou datas importantes, em um design bonito e único.',
    price: 90, image: '',
    category: 'mimos', subcategory: '', createdAt: 1779327334637,
  },
  {
    id: '1779327333184', name: 'caixa estilo Netflix com luz de fada, chocolate e fotos polaroid',
    description: 'A caixa costuma ter um visual inspirado na Netflix, com cores preto e vermelho, letras estilizadas e um design que lembra uma tela de filme.',
    price: 90, image: '',
    category: 'mimos', subcategory: '', createdAt: 1779327333184,
  },
  {
    id: '1779327331653', name: 'Coração pequeno com chocolate',
    description: 'Ele geralmente vem em formato de coração compacto, podendo ser uma caixinha, uma embalagem decorada ou até um arranjo artesanal.',
    price: 25, image: '',
    category: 'mimos', subcategory: '', createdAt: 1779327331653,
  },
  {
    id: '1779327330397', name: 'Caixa redonda preta com chocolate, Nutella, batata frita e balão',
    description: 'A base é uma caixa redonda preta, com acabamento elegante e sofisticado, que já chama atenção pelo estilo premium.',
    price: 70, image: '',
    category: 'mimos', subcategory: '', createdAt: 1779327330397,
  },
  {
    id: '1779327326150', name: 'Buquê de maquiagem rosa',
    description: 'Rosas cor-de-rosa com pétalas suaves e volumosas, entre as flores aparecem detalhes inspirados em maquiagem.',
    price: 70, image: '',
    category: 'mimos', subcategory: '', createdAt: 1779327326150,
  },
  {
    id: '1779327324646', name: 'Buquê de borboletas vermelhas',
    description: 'Várias borboletas vermelhas intensas, variando entre tons de vermelho vivo, carmim e bordô, todas organizadas como se fossem flores.',
    price: 70, image: '',
    category: 'mimos', subcategory: '', createdAt: 1779327324646,
  },
  {
    id: '1779327323165', name: 'buquê de maquiagem rosa com girassol',
    description: 'Rosas rosas delicadas, bem abertas e com aparência aveludada, criando a base romântica do arranjo com girassóis vibrantes.',
    price: 80, image: '',
    category: 'mimos', subcategory: '', createdAt: 1779327323165,
  },
  {
    id: '1779327321585', name: 'BUQUES ROSA DE MAQUIAGEM',
    description: 'Um presente luxuoso, delicado e cheio de charme, perfeito para quem ama beleza e sofisticação.',
    price: 70, image: '',
    category: 'mimos', subcategory: '', createdAt: 1779327321585,
  },
  {
    id: '1779327319966', name: 'BUQUES DE BORBOLETAS NA COR ROXA',
    description: 'Um buquê sofisticado, delicado e cheio de encanto, perfeito para surpreender com elegância e muito amor.',
    price: 75, image: '',
    category: 'mimos', subcategory: '', createdAt: 1779327319966,
  },
  {
    id: '1779327318613', name: 'BUQUES PREMIUM DE BORBOLETAS ROSAS',
    description: 'Um buquê luxuoso, delicado e encantador, criado para surpreender com elegância e muito romantismo.',
    price: 75, image: '',
    category: 'mimos', subcategory: '', createdAt: 1779327318613,
  },
  {
    id: '1779807217443', name: 'CESTA COM CHOCOLATES',
    description: 'Uma linda cesta recheada de chocolates deliciosos, perfeita para surpreender alguém especial com muito carinho e doçura.',
    price: 50, image: '',
    category: 'ofertas', subcategory: 'promocoes', isOffer: true, createdAt: 1779807217443,
  },
  {
    id: '1779807152904', name: 'CESTA ROMÂNTICA',
    description: 'Uma cesta romântica encantadora, preparada com muito amor e carinho para surpreender alguém especial.',
    price: 80, oldPrice: 90, image: '',
    category: 'ofertas', subcategory: 'promocoes', isOffer: true, createdAt: 1779807152904,
  },
  {
    id: '1779807000540', name: 'CANECA COM CHOCOLATE E BOLÃO',
    description: 'Uma opção linda e deliciosa para presentear alguém especial com muito carinho e sabor.',
    price: 50, image: '',
    category: 'ofertas', subcategory: 'promocoes', isOffer: true, createdAt: 1779807000540,
  },
  {
    id: '1779804648441', name: 'Quadro romântico e sofisticado para celebrar uma linda história de amor',
    description: 'Moldura elegante em madeira, fundo escuro estilo lousa premium e detalhes delicados com corações, luzes douradas e escrita personalizada.',
    price: 30, oldPrice: 45, image: '',
    category: 'ofertas', subcategory: 'promocoes', isOffer: true, createdAt: 1779804648441,
  },
  {
    id: '1779804441131', name: 'Quadro romântico e sofisticado para celebrar uma linda história de amor.',
    description: 'Moldura elegante em madeira, fundo escuro estilo lousa premium e detalhes delicados com corações, luzes douradas e escrita personalizada.',
    price: 30, oldPrice: 45, image: '',
    category: 'ofertas', subcategory: 'promocoes', isOffer: true, createdAt: 1779804441131,
  },
  {
    id: '1779547483231', name: 'Buquê sofisticado com flores rosas delicadas',
    description: 'Arranjo floral premium com acabamento luxuoso, composição harmoniosa e visual romântico encantador.',
    price: 80, image: '',
    category: 'ofertas', subcategory: 'promocoes', isOffer: true, createdAt: 1779547483231,
  },
  {
    id: '1779547315205', name: 'Caixa personalizada com rosas artificiais em estilo luxuoso e sofisticado',
    description: 'Arranjo elegante com rosas delicadas de aparência realista, organizadas em caixa premium com acabamento refinado.',
    price: 80, image: '',
    category: 'ofertas', subcategory: 'promocoes', isOffer: true, createdAt: 1779547315205,
  },
  {
    id: '1779547155753', name: 'Caixa personalizada premium contendo chocolates finos, um ursinho delicado e uma presilha em formato de flor',
    description: 'Design elegante e romântico, com acabamento sofisticado, laços delicados, detalhes dourados e decoração encantadora.',
    price: 95, image: '',
    category: 'ofertas', subcategory: 'promocoes', isOffer: true, createdAt: 1779547155753,
  },
  {
    id: '1779328612613', name: 'Quadro romântico',
    description: 'Ele geralmente traz uma foto especial de casal, ou então uma arte personalizada com frases como "Te amo", "Para sempre" ou "Nossa história".',
    price: 25, oldPrice: 30, image: '',
    category: 'ofertas', subcategory: 'promocoes', isOffer: true, createdAt: 1779328612613,
  },
  {
    id: '1779328445412', name: 'Quadro romântico',
    description: 'Ele geralmente traz uma foto especial de casal, ou então uma arte personalizada com frases como "Te amo", "Para sempre" ou "Nossa história".',
    price: 25, oldPrice: 30, image: '',
    category: 'ofertas', subcategory: 'promocoes', isOffer: true, createdAt: 1779328445412,
  },
  {
    id: '1779328291115', name: 'Quadro estilo Netflix',
    description: 'Um quadro estilo Netflix é um presente personalizado inspirado no visual das capas da plataforma de streaming Netflix.',
    price: 25, oldPrice: 30, image: '',
    category: 'ofertas', subcategory: 'promocoes', isOffer: true, createdAt: 1779328291115,
  },
  {
    id: '1779327363951', name: 'Buquê com o tema do Bob Esponja com girassol',
    description: 'Um buquê divertido, vibrante e cheio de energia, inspirado no personagem Bob Esponja Calça Quadrada.',
    price: 80, image: '',
    category: 'ofertas', subcategory: 'promocoes', isOffer: true, createdAt: 1779327363951,
  },
  {
    id: '1779327355405', name: 'caixa com coração, chocolate e um pequeno buquê',
    description: 'A caixa geralmente tem formato coração ou decoração em formato de coração, com acabamento elegante em cores como vermelho, rosa ou branco.',
    price: 65, oldPrice: 75, image: '',
    category: 'ofertas', subcategory: 'promocoes', isOffer: true, createdAt: 1779327355405,
  },
  {
    id: '1779327354071', name: 'Buquê pequeno com girassol e sempre-vivas',
    description: 'Ele é composto por um ou poucos girassóis, que são o destaque principal. Com suas pétalas amarelas vibrantes e centro escuro.',
    price: 25, image: '',
    category: 'ofertas', subcategory: 'promocoes', isOffer: true, createdAt: 1779327354071,
  },
  {
    id: '1779327346182', name: 'Caneca com chocolate e balão',
    description: 'A caneca pode ser personalizada com nomes, frases ou desenhos, deixando o presente único e significativo.',
    price: 50, oldPrice: 65, image: '',
    category: 'ofertas', subcategory: 'promocoes', isOffer: true, createdAt: 1779327346182,
  },
  {
    id: '1779327328881', name: 'Cesta com chocolate, balão e chaveiro',
    description: 'Uma cesta com chocolate, balão e chaveiro é um presente criativo e completo, feito para surpreender e transmitir carinho em diferentes formas.',
    price: 55, oldPrice: 70, image: '',
    category: 'ofertas', subcategory: 'promocoes', isOffer: true, createdAt: 1779327328881,
  },
  {
    id: '1779327327373', name: 'Caixa explosiva com fotos e chocolate',
    description: 'Por fora, ela parece uma caixa simples e elegante, geralmente em papel rígido com acabamento bonito, laço ou tampa decorada.',
    price: 50, oldPrice: 60, image: '',
    category: 'ofertas', subcategory: 'promocoes', isOffer: true, createdAt: 1779327327373,
  },
  {
    id: '1780189745001', name: 'Ursos Pequenos Chaveiro',
    description: 'Temos vários modelos lindos e apaixonantes para você escolher!',
    price: 5, image: 'data:image/jpeg;base64,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',
    category: 'ofertas', subcategory: 'promocoes', isOffer: true, createdAt: 1780189745001,
  },
];

// Try to read from localStorage once at module load (client only)
let cached: Product[] | null = null;
try {
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Product[];
      if (Array.isArray(parsed) && parsed.length) {
        cached = parsed;
      }
    }
  }
} catch {}

export function getProducts(): Product[] {
  if (cached) return cached;
  return DEFAULT_PRODUCTS;
}

export function setProducts(products: Product[]) {
  cached = products;
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(products)) } catch {}
}

// Ensure defaults are written on first client-side call
export function ensureDefaults() {
  if (cached) return;
  const all = getProducts();
  if (all.length) {
    cached = all;
    if (typeof window !== 'undefined') {
      try {
        if (!localStorage.getItem(STORAGE_KEY)) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
        }
      } catch {}
    }
  }
}

export function addProduct(product: Omit<Product, 'id' | 'createdAt'>): Product {
  const p: Product = { ...product, id: Date.now().toString(), createdAt: Date.now() };
  const all = [...getProducts()];
  all.push(p);
  setProducts(all);
  return p;
}

export function updateProduct(id: string, updates: Partial<Product>) {
  const all = [...getProducts()];
  const idx = all.findIndex(p => p.id === id);
  if (idx >= 0) { all[idx] = { ...all[idx], ...updates }; setProducts(all); }
}

export function deleteProduct(id: string) {
  setProducts(getProducts().filter(p => p.id !== id));
}

const SYNC_EVENT = 'mimos-synced';

export async function syncFromApi() {
  if (typeof window === 'undefined') return;
  try {
    const res = await fetch('/api/products');
    if (!res.ok) return;
    const data = await res.json();
    if (Array.isArray(data) && data.length) {
      setProducts(data as Product[]);
    }
    window.dispatchEvent(new Event(SYNC_EVENT));
  } catch {}
}

export function onSync(cb: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(SYNC_EVENT, cb);
  return () => window.removeEventListener(SYNC_EVENT, cb);
}

export function getCategories(): string[] {
  const cats = new Set(getProducts().map(p => p.category));
  for (const c of ['mimos', 'datas', 'ofertas']) cats.add(c);
  return Array.from(cats);
}

export function getSubcategories(category: string): string[] {
  const subs = new Set(getProducts().filter(p => p.category === category).map(p => p.subcategory || ''));
  return Array.from(subs);
}
