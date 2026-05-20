'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LogIn, LogOut, Plus, Edit3, Trash2, Save, X, ImageIcon, Copy,
  ShoppingBag, Tag, Sparkles, Package, ChevronDown, AlertCircle, GripVertical
} from 'lucide-react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '@/lib/products';
import type { Product } from '@/lib/products';

const ADMIN_USER = 'admin';
const ADMIN_PASS = '2025';

const categories = [
  { id: 'mimos', label: 'Mimos', emoji: '🎀' },
  { id: 'datas', label: 'Datas Comemorativas', emoji: '🎊' },
  { id: 'ofertas', label: 'Ofertas', emoji: '🔥' },
];

const subcategoryOptions: Record<string, string[]> = {
  mimos: ['canecas', 'cadernetas', 'lembrancinhas', 'caixas', 'topos-bolo', 'agendas', 'kits'],
  datas: ['dia-das-maes', 'dia-dos-pais', 'pascoa', 'natal', 'ano-novo', 'dia-das-criancas', 'festa-junina', 'cha-revelacao', 'casamento', 'aniversario'],
  ofertas: ['promocoes', 'kits-promocionais', 'lancamentos', 'queima-estoque'],
};

const subcatLabels: Record<string, string> = {
  'canecas': 'Canecas', 'cadernetas': 'Cadernetas', 'lembrancinhas': 'Lembrancinhas',
  'caixas': 'Caixas', 'topos-bolo': 'Topos de Bolo', 'agendas': 'Agendas', 'kits': 'Kits',
  'dia-das-maes': 'Dia das Mães', 'dia-dos-pais': 'Dia dos Pais', 'pascoa': 'Páscoa',
  'natal': 'Natal', 'ano-novo': 'Ano Novo', 'dia-das-criancas': 'Dia das Crianças',
  'festa-junina': 'Festa Junina', 'cha-revelacao': 'Chá Revelação', 'casamento': 'Casamento',
  'aniversario': 'Aniversário',
  'promocoes': 'Promoções', 'kits-promocionais': 'Kits Promocionais', 'lancamentos': 'Lançamentos',
  'queima-estoque': 'Queima de Estoque',
};

interface ProductForm {
  name: string; description: string; price: string; oldPrice: string;
  image: string; category: string; subcategory: string; isOffer: boolean;
}

