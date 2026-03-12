import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowRight, Calendar } from 'lucide-react';
import projects from '../data/projects.json';

const categoryColors = {
  'Data Analytics': '#00d4ff',
  'AI / Chatbot': '#9b5de5',
  'Full Stack': '#f72585',
  'Education': '#f59e0b',
};

function ProjectCard({ project, index }) {
  const color = categoryColors[project.category] || '#00d4ff';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 300, damping: 25 }}
      whileHover={{ y: -10, rotate: index % 2 === 0 ? 1.5 : -1.5, scale: 1.03 }}
      className="glass rounded-xl overflow-hidden group relative"
      style={{ border: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Project image */}
      <div className="h-44 relative overflow-hidden" style={{ borderBottom: `1px solid ${color}20` }}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          /* Fallback placeholder */
          <div className="w-full h-full flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${color}15, ${color}05)` }}>
            <div className="absolute inset-0 grid-bg opacity-50" />
            <div className="relative space-y-1.5 w-3/4">
              {[70, 90, 55, 80].map((w, i) => (
                <div key={i} className="h-1.5 rounded-full" style={{ background: `${color}20`, width: `${w}%` }} />
              ))}
            </div>
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(to top, ${color}30, transparent)` }} />

        {/* Category badge */}
        <div className="absolute top-3 right-3">
          <span className="text-xs font-mono px-2 py-1 rounded backdrop-blur-sm"
            style={{ background: `${color}20`, border: `1px solid ${color}40`, color }}>
            {project.category}
          </span>
        </div>

        {/* Index number */}
        <div className="absolute bottom-3 right-3 font-display text-4xl font-black opacity-20 text-white">
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-white text-base group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h3>
          {project.date && (
            <span className="flex items-center gap-1 text-xs font-mono text-slate-600 flex-shrink-0 mt-0.5">
              <Calendar size={10} />
              {project.date}
            </span>
          )}
        </div>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map(tech => (
            <span key={tech} className="tech-badge">{tech}</span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-3 border-t border-white/5">
          <a href={project.github} target="_blank" rel="noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors">
            <Github size={13} /> Code
          </a>
          {project.demo && project.demo !== '#' && (
            <a href={project.demo} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors">
              <ExternalLink size={13} /> View
            </a>
          )}
          <motion.div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" whileHover={{ x: 3 }}>
            <ArrowRight size={14} className="text-cyan-400" />
          </motion.div>
        </div>
      </div>

      {/* Hover border glow */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${color}30` }} />
    </motion.div>
  );
}

export default function Projects() {
  const featured = projects.filter(p => p.featured);
  const others = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-24 px-6 lg:px-16">
      <div className="max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="font-mono text-cyan-400 text-sm">// 03.</div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white">Featured Projects</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/30 to-transparent" />
          </div>
          <p className="text-slate-400 text-sm">Things I've built that I'm proud of</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {others.length > 0 && (
          <div className="mt-8">
            <div className="text-xs font-mono text-slate-500 mb-4">// other noteworthy projects</div>
            <div className="grid md:grid-cols-2 gap-4">
              {others.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i + featured.length} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
