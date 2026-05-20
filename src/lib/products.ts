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
    id: '1', name: 'Caneca Floral Delicada',
    description: 'Caneca de porcelana 300ml adornada com estampa floral em tons pastéis. Perfeita para presentear com elegância. Resistente ao micro-ondas.',
    price: 49.90, oldPrice: 69.90, image: '',
    category: 'mimos', subcategory: 'canecas', isOffer: true, createdAt: Date.now(),
  },
  {
    id: '2', name: 'Caderneta Artesanal com Caneta',
    description: 'Caderneta revestida em tecido com nome bordado, acompanhada de caneta exclusiva. Ideal para registrar momentos especiais.',
    price: 39.90, oldPrice: 55.00, image: '',
    category: 'mimos', subcategory: 'cadernetas', isOffer: true, createdAt: Date.now(),
  },
  {
    id: '3', name: 'Lembranças de Casamento Premium',
    description: 'Conjunto de 50 lembrancinhas personalizadas com embalagem individual em organza. Elegância e sofisticação para seu grande dia.',
    price: 189.90, image: '', category: 'mimos', subcategory: 'lembrancinhas', createdAt: Date.now(),
  },
  {
    id: '4', name: 'Baú de Memórias Personalizado',
    description: 'Caixa em MDF revestida com nome e data gravados a laser. Acompanha mimos internos selecionados. Dimensões 25x15x8cm.',
    price: 79.90, image: '', category: 'mimos', subcategory: 'caixas', createdAt: Date.now(),
  },
  {
    id: '5', name: 'Topo de Bolo Sonho de Amor',
    description: 'Topo de bolo em acrílico cristal com nomes dos noivos e data. Disponível nas cores rosa, azul celeste e dourado.',
    price: 34.90, image: '', category: 'mimos', subcategory: 'topos-bolo', createdAt: Date.now(),
  },
  {
    id: '6', name: 'Agenda dos Sonhos 2026',
    description: 'Agenda anual com capa dura revestida em tecido aveludado, nome personalizado e páginas com design floral exclusivo.',
    price: 59.90, oldPrice: 79.90, image: '', category: 'mimos', subcategory: 'agendas', isOffer: true, createdAt: Date.now(),
  },
  {
    id: '7', name: 'Kit Universitário Encanto',
    description: 'Conjunto completo para formatura: caneca porcelana, caderneta, caneta e chaveiro personalizados com seu nome.',
    price: 99.90, image: '', category: 'mimos', subcategory: 'kits', createdAt: Date.now(),
  },
  {
    id: '8', name: 'Caneka Amor Eterno - Dia das Mães',
    description: 'Caneka especial em porcelana com frase "Melhor Mãe do Mundo" em lettering dourado. Embalagem presenteável com laço de cetim.',
    price: 54.90, oldPrice: 69.90, image: '', category: 'datas', subcategory: 'dia-das-maes', isOffer: true, createdAt: Date.now(),
  },
  {
    id: '9', name: 'Kit Pai Herói - Caneca & Acessórios',
    description: 'Conjunto premium para o Dia dos Pais: caneca 400ml estilizada + abridor personalizado + mensagem exclusiva.',
    price: 69.90, image: '', category: 'datas', subcategory: 'dia-dos-pais', createdAt: Date.now(),
  },
  {
    id: '10', name: 'Ovo de Páscoa Dos Sonhos 500g',
    description: 'Ovo de chocolate belga ao leite 500g com embalagem luxuosa personalizada. Disponível com nome e foto na caixa.',
    price: 89.90, oldPrice: 119.90, image: '', category: 'datas', subcategory: 'pascoa', isOffer: true, createdAt: Date.now(),
  },
  {
    id: '11', name: 'Estrela de Natal Personalizada',
    description: 'Enfeite natalino em acrílico com nome da família gravado a laser. 10cm de diâmetro. Elegância para sua árvore de Natal.',
    price: 29.90, image: '', category: 'datas', subcategory: 'natal', createdAt: Date.now(),
  },
  {
    id: '12', name: 'Kit Arraiá Personalizado',
    description: 'Conjunto festivo com bandeirinhas decoradas, chapéu de palha e lembrancinhas personalizadas para sua festa junina.',
    price: 49.90, image: '', category: 'datas', subcategory: 'festa-junina', createdAt: Date.now(),
  },
  {
    id: '13', name: 'Super Combo Mimos Exclusivos',
    description: 'Pacote especial com 3 produtos personalizados: caneca + caderneta + caneta com 20% de desconto. O presente completo que cabe no bolso.',
    price: 89.90, oldPrice: 119.70, image: '', category: 'ofertas', subcategory: 'kits-promocionais', isOffer: true, createdAt: Date.now(),
  },
  {
    id: '14', name: 'Mini Caneca Surpresa',
    description: 'Caneca 200ml sortida com estampas exclusivas por apenas R$19,90. Estoque limitado — aproveite enquanto durar!',
    price: 19.90, oldPrice: 39.90, image: '', category: 'ofertas', subcategory: 'queima-estoque', isOffer: true, createdAt: Date.now(),
  },
];

export function getProducts(): Product[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch {}
  setProducts(DEFAULT_PRODUCTS);
  return DEFAULT_PRODUCTS;
}

export function setProducts(products: Product[]) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(products)) } catch {}
}

export function addProduct(product: Omit<Product, 'id' | 'createdAt'>): Product {
  const p: Product = { ...product, id: Date.now().toString(), createdAt: Date.now() };
  const all = getProducts();
  all.push(p);
  setProducts(all);
  return p;
}

export function updateProduct(id: string, updates: Partial<Product>) {
  const all = getProducts();
  const idx = all.findIndex(p => p.id === id);
  if (idx >= 0) { all[idx] = { ...all[idx], ...updates }; setProducts(all); }
}

export function deleteProduct(id: string) {
  setProducts(getProducts().filter(p => p.id !== id));
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
