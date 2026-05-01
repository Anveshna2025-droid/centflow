import React, { useState } from 'react';
import Card from '../components/Card';
import { useMarket } from '../store/MarketContext';
import { useNotification } from '../store/NotificationContext';
import { Search, Plus, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { useTheme } from '../store/ThemeContext';
import ReactApexChart from 'react-apexcharts';

const Watchlist = () => {
  const { state, dispatch } = useMarket();
  const { addNotification } = useNotification();
  const { theme } = useTheme();
  const [newSymbol, setNewSymbol] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (newSymbol.trim()) {
      const symbol = newSymbol.toUpperCase();
      if (state.watchlist.includes(symbol)) {
        addNotification(`${symbol} is already in your watchlist.`, 'info');
      } else {
        dispatch({ type: 'ADD_TO_WATCHLIST', payload: symbol });
        addNotification(`Added ${symbol} to your watchlist.`, 'success');
      }
      setNewSymbol('');
    }
  };

  const handleRemove = (symbol) => {
    dispatch({ type: 'REMOVE_FROM_WATCHLIST', payload: symbol });
    addNotification(`Removed ${symbol} from watchlist.`, 'error');
  };

  const generateMockChartData = (isPositive) => {
    return Array.from({ length: 20 }, () => Math.floor(Math.random() * 50) + (isPositive ? 50 : 20));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 fade-up">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-4xl font-syne font-bold text-cf-text mb-2">Watchlist</h1>
          <p className="text-cf-muted">Manage and track your favorite assets. Data persists locally.</p>
        </div>
        
        <form onSubmit={handleAdd} className="relative flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cf-muted" />
            <input 
              type="text" 
              value={newSymbol}
              onChange={(e) => setNewSymbol(e.target.value)}
              placeholder="Add symbol (e.g., NVDA)" 
              className="bg-cf-surface border border-cf-border rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-cf-accent text-cf-text w-64"
            />
          </div>
          <button type="submit" className="bg-cf-accent text-white p-2 rounded-lg hover:bg-cf-accent/80 hover:shadow-glow transition-all">
            <Plus className="w-5 h-5" />
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {state.watchlist.map((symbol) => {
          const isPositive = Math.random() > 0.4;
          const chartData = generateMockChartData(isPositive);
          
          const options = {
            chart: { type: 'area', sparkline: { enabled: true }, animations: { enabled: false } },
            stroke: { curve: 'smooth', width: 2 },
            fill: { opacity: 0.2, type: 'solid' },
            colors: [isPositive ? '#10b981' : '#ef4444'],
            tooltip: { fixed: { enabled: false }, x: { show: false }, y: { title: { formatter: () => '' } }, marker: { show: false } }
          };

          return (
            <Card key={symbol} className="relative group min-h-[160px] flex flex-col justify-between">
              <button 
                onClick={() => handleRemove(symbol)}
                className="absolute top-4 right-4 text-cf-muted hover:text-cf-red opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold font-syne text-cf-text">{symbol}</h3>
                  <p className="text-sm text-cf-muted">Stock / Crypto</p>
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-bold ${isPositive ? 'bg-cf-green/10 text-cf-green' : 'bg-cf-red/10 text-cf-red'}`}>
                  {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {(Math.random() * 5).toFixed(2)}%
                </div>
              </div>
              
              <div className="flex justify-between items-end">
                <p className="text-xl font-mono text-cf-text">${(Math.random() * 1000 + 10).toFixed(2)}</p>
                <div className="w-32 h-16">
                  <ReactApexChart options={options} series={[{ data: chartData }]} type="area" height={60} />
                </div>
              </div>
            </Card>
          );
        })}

        {state.watchlist.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-cf-muted bg-cf-surface rounded-2xl border border-dashed border-cf-border">
            <Star className="w-12 h-12 mb-4 opacity-50" />
            <p>Your watchlist is empty.</p>
            <p className="text-sm">Search and add symbols to track them here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
