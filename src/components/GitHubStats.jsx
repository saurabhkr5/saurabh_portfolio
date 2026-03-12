import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, GitFork, Star, GitCommit, ExternalLink } from 'lucide-react';

const GITHUB_USERNAME = 'saurabhkr5';

export default function GitHubStats() {
  const [stats, setStats] = useState({
    repos: 0,
    stars: 0,
    forks: 0,
    recentRepos: [],
    loading: true,
  });

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        // Fetch user basic stats
        const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (!userRes.ok) throw new Error('Failed to fetch user');
        const userData = await userRes.json();

        // Fetch user repos (sorted by recently updated)
        const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
        if (!reposRes.ok) throw new Error('Failed to fetch repos');
        const reposData = await reposRes.json();

        // Calculate total stars and forks from all accessible repos
        let totalStars = 0;
        let totalForks = 0;
        reposData.forEach(repo => {
          totalStars += repo.stargazers_count;
          totalForks += repo.forks_count;
        });

        // Get 4 most recently updated non-forked repos
        const recentRepos = reposData
          .filter(repo => !repo.fork)
          .slice(0, 4)
          .map(repo => ({
            name: repo.name,
            description: repo.description,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language,
            url: repo.html_url,
          }));

        setStats({
          repos: userData.public_repos,
          stars: totalStars,
          forks: totalForks,
          recentRepos,
          loading: false,
        });
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
        setStats(s => ({ ...s, loading: false }));
      }
    }

    fetchGitHubData();
  }, []);

  return (
    <section id="github" className="py-24 px-6 lg:px-16 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 relative"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="font-mono text-cyan-400 text-sm">// 04.5</div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white flex items-center gap-3">
              <Github size={32} className="text-white" /> GitHub Activity
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-purple-500/30 to-transparent" />
          </div>
          <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors font-mono">
            @{GITHUB_USERNAME} <ExternalLink size={13} />
          </a>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 relative">
          {/* Top-level Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {[
              { label: 'Public Repos', value: stats.repos, icon: GitCommit, color: '#f72585' },
              { label: 'Total Stars', value: stats.stars, icon: Star, color: '#f59e0b' },
              { label: 'Total Forks', value: stats.forks, icon: GitFork, color: '#00d4ff' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass rounded-xl p-4 flex items-center gap-4"
                  style={{ borderLeft: `2px solid ${stat.color}40` }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}25` }}>
                    <Icon size={18} style={{ color: stat.color }} />
                  </div>
                  <div>
                    <div className="font-display text-xl font-bold text-white">
                      {stats.loading ? '...' : stat.value}
                    </div>
                    <div className="text-xs text-slate-500 font-mono">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Contribution Graph & Recent Repos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contribution Graph Card */}
            <div className="glass rounded-xl p-6 overflow-hidden">
              <div className="text-xs font-mono text-slate-500 mb-4">// contributions (last year)</div>
              <div className="w-full overflow-x-auto overflow-y-hidden pb-2 custom-scrollbar">
                <div className="min-w-[700px]">
                  <img
                    src={`https://ghchart.rshah.org/00d4ff/${GITHUB_USERNAME}`}
                    alt={`${GITHUB_USERNAME}'s GitHub Contribution Chart`}
                    loading="lazy"
                    className="w-full opacity-90 style-svg invert-0 dark:invert"
                    style={{
                      filter: 'hue-rotate(240deg) saturate(1.5) brightness(1.2)'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Recent Repos */}
            <div className="grid sm:grid-cols-2 gap-4">
              {stats.loading ? (
                [1, 2, 3, 4].map(i => (
                  <div key={i} className="glass rounded-xl p-5 h-32 animate-pulse" />
                ))
              ) : (
                stats.recentRepos.map((repo, i) => (
                  <motion.a
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className="glass glass-hover block rounded-xl p-5 group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-white text-sm truncate pr-2 group-hover:text-purple-400 transition-colors">
                        {repo.name}
                      </h3>
                      <ExternalLink size={14} className="text-slate-500 group-hover:text-purple-400 flex-shrink-0" />
                    </div>
                    <p className="text-slate-400 text-xs line-clamp-2 mb-4 h-8">
                      {repo.description || 'No description provided.'}
                    </p>
                    <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
                      {repo.language && (
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-cyan-400" />
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Star size={12} /> {repo.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork size={12} /> {repo.forks}
                      </span>
                    </div>
                  </motion.a>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
