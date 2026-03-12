import { motion } from 'framer-motion';
import { Brain, Code2, Database, Sparkles, GraduationCap, MapPin } from 'lucide-react';

const highlights = [
  { icon: Brain, label: 'AI & ML', desc: 'Building intelligent systems', color: '#9b5de5' },
  { icon: Database, label: 'Data Science', desc: 'Insights from data', color: '#00d4ff' },
  { icon: Code2, label: 'Problem Solving', desc: '100+ DSA problems', color: '#f72585' },
  { icon: Sparkles, label: 'Continuous Learning', desc: '70+ hrs DSA training', color: '#f59e0b' },
];

const education = [
  {
    institution: 'Lovely Professional University',
    degree: 'B.Tech – Computer Science & Engineering',
    detail: 'CGPA: 7.11',
    location: 'Phagwara, Punjab',
    period: '2023 – Present',
    color: '#00d4ff',
    icon: '🎓',
  },
  {
    institution: 'Trident Public School',
    degree: '12th',
    detail: 'Percentage: 71%',
    location: 'Muzaffarpur, Bihar',
    period: '2022 – 2023',
    color: '#9b5de5',
    icon: '📚',
  },
  {
    institution: 'The Jaintpur Public School',
    degree: '10th',
    detail: 'Percentage: 72%',
    location: 'Muzaffarpur, Bihar',
    period: '2020 – 2021',
    color: '#f72585',
    icon: '🏫',
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 lg:px-16">
      <div className="max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="font-mono text-cyan-400 text-sm">// 01.</div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white">About Me</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/30 to-transparent" />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-5 text-slate-300 leading-relaxed">
              <p className="text-lg">
                I'm a <span className="text-cyan-400 font-semibold">B.Tech CSE student</span> passionate about transforming raw data into actionable intelligence and scalable systems.
              </p>
              <p>
                My core expertise lies in <span className="text-purple-400 font-medium">AI & Data Science</span> and <span className="text-cyan-400 font-medium">Python Development</span>. I thrive on algorithmic problem-solving and building intelligent applications that make an impact.
              </p>
              <p className="text-sm text-slate-400">
                With a strong foundation in Database Management, Object-Oriented Programming, and hands-on experience using OpenAI APIs, I'm driven to continuously innovate and learn.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {['Available for Internship', 'Open Source Contributor', 'Hackathon Participant'].map(tag => (
                  <span key={tag} className="tech-badge">{tag}</span>
                ))}
              </div>
            </div>

            {/* Code snippet */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="glass rounded-xl p-5 mt-6 font-mono text-sm"
            >
              <div className="flex gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="space-y-1 text-xs">
                <div><span className="text-purple-400">const</span> <span className="text-cyan-400">saurabh</span> = {'{'}</div>
                <div className="pl-4"><span className="text-slate-400">name:</span> <span className="text-green-400">"Saurabh Kumar Gupta"</span>,</div>
                <div className="pl-4"><span className="text-slate-400">university:</span> <span className="text-green-400">"LPU, Phagwara"</span>,</div>
                <div className="pl-4"><span className="text-slate-400">cgpa:</span> <span className="text-orange-400">7.11</span>,</div>
                <div className="pl-4"><span className="text-slate-400">hometown:</span> <span className="text-green-400">"Muzaffarpur, Bihar"</span>,</div>
                <div className="pl-4"><span className="text-slate-400">passion:</span> [<span className="text-orange-400">"AI"</span>, <span className="text-orange-400">"DSA"</span>, <span className="text-orange-400">"Data"</span>],</div>
                <div className="pl-4"><span className="text-slate-400">goal:</span> <span className="text-green-400">"Build intelligent systems"</span></div>
                <div>{'}'}</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side: highlights + education */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-3">
              {highlights.map((h, i) => {
                const Icon = h.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                    className="glass glass-hover relative rounded-xl p-4 group"
                  >
                    <div className="w-9 h-9 rounded-lg mb-3 flex items-center justify-center"
                      style={{ background: `${h.color}18`, border: `1px solid ${h.color}30` }}>
                      <Icon size={18} style={{ color: h.color }} />
                    </div>
                    <div className="font-bold text-white text-xs">{h.label}</div>
                    <div className="text-slate-500 text-xs mt-1">{h.desc}</div>
                  </motion.div>
                );
              })}
            </div>

            {/* Education timeline */}
            <div className="glass rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap size={15} className="text-cyan-400" />
                <div className="text-xs font-mono text-cyan-400">Education</div>
              </div>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative pl-4"
                    style={{ borderLeft: `2px solid ${edu.color}40` }}
                  >
                    <div className="absolute -left-1 top-1 w-2 h-2 rounded-full" style={{ background: edu.color }} />
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-white">{edu.institution}</div>
                      <div className="text-xs text-slate-600 font-mono">{edu.period}</div>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">{edu.degree}</div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs font-mono" style={{ color: edu.color }}>{edu.detail}</span>
                      <span className="flex items-center gap-1 text-xs text-slate-600">
                        <MapPin size={9} />
                        {edu.location}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
