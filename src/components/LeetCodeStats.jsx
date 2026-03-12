import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Zap, Target, Award } from 'lucide-react';


export default function LeetCodeStats() {
  const [data, setData] = useState({
    totalSolved: '...',
    ranking: '...',
    easySolved: 55, totalEasy: 803,
    mediumSolved: 38, totalMedium: 1607,
    hardSolved: 7, totalHard: 647,
  });

  useEffect(() => {
    fetch('https://leetcode-api-faisalshohag.vercel.app/saurabh5119')
      .then(res => res.json())
      .then(res => {
        if (res.totalSolved !== undefined) {
          setData({
            totalSolved: res.totalSolved,
            ranking: res.ranking.toLocaleString(),
            easySolved: res.easySolved, totalEasy: res.totalEasy,
            mediumSolved: res.mediumSolved, totalMedium: res.totalMedium,
            hardSolved: res.hardSolved, totalHard: res.totalHard,
          });
        }
      })
      .catch(console.error);
  }, []);

  const liveStats = [
    { label: 'Problems Solved', value: data.totalSolved, icon: Target, color: '#00d4ff' },
    { label: 'Global Ranking', value: data.ranking, icon: Award, color: '#f59e0b' },
  ];

  const liveDifficulty = [
    { label: 'Easy', solved: data.easySolved, total: data.totalEasy, color: '#22c55e' },
    { label: 'Medium', solved: data.mediumSolved, total: data.totalMedium, color: '#f59e0b' },
    { label: 'Hard', solved: data.hardSolved, total: data.totalHard, color: '#ef4444' },
  ];

  return (
    <section id="leetcode" className="py-24 px-6 lg:px-16">
      <div className="max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="font-mono text-cyan-400 text-sm">// 04.</div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white">LeetCode Activity</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/30 to-transparent" />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {liveStats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass rounded-xl p-4 flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}25` }}>
                    <Icon size={18} style={{ color: stat.color }} />
                  </div>
                  <div>
                    <div className="font-display text-xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-slate-500 font-mono">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Main stats panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass rounded-xl p-6 lg:col-span-2"
          >
            {/* Difficulty breakdown */}
            <div className="mb-6">
              <div className="text-xs font-mono text-slate-500 mb-4">// difficulty breakdown</div>
              <div className="space-y-4">
                {liveDifficulty.map((d, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium" style={{ color: d.color }}>{d.label}</span>
                      <span className="text-xs font-mono text-slate-400">{d.solved} / {d.total}</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(d.solved / d.total) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ background: d.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>


          </motion.div>
        </div>

          {/* Topics covered and Action */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-6 glass rounded-xl p-5"
            >
              <div className="text-xs font-mono text-slate-500 mb-3">// topics mastered</div>
              <div className="flex flex-wrap gap-2">
                {['Arrays', 'Strings', 'Linked Lists', 'Trees', 'Graphs', 'Dynamic Programming',
                  'Recursion', 'Backtracking', 'Sorting', 'Binary Search', 'Stack & Queue', 'Hash Maps',
                  'Algorithm Design', 'DSA Concepts', 'C / C++'
                ].map((topic, i) => (
                  <motion.span
                    key={topic}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    className="tech-badge"
                  >
                    {topic}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.a
              href="https://leetcode.com/u/saurabh5119/"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="glass glass-hover btn-glow w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white group"
            >
              View LeetCode Profile
              <ExternalLink size={18} className="group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
            </motion.a>
          </div>
        </div>
    </section>
  );
}
