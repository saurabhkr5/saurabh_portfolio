import { motion } from 'framer-motion';
import { ExternalLink, BadgeCheck, Calendar, ImageOff } from 'lucide-react';
import certificates from '../data/certificates.json';

function CertCard({ cert, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="glass rounded-xl overflow-hidden group relative"
      style={{ border: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, ${cert.color}, transparent)` }} />

      {/* Certificate image area */}
      <div className="h-36 relative overflow-hidden" style={{ borderBottom: `1px solid ${cert.color}15` }}>
        {cert.image ? (
          <img
            src={cert.image}
            alt={cert.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* Placeholder – user will replace with their real cert image */
          <div className="w-full h-full flex flex-col items-center justify-center gap-3"
            style={{ background: `linear-gradient(135deg, ${cert.color}10, ${cert.color}04)` }}>
            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
              style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}25` }}>
              {cert.icon}
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-600">
              <ImageOff size={11} />
              Add your certificate image
            </div>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: `linear-gradient(to top, ${cert.color}20, transparent)` }} />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-white text-sm leading-tight group-hover:text-cyan-400 transition-colors flex-1">
            {cert.title}
          </h3>
          {cert.credential && cert.credential !== '#' && (
            <motion.a
              href={cert.credential}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.15 }}
              className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5"
              style={{ color: cert.color }}
            >
              <ExternalLink size={13} />
            </motion.a>
          )}
        </div>

        <div className="flex items-center gap-2 mt-2 mb-2 flex-wrap">
          <BadgeCheck size={13} style={{ color: cert.color }} />
          <span className="text-xs font-mono" style={{ color: cert.color }}>{cert.issuer}</span>
          <span className="text-slate-700">•</span>
          <Calendar size={10} className="text-slate-600" />
          <span className="text-xs text-slate-600 font-mono">{cert.date}</span>
        </div>

        <p className="text-slate-400 text-xs leading-relaxed">{cert.description}</p>

        {/* Placeholder hint */}
        {!cert.image && (
          <div className="mt-3 pt-3 border-t border-white/5">
            <p className="text-xs text-slate-700 font-mono">
              // Place your cert image at: <span style={{ color: cert.color }}>public/cert-{index + 1}.png</span>
            </p>
          </div>
        )}
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${cert.color}25` }} />
    </motion.div>
  );
}

export default function Certificates() {
  return (
    <section id="certificates" className="py-24 px-6 lg:px-16">
      <div className="max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="font-mono text-cyan-400 text-sm">// 05.</div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white">Certificates & Training</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/30 to-transparent" />
          </div>
          <p className="text-slate-400 text-sm">Credentials & continuous learning journey</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {certificates.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
