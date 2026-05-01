import React, { useState } from 'react';
import { useTheme } from '../store/ThemeContext';
import { useAuth } from '../store/AuthContext';
import { Search, Bell, Moon, Sun, Menu, X } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/asset/${searchQuery.toUpperCase()}`);
      setSearchQuery('');
    }
  };

  const mockNotifications = [
    { id: 1, title: 'Price Alert', desc: 'BTC surpassed $65,000', time: '2m ago' },
    { id: 2, title: 'System', desc: 'Welcome to CentFlow!', time: '1h ago' },
    { id: 3, title: 'Watchlist', desc: 'NVDA is up 4.2% today.', time: '3h ago' },
  ];

  return (
    <>
      <header className="h-20 bg-cf-surface/50 border-b border-cf-border flex items-center justify-between px-6 glass relative z-10">
        
        {/* Mobile Menu Button */}
        <button className="md:hidden text-cf-muted hover:text-cf-text">
          <Menu className="w-6 h-6" />
        </button>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cf-muted" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search assets, symbols, or news..." 
            className="w-full bg-cf-bg border border-cf-border rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-cf-accent text-cf-text transition-colors placeholder:text-cf-muted/50"
          />
        </form>

        {/* Actions */}
        <div className="flex items-center gap-4 ml-auto">
          <button 
            onClick={toggleTheme}
            className="p-2 text-cf-muted hover:text-cf-accent hover:bg-cf-hover rounded-lg transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <button 
            onClick={() => setIsNotifOpen(true)}
            className="p-2 text-cf-muted hover:text-cf-accent hover:bg-cf-hover rounded-lg transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cf-accent rounded-full box-glow"></span>
          </button>
          
          <div className="h-8 w-px bg-cf-border mx-2"></div>
          
          <Link to="/settings" className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="hidden md:block text-right">
              <p className="text-sm font-bold text-cf-text">{user?.displayName || 'Trader'}</p>
              <p className="text-xs text-cf-muted">Pro Plan</p>
            </div>
            <img 
              src={user?.photoURL || 'https://ui-avatars.com/api/?name=Trader&background=random'} 
              alt="Profile" 
              className="w-10 h-10 rounded-xl border border-cf-border object-cover bg-cf-surface"
            />
          </Link>
        </div>
      </header>

      {/* Notification Sidebar Panel */}
      {isNotifOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-cf-bg/50 backdrop-blur-sm" onClick={() => setIsNotifOpen(false)}></div>
          <div className="w-80 h-full bg-cf-surface border-l border-cf-border shadow-xl relative z-10 animate-[slide-in-right_0.3s_ease-out_both] flex flex-col">
            <div className="p-6 border-b border-cf-border flex justify-between items-center">
              <h2 className="text-xl font-bold font-syne text-cf-text">Notifications</h2>
              <button onClick={() => setIsNotifOpen(false)} className="text-cf-muted hover:text-cf-red">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {mockNotifications.map(n => (
                <div key={n.id} className="p-4 bg-cf-hover/50 rounded-xl border border-cf-border/50">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-cf-text text-sm">{n.title}</h4>
                    <span className="text-xs text-cf-muted">{n.time}</span>
                  </div>
                  <p className="text-sm text-cf-muted">{n.desc}</p>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-cf-border">
               <button className="w-full text-center text-sm font-bold text-cf-accent hover:underline">Mark all as read</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
