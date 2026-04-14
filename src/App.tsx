/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Stars, Sparkles, Music, Mail, Camera, HeartHandshake, Gift } from 'lucide-react';

interface FloatingHeartProps {
  delay?: number;
  x?: number;
  size?: number;
  key?: number;
}

const FloatingHeart = ({ delay = 0, x = 0, size = 24 }: FloatingHeartProps) => (
  <motion.div
    initial={{ y: '100vh', opacity: 0, scale: 0 }}
    animate={{ 
      y: '-10vh', 
      opacity: [0, 1, 1, 0],
      scale: [0.5, 1, 1, 0.5],
      x: x + Math.sin(delay) * 50
    }}
    transition={{ 
      duration: 10 + Math.random() * 10, 
      repeat: Infinity, 
      delay,
      ease: "linear"
    }}
    className="absolute pointer-events-none text-pink-300/40"
    style={{ left: `${x}%` }}
  >
    <Heart size={size} fill="currentColor" />
  </motion.div>
);

export default function App() {
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [hearts, setHearts] = useState<{id: number, x: number, delay: number, size: number}[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 20,
      size: 12 + Math.random() * 24
    }));
    setHearts(newHearts);
  }, []);

  const memories = [
    { id: 1, title: "První rande", date: "Kdysi dávno", img: "https://picsum.photos/seed/love1/400/500" },
    { id: 2, title: "Společný výlet", date: "Léto 2023", img: "https://picsum.photos/seed/love2/400/500" },
    { id: 3, title: "Krásné chvíle", date: "Včera", img: "https://picsum.photos/seed/love3/400/500" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden font-sans">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#fff5f7] via-[#ffeef2] to-[#f3e8ff] -z-10" />
      {hearts.map(h => (
        <FloatingHeart key={h.id} x={h.x} delay={h.delay} size={h.size} />
      ))}

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-block p-4 rounded-full bg-pink-100 text-pink-500 mb-4"
          >
            <Heart size={48} fill="currentColor" />
          </motion.div>
          
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-[#4a3a3a] leading-tight">
            Pro mou nejúžasnější <br />
            <span className="font-script text-pink-500 text-6xl md:text-8xl">Princeznu</span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#6b5a5a] max-w-lg mx-auto font-light tracking-wide">
            Tato stránka je jen malým kouskem mé lásky k tobě. Jsi to nejlepší, co mě kdy potkalo.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
              setShowSparkle(true);
              setTimeout(() => setShowSparkle(false), 2000);
            }}
            className="mt-8 px-8 py-4 bg-pink-500 text-white rounded-full font-medium shadow-lg shadow-pink-200 flex items-center gap-2 mx-auto"
          >
            Objev překvapení <Sparkles size={18} />
          </motion.button>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 text-pink-300"
        >
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center p-1">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-2 bg-current rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Love Letter Section */}
      <section className="py-24 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-[#4a3a3a] mb-4 flex items-center justify-center gap-3">
            <Mail className="text-pink-400" /> Dopis pro tebe
          </h2>
          <p className="text-[#6b5a5a]">Klikni na obálku a přečti si, co mám na srdci...</p>
        </div>

        <div className="relative flex justify-center">
          <AnimatePresence mode="wait">
            {!isLetterOpen ? (
              <motion.div
                key="envelope"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0, rotate: 5 }}
                whileHover={{ rotate: [-1, 1, -1], scale: 1.05 }}
                onClick={() => setIsLetterOpen(true)}
                className="cursor-pointer w-64 h-48 bg-pink-200 rounded-lg shadow-2xl flex items-center justify-center relative overflow-hidden"
              >
                <div className="absolute inset-0 border-4 border-white/30 m-2 rounded" />
                <Heart size={40} className="text-white fill-white" />
                <div className="absolute bottom-4 right-4 text-white/50 font-script text-xl">S láskou...</div>
              </motion.div>
            ) : (
              <motion.div
                key="letter"
                initial={{ y: 50, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                className="glass p-8 md:p-12 rounded-3xl max-w-2xl w-full relative"
              >
                <button 
                  onClick={() => setIsLetterOpen(false)}
                  className="absolute top-4 right-4 text-pink-400 hover:text-pink-600"
                >
                  Zavřít
                </button>
                <div className="font-script text-3xl md:text-4xl text-pink-600 mb-6 italic">Moje nejdražší,</div>
                <div className="space-y-4 text-lg text-[#4a3a3a] leading-relaxed font-light">
                  <p>
                    Chtěl jsem ti vytvořit něco speciálního, co ti připomene, jak moc pro mě znamenáš. 
                    Každý den s tebou je jako sen, ze kterého se nechci nikdy probudit.
                  </p>
                  <p>
                    Děkuji ti za tvůj úsměv, za tvou trpělivost a za to, že jsi přesně taková, jaká jsi. 
                    Jsi moje největší štěstí a moje všechno.
                  </p>
                  <p>
                    Miluji tě víc, než dokážou slova vyjádřit.
                  </p>
                </div>
                <div className="mt-8 text-right font-script text-3xl text-pink-500">
                  Navždy tvůj ❤️
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Memory Gallery */}
      <section className="py-24 bg-white/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-[#4a3a3a] mb-4 flex items-center justify-center gap-3">
              <Camera className="text-pink-400" /> Naše vzpomínky
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {memories.map((memory, idx) => (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-lg mb-4">
                  <img 
                    src={memory.img} 
                    alt={memory.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 text-white">
                    <p className="font-medium text-lg">{memory.title}</p>
                    <p className="text-sm opacity-80">{memory.date}</p>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-serif text-xl text-[#4a3a3a]">{memory.title}</h3>
                  <p className="text-sm text-pink-400">{memory.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Hugs & Kisses */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-2xl mx-auto glass p-12 rounded-[3rem] space-y-8">
          <h2 className="font-serif text-3xl text-[#4a3a3a]">Potřebuješ trochu lásky?</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="px-8 py-4 bg-white text-pink-500 rounded-2xl shadow-md flex items-center gap-2 font-medium border border-pink-100"
              onClick={() => alert("Posílám ti obrovské virtuální objetí! 🤗❤️")}
            >
              <HeartHandshake size={20} /> Obejmout
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className="px-8 py-4 bg-pink-500 text-white rounded-2xl shadow-lg shadow-pink-200 flex items-center gap-2 font-medium"
              onClick={() => alert("Muck! 💋 Letí k tobě pusa!")}
            >
              <Stars size={20} /> Políbit
            </motion.button>
          </div>
          <div className="pt-8 border-t border-pink-100">
            <p className="text-[#6b5a5a] italic">"Jsi sluncem v mém deštivém dni."</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-[#6b5a5a] text-sm font-light">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Gift size={16} className="text-pink-300" />
          <span>Vytvořeno s láskou jen pro tebe</span>
        </div>
        <p>© {new Date().getFullYear()} • Navždy spolu</p>
      </footer>

      {/* Sparkle Overlay */}
      <AnimatePresence>
        {showSparkle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 2, 0],
                rotate: [0, 90, 180],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 1 }}
            >
              <Sparkles size={100} className="text-yellow-400 fill-yellow-400" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
