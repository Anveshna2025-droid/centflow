import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, Star, BarChart2, Briefcase, Settings, TrendingUp } from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Markets', path: '/' },
  { icon: Star, label: 'Watchlist', path: '/watchlist' },
  { icon: BarChart2, label: 'Analytics', path: '/markets' },
  { icon: Briefcase, label: 'Portfolio', path: '/portfolio' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen hidden md:flex flex-col bg-cf-surface border-r border-cf-border glass slide-in relative z-20">
      <Link to="/" className="p-6 flex items-center gap-3 hover:opacity-80 transition-opacity">
        <TrendingUp className="w-8 h-8 text-cf-accent box-glow" strokeWidth={2} />
        <span className="font-syne font-bold text-2xl tracking-wider text-glow text-cf-text">CentFlow</span>
      </Link>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                isActive
                  ? 'bg-cf-accent/10 text-cf-accent shadow-[inset_4px_0_0_0_var(--cf-accent)]'
                  : 'text-cf-muted hover:bg-cf-hover hover:text-cf-text'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-cf-border/50">
        <div className="px-4 py-3 bg-cf-hover rounded-xl text-xs text-cf-muted text-center font-mono">
          System Status: <span className="text-cf-green">Online</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
