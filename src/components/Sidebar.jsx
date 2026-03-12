import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, User, Code2, FolderOpen, Award, Trophy, Mail,
  Download, Menu, X, Terminal, Github, Linkedin
} from 'lucide-react';

const navItems = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'leetcode', label: 'LeetCode', icon: Terminal },
  { id: 'certificates', label: 'Certificates', icon: Award },
  { id: 'achievements', label: 'Achievements', icon: Trophy },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export default function Sidebar({ activeSection }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full py-6">
      {/* Logo */}
      <div className="px-5 mb-8">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           className="flex items-center gap-3"
        >
          <img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(0,212,255,0.3)] object-cover" />
          <div>
            <div className="text-white font-bold text-[15px] font-display tracking-wider">SKG</div>
          </div>
        </motion.div>
      </div>

      {/* Status indicator */}
      <div className="px-5 mb-6">
        <div className="glass rounded-lg px-3 py-2 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-slate-400 font-mono">Available for work</span>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3">
        <div className="text-xs text-slate-600 font-mono px-3 mb-3 uppercase tracking-widest">Navigation</div>
        {navItems.map((item, i) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => scrollTo(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm transition-all duration-200 text-left group
                ${isActive ? 'nav-active' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
            >
              <Icon
                size={16}
                className={`flex-shrink-0 transition-all ${isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`}
              />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="nav-dot"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Social links */}
      <div className="px-5 mb-4">
        <div className="text-xs text-slate-600 font-mono mb-3 uppercase tracking-widest">Connect</div>
        <div className="flex gap-2">
          <a href="https://www.linkedin.com/in/saurabh-gupta05/" target="_blank" rel="noreferrer"
            className="glass w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all"
            title="LinkedIn">
            <Linkedin size={14} />
          </a>
          <a href="https://github.com/saurabhkr5" target="_blank" rel="noreferrer"
            className="glass w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all"
            title="GitHub">
            <Github size={14} />
          </a>
          <a href="mailto:saurabhkumarg511@gmail.com"
            className="glass w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all"
            title="Email">
            <Mail size={14} />
          </a>
          <a href="https://leetcode.com/u/saurabh5119/" target="_blank" rel="noreferrer"
            className="glass w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-orange-400 hover:border-orange-400/30 transition-all"
            title="LeetCode">
            <Code2 size={14} />
          </a>
        </div>
      </div>

      {/* Resume Buttons */}
      <div className="px-4 flex flex-col gap-2">
        <motion.a
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glass btn-glow w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-white text-sm font-semibold"
        >
          <User size={14} />
          View Resume
        </motion.a>
        <motion.a
          href="/resume.pdf"
          download
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glass glass-hover w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-cyan-400 text-sm font-semibold"
          style={{ border: '1px solid rgba(0,212,255,0.2)' }}
        >
          <Download size={14} />
          Download
        </motion.a>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden glass w-10 h-10 rounded-lg flex items-center justify-center text-slate-300"
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-56 flex-col glass border-r border-cyan-500/10 z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 30 }}
              className="fixed left-0 top-0 h-screen w-56 flex flex-col z-50 lg:hidden"
              style={{ background: 'rgba(6, 13, 26, 0.98)', borderRight: '1px solid rgba(0, 212, 255, 0.15)' }}
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
