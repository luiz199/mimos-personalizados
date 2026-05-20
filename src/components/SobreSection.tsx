'use client';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Shield, Award } from 'lucide-react';

const values = [
  { icon: Heart, title: 'Feito com Amor', text: 'Cada produto é cuidadosamente elaborado com dedicação e carinho para tornar seu momento especial.' },
  { icon: Sparkles, title: 'Qualidade Premium', text: 'Utilizamos materiais selecionados e técnicas refinadas para garantir o melhor acabamento.' },
  { icon: Shield, title: 'Satisfação Garantida', text: 'Seu sorriso é nossa maior recompensa. Trabalhamos para superar suas expectativas.' },
  { icon: Award, title: 'Exclusividade', text: 'Produtos únicos e personalizados que contam a sua história de forma especial.' },
];

export default function SobreSection() {
  return (
    <section id="sobre" className="relative py-20 md:py-28 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 via-transparent to-pink-50/20 pointer-events-none" />
      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Sobre Nós</h2>
          <div className="section-title-decoration">
            <span className="line" /><span className="ornament">✦</span><span className="line" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 md:p-10 mb-10 max-w-3xl mx-auto"
        >
          <p className="text-sm text-text-secondary/80 leading-relaxed mb-4">
            A <strong className="text-text-primary">Mimos & Personalizados AC</strong> nasceu do desejo de transformar
            momentos especiais em lembranças inesquecíveis. Somos uma loja dedicada a criar produtos personalizados
            que encantam e emocionam.
          </p>
          <p className="text-sm text-text-secondary/80 leading-relaxed mb-4">
            Cada peça é pensada com carinho, desde a escolha dos materiais até o acabamento final.
            Acreditamos que os pequenos detalhes fazem toda a diferença e que um presente personalizado
            carrega um significado único.
          </p>
          <p className="text-sm text-text-secondary/80 leading-relaxed">
            Seja para celebrar uma data especial, presentear alguém querido ou simplemente se mimar,
            estamos aqui para tornar cada momento ainda mais memorável.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-6 text-center card-hover"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-100 to-blue-100 flex items-center justify-center mx-auto mb-4">
                <v.icon size={20} className="text-pink-500" />
              </div>
              <h3 className="text-sm font-medium text-text-primary mb-2">{v.title}</h3>
              <p className="text-xs text-text-secondary/70 leading-relaxed">{v.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
