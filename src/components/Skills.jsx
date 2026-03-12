import { motion } from 'framer-motion';

const marqueeRow1 = [
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
];

const marqueeRow2 = [
  { name: 'Pandas', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg' },
  { name: 'NumPy', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg' },
  { name: 'Scikit-Learn', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
  { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' },
  { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
  { name: 'Jupyter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg' },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
];

const domainSkills = [
  'Data Structures & Algorithms',
  'Object-Oriented Programming (OOP)',
  'Database Concepts (SQL)',
  'Problem Solving & Debugging',
  'API Integration',
  'Data Cleaning & EDA',
];

const softSkills = [
  { label: 'Problem-Solving', icon: '🧩' },
  { label: 'Team Player', icon: '🤝' },
  { label: 'Adaptability', icon: '🔄' },
  { label: 'Creative Thinking', icon: '💡' },
];

function SkillMarquee({ items, reverse, duration = '40s' }) {
  const containerStyle = { animationDuration: duration };
  return (
    <div className="flex overflow-hidden mask-edges py-6 my-2 group">
      <div 
        className={`flex w-fit gap-16 pr-16 hover:[animation-play-state:paused] ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`} 
        style={containerStyle}
      >
        {/* Render 3 identical sets to ensure continuous looping without popping */}
        {[...items, ...items, ...items].map((skill, idx) => (
          <div key={idx} className="flex flex-col items-center justify-center gap-3 min-w-[100px] opacity-70 hover:opacity-100 hover:scale-110 transition-all cursor-crosshair">
            <img src={skill.icon} alt={skill.name} className="w-14 h-14 object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.05)]" />
            <span className="text-sm font-display font-medium text-slate-400">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 max-w-5xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="font-mono text-cyan-400 text-sm">// 02.</div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white">Tech Stack</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/30 to-transparent" />
          </div>
          <p className="text-slate-400 font-mono text-sm">
            <span className="text-purple-400">const</span> skills = <span className="text-cyan-400">buildingBlocksOf</span>(myJourney)
          </p>
        </motion.div>
      </div>

      {/* Dynamic Skill Marquees - Full Width */}
      <div className="flex flex-col gap-4 border-y border-white/5 bg-white/[0.02] py-8">
        <SkillMarquee items={marqueeRow1} duration="50s" />
        <SkillMarquee items={marqueeRow2} reverse duration="55s" />
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-16">
        {/* Domain & Soft Skills below marquees */}
        <div className="grid md:grid-cols-2 gap-6 mt-16">
          {/* Domain Skills */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-xl p-6"
            style={{ borderTop: "2px solid rgba(0,212,255,0.2)" }}
          >
            <div className="text-xs font-mono text-cyan-400 mb-4">// domain skills</div>
            <div className="flex flex-wrap gap-2">
              {domainSkills.map((skill, i) => (
                <span key={i} className="tech-badge cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Soft Skills */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass rounded-xl p-6"
            style={{ borderTop: "2px solid rgba(155,93,229,0.2)" }}
          >
            <div className="text-xs font-mono text-purple-400 mb-4">// soft skills</div>
            <div className="flex flex-wrap gap-3">
              {softSkills.map((skill, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 cursor-default">
                  <span>{skill.icon}</span>
                  <span className="text-sm text-slate-300">{skill.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