const emptyForm: ProductForm = {
  name: '', description: '', price: '', oldPrice: '',
  image: '', category: 'mimos', subcategory: '', isOffer: false,
};

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [filterCat, setFilterCat] = useState('all');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState('');

  const load = () => setProducts(getProducts());

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      setLoggedIn(true); setLoginError(false); load();
      localStorage.setItem('mimos-auth', 'true');
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false); setUser(''); setPass('');
    localStorage.removeItem('mimos-auth');
  };

  useEffect(() => {
    if (localStorage.getItem('mimos-auth') === 'true') {
      setLoggedIn(true); load();
    }
  }, []);

  const openNew = () => { setEditId(null); setForm(emptyForm); setShowForm(true); };

  const openEdit = (p: Product) => {
    setEditId(p.id);
    setForm({
      name: p.name, description: p.description, price: p.price.toString(),
      oldPrice: p.oldPrice?.toString() || '', image: p.image,
      category: p.category, subcategory: p.subcategory || '', isOffer: p.isOffer || false,
    });
    setShowForm(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: form.name, description: form.description,
      price: parseFloat(form.price) || 0,
      oldPrice: form.oldPrice ? parseFloat(form.oldPrice) : undefined,
      image: form.image, category: form.category,
      subcategory: form.subcategory, isOffer: form.isOffer,
    };
    if (editId) {
      updateProduct(editId, data);
      setSuccessMsg('Produto atualizado com sucesso!');
    } else {
      addProduct(data);
      setSuccessMsg('Produto adicionado com sucesso!');
    }
    load();
    setShowForm(false);
    setEditId(null);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    load();
    setConfirmDelete(null);
    setSuccessMsg('Produto excluído com sucesso!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleDuplicate = (p: Product) => {
    addProduct({
      name: p.name + ' (cópia)', description: p.description, price: p.price,
      oldPrice: p.oldPrice, image: p.image, category: p.category,
      subcategory: p.subcategory || '', isOffer: p.isOffer,
    });
    load();
    setSuccessMsg('Produto duplicado com sucesso!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const [dragIdx, setDragIdx] = useState<number | null>(null);

  const handleDragStart = (i: number) => setDragIdx(i);

  const handleDragOver = (e: React.DragEvent, i: number) => {
    e.preventDefault();
    if (dragIdx === null || dragIdx === i) return;
    const items = getProducts();
    const filtered = items.filter(p => filterCat === 'all' || p.category === filterCat);
    const [moved] = filtered.splice(dragIdx, 1);
    filtered.splice(i, 0, moved);
    setProducts(filtered);
    setDragIdx(i);
  };

  const handleDragEnd = () => {
    setDragIdx(null);
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-pastel-pink to-pastel-blue">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-strong rounded-3xl p-8 sm:p-10 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-400 to-blue-400 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <LogIn size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary">Painel Admin</h1>
            <p className="text-sm text-text-secondary/70 mt-1">Mimos & Personalizados AC</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Usuário</label>
              <input type="text" value={user} onChange={e => { setUser(e.target.value); setLoginError(false) }}
                className="w-full px-4 py-3 rounded-xl bg-white/60 border border-pink-200/40 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none transition-all text-sm"
                placeholder="Digite o usuário" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Senha</label>
              <input type="password" value={pass} onChange={e => { setPass(e.target.value); setLoginError(false) }}
                className="w-full px-4 py-3 rounded-xl bg-white/60 border border-pink-200/40 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none transition-all text-sm"
                placeholder="Digite a senha" />
            </div>
            {loginError && (
              <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                className="text-red-500 text-sm flex items-center gap-1">
                <AlertCircle size={14} /> Usuário ou senha incorretos
              </motion.p>
            )}
            <button type="submit" className="w-full btn-primary justify-center py-3.5">
              <LogIn size={16} /> Entrar
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const filtered = filterCat === 'all' ? products : products.filter(p => p.category === filterCat);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-pink/30 to-pastel-blue/30">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-10">
        {successMsg && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[200] glass-strong rounded-xl px-6 py-3 shadow-xl flex items-center gap-2 text-sm font-medium text-green-600"
          >
            <Sparkles size={16} /> {successMsg}
          </motion.div>
        )}

        <div className="glass-strong rounded-2xl p-4 sm:p-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-blue-400 flex items-center justify-center">
              <ShoppingBag size={20} className="text-[#111]" />
            </div>
            <div>
              <h1 className="text-lg font-normal text-[#111] tracking-[-0.01em]">Painel Administrativo</h1>
              <p className="text-xs text-text-secondary/60">Gerencie seus produtos</p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button onClick={openNew} className="btn-primary flex-1 sm:flex-initial justify-center text-sm py-2.5 px-5 btn-ripple">
              <Plus size={16} /> Novo Produto
            </button>
            <button onClick={handleLogout}
              className="p-2.5 rounded-xl glass text-text-secondary hover:text-red-500 transition-colors"
              title="Sair"
            ><LogOut size={18} /></button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Total de Produtos', value: products.length, color: '#111' },
            { label: 'Em Oferta', value: products.filter(p => p.isOffer).length, color: '#f472b6' },
            { label: 'Mimos', value: products.filter(p => p.category === 'mimos').length, color: '#7dd3fc' },
            { label: 'Datas', value: products.filter(p => p.category === 'datas').length, color: '#a78bfa' },
            { label: 'Ofertas', value: products.filter(p => p.category === 'ofertas').length, color: '#fb923c' },
          ].map(stat => (
            <div key={stat.label} className="glass rounded-xl p-4 text-center">
              <div className="text-2xl font-light text-[#111]">{stat.value}</div>
              <div className="text-[10px] text-text-secondary/50 tracking-[0.08em] uppercase mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="glass-strong rounded-2xl p-4 sm:p-6 mb-6">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setFilterCat('all')}
              className={`px-4 py-2 rounded-full text-xs font-normal transition-all ${
                filterCat === 'all' ? 'bg-[#e8e8e8] text-[#111]' : 'glass hover:bg-white/40'
              }`}
            ><Package size={12} className="inline mr-1" /> Todos ({products.length})</button>
            {categories.map(c => (
              <button key={c.id} onClick={() => setFilterCat(c.id)}
                className={`px-4 py-2 rounded-full text-xs font-normal transition-all ${
                  filterCat === c.id ? 'bg-[#e8e8e8] text-[#111]' : 'glass hover:bg-white/40'
                }`}
              >{c.emoji} {c.label} ({products.filter(p => p.category === c.id).length})</button>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {filtered.map((p, i) => (
            <motion.div key={p.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              draggable
              onDragStart={() => handleDragStart(i)}
              onDragOver={e => handleDragOver(e, i)}
              onDragEnd={handleDragEnd}
              className={`glass rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start gap-4 cursor-grab active:cursor-grabbing ${dragIdx === i ? 'opacity-50 ring-2 ring-pink-200' : ''}`}
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pastel-pink to-pastel-blue flex-shrink-0 flex items-center justify-center overflow-hidden">
                {p.image ? <img src={p.image} alt="" className="w-full h-full object-cover" /> : <ImageIcon size={24} className="text-pink-300/60" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-text-primary text-sm">{p.name}</h3>
                  {p.isOffer && <span className="tag tag-pink text-[10px]"><Sparkles size={10} /> Oferta</span>}
                </div>
                <p className="text-xs text-text-secondary/60 mt-0.5 line-clamp-1">{p.description}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="product-price text-sm">R$ {p.price.toFixed(2).replace('.', ',')}</span>
                  {p.oldPrice && <span className="product-old-price text-xs">R$ {p.oldPrice.toFixed(2).replace('.', ',')}</span>}
                </div>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="tag tag-blue text-[10px]">{p.category}</span>
                  {p.subcategory && <span className="tag tag-pink text-[10px]">{subcatLabels[p.subcategory] || p.subcategory}</span>}
                </div>
              </div>
              <div className="flex items-center gap-1.5 sm:self-center">
                <button onClick={() => openEdit(p)}
                  className="p-2 rounded-lg glass hover:bg-blue-50 text-blue-500 transition-all"
                  title="Editar"
                ><Edit3 size={15} /></button>
                <button onClick={() => handleDuplicate(p)}
                  className="p-2 rounded-lg glass hover:bg-purple-50 text-purple-500 transition-all"
                  title="Duplicar"
                ><Copy size={15} /></button>
                <button onClick={() => setConfirmDelete(p.id)}
                  className="p-2 rounded-lg glass hover:bg-red-50 text-red-500 transition-all"
                  title="Excluir"
                ><Trash2 size={15} /></button>
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-16 glass rounded-2xl">
              <Package size={48} className="mx-auto text-pink-300/50 mb-3" />
              <p className="text-text-secondary/60">Nenhum produto encontrado</p>
              <button onClick={openNew} className="btn-primary mt-4 text-sm">
                <Plus size={14} /> Adicionar Produto
              </button>
            </div>
          )}
        </div>

        <div className="mt-4 text-center">
          <a href="/" className="text-xs text-text-secondary/50 hover:text-pink-500 transition-colors">
            ← Voltar ao site
          </a>
        </div>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-strong rounded-2xl p-6 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-text-primary">
                  {editId ? 'Editar Produto' : 'Novo Produto'}
                </h2>
                <button onClick={() => setShowForm(false)}
                  className="w-8 h-8 rounded-full glass hover:bg-white/60 flex items-center justify-center"
                ><X size={16} /></button>
              </div>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">Nome do Produto</label>
                  <input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-pink-200/40 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">Descrição</label>
                  <textarea required value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-pink-200/40 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none text-sm resize-none h-20" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1">Preço (R$)</label>
                    <input type="number" step="0.01" required value={form.price}
                      onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-pink-200/40 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1">Preço Antigo (R$)</label>
                    <input type="number" step="0.01" value={form.oldPrice}
                      onChange={e => setForm(f => ({ ...f, oldPrice: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-pink-200/40 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">Imagem do Produto</label>
                  <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/60 border border-pink-200/40 cursor-pointer hover:bg-pink-50/60 transition-colors text-sm text-text-secondary/70">
                    <ImageIcon size={16} />
                    <span>{form.image ? 'Foto selecionada' : 'Upload da imagem'}</span>
                    <input type="file" accept="image/*" className="hidden"
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = ev => setForm(f => ({ ...f, image: ev.target?.result as string || '' }));
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="text-[10px] text-text-secondary/40 flex-1">Ou cole a URL abaixo</span>
                  </div>
                  <input type="url" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                    placeholder="https://..."
                    className="w-full mt-1 px-4 py-2 rounded-xl bg-white/60 border border-pink-200/40 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none text-sm" />
                  {form.image && (
                    <img src={form.image} alt="Preview" className="mt-2 w-20 h-20 rounded-xl object-cover border border-pink-200/40" />
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1">Categoria</label>
                    <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value, subcategory: '' }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-pink-200/40 focus:border-pink-400 outline-none text-sm"
                    >
                      {categories.map(c => <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1">Subcategoria</label>
                    <select value={form.subcategory} onChange={e => setForm(f => ({ ...f, subcategory: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-pink-200/40 focus:border-pink-400 outline-none text-sm"
                    >
                      <option value="">Selecione</option>
                      {(subcategoryOptions[form.category] || []).map(s => (
                        <option key={s} value={s}>{subcatLabels[s] || s}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.isOffer}
                    onChange={e => setForm(f => ({ ...f, isOffer: e.target.checked }))}
                    className="w-4 h-4 rounded border-pink-300 text-pink-500 focus:ring-pink-300" />
                  <span className="text-sm text-text-secondary flex items-center gap-1">
                    <Sparkles size={14} className="text-yellow-500" /> Marcar como Oferta
                  </span>
                </label>
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="btn-primary flex-1 justify-center py-2.5 text-sm">
                    <Save size={16} /> {editId ? 'Atualizar' : 'Adicionar'}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)}
                    className="flex-1 py-2.5 rounded-xl glass text-text-secondary hover:bg-white/60 text-sm font-medium transition-all"
                  >Cancelar</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setConfirmDelete(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="glass-strong rounded-2xl p-6 sm:p-8 w-full max-w-sm text-center"
              onClick={e => e.stopPropagation()}
            >
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <Trash2 size={24} className="text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">Excluir Produto?</h3>
              <p className="text-sm text-text-secondary/70 mb-6">Esta ação não pode ser desfeita.</p>
              <div className="flex gap-3">
                <button onClick={() => handleDelete(confirmDelete)}
                  className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition-all"
                >Sim, Excluir</button>
                <button onClick={() => setConfirmDelete(null)}
                  className="flex-1 py-2.5 rounded-xl glass text-text-secondary hover:bg-white/60 text-sm font-medium transition-all"
                >Cancelar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
