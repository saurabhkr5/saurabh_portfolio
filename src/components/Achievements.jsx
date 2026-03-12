import { motion } from 'framer-motion';
import achievements from '../data/achievements.json';

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 px-6 lg:px-16">
      <div className="max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="font-mono text-cyan-400 text-sm">// 06.</div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white">Achievements</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/30 to-transparent" />
          </div>
          <p className="text-slate-400 text-sm">Milestones & highlights from my journey</p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, #00d4ff40, #9b5de540, transparent)' }} />

          <div className="space-y-6">
            {achievements.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 group"
              >
                {/* Timeline dot */}
                <div className="relative z-10 flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                    style={{
                      background: `${item.color}15`,
                      border: `1px solid ${item.color}30`,
                    }}
                  >
                    {item.icon}
                  </motion.div>
                </div>

                {/* Content */}
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex-1 glass rounded-xl p-5 group-hover:border-cyan-500/20 transition-all"
                  style={{ border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-mono px-2 py-0.5 rounded"
                          style={{ background: `${item.color}12`, color: item.color }}>
                          {item.category}
                        </span>
                        <span className="text-xs text-slate-600 font-mono">{item.date}</span>
                      </div>
                      <h3 className="font-bold text-white text-sm group-hover:text-cyan-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
