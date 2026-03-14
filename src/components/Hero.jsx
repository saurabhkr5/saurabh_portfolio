import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Linkedin, Mail, Code2, Download, ArrowRight, Github, User, Play } from 'lucide-react';

const stats = [
  { value: '150', label: 'DSA Problems', sub: 'Solved' },
  { value: '4', label: 'Projects', sub: 'Built' },
  { value: '70', label: 'Hours', sub: 'DSA Training' },
];

function TypewriterText({ texts }) {
  const [displayed, setDisplayed] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIndex < current.length) {
          setDisplayed(current.slice(0, charIndex + 1));
          setCharIndex(c => c + 1);
        } else {
          setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        if (charIndex > 0) {
          setDisplayed(current.slice(0, charIndex - 1));
          setCharIndex(c => c - 1);
        } else {
          setDeleting(false);
          setTextIndex(i => (i + 1) % texts.length);
        }
      }
    }, deleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, textIndex, texts]);

  return (
    <span className="font-mono text-cyan-400">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const num = parseInt(target);
        const duration = 1500;
        const steps = 60;
        let step = 0;
        const interval = setInterval(() => {
          step++;
          setCount(Math.floor((num * step) / steps));
          if (step >= steps) {
            setCount(num);
            clearInterval(interval);
          }
        }, duration / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center grid-bg overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(155,93,229,0.08) 0%, transparent 70%)' }} />
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: i % 2 === 0 ? 'rgba(0,212,255,0.4)' : 'rgba(155,93,229,0.4)',
              left: `${(i * 17 + 5) % 100}%`,
              top: `${(i * 13 + 10) % 100}%`,
            }}
            animate={{ y: [-10, 10, -10], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: (i % 5) * 0.6 }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full px-6 lg:px-16 pt-20 lg:pt-0">
        <div className="max-w-6xl flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">

          {/* LEFT – Text content */}
          <div className="flex-1">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 text-xs font-mono"
            >
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-slate-400">B.Tech CSE</span>
              <span className="text-slate-600">•</span>
              <span className="text-cyan-400">Open to Opportunities</span>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="text-slate-400 font-mono text-base mb-2">
                <span className="text-purple-400">const</span>{' '}
                <span className="text-cyan-400">developer</span>{' '}
                <span className="text-slate-500">=</span>{' '}
                <span className="text-green-400">"Saurabh Kumar Gupta"</span>
              </div>
              <h1 className="font-display text-5xl lg:text-6xl font-black text-white leading-none mb-2">
                Hi, I'm{' '}
                <span className="gradient-text block mt-1">Saurabh</span>
              </h1>
            </motion.div>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xl lg:text-2xl text-slate-300 font-semibold mt-4 mb-3"
            >
              <TypewriterText texts={[
                'Computer Science Engineer',
                'AI & Data Science Enthusiast',
                'Problem Solver',
                'DSA Practitioner',
              ]} />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-slate-400 text-base max-w-xl mb-8 leading-relaxed"
            >
              Building <span className="text-cyan-400">Intelligent Systems</span> with Code, Data &{' '}
              <span className="text-purple-400">AI.</span>{' '}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              {stats.map((stat, i) => (
                <div key={i} className="glass relative corner-tl corner-br rounded-xl px-5 py-3 text-center min-w-[100px]">
                  <div className="font-display text-2xl font-black neon-text-blue">
                    <AnimatedCounter target={parseInt(stat.value)} suffix="+" />
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">{stat.label}</div>
                  <div className="text-xs text-slate-600">{stat.sub}</div>
                </div>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-glow flex items-center gap-2 px-7 py-3 rounded-xl text-white font-bold"
              >
                View Projects <ArrowRight size={16} />
              </motion.button>
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="btn-glow flex items-center gap-2 px-7 py-3 rounded-xl text-white font-bold"
              >
                <User size={16} />
                View Resume
              </motion.a>
              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="glass glass-hover flex items-center gap-2 px-7 py-3 rounded-xl text-slate-300 font-bold border border-slate-700/50"
              >
                <Download size={16} />
                Download Resume
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex items-center gap-4 flex-wrap"
            >
              <span className="text-xs text-slate-600 font-mono">// find me at</span>
              <a href="https://linkedin.com/in/saurabh-gupta05" target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition-colors text-sm font-mono">
                <Linkedin size={14} /> LinkedIn
              </a>
              <a href="https://github.com/saurabhkr5" target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors text-sm font-mono">
                <Github size={14} /> GitHub
              </a>
              <a href="https://leetcode.com/saurabh5119" target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 text-slate-400 hover:text-orange-400 transition-colors text-sm font-mono">
                <Code2 size={14} /> LeetCode
              </a>
              <a href="mailto:saurabhkumarg511@gmail.com"
                className="flex items-center gap-1.5 text-slate-400 hover:text-purple-400 transition-colors text-sm font-mono">
                <Mail size={14} /> Email
              </a>
            </motion.div>
          </div>

          {/* RIGHT – Profile Photo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-shrink-0 flex flex-col items-center gap-4"
          >
            {/* Photo frame */}
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-3 rounded-full animate-glow-pulse" />
              <div className="absolute -inset-1 rounded-full"
                style={{ background: 'linear-gradient(135deg, #00d4ff, #9b5de5, #f72585)', padding: '2px' }}>
                <div className="w-full h-full rounded-full" style={{ background: '#020408' }} />
              </div>

              {/* Photo */}
              <div className="relative w-56 h-56 rounded-full overflow-hidden"
                style={{ border: '3px solid rgba(0,212,255,0.4)' }}>
                <img
                  src="/profile.png"
                  alt="Saurabh Kumar Gupta"
                  loading="lazy"
                  className="w-full h-full object-cover"
                  onError={e => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback avatar */}
                <div className="w-full h-full items-center justify-center text-6xl font-black gradient-text font-display"
                  style={{ display: 'none', background: 'rgba(10,22,40,0.9)' }}>
                  
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-2 -right-2 glass px-3 py-1.5 rounded-lg text-xs font-mono text-cyan-400"
                style={{ border: '1px solid rgba(0,212,255,0.3)' }}
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Open to Work
                </div>
              </motion.div>

              {/* Video CV Badge */}
              <motion.a
                href="#"
                target="_blank"
                rel="noreferrer"
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute top-4 -left-6 glass px-3 py-2 rounded-full text-xs font-bold text-white flex items-center gap-2 hover:border-pink-500/50 hover:text-pink-400 transition-colors group"
                style={{ border: '1px solid rgba(247, 37, 133, 0.3)', background: 'rgba(10, 22, 40, 0.8)' }}
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Play size={10} fill="currentColor" stroke="none" className="ml-0.5" />
                </div>
              </motion.a>
            </div>

            {/* Name plate */}
            <div className="text-center">
              <div className="font-display font-bold text-white text-sm">Saurabh Kumar Gupta</div>
              <div className="text-xs font-mono text-slate-500 mt-0.5">B.Tech CSE</div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown size={20} className="text-slate-600" />
      </motion.div>
    </section>
  );
}
