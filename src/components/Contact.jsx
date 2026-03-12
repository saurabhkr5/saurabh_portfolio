import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Code2, Send, CheckCircle, Terminal, Github, Phone } from 'lucide-react';

const contactLinks = [
  
  {
    icon: Mail,
    label: 'Email',
    value: 'saurabhkumarg511@gmail.com',
    href: 'mailto:saurabhkumarg511@gmail.com',
    color: '#00d4ff',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/saurabh-gupta05',
    href: 'https://www.linkedin.com/in/saurabh-gupta05/',
    color: '#0077b5',
  },
  {
    icon: Code2,
    label: 'LeetCode',
    value: 'leetcode.com/u/saurabh5119',
    href: 'https://leetcode.com/u/saurabh5119/',
    color: '#f89c1b',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/saurabhkr5',
    href: 'https://github.com/saurabhkr5',
    color: '#e2e8f0',
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Build mailto link with form data
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    window.open(`mailto:saurabhkumarg511@gmail.com?subject=${subject}&body=${body}`, '_blank');
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 px-6 lg:px-16">
      <div className="max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="font-mono text-cyan-400 text-sm">// 07.</div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white">Get In Touch</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/30 to-transparent" />
          </div>
          <p className="text-slate-400 text-sm max-w-lg">
            Have a project in mind or want to collaborate? Let's build something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <div className="text-xs font-mono text-slate-500 mb-5">// reach out via</div>

            {contactLinks.map((link, i) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={i}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : '_self'}
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ x: 6 }}
                  className="glass flex items-center gap-4 p-4 rounded-xl group transition-all"
                  style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${link.color}12`, border: `1px solid ${link.color}25` }}>
                    <Icon size={16} style={{ color: link.color }} />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-500">{link.label}</div>
                    <div className="text-sm text-white font-medium group-hover:text-cyan-400 transition-colors">
                      {link.value}
                    </div>
                  </div>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: link.color }}>→</div>
                </motion.a>
              );
            })}

            {/* Terminal style note */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="glass rounded-xl p-4 mt-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Terminal size={13} className="text-cyan-400" />
                <span className="text-xs font-mono text-slate-500">terminal output</span>
              </div>
              <div className="font-mono text-xs space-y-1">
                <div><span className="text-cyan-400">$</span> <span className="text-slate-300">status --availability</span></div>
                <div className="text-green-400">✓ Available for all opportunities</div>
                <div className="text-green-400">✓ Open to freelance projects</div>
                <div className="text-green-400">✓ Interested in open source collaboration</div>
                <div><span className="text-cyan-400">$</span> <span className="animate-pulse text-slate-600">█</span></div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <div className="glass rounded-xl p-6" style={{ border: '1px solid rgba(0, 212, 255, 0.1)' }}>
              <div className="text-xs font-mono text-slate-500 mb-5">// send a message</div>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle size={48} className="text-green-400 mb-4" />
                  <div className="font-bold text-white text-lg mb-2">Message Sent!</div>
                  <div className="text-slate-400 text-sm">Thanks for reaching out. I'll get back to you soon!</div>
                  <button
                    onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }}
                    className="mt-6 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Send another →
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-500 mb-1.5">Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-cyan-500/50"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', fontFamily: 'Syne, sans-serif' }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-500 mb-1.5">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-slate-600 outline-none transition-all"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', fontFamily: 'Syne, sans-serif' }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-500 mb-1.5">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Tell me about your project or opportunity..."
                      className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-slate-600 outline-none transition-all resize-none"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', fontFamily: 'Syne, sans-serif' }}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-glow w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-sm"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Opening mail...
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-white/5 text-center"
        >
          <p className="text-slate-600 text-xs font-mono">
            <span className="text-cyan-400">©</span> 2026 Saurabh Kumar Gupta —{' '}
            <span className="text-slate-500">Designed & Built with</span>{' '}
            <span className="text-pink-500">♥</span>{' '}
            <span className="text-slate-500">using React </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
